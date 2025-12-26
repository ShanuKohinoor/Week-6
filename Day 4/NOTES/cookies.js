//                          Cookie vs Session 
//                          -----------------



// Cookie:- Store user data on the client and is sent with every request.
//           - A small piece of data(4 KB) stored on the client’s browser. The server sends cookies, 
//                 and the browser saves them, then sends them back with every request.
//        * Data:- Stored in the browser.
//                 -session ID kept in the browser.
//                 - User specific information will be in inside the cookie.
//        * Size:- Limited in size
//        * Security :- Less secure(Since data is in browser,user can see and modify it)
//        * Use case :- Remember login detail.
//        * Eg:- 
//             Set-Cookie: user=Shanu; expires=Fri, 31 Dec 2025 23:59:59 GMT; HttpOnly
//                   -  Stored in browser and sent with each request.
//        *  Cookies stored in a special place in browser. When we request next time ,
//                 cookie will take from this storage place and will give to server.
//        * Stored as key-value pair.
//        * Both client(browser) and server can create cookie.
//                - Server side cookies:- Along with response
//                - Client side cookies:- document.cookie = "  "


//  Is it safe ?
//  Not safe. Because there is a chance of risks like  has a chance to happen. 
//                   Like XSS attack ,CSRF attack. 
//  To overcome this, we have some solutions by giving some attributes.

//  Attributes:-
//   1. Secure:- To ensure cookie send by Https only
//                      * In both client and server.
//   2. Http only :- Means, this cookie can't access  Javascript.
//                      * only server can read.  Client can read or change it.
//   3. Samesite :- if request from another site, this will check and wont accept.
//                      * In both client and server.
//                      *controls whether cookies are send on cross site request.
//                          - Same :- only for same site.
//                          - Strict :- both same and  safe cross-site.
//                          - None :- send everywhere.





// Session:- Store data on server and uses a session ID to link client to the server side state.
//           - A way to store information on the server-side for a particular user, 
//                 and usually linked to the client through a session ID (stored in a cookie).
//        * Data:- Stored in the server memory or data base.
//        * Size :- Depends on server memory,can store large datas.     
//        * Security :- More secure(Since data stored in server,and user has only have session ID. It is secure.)     
//        * Use case:- Temporary login state(until user close or logout). 
//        * Eg:- 
//              req.session.username = "Shanu";
//                  - Stored on server(only a session ID is sent to the client).
 



// Tips to remember:-
//              C = Cookies --> Client
//              S = Session --> Server









//                       Authentication  v/s  Authorization


//       Authentication                                       Authorization
//      ---------------                                       -------------
// * To verify user's identity                       * To check what the user is allowed to do.
// * It can be done by :-                            * It can be done by :- 
//     - Username + Password                                   - by checking roles/ permission stored in DB/JWT payload.
//     - Tokens(JWT)
//     - OAUTH(Google,GitHub login)
// * In Node.js ,use libraries like:-               * In Node.js, use middleware to check roles like:-          
//     - passport.js, JWT or custom logic                    -isAdmin,isUser
// * Happens before Authorization                       * Happens after Authentication
//     - Check login or token                              - Check role/permission
//     - Eg like:- Are you a valid user?                   - Eg:- What can you do?

// Eg:-                                             *    Eg:-
//    Authentication login route                       Authorization
// app.post('/login',(req,res)=>{                          function isAdmin(req,res,next(){
//  const {username,password} = req.body                      if (req.user && req.user.role === 'admin'){
// if (username ==='admin' && password === '1234'){           next()  
    // Authenticated                                           // Authorized
//     res.send('You are logged in')                        } else {
//    } else {                                                  res.status(403).send("Access Denied");
//    res.status(401).send("Invalid credentials");                  // Forbidden (authenticated but not allowed)
                        // Not authenticated               }
//    }                                                  }
//})                                                      // Protecting a route
//                                                           app.get('/admin', isAuthenticated, isAdmin, (req, res) => {
//                                                            res.send('Welcome Admin! You can manage the system.');
//                                                           })
