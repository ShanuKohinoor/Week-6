
//  CUSTOM ERROR HANDLING(Create a constructor here and use otherthan repeat writing status code)

//  class notFoundError extends Error{
 //       constructor(message){
 //          super(message)
  //         this.statusCode= 404
  //      }
  //  }

  //  class badRequest extends Error {
   //     constructor(message){
   //         super(message)
   //         this.statusCode = 400
   //     }
   // }

  //  module.exports= {notFoundError,badRequest}













  // BASE ERROR CLASS
 //------------------

// If we have to use more statusCode, it is difficult to create and  look for many instance error class. So, to solve this,create a base class.
// From that base error class,we can extend error class.

           // Base Custom Error Class
class appError extends Error {
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
    }
    
}
   
// instead of this line,class notFoundError extends Error{ ,erite appError {
//       like this :-
       // Custom Not Found Error
class notFoundError extends appError{
        constructor(message){
           super(message,404)
        }
    }
         //  Custom Bad Request Error
    class badRequest extends appError {
        constructor(message){
            super(message,400)
        }
    }


// Add appError here too   
  module.exports= {appError,notFoundError,badRequest}