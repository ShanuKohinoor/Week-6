//                                    Behind the scene
//                                    ----------------


//                     When we write a code and type like(node file.js) to run
//                                         |
//                                         | Node initialise V8 engine, load libuv and Node core modules.
//                                         |
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
//                          
//                                       |
//                                       | 
//                                       |
//                                       V
//                                   Eventloop
//                                    * The Event Loop (libuv) cycles repeatedly:-
//                                     Timers --> Pending callbacks -->Poll phase
//                                      --> Check phase --> Close callbacks
//                                      
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
//           * This is like the brain that understands and runs JavaScript.
//           * Made by Google (used in Chrome too).
//           * It compiles JavaScript into machine code. So our computer can run it.
//           * Handles Call Stack, Microtasks, and core JS features (numbers, strings, arrays, promises, etc.).

// Node.js APIs + Libuv :–
//           * These are extra superpowers that JavaScript alone doesn’t have (like reading files, networking, timers).
//           * Provided by Node.js, not by the browser.
//           * Node.js uses libuv as a helper to handle background tasks like file access, network requests, timers, and I/O polling.
//               So our JavaScript can run without waiting.








 