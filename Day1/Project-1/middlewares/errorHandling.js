
//const { notFoundError, badRequest } = require('../utils/errors');

// Here also we have to change to the base class name like:-
const { appError} = require('../utils/errors');




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



    module.exports = {errorHandlingMiddleware}
