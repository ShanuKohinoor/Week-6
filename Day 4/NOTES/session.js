//                              Session



//                       Session data create
//                                 |
//                                 | via cookies(ID is in inside this cookie)
//                                 |
//                                 v
//                       Session ID gives to the browser



//                               Login
//                                 |
//                                 |
//                                 |
//                                 v
//                           Create session
//                                 |
//                                 |
//                                 |
//                                 v
//                          Store session data
//                                 |
//                                 |
//                                 |
//                                 v
//                            Cookie send
//                                 |
//                                 |
//                                 |
//                                 v
//                        Browser save that cookie
//                                 |
//                                 |
//                                 |
//                                 v
//                 Browser automatically add in next requests
//                                 |
//                                 |
//                                 |
//                                 v 
//                Server looks up in the session storer




//  Use express-session middleware.

// Options:-
//    1. Secret:- To sign cookie(to find out any changes happen)
//    2. Name:- To give name to that cookie. If we wont give name, will get a default name
//                * Default name:- connect.sid, sid
//    3. cookie.httponly
//    4. cookie.secure
//    5. cookie.samesite
//    6. cookie.manage
//    7. resave:false :-Can give false in resave. So if there is no change, no need to save
//    8. saveUninitialized:false :- If cookie/session is not there, dont create empty 
//                   sessions for anonymous hits.








//                  First request from the browser(no session cookie yet)
//                                 |
//                                 |
//                                 |
//                                 v
//                  Server create a new session object(if savedUninitialized:false,
//                          it creates only when we add data)
//                                 |
//                                 |  When  Session saved
//                                 |
//                                 v
//                Server sends a Set-cookie header(cookie name sid) to the browser with 
//                      session-id and cookie options(httpOnly,maxAge etc)
//                                 |
//                                 |
//                                 |
//                                 v
//                      Browser saves this cookie(sends everytimes with future request until 
//                            it expires or cleared)
//                                 |
//                                 | When request send next time,
//                                 |
//                                 v
//                     Server recieves request with cookie
//                                 |  Reads session Id from the cookie
//                                 |  Load session data from the store(memory,Redis, DB etc)
//                                 |  Populates req.session(express  take saved data and fills req.session with it)
//                                 v
//                    Read or modify req.session in our route
//                                 |  If changed, it will be back to the store(depending on resave and saveUninitialized)
//                                 |
//                                 |
//                                 v
//                   Logout or destroy session
//                      - To remove cookie from the browser
//                          * req.session.destroy() 
//                          * res.clearCookie('sid')









// Q: Why don’t I see sid in document.cookie?
// A: Because httpOnly: true — browser DevTools shows it, but page JS cannot read it.

// Q: When is the cookie actually sent to browser?
// A: When the session is saved for the first time (e.g., after you set req.session.user = ...) the server sends a Set-Cookie header.

// Q: Why not set saveUninitialized: true?
// A: That causes lots of empty sessions to be stored and sets cookies for every visitor, even if they didn’t log in or interact. Not good for scale or privacy.

// Q: What session store should I use in production?
// A: Redis, Memcached, or a database-backed store (e.g., connect-redis, connect-mongo). MemoryStore is only for development.