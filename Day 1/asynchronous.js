//                 Asynchronous programming in Node.js
//                 ----------------------------------



//                 What is asynchronous programming in Node.js
//                 -------------------------------------------


//DEFINITION:- Asynchronous programming in Node.js allows for non-blocking operations, enabling efficient handling of multiple tasks simultaneously without waiting for each to complete.


// EXPLANATION:-
//        * It allows tasks to run in the background without blocking the execution of other operations.
//        * Asynchronous programming in Node.js means, it does not wait for slow tasks like(reading files,API or Database(DB))
//              - It starts the task, then moves on to do other work.
//              - When the slow task is done, Node.js gets the result and continues. This is called non-blocking or asynchronous behavior.



//   Asynchronous Operations in Nodejs
//   ---------------------------------
//     1. File system operations
//            * Reading files
//            * Writing files
//     2. Network Request
//            * API request
//     3. Database queries
//            *  Get,store and take data
//     4. Timers
//            * setTimeout, setTimeInterval etc
//     5. Crypto and compression
//            * Hash the password to secure the password.
//     6. Child process / External commands



//   Asynchronous function in javascript v/s Node.js

//                                   SIMILARITIES:- 
//        * Both use same language. ie, javascript
//        * Both support async functions like (callbacks,promises,async/await )
//        * Behaviour is same.
//        * Concept of async function is same. But usage and tools are different in js and Nodejs.



//                                    DIFFERENCES:-


//                                           JavaScript (Browser)                         Node.js (Server)                                       


//   Where it runs:-          Runs inside web browser (like Chrome, Firefox)            Runs on your computer/server using Node.js                 
//   Usage of async:-         In browser,its for users and internet                     In Nodejs,its to read files, get data from database, or serve many users
//   Example:-                setTimeout, fetch(), button clicks                        fs.readFile(), http.get(), database queries            
//   Main purpose:-           Keep the web page fast and not freeze the screen          Handle many users at the same time without slowing down    
//   APIs commonly used:-     fetch() to get data from server (like products)           fs, http, express – to create websites and APIs      





//                      Asynchronous task handling


//   1. Callback
            fs.readFile ('data.txt','utf8',(error,data)=>{})   
//            Here call back handle asynchronous function    



//    2. Promises:- To avoid callback hell
             readFilePromise('data.txt')     
             .then
             .catch

//     3. async-await (with try-catch)



