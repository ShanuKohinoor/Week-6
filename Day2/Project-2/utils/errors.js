
//  CUSTOM ERROR HANDLING(Create a constructor here and use otherthan repeat writing status code)

/*
   // Custom error class created for notfound error

     class notFoundError extends Error{
        constructor(message){
            super(message)                     // To call the constructor of parent class.
                this.statusCode = 404
            
        }
     }

   //  module.exports= {notFoundError}   //   This is for custom  error class for not found error

        
     // custom error class created for badrequest error
       
         class badRequest extends Error {
              constructor(message){
              super(message)
            this.statusCode = 400
            }
         }            */




 // module.exports= {notFoundError,badRequest}   // This is for notfounderror and badrequest



  // BASE ERROR CLASS
 //------------------

// we have to use more statusCode, it is difficult to create and  look for many instance error class. So, to solve this,create a base class.
// From that base error class,we can extend error class.

           // Base Custom Error Class
 class appError extends Error {
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
    }
    
}      
   
// instead of this line,class notFoundError extends Error{, write appError {
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

   module.exports= {notFoundError,badRequest,appError}   // This is for notfounEerror, badrequest and appError

