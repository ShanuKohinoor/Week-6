//                                    Behind the scene
//                                    ----------------


//                     When we write a code and type like(node file.js) to run
//                                         |
//                                         | Node initialise V8 engine, load libuv and Node core modules.
//                                         |    * Node core modules are built-in modules,that comes with node.Js
//                                         V
//                           Node read file.js from disk(synchronously)
//                                         |
//                                         | Node text passed to V8
//                                         |
//                                         V
//                              GLOBAL EXECUTION CONTEXT
//                                   * Memory creation phase 
//                                   * Code execution phase
//                                         |
//                                         | 
//                                         |
//                                         V
//                             a) Memory creation phase
//                                * V8 creates memory for the codes we written.
//                                * For varaiables, function,objects,array etc.
//                                  - Var:- variables are hoisted(set to undefined)
//                                  - let/const:- Created. But in the TDZ(Temporal dead zone)
//                                  - Function:- Functions are created
//                                  - Object,array:- Heap memory
//                                        |
//                                        | 
//                                        |
//                                        V
//                            b) Code execution phase
//                               * When code execution starts, after memory creation phase,
//                                 - Synchronous codes runs on the call stack right away.
//                                 - Asynchronous calls (Eg:- setTimeout, fs.readFile, http.request, Promise)
//                                    are handed off to Node APIs / libuv — they do not block the call stack.
//                                       |
//                                       | 
//                                       |
//                                       V
//                                   Eventloop
//                                    * The Event Loop (libuv) cycles repeatedly:-
//                                     Timers --> Pending callbacks --> Idle/preparing phase/ 
//                                     --> Poll phase --> Check phase --> Close callbacks
//                                       |
//                                       | 
//                                       |
//                                       V
//                             Microtasks and Macrotasks
//                              * Microtasks
//                                  - process.nextTick() runs before Promise microtasks)
//                                  - Promises: .then(), .catch(), .finally() and queueMicrotask()
//                                Microtasks run immediately after the current running code finishes 
//                                  and before the Event Loop moves to the next macrotask.
//                                      |
//                                      | 
//                                      |
//                                      V
//                              * Macrotasks/ Event tasks / Callback queue
//                                  - Timers, I/O callbacks, setImmediate, setInterval, etc.
//                                      |
//                                      | 
//                                      |
//                                      V
//                        Thread Pool & Work Queue (for blocking/CPU tasks)
//                         * Libuv maintain work queue for heavy works.
//                         * Thread pool (default 4 threads) picks up these tasks and runs them in parallel. 
//                         * When a worker finishes, it queues the callback, back to the Event Loop.
//                             So V8 can run it on the main thread.
//                                      |
//                                      | 
//                                      |
//                                      V
//                            I/O polling(poll phase)
//                               * The Event Loop’s poll phase waits for and checks readiness of I/O:-
//                                    - Reading/writing a file
//                                    - Waiting for data from the internet
//                                    - Talking to a database
//                               * When I/O is ready (data arrived, file descriptor ready), 
//                                     callbacks are queued for execution.
//                                      |
//                                      | 
//                                      |
//                                      V
//                            Signal handling and child process
//                              * libuv listens to OS signals (e.g., SIGINT from Ctrl+C)
//                                  and emits events into the Event Loop.
//                              * Child processes (spawn/fork) are managed and 
//                                  their events are also routed back to the Event Loop.
//                                      |
//                                      | 
//                                      |
//                                      V
//                             Garbage collection and memory
//                                      |
//                                      | 
//                                      |
//                                      V
//                                Program exit
//                                 * Node will run till there are:-
//                                    - Pending Timers
//                                    - Pending I/O calls
//                                 * When nothing is left to do, 
//                                    the event loop stops and the process exits.

   








//                          JS Engine & Node Internals
//                           V8 engine + Node.js APIs
//                           ------------------------

// V8 engine:-
//           * Brain of JS:- 
//                - This is like the brain that understands and execute JavaScript.
//           * Made by Google (used in Chrome too).
//           * It compiles JavaScript into machine code. So our computer can run it.
//                 - Converts JavaScript into machine code, which the computer can run very fast.
//           * Handles Call Stack, Microtasks, and core JS features (numbers, strings, arrays, promises, etc.).
//           * Memory Management:-
//                 - Handles garbage collection (removes unused memory automatically).
//           * Runs synchronous JavaScript code using the call stack.
//                 - Delegates asynchronous tasks (I/O, timers) to Node.js APIs / libuv.








//                                                 Node.js APIs
//                                                 ---*----*---

//           * These are extra superpowers that JavaScript alone doesn’t have (like reading files, networking, timers).
//           * JavaScript alone (in the browser) cannot do everything. Eg:-
//                 - Read/write files on your computer (Not allowed in browsers)
//                 - Create a server  (Browsers can’t do that)
//                 - Perform networking (like TCP/HTTP requests) 
//                 - Set timers or handle asynchronous I/O more efficiently 
//           * Node.js provides APIs to do these things. These APIs are built-in modules, like:
//                 - fs :- File system operations (read/write files)
//                 - http :- Create servers & handle HTTP requests
//                 - timers :- setTimeout, setInterval
//                 - process :- Access environment, arguments, exit codes

//      Eg:-
                           const fs = require('fs');

                             fs.readFile('sample.txt', 'utf8', (err, data) => {
                             if(err) throw err;
                             console.log(data);
                             });     //  Here, JavaScript alone cannot read a file, but with the help of Node.js API (fs) runs.

//           * Provided by Node.js, not by the browser.




//                                              libuv
//                                              --*-- 
//           * libuv is like a task manager.
//           * Node.js uses libuv as a helper to handle background tasks like file access, network requests, timers, and I/O polling.
//               So our JavaScript can run without waiting.
//           * Node.js is a single-threaded( runs js one at a time.) 
//                 - But many tasks like reading files or network requests are slow (they take time to finish).
//                 - So, Node.js uses libuv (a C library) to handle these background tasks so JavaScript can continue running without waiting.
//                           * Because libuv has:- 
//                                 - Threadpool with multiple threads,
//                                 - libuv manages I/O tasks in background,
//                                 - When tasks finish,it puts results back in the eventloop to run callbacks






//                                                        NODE ENVIRONMENT
//                                                        ----------------

//  ______________________________________________________________________________________________________________________________________________
// |                            _____________________________                                                                                     |
// |                           |_____________________________|  nextTick queue(Microtask queue)                                                   |
// |                                                                                                                                              |          
// |                                                                                                                                              |
// |                              JS ENGINE(V8)                                                   libuv                                           |
// |       ---------------------------------------------------     ------------------------------------------------------------------------       |
// |       |                                                 |     |   Eventloop                                                          |       |
// |       |   ____________                                  |     |                           _____________________                      |       |
// |       |  |            |       |     |    |      |       |     |   * Timers               |_____________________| Timer phase         |       |
// |       |  |            |       |     |    |      |       |     |                                Timer queue                           |       |
// |       |  |            |       |     |    |      |       |     |   * I/O Polling           ______________________                     |       |
// |       |  |____________|       |     |    |      |       |     |     (watch list)         |______________________| Pending phase      |       |                   
// |       |  |            |       |_____|    |      |       |     |                           Pending Callback queue                     |       |
// |       |  |            |         Heap     |      |       |     |   * Thread pool                                                      |       |
// |       |  |            |        Memory    |      |       |     |    | | | | | | | |        ______________________                     |       |
// |       |  |____________|                  |______|       |     |    |_| |_| |_| |_|       |______________________| Idle phase         |       |
// |       |       GEC                       Call stack      |     |                             Idle/ Prepare queue                      |       |
// |       |                 _____________________________   |     |    * Signal Handling      ______________________                     |       |
// |       |                |_____________________________|  |     |                          |______________________| Poll phase         |       |
// |       |                 Promise queue(Microtask queue)  |     |    * File system               Poll queue                            |       |
// |       |                                                 |     |        operator           ______________________                     |       |
// |       ---------------------------------------------------     |                          |______________________| Check phase        |       |
// |                                                               |     * Process Handling         Check queue                           |       |
// |                                                               |                           ______________________                     |       |
// |                      Node APIs                                |                          |______________________| CC Phase           |       |
// |      -----------------------------------------                |                             Close callback queue                     |       |
// |      |          * setTimeout                 |                |                                                                      |       |
// |      |          * fs                         |                |                                                                      |       |
// |      |          * crypto                     |                -----------------------------------------------------------------------        |
// |      |                                       |                                                                                               |
// |      -----------------------------------------                                                                                               |
// |                                                                                                                                              |
// |                                                             Global objects                             C++ bindings                          |
// |                                                     ----------------------------         ------------------------------------------          |
// |                                                     |                          |         |  --> bridge js APIs and low-level      |          |
// |                                                     |       * process          |         |  C++ system calls                      |          |
// |                                                     |       * __dirname        |         |   ( connects Node APIs to libuv & OS)  |          |
// |                                                     |       * __filename       |         |                                        |          |
// |                                                     |       * Buffer           |         |                                        |          |
// |                                                     |       * console          |         |   Bridge: js <--> C++ <--> OS          |          |
// |                                                      ---------------------------         ------------------------------------------          |
// |                                                                                                                                              |
// |                                                                                                                                              |
// |                                                                                                                                              |
// |______________________________________________________________________________________________________________________________________________|








//                     Comparison of GLOBAL OBJECT,NODE CORE MODULES AND NODE APIs
//                     ---------*----------*--------*----------*---------*--------

// Global object:-
//            * In Node.js, it is like window in browser.
//            * It contain things everywhere.
//            * So need of require or import. 
//            * Eg:-  
//                    - console
//                    - __dirname, __filename
//                    - process
//                    - setTimeout, setInterval
//                    - Buffer


// Node core modules:-
//           * Built in libraries comes with Node.js installation.
//           * Must import them using require or import.
//           * Eg-:
//                - 1)  fs (file system)
                        const fs = require("fs");   

//                - 2) http
                        const http = require("http")

//                - 3) path
                        const path = require("path")

//                - 4) os
                        const os = require("os");   


// Node APIs:-
//           * Node.js also provides Node APIs(Application Programming Interface).
//           * These APIs use the global object + Node core modules to perform the real tasks. 
//           * APIs are like ready-made functions/methods exposed by Node(Functions & methods provided by Node for tasks.).      
//           * They are the actual functions/methods we call, exposed by Node using globals + core modules.
//           * Comes from Core Modules or Globals
//           * Eg:-
//                 - 1)  File System API :- fs.readFile(), fs.writeFile().
//                 - 2)  HTTP API :- http.createServer().
//                 - 3)  Path API :- path.join(), path.resolve().
//                 - 4) Timers API :- setTimeout(), setInterval().
//                 - 5) Events API :- EventEmitter class.