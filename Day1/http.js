//                              HTTP statuscode
//                              ---------------


// HTTP status codes are 3-digit numbers returned in responses to indicate what happened with the request.


//  Code Range	               Type	                       Example Codes
//  ----------                 ----                        -------------

//  1xx	                   Informational	                 100

//  2xx	                   Success                           200, 201

//  3xx	                   Redirection	                     301, 302

//  4xx	                   Client Errors (user issue)	     400, 404

//  5xx	                   Server Errors (your code)	     500, 503












// How to Set Status Code in Express ??
//    Answer:-  Use .status() before .send() or .json():

    res.status(200).json({message:'OK'})
    res.status(201).json({message: 'Created'})
    res.status(400).json({error:'Invalid input'})
    res.status(404).send('Page not found')
    res.status(500).send('Server error')





//    Data returned successfully                  OK             	              200

//    New user/product added	                  Created                         201

//    When success but no data to return          No content to return	          204
//       (DELETE usually)

//    Missing/invalid input	                      Bad Request                     400

//    Not logged in(user not authenticated)       Unauthorized                    401

//    No permission(authenticated but
//        not allowed)                            Forbidden	                      403

//    Page or resource missing	                  Not Found	                      404

//    Duplicate data (e.g., trying to 
//    register with existing email)               Conflict	                      409

//    Validation failed	                          Unprocessable Entity	          422

//    Unexpected error in backend logic           Internal Server Error	          500

//    Server temporarily down (maintenance)       Service Unavailable	          503



