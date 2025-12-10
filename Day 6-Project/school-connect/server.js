process.on('uncaughtException',(err)=>{         //Catches synchronous error that weren't handled anywhere in the code
    console.log('Uncaught exception',err.message);
    console.error(err.stack);
    process.exit(1)
})

process.on('unhandledRejection',(err)=>{      // Catches Promise rejection(didnt handled with try/catch in async/await)
    console.log('Unhandled Rejection:',err.message);
    console.error(err.stack);
    process.exit(1)
})



require('dotenv').config();
const express = require('express')

const app = express()
const http = require('http')                       // http module with server
const { Server } = require('socket.io')            // Import Server class from socket io(Used to create a websocket server that handles real time communication)                                       

const fs = require('fs')
const path = require('path')
const { loadStudents } = require('./utils/loadStudents')

const adminRoute = require('./routes/adminRoutes')      // import adminRoute
const studentRoute = require('./routes/studentRoutes')  //import studentRoute
// const { verifyStudent } = require('./middlewares/verifyStudent') //import middleware for verification
// const { NotFoundError } = require('./utils/error')

const helmet = require('helmet');      // Adds security headers to protect the app
const cors = require('cors');          // CORS allows our server to accept requests from other domains.
                                      // Useful when our frontend and backend run on different ports.

const compression = require('compression'); // Compression reduces the size of the response body .
                                            // Makes our app faster by sending smaller data to the client.

const rateLimit = require('express-rate-limit')  // Help app from too many requests
const morgan = require('morgan')
const { errorHandlingMiddleware } = require('./middlewares/errorHandlings')

// For authentication
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

// Middlewares
app.use(cors())
app.use(compression())
app.use(morgan('dev'))
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,                   // Time window in milli seconds
  max:1000                                 // The maximum number of requests a single IP can make during that time window.
})
app.use(limiter)                             // Applies this rule to all routes in your Express app.
                                             // So any client can only make 100 requests per 15 minutes.

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('welcome', { title: 'Welcome to SPRINGVALE School Portal' })
})

app.use('/admin', adminRoute)
app.use('/student', studentRoute)

const server = http.createServer(app)    // create an http server and pass Express app into it
                                        // Normally we do app.listen(), but here we wrap Express in a raw HTTP server
                                        //     because Socket.IO needs direct access to the HTTP server.

const io = new Server(server)           // Create a new Socket.IO server instance and attach it to the HTTP server.
                                       // Now both normal HTTP requests (Express routes) and WebSocket connections

const chatHistoryPath = path.join(__dirname, 'utils/chatHistory.json')     // File path to save all messages

  
  //triggers when student open the chat(everytime)
io.on("connection", (socket) => {
  console.log("A browser connected");


  //                                   PRIVATE CHAT
  socket.on("joinPrivateRoom", (privateRoom, callback) => {
    socket.join(privateRoom);

    const allMessages = fs.existsSync(chatHistoryPath)
      ? JSON.parse(fs.readFileSync(chatHistoryPath, "utf-8"))
      : [];

    const chatHistoryForRoom = allMessages.filter(
      (msg) => msg.room === privateRoom
    );
    socket.emit("oldMessages", chatHistoryForRoom);

    if (callback) callback();
  });



  socket.on("privateMessage", (data) => {
    const { room, fromSenderId, toReceiverId, message } = data;

    const newMessage = {
      kind: "private",
      room,
      fromSenderId,
      toReceiverId,
      message,
      time: new Date().toLocaleTimeString('en-US',{
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
    };

    const allChats = fs.existsSync(chatHistoryPath)
      ? JSON.parse(fs.readFileSync(chatHistoryPath, "utf8"))
      : [];

    allChats.push(newMessage);
    fs.writeFileSync(chatHistoryPath, JSON.stringify(allChats, null, 2));

    io.to(room).emit("receivePrivateMessage", newMessage);
  });

  
  //                     GROUP CHAT

    // Store name & rooms for this socket
  socket.studentName = null;         //Initially set to null because the server doesn’t know the students name.
  socket.joinedGroups = new Set(); // To prevent joining same group


  socket.on("joinGroupRoom", ({ room, name }, callback) => {
    // console.log('join:',room,name);
    
    socket.studentName = name;        // store student's name to the socket
    socket.joinedGroups.add(room);    // track joined room(prevent duplicates)
    socket.join(room);

    //To get old messages
    const allMessages = fs.existsSync(chatHistoryPath)
      ? JSON.parse(fs.readFileSync(chatHistoryPath, "utf8"))
      : [];

    const chatHistoryForRoom = allMessages.filter(
      (msg) => msg.room === room && msg.kind === "group");

    socket.emit("oldMessages", chatHistoryForRoom);

    // Notification mesage to others in the group when someone joined
    socket.to(room).emit("groupNotification", `${name} joined`);

    if (callback) callback();
  });

  // Send group message
  socket.on("groupMessage", ({ room, fromStudentId, message }) => {
    const students = loadStudents();
    const sender = students.find((s) => s.id === Number(fromStudentId));

    const senderName = sender ? sender.name : "Unknown";

    const newMessage = {
      kind: "group",
      room,
      fromStudentId,
      senderName,
      message,
      time: new Date().toLocaleTimeString('en-US',{
       hour: 'numeric',
       minute: '2-digit',
       hour12: true
      })
    };

    const allChats = fs.existsSync(chatHistoryPath)
      ? JSON.parse(fs.readFileSync(chatHistoryPath, "utf8"))
      : [];

    allChats.push(newMessage);
    fs.writeFileSync(chatHistoryPath, JSON.stringify(allChats, null, 2));

    io.to(room).emit("receiveGroupMessage", newMessage);
  });



//                           DISCONNECT

  socket.on("disconnect", () => {
    console.log("Student disconnected");

    if (socket.studentName && socket.joinedGroups.size > 0) {
      socket.joinedGroups.forEach((room) => {
        socket.to(room).emit("groupNotification", `${socket.studentName} left`);
      });
    }
  });
})


// Use Error handling Middleware
app.use(errorHandlingMiddleware)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {                   // instead of 'app.listen',we have to write server.listen(Because we should start server not app). 
                                              // if we dont write server.listen, socket.IO wont work
  console.log(`Server is running at http://localhost:${PORT}`);
})
