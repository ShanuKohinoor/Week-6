


  const {WebSocketServer} = require('ws')

  const wss = new WebSocketServer({port:3000}) // Create WebSocket server on port 3000

  console.log('WebSocket server is running on ws://localhost:3000');

  wss.on('connection', (socket)=>{    //  When new client connects, in server,
                                      //    Here a socket create 
                                      //    every new client get a socket object
                                      //    socket:- connection b/w client <----> server
    console.log('New client connected');

  // Recieving messages from client
      socket.on('message',(msg)=>{       // socket.on:- eventListener for the messages from the client.
      console.log('Client says:', msg.toString());

  //   Reply back
      socket.send('Server: Hello, I got your message')     // Reply only to the single client
    
  //   Reply back to all clients
     for(const client of wss.clients){                //  Will recieve msg to all other clients(Browser B,Browser C etc). 
    // client.readystate(we can add ready state to know the status(optional))
      client.send(msg.toString())                     //   If we write socket.send, Browser A also recieves the message.         
     }
      
  })

  // When browser disconnect

  socket.on('close',()=>{
   console.log('Client disconnected');
   
  })
    
  })
