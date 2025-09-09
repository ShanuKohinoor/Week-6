//                              Middleware

const express = require('express')
const cookieParser = require('cookie-parser')  // Turns incoming cookie header into the req.cookies object

const { signToken } = require('./utils/jwt');   // Import helper
const requireAuth = require('./middleware/auth'); // Import middleware


const app = express()


app.use(express.urlencoded({ extended:true}))
app.use(express.json())
app.use(cookieParser())



const DEMO_USER = { id:'SHAN', email: 'shanpullani@gmail.com', password:'shan123', name:'Shan'}



//                                ROUTES

//   Home route(public)
         app.get('/', (req,res)=>{
             res.send(` 
              <h2> JWT(Cookie) Login Demo</h2>
              <p><a href = '/login'>Login page </a> </p>
              <p>Try <code>GET/me</code>(protected) and <code> POST/logout</code>.</p>
           `)
        })

// Login form page (public)
        app.get('/login',(req,res)=>{
            res.send(` 
               <h3>Login</h3>
               <form method= 'POST' action= '/login'>
               <input name = 'email' placeholder='shanpullani@gmail.com' required>
               <input name='password' type='password' placeholder='shan123' required>
               <button>Login</button> 
               </form>
               <p> Demo creds: shanpullani@gmail.com/ shan123</p>      
           `)
        }) 

// Handle login form submission
         app.post('/login',(req,res)=>{
            const { email,password} = req.body || {};
            if (email !== DEMO_USER.email || password !== DEMO_USER.password) {   // Check if email/password match the demo user
                return res.status(401).send('Invalid credentials');
         }

            const token = signToken(DEMO_USER);    // If valid,creat JWT

         res.cookie('token',token,{          // Store JWT in cookie
              httpOnly: true,
              secure: false,
              sameSite: 'Lax',
              maxAge: 15 * 60 * 1000
         })

        res.json({ message: 'Login success. JWT set in cookies'})      // Respond to client

    })

// Protected route(only accessible with valid token)

          app.get('/me',requireAuth, (req,res)=>{
             res.json({ message: 'Your profile (verified JWT)', user:req.user})
          })

 //Logout(clear cookie)

         app.post('/logout',requireAuth,(req,res)=>{
           res.clearCookie('token');
           res.status(500).json({message: 'Server error'});
         });

 app.listen(3000,() => console.log('http://localhost:3000'));
 