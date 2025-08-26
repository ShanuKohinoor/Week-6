//                          UnCaught Exception
//                          ------------------

// If we throw error and dont catch which is uncaughtexception.
// Can use process.on('uncaughtException') to catch unexpected errors, log them, clean up, and stop the program safely.





// Process: An object inside Node.js which include all information and  control of that app

 //                                       object
//       APP  (information & control)  ----------->  PROCESS


// Process will handle uncaught error.



// Like add eventListener in browser, here we use process.on
       process.on('uncaughtException',()=>{
        console.log(err);
        process.exit(1);
        
       })


//  EVENTS :-
//  ------
//   1.UnCaught Exception
//   2.UnHandled Rejection
//   3.SIGINT
//   4.exit
//   5.Warning



//                        UnHandled Rejection
//                        -------------------


       process.on('unHandledRejection',(reason,promise)=>{
        console.log('Unhandled Rejection', reason);
        process.exit(1);      
       })
