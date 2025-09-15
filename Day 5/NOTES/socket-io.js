 //                                               Socket-IO


 // It is a library used for real time communication b/w client and server.
 // It allows birectional event based communication( Messages can flow simultaneously in both direction.)
 //      * Clients can send events to the server.
 //      * Server can send events to the client.
 //      * Both can listen for specific events.




 // With websocket alone, 
 //    * 1. Must handle disconnect and reconnects manually.
 //    * 2. No built-in way to send different types of events (only get raw messages).
//     * 3. No support for groups/rooms (like chat rooms).
//     * 4. If a browser or network doesn’t support WebSockets, it fails.


// With the help of Socket IO, we can solve these, by adding features on top of websockets.

  //  * 1. Automatic reconnection
 //       - If internet disconnects,socket IO automatically reconnects when back to online.

 //  * 2. Event based communication
 //       - Instead of raw text,we can define events like Chat, image, typing
 //           socket.emit("chat", "Hello");
 //           socket.on("chat", (msg) => console.log(msg));



 //  * 3. Broadcasting, Rooms, Namespaces
 //      - Broadcasting ( WhatsApp status --> If we post it once, and everyone sees it).
 //      - Room (WhatsApp group --> Only people inside that group see the messages).
 //      - Namespace (Different apps inside WhatsApp --> (Chats, Calls, Communities). Each works separately).

 //  * 4. Fall back long polling
 //       - If WebSockets don’t work, Socket.IO falls back to HTTP long-polling, so our app still works.  


 //  * Middleware (security check)
 //      - It checks if the user is allowed to connect (maybe with a password or token).





// By default, Socket.IO is broadcasting messages to everyone.

// But we can make it a 1-to-1 private chat (between only two users) by changing the logic:-

//  * We store which socket belongs to which user.
//  * Then instead of io.emit(...) (send to all), we use io.to(targetSocketId).emit(...) (send only to that one person).

























 // In simple words:-
//  WebSocket is like a car. It moves we from A to B.
//     * can only send/receive plain text messages.


// Socket.IO is like  a car + GPS + auto-refuel + emergency kit. It does everything extra so we don’t get stuck.
//      * We can use named events (like 'chat', 'typing', 'joinRoom').


