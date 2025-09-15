        
        // Import
        const express = require('express')
        const http = require('http')    //  The http module can create a server that listens to requests from browsers.
                                        // Socket.IO needs a raw HTTP server to attach to, which is why we import this.
        const path  = require('path')

        const {Server, Socket} = require('socket.io')  // Imports the Server class from Socket.IO.


        // create app and server

        const app = express();
        const server = http.createServer(app) // http.createServer() creates a raw HTTP server.
                                                // Pass the Express app (app) so that the server knows how to handle requests.
        const io = new Server(server)  // This creates a Socket.IO server and attaches it to the HTTP server.
                                       //  io is the Socket.io server instance.
                                       // io will be in the top of http server and will handle all real-time WebSocket connections.


      // serve static client files from public folder
       app.use(express.static(path.join(__dirname,'public')))    // express.static is the built-in middleware use dto serve static files(like HTML,CSS,Javascript)   
       
       
       // When a new client connects(browser tab,mobile app etc), this function will run
  io.on('connection',(socket)=>{     // This is an EventListener,, which runs when a new client connects to the server using Socket.IO
                                          // With the help of '.on' listen to the event.
                                          //  'socket':- When new client connected,Socket .io will create a new socket object for that client.
                                          //        which is the unique connection b/w the client and the server.
          console.log('A new user connected:', socket.id);   // Each socket will get uniques ID.
                                                               //This will help the server to know
                                                               //   * which user sent message,
                                                               //   * how to send message back to that user alone,
                                                               //   * or broadcast to everyone except that user.


     // USER JOIN: Client tell server its name
         socket.on('join',(username)=>{           // 'join':- another EventListener. When new client joins send a join with their name.
            socket.username = (username || 'Anonymous').trim()    // if there is a name will take username, otherwise will take anonymous(will result like:-null,undefined/empty)


   //   Send a welcome message only to the connecting socket(optional)
     socket.emit('welcome', { message: 'Welcome to the chat', username: socket.username })          // 'welcome' is the event name

    
    // Notify everyone except new joiner

        socket.broadcast.emit('user-joined',{    // user-joined(event emitter) send messages to everyone except new user
                                                // broadcast:-Helper with helps to target every other socket except new user
                                                // .emit('user-joined', payload):-emit sends a named event ('user-joined') with a payload object. 
                                                //      * All  the other users except new user will get this payload(which includes id,username and time)
          id: socket.id,
          username: socket.username,
          time : new Date().toISOString()
        })
                                              
          console.log(`${socket.username} joined ${socket.id}`);
     })


    // CHAT MESSAGE: Client sends chat message to the server
         socket.on('chat-message',(text)=>{
           const msg = {
           id :socket.id,
           username: socket.username,
           text : String(text),
           time: new Date().toISOString()
         }

    //   Broadcast message send to all other users including the new user
           io.emit('chat-message',msg)
           console.log('Message:',msg);
       })
 })





        const Port = process.env.PORT || 3000;
        server.listen(Port,()=>{
            console.log(`Server is running on http://localhost:${Port}`)
        })
    