  
  
  
  
  const express = require("express")
  const session =  require("express-session")
  const path = require('path')

  const app = express();

  //Parse form + JSON bodies
  app.use(express.urlencoded({extended:true}))   //Read HTML data
   //app.use(express.json())                        // if we dont use ejs, we can return in json instead of rendering ejs like this. Read JSON body ({ "name": "shanu" })



   // EJS
  app.set('view engine','ejs');
  app.set('views',path.join(__dirname,'views'))


  // Session middleware
  app.use(session({                        // Express create server-side storage (session)
                                                   // This helps to give a cookie(like a  ticket) to the browser(separate cookie to each visitor),
                                                   // So, the browser can find the visito's stored data later
    name: 'sid',                           // Cookie name that stores the session ID.
    secret: 'supersecretkey',              // To sign cookie. So it cant be faked. If someone try to change this, it will reject
    resave: false,                         // Don’t save session again if nothing changed
                                                  // If we give true, session will automatically save in every time.
    saveUninitialized: false,              // Don’t create empty sessions for new visitors.(like a locker allocate to each visitor in a mall. If we give true here, locker will allocate to unused visitor. If we give false, locker will create only when a vistor needs  storage)
    cookie:{
        httpOnly : true,                  //Cookie cannot be change or read from client side javascript. It protects against XSS attacks (malicious scripts cannot steal the session id).
        sameSite: 'lax',                  // Helps to protect CSRF attack(Cross-site Request Forgery).The ticket is only sent when we normally browse the site, not when other websites try to secretly send requests on our behalf.
        secure: false,                   //false:- can travel on normal http. True:- can travel on https.
        maxAge: 15 * 60 * 1000,          // Will expire after 15 minutes.
    }
  }))





  // User
   const NEW_USER = { id :'Shanu', email: 'shahanaskohinoor@gmail.com', password: 'shanu123' ,name: 'shanu'}

 

// Redirect root to login page
app.get("/", (req, res) => {
  res.redirect("/login");
});
     

// Show Login page
// If user already logged in(req.session.user exists),will render the page showing a welcome message.
app.get('/login', (req, res) => {
    if (req.session.user) {     // if user session exists render its data and show 'Welcome Shanu'
     return  res.render('loginSession', { error: null , user: req.session.user});  // pass null initially
    }
// If not logged in (show blank login form)
     res.render("loginSession", { error: null, user: null });
});



// Login route(set session data)

app.post('/login',(req,res)=>{           // login form submission
    const {email,password} = req.body    // read submitted form fields
     

   // Check credentials

    if (email === NEW_USER.email && password === NEW_USER.password){
        req.session.user = NEW_USER; // save user in session
        return res.render("loginSession", { error: null, user: req.session.user });
    }
    return res.render('loginSession',{error:'Invalid Credentials',user: null})

})

// Logout 
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).render('loginSession', { error: 'Logout Failed',user:null});
        res.clearCookie('sid');
        res.redirect('/login');
    });
});


    app.listen(3000,()=>{
        console.log('Server is running at http://localhost:3000');
        
    })











 //                  First login from the browser(no session cookie yet)
//                                 |
//                                 |
//                                 |
//                                 v
//                       Server redirects --> /login
//                                 |
//                                 |
//                                 |
//                                 v
//                             GET /login            
//                              - If session.user exists  --> render Welcome page 
//                              - Else --> render form    
//                  User submits login form --> POST /login with { email, password }
//                                 |
//                                 |
//                                 |
//                                 v
//                     Server validates credentials
//                                 |
//                                 | If invalid --> render form with error          │
//                                 | If valid --> create session object: req.session.user = NEW_USER
//                                 |               * render  Welcome page
//                                 |
//                                 v
//                     Session saved in server store (memory, Redis, DB, etc)
//                                 |
//                                 |
//                                 |
//                                 v
//                    Server sends Set-Cookie header to browser
//                                 | Cookie: sid=<session-id>
//                                 | Options: httpOnly, sameSite, maxAge, secure
//                                 |
//                                 v
//            Browser stores cookie (sent automatically in future requests)
//                                 |
//                                 |
//                                 |
//                                 v
//                           Browser requests
//                                 |
//                                 |    Send request next time
//                                 |
//                                 v
//                      Server receives request with cookie
//                                 |
//                                 |
//                                 |
//                                 v
//                      Server loads session.user automatically
//                                 |
//                                 |
//                                 |
//                                 v
//            Populates req.session with saved data (req.session.user now available)
//                                 |
//                                 |
//                                 |
//                                 v
//         If req.session modified/change --> saved back to store (resave: false --> saves only if changed)
//                                 |
//                                 |
//                                 |
//                                 v
//                   User clicks logout --> POST /logout
//                                 |
//                                 |
//                                 |
//                                 v
//                req.session.destroy() --> destroys server session
//                                 |
//                                 |
//                                 |
//                                 v
//               res.clearCookie('sid') --> removes cookie from browser
//                                 |
//                                 |
//                                 |
//                                 v
//             Logout successful --> user must login again to access protected routes























