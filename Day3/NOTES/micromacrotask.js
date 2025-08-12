//                 Microtask Queue vs Event Queue
//                 ------------------------------

//  In Node.js, Tasks are happening in two main places:-
//     1. Microtast queue
//     2. Macrotask queue/Event queue

//                         Microtask queue
//                         ---------------
//  These are very high priority tasks.
//  Runs immediatelyy after currently running javascript finishes,before the event loop moves to the next phase.
//  Eg:-
//          * process.nextTick() (Node.js only)
//          * Promise.then(), .catch(), .finally()
//          * queueMicrotask() (browser & Node.js)


//                     Macrotask queue/Event queue
//                     ---------------------------
// In Node.js, after synchronous code and microtasks finishes, the event loop look into a queue  that stores the callbacks waiting to be executed.That is macrotask queue
//            * It has the callbacks,that belongs to the different phases of eventloops. Such as,

// Eg:- 
//          * setTimeout()
//          * setInterval()
//          * setImmediate()
//          * I/O callbacks (like fs.readFile callback)





//                1. Run synchronous code.
//                             |
//                             | 
//                             |
//                             V
//            2. process.nextTick() queue → run all.
//                             |
//                             | 
//                             |
//                             V
//            3. Promise/microtask queue → run all.
//                             |
//                             | 
//                             |
//                             V
//            4. Move to Event Loop phases:
//                a) Timers (setTimeout, setInterval)
//                             |
//                             | 
//                             |
//                             V
//                    b) I/O callbacks
//                             |
//                             | 
//                             |
//                             V
//                      c) Poll phase
//                             |
//                             | 
//                             |
//                             V
//                d) Check phase (setImmediate)
//                             |
//                             | 
//                             |
//                             V
//                      e) Close callbacks
//                             |
//                             | 
//                             |
//                             V
//                        5. Repeat.



//                     process.nextTick()
//                     ------------------
//        * It is not a part of normal standard microtask queue.
//        * It has its own special queue in Node.js.
//        * Runs before Promise.then() callbacks


//               Promise.then() and other microtasks
//               -----------------------------------
//        * Runs after process.nextTick()queue is emptied