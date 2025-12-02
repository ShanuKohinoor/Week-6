//    Base class error

       class AppError extends Error {
        constructor(message,statusCode){
            super(message);
            this.statusCode  = statusCode;
        }
       }




 //      custom NotFoundError
    
       class NotFoundError extends AppError {
        constructor(message){
            super(message,404)
        }
       }

//     custom Bad request Error

      class BadRequest extends AppError{
        constructor(message){
            super(message,400)
        }
      }


//   custom Unauthorized error      
    class UnAuthorized extends AppError {
        constructor(message) {
            super(message, 401)
        }
    }


//    custom Duplicate error    
    class Duplicates extends AppError {
        constructor(message) {
            super(message,409)
        }
    }

      module.exports = {AppError,NotFoundError,BadRequest,UnAuthorized, Duplicates}