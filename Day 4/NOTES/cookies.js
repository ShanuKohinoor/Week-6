//                          Cookie vs Session 
//                          -----------------



// Cookie:- Store user data on the client and is sent with every request.
//           - A small piece of data stored on the client’s browser. The server sends cookies, and the browser saves them, then sends them back with every request.
//        * Data:- Stored in the browser.
//                 -session ID kept in the browser.
//        * Size:- Limited in size
//        * Security :- Less secure(Since data is in browser,user can see and modify it)
//        * Use case :- Remember login detail.
//        * Eg:- 
//             Set-Cookie: user=Shanu; expires=Fri, 31 Dec 2025 23:59:59 GMT; HttpOnly
//                   -  Stored in browser and sent with each request.


// Session:- Store data on server and uses a session ID to link client to the server side state.
//           - A way to store information on the server-side for a particular user, and usually linked to the client through a session ID (stored in a cookie).
//        * Data:- Stored in the server memory or data base.
//        * Size :- Depends on server memory,can store large datas.     
//        * Security :- More secure(Since data stored in server,and user has only have session ID. It is secure.)     
//        * Use case:- Temporary login state(until user close or logout). 
//        * Eg:- 
//              req.session.uiername = "Shanu";
//                  - Stored on server(only a session ID is sent to the client).
 