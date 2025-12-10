
/*const { notFoundError, badRequest, appError } = require('../utils/errors');

//  Move middleware to here and store in a variable named errorHandlingMiddleware
    const errorHandlingMiddleware =  (err,req,res,next)=>{     
      
       if (err instanceof notFoundError || err instanceof badRequest){
          res.status(err.statusCode).render('error',{
        title:'Error',
        status: err.statusCode,
        message: err.message  

       })
    }

        res.status(500).render('error',{
            title:'Error',
            status: 500,
            message: 'Internal Server Error'
                                             

        })


    } */
       const {appError} = require('../utils/errors');  // import base class error (from utils folder)

     // we can use base class for easy usage. Instead of checking instanceof many time, we can create a base class named appError in error.js file and use appError here instead of class name separately like notFoundError,badRequest etc...
          const errorHandlingMiddleware =  (err,req,res,next)=>{     
      
       if (err instanceof appError){           // instanceof checks if err was created using AppError 
                                               //  or its child classes (NotFoundError, BadRequest).
          res.status(err.statusCode).render('error',{
        title:'Error',
        status: err.statusCode,
        message: err.message  

       })
    }

        res.status(500).render('error',{
            title:'Error',
            status: 500,
            message: 'Internal Server Error'
                                             

        })


    }

  

module.exports = {errorHandlingMiddleware}








//const { notFoundError, badRequest } = require('../utils/errors');

// Here also we have to change to the base class name like:-
/*const { appError} = require('../utils/errors');




const errorHandlingMiddleware = ((err,req,res,next)=>{     

//       app.use((error,req,res,next)=>{     
//        if (err instanceof notFoundError || err instanceof badRequest) //custom error handler
                                                                    // look for instance

  // if we use base custom error class instead of separate instance class for each code, we can use base class named appError here, like this                                                                  
        if(err instanceof appError)    
         res.status(err.statusCode).render('error',{
            title:'Error',
            status: err.statusCode,
            message: err.message
         })


       console.log('Error:',err.message);
       console.log(err.stack);
       
         res.status(500).render('error',{
            title:'Error',
            status: err.statusCode,
            message: 'Internal Server Error'
         })
    })                           



    module.exports = {errorHandlingMiddleware} */






//  Why do we need a base error class?

// In web projects, we often have many types of errors. Like,

// 404 Not Found :– page or route doesn’t exist

// 400 Bad Request :– missing or invalid data

// 401 Unauthorized :– login required

// 500 Internal Server Error :– something went wrong on the server

// Without a base class, we have to write separate error classes for each type and then check them individually in our error handling.

// This will become repetitive and messy.

// Solution:-
//    * Create one base class (AppError) that handles common logic. 
//    * Then we can extend it for specific errors like NotFoundError or BadRequest.









    //  