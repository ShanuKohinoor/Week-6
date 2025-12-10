//                                           Middleware

// A function between request and response, that can check,modify or stop before it reaches the final handler.
//   In Express:- app.use(middlewareFn)
//   In Socket.IO:- io.use(middlewareFn)



//                                  Security middlewares(Express)
//                                  ----------*--------*--------

//  These are used to protect the app.
//  1. Helmet:-It adds security headers to your HTTP responses.
//       * These headers protect your app from common attacks like:-
//            - XSS (Cross-Site Scripting) --> attackers injecting malicious scripts.
//            - Clickjacking --> attackers tricking users into clicking on hidden things.
//                  const helmet = require('helmet');
//                  app.use(helmet()); // adds security headers automatically.
//      * Acts like an helmet(protective shield on the HTTP responses).

//  2. Cors(Cross-Origin Resource Sharing):-
//        * Normally by default, a browser blocks requests from one site to another (its for the security). 
//        * Eg:- If the frontend (http://myapp.com) ) wants to call the backend API (http://api.myapp.com)
//                 - Without CORS:- Browser blocks it.
//                 - With CORS :- Allow trusted domains to access the server.
//                           const cors = require('cors');
//                           app.use(cors({ origin: 'http://myapp.com' })); // only allow myapp.com

//  3. Express-rate-limit:- Limits / Stops people from making too many requests in a short time.

//           * Protects against brute force attacks
//           *   Eg:- Allows only 10 requests per minute per user.
//                      - If it is more than 10,block it for that time.

//                  const rateLimit = require('express-rate-limit');
//                  const limiter = rateLimit({
//                    windowMs: 60 * 1000,       // 1 minute
//                    max: 10 });                // maximum 10 requests/minute
//                  app.use(limiter);


//  4. cookie-parser + JWT check :- Reads cookies and validates authentication tokens.
//        *  cookie-parser :- reads cookies from the browser and makes them available in req.cookies.
//        *  JWT check :_ validates if the user’s token (stored in cookie) is real and not expired.

//     When they are together:
//        Parse cookies :- get token.
//        Verify token :- confirm the user is logged in.

//                 const cookieParser = require('cookie-parser');
//                 app.use(cookieParser());
//                 app.get('/protected', (req, res) => {
//                   const token = req.cookies.token;   // get token from cookie
//                 });



// In simple words:-
//          Helmet :- Adds safety helmet (headers).

//          CORS :- Controls who can enter your server.

//          Rate limit :- Stops spammy users/bots.

//          Cookie-parser + JWT :- Checks if user is logged in securely.




//                                         Utility middleware
//                                         --------*--------

//  It is the helper middleware for the development of the app easier by handling the common task.

//  1. express.json():- Reads incoming requests that have JSON data (like { "name": "Shan" }).
//               * Converts them into a JavaScript object in req.body.

//                       app.use(express.json());
//                       app.post('/user', (req, res) => {
//                         console.log(req.body); // { name: "Shan" }
//                         res.send("User received");
//                       });

//  2. express.urlencoded():- Reads incoming requests from HTML forms.
//              app.use(express.urlencoded({ extended: true }));

//  3. morgan (Logger) :- Logs details of every request like method, URL, status, time.
//             * Very helpful for debugging.

//                       const morgan = require('morgan');
//                       app.use(morgan('dev'));
//             * Morgan is a request-logging middleware for Express. 
//             * Its main purpose is to help developers see what is happening with HTTP requests in their app.
//             * Logs every request coming to your server (like GET, POST, etc.).
//                     - Shows useful info for debugging and monitoring, such as:
//                     - HTTP method (GET, POST, etc.)
//                     - Requested URL (/, /style.css, /admin)
//                     - Status code (200, 404, 500, etc.)
//                     - Response time (ms)
//                     - Response size (bytes)

// 4. Compression is a middleware that makes the server’s responses smaller before sending them to the client.
//            * Smaller responses --> faster loading time
//            * Most common method is gzip compression(It is a compression algorithm that reduces the size of files or data.).
//                    - Commonly used to compress web data (HTML, CSS, JavaScript, JSON) before sending it from the server to the browser.
//                    - smaller file :- faster downlosad for user
//                    - less data transferred over internet.
//                    - automatically decompress.


//                  const express = require('express');
//                  const compression = require('compression');
//                  const app = express();
//                  app.use(compression());           // Use compression middleware
//                  app.get('/', (req, res) => {
//                     const data = "Some really long text or JSON data...";
//                     res.send(data); // will be compressed before sending
//                  });
//                 app.listen(3000, () => console.log("Server running on 3000"));




// 5. multer (for file uploads):- Middleware that helps upload files (like images, PDFs) from forms.

//                      const multer = require('multer');
//                      const upload = multer({ dest: 'uploads/' });

//                      app.post('/profile', upload.single('avatar'), (req, res) => {
//                          res.send("File uploaded!");
//                      });


//  In simple words:-

//            express.json() -->  handles JSON data.

//            express.urlencoded() --> handles form data.

//            morgan --> logs requests.

//            multer --> uploads files.



//                             Security Middleware                                     Utility Middleware
//                             ---------*---------                                     --------*---------
// Use                         * Protect the app	                                  * Make app development easier
// Examples             	   * Helmet, CORS, Rate-limit, JWT check	              * express.json, urlencoded, morgan, multer
// Focus	                   * Safety from attacks	                              * Parsing, logging, uploading
// Real life example     	   * Security guards & safety systems	                  * Helpful office staff













//                                         dotenv
//                                         ------

//  It is a Node.js package.
//   Manage environment variables in a .env file securely.
//   It loads environmental variables from .env to process.env
//  we can access it with process.env
//  wont expose secret key.
//  Used for configuration management (API keys, DB credentials, secrets).

//  Eg:- 
//          PORT=5000
//          DB_USER=admin
//          DB_PASS=supersecret
//          JWT_SECRET=myjwtkey123

//      require('dotenv').config();   // Load .env file into process.env

//      const express = require('express');
//      const app = express();

//     const PORT = process.env.PORT || 3000;   // Use value from .env, fallback 3000
//     const DB_USER = process.env.DB_USER;
//     const DB_PASS = process.env.DB_PASS;

//    console.log("Database user:", DB_USER);

//     app.listen(PORT, () => {
//      console.log(`Server running on port ${PORT}`);
//     });




//                dotenv (store secrets in .env file)
//                                | 
//                                |
//                                v
//                      Access using process.env
//                                | 
//                                |
//                                v
//                 Prevents secret keys from becoming public
//                                | 
//                                |
//                                v
//              Keep .env in .gitignore (do not upload to GitHub)
//                                | 
//                                |
//                                v
//            Makes project flexible for multiple environments
//                   (development, testing, production)


// Uses:- 
//    * Security
//         - Sensitive data like (API keys, DB passwords, JWT secrets) wont write directly inside the code.
//         - So, If we push the code to GitHub, secrets will not be exposed if it stored in .env.
//    * Convenience
//    * Flexibilty
//  key wont become public. So it will be safe. if we push in like Git hub
















//                                      CLI(Command Line Interface)
//                                      ---*---------*---------*---

// Instead of clicking buttons in the browser,here typing commands in the terminal.
// It allows direct interaction with OS or application.
// Commonly used for running scripts, managing files, and deploying(making application live or available for others to use) applications.





//                                         process.argv
//                                         ------*------

//   In Node.js, process.argv is an array that stores everything we typed in the terminal.
//   When we type something in the CLI, Node.js takes everything we typed and puts it inside a list / array called process.argv.
//   Eg:-If we type
//                node app.js 50 + 8  or
//                node app.js hello world

// 



//                     when we type CLI in terminal 
//                                |
//                                | node calculator.js 50 + 8
//                                |
//                                v
//                      Node.js captures this input 
//                                |
//                                | and argv put this input inside an array 
//                                v
//                       process.argv array
//                    ________________________________
//                   |                                |
//                   | [0] "node path"                |
//                   | [1] "file path (calculator.js)"|
//                   | [2] "50"                       |
//                   | [3] "+"                        |
//                   | [4] "8"                        |
//                   |________________________________|
//                                | 
//                                |
//                                v
//                   program reads values 
//                      num1 = process.argv[2] → 50
//                      operator = process.argv[3] → +
//                      num2 = process.argv[4] → 8
//                                | 
//                                |
//                                v
//                          Program runs 
//                                | 
//                                |
//                                v
//                       Result = 50 + 8 = 58

