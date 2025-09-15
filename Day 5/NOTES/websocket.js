//                                   Real time communication
//                                   -----------------------

const { WebSocketServer } = require("ws");

//  It is the instant/live updates b/w browser and server, without refreshing or asking again and again.
//  Normally, if browser send a HTTP request,server responds. 
//      * Nothing happens after that, even there is change in the server.
//      * Client wont know, unless it keep asking polling.
// But in Real-time communication, if something happens or any change in the server, server immediately notifies all the connected clients(browsers)
//      * Eg:- Chat apps (WhatsApp, Messenger), Live score updates, Online multiplayer games.
// Node is perfect for handling many real-time connections (like chat, games, notifications).





//  To communicate a client & server,need protocol.
//                Protocol means set of rules.
//  In web, normally we use http protocol.
// * This is 'Half duplex' communication. That means, communication will work to one direction at a time.
//      - Either a client send request to the server or a server give response to the client.
//      - So, this is not suitable for a chat(real time communication).
// *  HTTP is a stateless protocol. That means , if client send a request to server.There will create a communication b/w client and the server.
//      - Once the server give response, the communication will disconnect automatically. 
//      - Server wont keep this. 
//      - When we request next time, new connection will open.
//      - This is not suitable for a chat. 

//                           request
//                client ---------------> Server
//                       <--------------
//                         response

// So, websocket helps to overcome this. Web socket helps for realtime communication.



//                                          Web socket
//                                          ----------
// It is a special protocol( somewhat like HTTP), that allows a persistant, two way communication between browser and server.
// It is a protocol used for real time communication. Eg:- Chat application.
//    Like,Eg 1:- if we chat with a friend in whatsapp, both can view the chat at same time.
//         Eg 2:- if we play a game with another person in online,opponent can see  our move at the same time. 
// This happens with the help of web socket.
// Once the connection is open,both sides can communicate each other without waiting for a request.
// It is the foundation for real time apps. Because,
//      * In real time communication, client doesnt want to keep on asking any new updates.
//      * This web socket helps the server to push the updates instantly.
// No Event-based communication.
// We can send string and binary datas.

// Every websocket connection has its ready state property showing its status:-
//         0 --> CONNECTING (still opening)
//         1 --> OPEN (ready to send / recieve)
//         2 --> CLOSING (in the process of closing)
//         3 --> CLOSED (no longer usable)


// This is 'Full duplex'. Can communicate both client and server at a time. So, it is suitable for real time communication.


// Before the introduction of websocket, we use 'Polling'.
// Polling:- Keep on asking about the updates. 
//    To overcome this we used Push technology(send the result once any response is present).





//  How createS two way path?

//    1. HANDSHAKING:-

//                                HTTP Request(handshaking)
//                       --------------------------------------->
//               Browser ---------------------------------------> Server
//                       <--------------------------------------
//                       101 status(switching HTTP to Websocket)   

//    *  Browser sends request
//           * Connection starts with this HTTP request.
//           * But inside that request will have some special headers.
//               - That datas are upgarde, connection etc.

//                   upgrade: websocket
//                   connection: upgrade

//    * Server response with 101 status code. Which means, switching from HTTP to websocket.
//  This procedure is known as Handshaking.


//  2. FULL DUPLEX CHANNEL
//        * Will get websocket


//                            First half duplex/ HTTP
//                                       |
//                                       |
//                                       v
//                          HAND SHAKING COMMUNICATION(with special header)
//                                       |
//                                       | After the handshake, the connection is upgraded to WebSocket.
//                                       |   Connection opened
//                                       v
//                             Full duplex/ Websocket
//                                       |
//                                       |  Websocket channel opened
//                                       v
//                   Now both client and server can send messages anytime

// Broadcasting:- Server send to multiple clients
// In http:- request and response. 
//     * Its like sending letter.
// Web socket:- But in websocket, no need of request and response. It is persistant message because their is connection created.
//     * it is always open until it closed. So, can communicate anytime.
//     * web socket:- Native push.
//     * Its like phone calls




//  How to create websocket server inside Node.js?
//  * For that we have to use package named 'ws'
//               - npm install ws

//  * Then take class from the package named  'websocket server'(which is available inside this package)
//              - const {WebSocketServer} = require('ws')

//  * With this class , we can create a server
//              - const wss = new WebSocketServer({Port:3000})
//        * 'wss' is an instance created in the variable


//                                    npm install ws
//                                       |
//                                       |
//                                       v
//                         const {WebSocketServer} = require('ws')
//                                       |
//                                       |
//                                       v
//                        const wss = new WebSocketServer({Port:3000})


//  Hand shaking happens with inbuilt 
//              const ws = new WebSocketServer('ws://localhost:3000')
//    whwn we write this code, browser will create handshake.
//       * 'ws' is an object in the client side.
//       * where as 'wss' is the browser instance.



//                            First Half Duplex / HTTP
//                                       |
//                                       |
//                                       v
//                       Client requests WebSocket handshake
//                     (special HTTP header: Upgrade: websocket)
//                                       |
//                                       |   const ws = new WebSocketServer('ws://localhost:3000')  
//                                       v
//                         Server (Node.js) needs 'ws' package
//                           - npm install ws
//                           - const { WebSocketServer } = require('ws')
//                           - const wss = new WebSocketServer({ port:3000 })
//                                       |
//                                       |
//                                       v
//                 Handshake happens --> Server responds with 101 status
//                (Switching Protocols --> Connection Established)
//                                       |
//                                       |
//                                       v
//                          Full Duplex / WebSocket Channel Opened
//                                       |
//                                       |
//                                       v
//               Now both Client & Server can send/receive messages any time
//                         - wss.on('connection', (socket) => { ... })
//                         - socket.on('message', (msg) => { ... })
//                         - socket.send('response')
//                                       |
//                                       |
//                                       v
//                        Continuous two-way communication







// How to communicate?
//  Unlike HTTP, websocket doesnt have get,post etc methods. Instead of that it have some events and messages.

//                                            EVENTS
//                                            ---*---

//                                  Client (Browser WebSocket)                               Server (Node ws)
//                                  -------------------------                                ----------------

// Connection established           * open (on the client’s ws)                           * connection (on wss, gives 
//                                                                                          you a socket object)

// Message received                 *  message (on the client’s ws)                       * message (on the per-client socket)

// Connection closed                * close (on the client’s ws)                          * close (on the per-client socket)

// Error occurred                   * error (on the client’s ws)                          * error (on socket and/or wss)

// Heartbeats                       * No ping/pong events in browser;                     * ping, pong (on socket); 
//                                        handled internally                                  you can also call socket.ping()
// * if no data is exchanged
//  for long time,automatically 
//  disconnect & close)
// * So use heartbeats.
// * Heartbeats (ping/pong) 
//  prevent this by proving the 
//  connection is alive.


// * Handle                       * ws.addEventListener('open'),()=>{                    * wss.on('connection',(socket,req)=>{
//                                   console.log('client:open(connected to server');          console.log('Server: connection(client joined');
//                                 })                                                      })






//  How to send messages?

//  with the help of two methods named 'send(data)' and 'close()', we can send messages.