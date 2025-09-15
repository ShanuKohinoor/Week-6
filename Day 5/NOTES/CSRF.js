//                           CSRF (Cross-Site Request Forgery).


// CSRF is an attack where a malicious site tricks a user’s browser into performing unintended actions on a trusted site using the user’s authenticated session. 
//    It’s prevented using CSRF tokens, SameSite cookies, and proper request validation.
// In simple words,
//                   if we logged bank site in one tab
//                                 |
//                                 |
//                                 v
//                  At the same time, we open malicious site in another tab
//                                 |
//                                 |
//                                 v
//              Malicious site secretly sends request to our bank site by using already active login session(include cookies)
//                                 |
//                                 |
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
//     * Then browsers won’t send cookies( with requests )coming from other sites.


// 3. Double Submit Cookies
//     * Send the CSRF token in both cookie and request body.
//     * server checks both.
//     *  How?
//          - The server sets a CSRF token inside a cookie.
//          - When the client sends a request (like submitting a form), it sends the token twice:

//               1. Automatically in the cookie (browser adds it).
//               2. Manually in the request body or headers.

//          - On the server side, both values must match.
//          - if they don’t, request is rejected.


// 4. Re-authentication for sensitive actions
//     * Eg:- Enter password again before transferring money.





// Difference b/w CSRF & XSS

//   CSRF: Tricking the browser by sending a valid request.

//   XSS: Injecting malicious JavaScript code into a site.