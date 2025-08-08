//                Hospital maangement server


   const express = require('express')
   const app = express();


   const path = require('path')
    app.use(express.urlencoded({extended:true}))
    app.use(express.static('public'))


    app.set('view engine', 'ejs')
    app.set('views',path.join(__dirname,'views'))

    const patient = require('./routes/patientRoutes')
    const doctor = require('./routes/doctorRoutes');
//const { title } = require('process');
const { notFoundError, badRequest } = require('./utils/errors');
const { errorHandlingMiddleware } = require('./middlewares/errorHandling');


    app.get('/',(req,res)=>{
        res.render('hospitalhome',{title:' Welcome to XXX Hospital Home Page'})
    })

    app.use('/patients',patient)
    app.use('/doctors',doctor)

  //  app.use((error,req,res,next)=>{     // Centralized error handling middleware
  //     console.log('Error:',error.message);
//    console.log(error.stack);
       
 //      const status = error.statusCode || 500;
 //      const message = error.message || 'Something broke'
  //////     res.status(statusCode).send(msg)  
   //      res.status(status).render('error',{
   //         title:'Error',
   //         status,
   //         message
 //        })
  //  })                           // when we run,we will get like this:-
                                        // Error 404
                                         // Patient is not found

                                        //  Go back to home

                                // So giving middleware for handling is must.

              // if we dont write error handling middle ware, express will give a generic response. So must need a error handling middleware to handle error.

























// ERROR HANDLING MIDDLEWARE
    app.use(errorHandlingMiddleware)





       app.listen(3000,()=>{
    console.log('Server is running at http://localhost:3000');
    
   })

