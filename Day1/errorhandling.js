




//                        Centralized Error Handling in Express
//                        -------------------------------------



// Centralized Error Handling is instead of writing try–catch in every route, write one common error-handling middleware, which catches all errors and sends a proper response.

//  Eg:- 
      const express = require('express')
      const app = express()


     //  Route with an error
      app.get('error-example',(req,res,next)=>{
        const err = new error('Something went wrong')     // Simulate an error
        err.statuscode = 500;
        next(err);      // Pass error to the error-handling middleware    
      })



      // Centralized Error-Handling Middleware 

      app.use((err,req,res,next)=>{      // Special Express middleware for error handling (must have 4 arguments)

        console.log('Error',err.message);

        res.status(err.statuscode || 500 ).json ({   // err.statuscode:- Custom status code like 404, 400, 500
                                                     // res.status().json():- 	Sends a clean JSON response to client
            success : false,  
            mesage : err.message || 'Internal server error'
        })
        
      })


      app.listen(3000,()=>{
        console.log('Server is running on http://localhost:3000');
        
      })




// Use:- 
//        * To avoid repeating try–catch everywhere
//        * To manage custom errors like 'User not found', 'Invalid input', etc.











//                              next(err) usage
//                              ---------------


//  next(err) is a special version of the next() function.
// It passes error to the centralized error handling middleware.
// Refer above topic (Centralized error handling middleware)

// Usage:- 
//         * When error occurs in the route.
//         * To stop normal flow and handle error properly.
//         * Eg:- Database fails, file not found, logic error, etc.




//                  Handling uncaught exceptions & rejections
//                  -----------------------------------------


//  Uncaught Exception :- Errors happen outside try-catch and are not caught anywhere.
//  ------------------

// In simple words,these are synchronous errors in the code which cannot be caught by try...catch.
// If we doesnt handle this, Node.js will crash.
// Eg:- 
           throw new error('Crash')   // Will crashes the Node.js

//   How to handle this? :-

// We can handle this with the help of process.on at the top of our code in the main file(Eg:- Server.js)
           process.on('uncaughtException',(err)=>{
            console.log('Uncaught Exception:',err.message);
            process.exit(1)
            
           })    //This ensures any uncaught error anywhere in the app will be caught.

                  // process.on:- listen the specific events.
                  // uncaughtException:-It is the special event triggered whenever a synchronous error is thrown anywhere in the code,but not caught by try...catch
                  // (err) => { ... } :- It is the call back function when an uncaught exception happens.
                  // process.exit(1) :- This helps to stops Node.js safely. exit(1) means process exited due to an error.







                  //  Unhandled promise Rejection :- When a promise is reject, but dont have .catch or try/catch to handle it.
//                    ---------------------------

//  In simple words, these are errors that occur in Promises or async functions which are not handled using .catch() or try...catch.” 
// Eg:-
      Promise.reject('Oops')

// How to handle this:-
//  We can handle this with the use of process.on('unhandledRejection', callback) at the top of our main file.
//  We can add process.on at the top of our main file like uncaughtException.

        process.on('unhandledRejection',(reason,promise)=>{
            console.log('Unhandled Rejection',reason);
            process.exit(1)
            
        })


// Differences :-
//  uncaughtException :- handles synchronous errors not caught by try...catch.
//  unhandledRejection :- handles asynchronous errors from Promises or async functions not caught by .catch() or try...catch.

// Similarities :-
//  Both uncaughtException and unhandled rejection will helps to prevent our server from the crashing.
//  Both ensures any uncaught error anywhere in our app will be caught.

// process.exit(1) -> indicates error exit.

// process.exit(0) -> indicates successful exit












// HANDLING ERROR WITH ERROR CLASSES(Custom error class)
// ---------------------------------



// If we  create custom error class, we dont want to write code everytime.
//Create a folder named utils: will save which is useful inside utils
// can reuse