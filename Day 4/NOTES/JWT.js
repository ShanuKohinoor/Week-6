//                                    JWT

// JWT(Json web Token) :- All data in the token itself
// Its URL-safe string used to prove identity(authentication) and carry small piece of information(claims)
// Server creates JWT.
// Stateless:- server doesn’t need to remember anything. No session store needed also.
// Can be used across different services/APIs easily.



//                                  From server to browser
//                                           |
//                                           |
//                                           |
//                                           v
//                                       Create token
//                                           |
//                                           | Token to user/Frontend by two ways:-
//                 __________________________|___________________________
//                |                                                      |   
//                v                                                      V
//            Cookies                                                 Json object





//                                  From browser to server
//                                           |
//                                           |
//                                           |
//                                           v
//                                           |
//                                           | Token to server/Backend by two ways:-
//                 __________________________|___________________________
//                |                                                      |   
//                v                                                      V
//            Cookies                                                Http Header(Authorization)









// Parts of JWT
// XXXXX.YYYYY.ZZZZZ
// it will be look like this <base64url(header)>.<base64url(payload)>.<signature>

// First part:-Header(Algorithm / Token type)
//       * Meta data:-For signing use algorithm in header
//             - HS256- with one secret key for create and verify
//             - RS256- 
//                  * private key:- sign
//                  * public key:- verify              

// Second part:- Payload
//      * actual data/claim
//      * Payload claims like Id,email,expiry
//      * Claims in three types
//            - 1. Registered claims (Pre defined standard keys)
//                      * iss  :- who is the issuer
//                      * sub  :- what the subject
//                      * exp  :- expired time
//                      * iat  :- issued at
//                      * aud  :- who the token for(audience)

//            - 2. Public claims (Custom claims agreed by everyone used that system)
//                      * { 'name', 'role'}

//            - 3. Private claims 
//                      * Between two customs
//                      * Community id:- Eg:- { commId : '123' }

// Third part:- Signature
//      * Created with hashing header and payload 
//      * Hash with secret key
//      * This prevent pampering



// How to create?
// Jsonwebtoken package used for this by installing that

//  when we call, jwt.sign(1,2,3):-
//  1. token will create
//     * parameters:-
//          1. Payload
//          2. Secret key
//          3. Options
//                 - expires given for short period

//  2. verification(token verify)
//     jwt.verify(token,secretkey,[options,callback])




//                          When user submit credential to POST/ login
//                                           |
//                                           |
//                                           |
//                                           v
//                                Server verifies credentials
//                                           |
//                                           |
//                                           |
//                                           v
//                              Creats JWT(signed with JWT_SECRET)
//                                           |
//                                           |
//                                           |
//                                           v
//                        Server sends token to the client inside a cookie
//                                    -(res.cookie('token', token, opts))
//                                           |
//                                           |
//                                           |
//                                           v
//                   Browser automatically includes the cookie on future requests
//                                           |
//                                           |
//                                           |
//                                           v
//                            requireAuth middleware reads the cookie 
//                                           |
//                                           |
//                                           |
//                                           v
//                            calls jwt.verify(token, JWT_SECRET)
//                                           |
//                                           |
//                    _______________________|________________________
//                   |                                                |
//                   |                                                |
//                   v                                                v
//                 valid                                           Invalid
//                   |                                                |
//                   |                                                | return
//                   |                                                |
//                   v                                                V
//                req.user                                           401
//                   |                                                |
//                   |________________              __________________|
//                                   |             |
//                                   |             |
//                                   |             |
//                                   v             v
//                               Logout clears the cookie








//                           Cookie-Session  v/s JWT
//                           -----------*-----------


//                       Cookie+Session                                  JWT
//                       --------------                                  ---
//   Storage    	* Server memory/DB/Redis	              * Stored on client (cookie/localStorage)
//                      - requires server storage                    - Server doesn't want to keep session storage

//   Advantage      * Simpler, secure, easy logout            * Stateless, cross-service
//                  * Easy logout                             * Harder logout
//                  * Good for small/medium web apps          * Works well for mobile Apps,APIs,micro services etc
//                  * Simple to invalidate, 

//   Scalability	* Harder   	                              * Easy 
//                     - need shared store                       - stateless, works across servers
//                     - less scalable.                          - scalable


//                        User logs in                                  User logs in                                    |             |
//                              |                                            |
//                              |                                            |
//                              v                                            v
//                  Server creates a session                          Server creates a JWT
//                   in memory or database                      (signed with secret/private key)
//                              |                                            |
//                              |                                            |  JWT contains user data inside
//                              |                                            |    (like userId, role, expiry)
//                              |                                            |
//                              v                                            v
//              Server sends back a session ID                    Token is sent to the browser 
//                     stored in a cookie                           (cookie or localStorage)
//                              |                                            |
//                              | On each request,                           |   On each request,
//                              |                                            |
//                              v                                            v
//                    Browser sends that cookie                       Browser sends token 
//                              |                                            |
//                              |                                            |
//                              v                                            v
//                 Server looks up the session ID                  Server just verifies signature,
//                 in DB/memory to find user info                        no DB lookup needed.




