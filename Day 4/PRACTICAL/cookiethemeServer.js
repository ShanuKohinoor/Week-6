
//             

     const express = require ("express");
     const app = express();

     const cookieParser = require("cookie-parser"); // Middleware to read cookies
     app.use(cookieParser());

    // Route(Homepage)
     app.get("/", (req,res) => {
      res.send(`
         <h2> Welcome! </h2>
         <p> Open the console and run <code> document.cookie</code>.</p>
         `)
     })

     // Route(Set a cookie)
     app.get("/set-cookie", (req,res) =>{
      res.cookie("userToken", "abc123", {path: "/"}); // set cookie for server
      res.send("Cookie set! Go to / and check document.cookie")
     })

     app.listen(3000,() => console.log("http://localhost:3000"));
















      //  * We can use middleware named cookie-parser.
      //  * If user completed login,and if it is authenticated,create cookie, send with response to the browser.
      //  * Install cookie parser.


      // How cookie works here?
      //  *  When we open app.listen 3000, Node.js runs this. 
      //  *  When we type http://localhost:3000/set-cookie, server runs the given code and sends 
      //        back a cookie( userToken=abc123.) and a message(Cookie set).
      //  *  When we type localhost:3000/ again,we can see 'userToken=abc123'. That means cookie we got from server is stored in the browser and 
      //        with every request browser send that cookie to the server.
