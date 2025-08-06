//                server.js



const express = require('express')  // Import the Express library to create the server
const app = express()               // Express app instance created
const path = require('path')        // Import Node.js path module to handle file paths


// Import routes for students and teachers from separate route files
const studentRoute = require('./routes/studentRoutes')
const teacherRoutes = require('./routes/teacherRoutes')

// Middleware to parse incoming URL-encoded form data 
app.use(express.urlencoded({extended:true}))

// Middleware to serve static files (like CSS, JS, images) from 'public' folder
app.use(express.static('public'))


// Set EJS as the view engine to render dynamic HTML pages
app.set('view engine','ejs')

// Set the folder where EJS templates are stored ('views' directory)
app.set('views', path.join(__dirname, 'views'))

// Route for homepage (renders 'home' view and passes a title)
app.get('/',(req,res)=>{
    res.render('schoolhome',{title: 'Welcome to school Portal'})
})


// ES module route

 // import ('./controllers/moduletype.mjs').then(({welcome})=>{
  //      app.get('/welcome',welcome)

 // }) 

        (async ()=>{                                 //
         const {welcome} = await import ('./controllers/ moduleType.mjs')
         app.get('/welcome',welcome)
        })()




    // Mount student routes at '/students' path
 app.use('/students', studentRoute)
    // Mount teacher routes at '/teachers' path
 app.use ('/teachers', teacherRoutes)

    //Listen the port
const PORT = 5000;
app.listen(PORT,() => console.log(`Server running on http://localhost:${PORT}`))