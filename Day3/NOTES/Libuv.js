
//                        libuv, Thread Pool & Event Loop
//                        -------------------------------



//                              Libuv
//                              -----

// DEFINITION:- It is a multi-platform support with a focus on asynchronous I/O.
//                 (Asynchronous I/O means doing the tasks without blocking the main thread. So our program can keep doing other things while waiting for the I/O to finish.)
// Libuv is a cross-platform open source library written in C language.
// Use:- Handling asynchronous non-blocking operations in Node.js.
// Using two features named thread pool and event loop.


// DEFINITION:- Libuv is a C library that Node.js uses to handle asynchronous tasks (like file operations, timers, and networking) through an event loop and a thread pool, so that JavaScript can do many things at once without blocking the main thread.

// PARTS OF LIBUV :- 

//      1.  EVENT LOOP 
//      2.  HANDLES 
//      3.  REQUESTS 
//      4.  TIMERS 
//      5.  I/O POLLING  
//      6.  THREAD POOL  
//      7.  WORK QUEUE  
//      8.  NETWORKING HANDLES  
//      9.  PROCESS MANAGEMENT 
//      10. SIGNAL HANDLING 





//   _____________         ___________________________                           
//  |             |       |                           |
//  |   HANDLES   |-----> |                           |
//  |_____________|       |                           |
//                        |         EVENT LOOP        |
//   _____________        |                           |
//  |             |       |                           |
//  |  REQUESTS   |-----> |                           |
//  |_____________|       |___________________________|
//                                      |
//                                      | 
//                                      |
//                                      V
//                               _________________
//                              |                 |
//                              |     TIMERS      |
//                              |_________________|
//                                      |
//                                      | 
//                                      |
//                                      V
//                               __________________
//                              |                  |
//                              |  I/O POLLING     |
//                              |(fIle network I/O)|
//                              |__________________|
//                                      |
//                                      | 
//                                      |
//                                      V

//    _________________           ___________________
//   |                 |         |                   |
//   |    THREAD POOL  |<--------|     WORK QUEUE    | 
//   |_________________|         |___________________|
//                                      |
//                                      | 
//                                      |
//                                      V
//                             ________________________
//                            |                        |
//                            | FILE SYSTEM OPERATIONS |
//                            |________________________|
//                                      |
//                                      | 
//                                      |
//                                      V
//                               _________________
//                              |                 |
//                              | SIGNAL HANDLING |
//                              |_________________|
//                                      |
//                                      | 
//                                      |
//                                      V
//                                  EVENT LOOP
//                             (runs ready callbacks)



// 1. EVENT LOOP:-
//        * Heart of Libuv.
//        * It is the centre box because everything eventually runs through it.
//        * It runs continuously, checking if there are any tasks or callbacks ready to run.
//        * When libuv tells the Event Loop “a request or handle is ready,” the Event Loop runs the JavaScript callback function.
//        * It handles things like:
//             - Running timer callbacks (setTimeout, setInterval)
//             - Running I/O callbacks (file read, network responses)
//             - Running callbacks from the thread pool (CPU-heavy tasks finished)
//             - Handling signals (like Ctrl+C)
//             - The Event Loop ensures Node.js runs all your async code without blocking, letting other tasks run smoothly.
//             - It basically keeps your app fast and responsive by managing when each callback runs.



// 2. HANDLES:-
//        * They are like listeners inside the eventloop.
//        * Eg:-
//             - When we use fs.createWriteStream('file.txt), Node.js opens a connection to the file. This is called a handle
//             - When we write, writeStream.write('Hello'), Node.js stores this data in a buffer (temporary storage) inside the handle.
//             - The handle watches when the file is ready to accept data (writeable).
//             - Once the file is ready, the handle tells libuv that it can send the buffered data now.
//             - libuv then notifies the Event Loop that the write operation is complete or ready for the next step.


// 3. REQUESTS:-
//         - Requests are like single tasks or operations that libuv needs to complete.
//         - Eg:-
//              - When we call fs.readFile('file.txt', callback), this read operation is a request.
//         - It means “please read this file once and then let me know once it finished.”
//         - Unlike handles, requests are one-time actions, not continuous watchers.
//         - libuv sends this request to its thread pool or the OS to perform the read.
//         - When the file is read, libuv notifies the Event Loop that the request is complete.
//         - Then the Event Loop runs your callback (like giving you the file content) on the main JavaScript thread.


// 4. TIMERS:-
//         - Timers manage all our scheduled tasks like setTimeout() and setInterval().
//         - When WE call setTimeout(callback, delay), libuv records this timer and waits for the delay to pass.
//         - Once the delay finishes, libuv tells the Event Loop to run the callback.
//         - The Event Loop then runs the timer’s callback in the Timers phase of its cycle.
//         - Timers let schedule code to run after some time or repeatedly at intervals without blocking the main thread.


//  5. I/O POLLING:
//          * I/O Polling is where libuv waits for input/output operations to complete.
//          * Which includes things like:
//                 - Reading or writing files
//                 - Waiting for data on network sockets
//                 - Receiving responses from databases or other services
//                 - libuv constantly checks the status of these I/O operations in the poll phase of the Event Loop.
//                 - When an I/O operation finishes (e.g., a file is read, or data arrives from the network),
//                        libuv tells the Event Loop to run your callback.
//                 - This allows Node.js to handle many I/O tasks efficiently without blocking the main JavaScript thread.

//  6. WORK QUEUE:
//           * The Work Queue is like a waiting room inside libuv.
//           * Some jobs(like file system operations ) cannot be done in the event loop directly. So it blocks.
//           * Then, the eventloop sends them to the work queue.
//           * These tasks wait in the Work Queue until a worker thread from the Thread Pool is free to process them.
//           * This way, heavy tasks don’t block the main JavaScript thread and keep the app responsive.



//   7. THREAD POOL:
//            * The Thread Pool is a group of background worker threads (by default, 4 threads) inside libuv.
//            * It runs heavy or blocking tasks from the Work Queue without blocking the main JavaScript thread.
//            * Tasks handled by the Thread Pool include:
//               - File system operations (read, write, stat, etc.)
//               - DNS lookups
//               - Cryptography tasks
//            * Each worker thread picks a task from the Work Queue, processes it, and when done, libuv notifies the Event Loop.
//            * Then the Event Loop runs our callback on the main thread, so we get the result asynchronously.

  
//   8. FILE SYSTEM OPERATIONS:
//             * These are asynchronous tasks like reading, writing, or watching files.

//                 - When we call fs.readFile() or similar, the request often goes to the Thread Pool to avoid blocking.
//                 - The Thread Pool workers perform these file operations in the background.
//                 - Once finished, libuv tells the Event Loop that the operation is done.
//                 - The Event Loop then runs your callback with the file data or result.


//   9. SIGNAL HANDLING:
//              * Signal Handling deals with operating system signals sent to our Node.js process.
//              * libuv listens for these signals and informs the Event Loop when they occur.
//              * Eg:-
//                  - when we press ctrl +c in the terminal, the OS sends a SIGINT signal. .
//                  - The  eventloop listens for these signals & runs the callback functions we set  up to handle them-like cleaning up before quitting our program.










//                           Thread pool
//                           -----------
//  Thread Pool :- A team of worker threads (from libuv) handling heavy async tasks in the background.








//                  How libuv manages I/O
//                  ---------------------



//             When Js code request I/O operation( fs readFile,net.request )
//                               |
//                               | 
//                               |
//                               V
//                 Node.js passes that task to libuv

//                               |
//                               | 
//                               |
//                               V
//             Libuv decides whether the task can be handled or not
//                               |
//                               |
//                _______________|________________
//               |                                |
//               |                                |
//               V                                V
//    Fast async ready task              Slow /blocking tasks(Some tasks cannot be done non-blocking by the OS — like heavy file system operations)
//               |                                |
//               |                                |
//               |                                |
//               V                                V
//   OS handle it (non-blocking)       Send to thread pool workers
//               |                                |
//  (OS tools like epoll (Linux),                 |
//        kqueue (Mac), or                        |
//    IOCP (Windows) do this job.)                |
//               |                                |    
//               |                                |
//               |                                |
//               |________________________________|
//                               |
//                               | 
//                               |
//                               V
//                          EVENT LOOP










//                 Role of the thread pool
//                 -----------------------

// Node.js has only one main thread to run javascript. If a task takes too long, the main thread will be blocked. Which results in blockage  or unresponsive of app.
// Thread helps to solve this problem.
// Threadpool helps by taking such heavy or blocking work from the main thread and work parallelly.
// During this period main thread finishes its other works.
// Once thread pool finishes its work, the results sent back to main thread through eventloop.

// Examples of tasks that use Thread Pool in Node.js :-

//          *   File system operations (fs.readFile, fs.writeFile)
//          *   DNS lookups (without using the network module)
//          *   Compression (zlib)
//          *   Crypto operations (crypto.pbkdf2, crypto.scrypt)






//                        Event-driven architecture
//                        -------------------------

// DEFINITION:- Event-Driven Architecture (EDA) is a programming style where the flow of the program is determined by events (things that happen), and event listeners (functions) are called in response to those events.
//       *   It is a design pattern where our code reacts to events instead of running in a fixed, sequential order.
//       *   Instead of running step 1 --> step 2 --> step 3 --> step 4.....,it wait for an event to happen.
//       *   When an event happens, Node.js triggers the listener.
//       *   Node.js built on event-driven Architecture.
//                 - It uses the Event Loop to listen and respond to events.


// Eg 1:-
               const http = require('http');

              const server = http.createServer((req, res) => {
        
               // Event listener: runs when 'request' event happens
              res.end('Hello World');
             });

             server.listen(3000, () => {
                console.log('Server running on port 3000');
             });
   

//  Eg 2:-

               const EventEmitter = require('events');
               const emitter = new EventEmitter();

                // Listener
                  emitter.on('greet', (name) => {
                     console.log(`Hello, ${name}!`);
                  });

              // Emit event
                  emitter.emit('greet', 'Shanu');
 







//                         Event Loop Execution Phases
//           Timers, Pending Callbacks, Idle/Prepare, Poll, Check, Close
//           -----------------------------------------------------------


// Event Loop is like the traffic controller/ Manager. But in Node.js it works in specific phases, and each phase decides what type of callbacks to run.
// To do this, Node.js uses the Event Loop, a cycle that keeps running and checks if there is work to do, and then runs the appropriate callbacks.


//  Node.js eventloop phases:-

//   1. Timers Phase  :-  Runs setTimeout() and setInterval() callbacks.
//               * When after the timer duration expires. 
//                    Eg:- if we call setTimeout(fn, 2000), the callback fn will run in this phase after 2 seconds have passed.
//               * Then the event loop checks the timer queue, and if any timers are due (their time has expired), it executes their callbacks here.

 

//   2. Pending Callbacks Phase :- Runs I/O callbacks from the previous cycle that were postponed.
//                * Executes callbacks for some system-level operations, mostly related to errors or deferred callbacks from previous I/O operations.
//                * Runs after Timers, before poll.
//                * Some callbacks (like TCP errors) are queued here by the system and run in this phase.


//   3. Idle, Prepare Phase :-  Internal phase used by Node.js to prepare for the next poll phase.
//                * Happens after pending callbacks phase.


//   4.Poll Phase :- Main work happens here:
//           *  It is the heart of the eventloop.
//           *  Waits for new I/O events (file reading, network requests, etc.).
//           *  Executes I/O callbacks immediately if data is ready.
//           *  Happens after the idle/prepare phase.

//                 If there are events waiting, their callbacks are executed immediately. If there are no events, the event loop may wait here until:-
//                       -  New events arrive, or
//                       -  There are timers scheduled to run soon (then it will move on to timers phase).



//   5. Check Phase :- Runs setImmediate() callbacks.
//            *  After the poll phase finishes.



//   6. Close Callbacks Phase :- Runs close events like socket.on('close', ...).
//            *  After the check phase.
//            *  If there are any close callbacks, they run here.



// Microtasks (like process.nextTick() and resolved Promises) run between each phase — they always finish before moving to the next phase.




// Eg for callbacks run in the eventloop phases:-

                 const fs = require('fs')

                 console.log('Start: Synchronous code runs first');
                 

                 setTimeout(()=>{
                    console.log('Timeout Call back(Timers phase)');
                    
                 },2000)


                 setTimeout(()=>{
                    console.log('Timeout call back-2(Timers phase)');
                    
                 },0)

                 setImmediate(()=>{
                    console.log('Immediate callback(check phase)');
                    
                 })

                 fs.readFile(__filename,()=>{
                    console.log('File read callback(Poll phase)');
                    
                 })

                 process.nextTick(()=>{
                    console.log('process.nextTick callback(Microtask -runs before phases)');
                    
                 })

                 Promise.resolve().then(()=>{
                    console.log('promise.resolve.then callback(Microtask- runs before phases after process.nextTick)');
                    
                 })



                 console.log('End: Synchronous code finished');



                 //   OutPut:-
                 //     Start: Synchronous code runs first
                 //     End: Synchronous code finished
                 //     process.nextTick callback(Microtask -runs before phases)
                 //     promise.resolve.then callback(Microtask- runs before phases after process.nextTick)
                 //     Timeout call back-2(Timers phase)
                 //     Immediate callback(check phase)
                 //     File read callback(Poll phase)
                 //     Timeout Call back(Timers phase)




                
//       Synchronous runs first before the eventloops starts      
//                             |
//                             | 
//                             |
//                             V
//      process.nextTick and Promise.then callbacks run right after current 
//       synchronous code, before moving to any event loop phase (microtasks run first).
//                             |
//                             | 
//                             |
//                             V
//                  Eventloop iteration #1 :- 
//                        Timers phase
//             // setTimeOut(0) has expired:- So,TimeOut call back-2 runs here
//                             |
//                             | 
//                             |
//                             V
//                     Pending callback phase
//               No pending system-level callbacks here. 
//                    So skip this phase.
//                             |
//                             | 
//                             |
//                             V
//                     Idle/Prepare phase
//                            Skip
//                             |
//                             | 
//                             |
//                             V
//                          Poll phase
//                 Poll is empty here in this case. 
//             Because fs.readFile is slightly longer. It has not finished yet.   
//         If fs.readFile had finished reading the file before Poll phase started,
//                  it would run its callback here. 
//              Here it is not ready. So move to next phase. That is check phase.
//                             |
//                             | 
//                             |
//                             V
//                         Check phase
//                 Runs setImmediate callbacks.
//                             |
//                             | 
//                             |
//                             V
//                        Close callbacks
//                            Skip
//                             |
//                             | 
//                             |
//                             V
//                  Eventloop iteration #2 :- 
//                2000ms has not passed yet.
//                         So skip.
//                             |
//                             | 
//                             |
//                             V
//                          Poll phase
//         fs.readFile has finished now and its callback is ready here.
//                        So it runs
//                             |
//                             | 
//                             |
//                             V
//                         Timer phase
//             After 2000ms, the Timeout Call back(Timers phase) runs now.







//                               Worker Threads 
//                              ---------------
//   Node.js normally runs the JavaScript code on a single main thread,  for handling many I/O tasks efficiently.
//   But some tasks are CPU-intensive (heavy computations like image processing, complex calculations, or data parsing) and can block the main thread, making your app slow or unresponsive.
//   Worker Threads let we create separate background threads to run these heavy tasks in parallel, without blocking the main thread.
//   This is called multithreading :— running multiple threads of code at the same time.


// In simple words:- Node.js had default main single thread which handles most of the tasks. Some heavy tasks like CPU heavy task(which might block the event loop).
//      So Node.js get the assistance of worker thread.  The heavy tasks completed with the help of multithreading of worker thread parallel to main thread. So, the main thread stays free.
//      The worker thread does the heavy work and, when finished, sends the result back to the main thread.







  //                    Difference between threadpool and Worker thread

// Both are multithreading mechanisms used in Node.js.
// But, Thread pool is managed internally by libuv for handling asynchronous tasks like file I/O,
// While Worker Threads are user-created threads that allow you to run JavaScript code in parallel.


  //                           _________________________________
  //                          |                                 |
  //                          |       Main single thread        |
  //                          |            (Default)            |
  //                          |_________________________________|
  //                                           |
  //                                           |
  //                                           |
  //                ___________________________V____________________________
  //               |                                                        |
  //               |                                                        |
  //               |                                                        |
  //               V                                                        V
  //         Async I/O task                                             CPU-task
  //        (file,crypto,DNS etc)                                           |
  //               |                                                        |
  //               | Sent to                                                |  JS code sent to
  //               |                                                        |
  //               V                                                        V
  //     _______________________                                  ______________________
  //    |                       |                                |                      |
  //    |  libuv Thread pool    |                                |     Worker thread    |
  //    |  (4 default threads)  |                                |                      |
  //    |                       |                                |                      |
  //    |* Created and managed  |                                |* Created manually by |
  //    | by libuv internally   |                                |        the user      |
  //    |_______________________|                                |______________________|
  //               |                                                        |
  //               |                                                        |
  //               |                                                        |
  //               V                                                        V
  //     Native thread runs task in the                        Worker threads runs in parallel
  //           background                                                   |
  //       (Native threads are OS                                           |
  //           managed thread)                                              |
  //               |                                                        |
  //               |                                                        |
  //               |                                                        |
  //               V                                                        V
  //    Results handed-off to libuv                                Send results to main thread
  //     eventloop and queued                                             via message
  //         (poll queue)

 


   
  

                 