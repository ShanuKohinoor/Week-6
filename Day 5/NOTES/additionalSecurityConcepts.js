//                              Additional Security Concepts
//                              -------------*--------------

// It is an extra layer of protection.

//  When building web application, users data and action is protected with basic security like password or
//       login session. But this wont help to protect data theft,malicious scripts or unauthorized actions.
//       To prevent these types of attack we can use extra layer of protection with Additional security concepts.


//   There are 4 Additional Security Concepts. They are:-

//      _______________________________________________________________________________________________
//     |                               |                                |                              |
//     |                               |                                |                              |
//     v                               v                                v                              v
//   HTTPS                       Secure Headers                       CSRF                      Input Sanitization 
// (Protects data in transit     (Protects the browser & server)   (Protects user actions)     (Protects app from harmful input)


  
//                                  1. HTTPS
//                                  --------
// HTTPS (Hypertext Transfer Protocol Secure)
//    * It is a secure version of HTTP.
//    * Which encrypts all data between server and browser.
//    * It helps to prevent attackers from seeing sensitive informations like password,credit card numbers or tokens
//    * With the help of SSL/TLS certificates,we can lock the data.
//            - when it locks,browser shows a padlock icon (https://)
//    * Eg:- When we use HTTPS on sites like our bank or Gmail, hackers cannot see our password.
//  * Real-life Example:- Hand over password through a sealed envelope instead of shouting it out loud.




//                               2. Secure headers
//                               -----------------
//  *  Which is the extra information sent by browser with HTTP responses.
//  * which tells the browser how to safely handle the content.
//  * It helps to protects against the attacks like:-
//           - XSS (malicious scripts)
//           - Clickjacking (tricking users into clicking hidden buttons)
//           - Content sniffing
//  * with the help of libararies like helmet in Node.js add these headers automatically and prevent these attacks.

// Eg:-   
//               const helmet = require('helmet');
//               app.use(helmet());
//  * Real-life Examkple:- website wears a protective helmet to block attacks




//                         3. CSRF (Cross-Site Request Forgery)
//                         ------------------------------------


// CSRF is an attack where a hacker makes our browser do unwanted actions
//       on a website we are already logged into, without our knowledge.
// It works because our browser automatically sends cookies (like session tokens) to the website.

// So, the trusted website thinks we made the request, even though it was actually triggered by the hacker.//    * It is prevented using CSRF tokens, SameSite cookies, and proper request validation.

// For example,
//                   if we logged bank site in one tab
//                                 |  * Browser get a session cookie
//                                 |      and login(authenticated)
//                                 |  * if we forget to logout,cookie stays active in the browser
//                                 v
//                  At the same time, we open malicious site in another tab(which is controlled by hacker)
//                                 |
//                                 |
//                                 v
//              Malicious site secretly sends request to our bank site by using already active login session(include cookies)
//                                 |
//                                 |  * Our browser automatically attaches the bank cookie
//                                 v
//                  Bank accept that request without knowing its an malicious site
//                                 |
//                                 |
//                                 v
//                   And send money to the attacker




// How to prevent this?

// 1. CSRF Tokens (Anti-forgery tokens)

//      * Server sends a secret token with each form/page.
//      * The client must send it back with requests.
//      * So Attackers can’t guess it.

//  Eg:-   <input type="hidden" name="csrfToken" value="RANDOM_SECRET_123">



// 2. SameSite Cookies

//     * Mark cookies as SameSite=strict or lax.
//     * Browsers don't send cookies with requests from other sites, preventing CSRF.

// 3. Double Submit Cookies
//     * Send the CSRF token in both cookie and request body.
//     * server checks both.
//     *  How?
//          - The server sets a CSRF token inside a cookie.
//          - When the client sends a request (like submitting a form), it sends the token twice:

//               1. Automatically in the cookie (browser adds it).
//               2. Manually in the request body or headers.

//          - On the server side, both values must match. Server verifies the match
//          - if they don't, request is rejected.


// 4. Re-authentication for sensitive actions
//     * Eg:- Enter password again before transferring money.





// Difference b/w CSRF & XSS

//   CSRF: Tricking the browser by sending a valid request.
//           - The attacker does not run code inside our website
//           - They just force a request to happen

//   XSS: Injecting malicious JavaScript code into a site.
//           - The code runs in our browser
//           - It can steal cookies, passwords, or redirect us
//           - Here, the browser is executing attacker's code.





//                               4. Input Sanitization
//                               ---------------------

//  * Which helps to clean user input before using them in app or store in database.
//  * with help of libraries like 'validator' or custom code we can escape special characters. 
//       Thus it helps to prevent  attackers from injecting harmful scripts(XSS) or commands (SQL/NoSQL injection)

//  * Eg:- 
//        const validator = require('validator');
//        const safeInput = validator.escape(req.body.username);      // removes harmful characters

//     Real life example:- like washing vegetables before eating to clear dirt and poison
