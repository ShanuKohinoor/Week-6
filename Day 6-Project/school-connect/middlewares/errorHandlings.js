// Error handling middlewares


    const { AppError} = require('../utils/error')

    const errorHandlingMiddleware = (err,req,res,next)=>{
        if (err instanceof AppError){
          return  res.status(err.statusCode).render('error',{
                title:'Error',
                status : err.statusCode,
                message : err.message
            })
        }
        // For all unknown errors
           res.status(500).render('error',{
            title: 'Error',
            status: 500,
            message : 'Internal Server Error'
        })
    }


    module.exports = { errorHandlingMiddleware}