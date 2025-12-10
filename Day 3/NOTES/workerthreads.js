
//  'Main thread' works javascript normally
//   Sometimes heavy works block the main thread.
//   To avoid this problem, we can use :- 
//            * Worker thread or
//            * Child process




//                                    Worker threads
//                                    -------------

//   Worker thread runs parallelly with main thread.
//   Separate v8 engine, call stack etc
//   To communicate with the help of messages.
//   To create workers node.js provide Module named worker thread.



//                 *        Worker thread
//                                |
//                                |
//                                |
//                                v
//                 * Inside worker thread there is worker class.
//                                |
//                                |
//                                |
//                                v
//                 * Create new worker instance



//  Worker file:-
//          *  It is a separate js file to run worker thread.
//          *  The worker thread won't share variables with main thread.


//  Parent port:-
//         *  Communication channel between main thread and worker thread.
//         *  Used to send message between them.


//  Worker data:-
//         *  Data send from the main thread.










//                               __________________
//                              |                  |
//                              |    Main thread   |
//               _______________|                  |_______________
//              |               |__________________|-----          |
//              |                       ↑               |          |When there is heavy tasks,
//              |                       |               |          |there is a chance to block
//              |                       |          Continues with  |the main thread. So create
//              |                       ↑           other tasks    |a worker new thread to 
//              |                       |                          | avoid this.
//              |                Recieve results from              | * Worker data send to
//              |                  worker thread                   |     worker thread.
//              v                       ↑                          v
//    _________________                 |                 _____________________
//   |                 |                |                |    Worker thread    |
//   |  Works Normally |                |                |                     | 
//   |_________________|                ↑                | * Gets workerdata   |
//                                      |                |    from main thread |
//                                      |                |                     |
//                                      |                | * Do the heavy task |
//                                      |                |    here.            |
//                                      ↑                |_____________________|
//                                      |                          |
//                                      |                          |       ___________________
//                                      |   send result back via   |      |   Worker file     |
//                                      |    parentport            |      |                   |
//                                       <---------------<----------      |* It is separatem  |
//                                                                        |     js file       |
//                                                                        |* Runs the worker  |
//                                                                        |     thread        |
//                                                                        |___________________|
                                








//                                  HOW WORKER THREAD WORKS ??
//                                  -----*-------*------*-----


//                           Main thread creates a worker using new Worker().
//                                               |
//                                               |
//                                               |
//                                               v
//                           It can send data to worker using worker.postMessage().
//                                               |
//                                               |
//                                               |
//                                               v
//                          Worker thread receives this data via parentPort.on("message").
//                                               |
//                                               |
//                                               |
//                                               v
//                          Worker processes the task (e.g., heavy calculation).
//                                               |
//                                               |
//                                               |
//                                               v
//                          Worker sends back the result using parentPort.postMessage().
//                                               |
//                                               |
//                                               |
//                                               v
//                          Main thread receives the result using worker.on("message").






//                                  Worker pool:-
//                                  ------*------

//        * Instead of creating new worker for every task, can create worker pool.
//        * We can reuse it.





//           Node.js main thread creates a pool of worker threads.
//                                |
//                                |
//                                |
//                                v
//                   Each worker waits for a task.
//                                |
//                                |
//                                |
//                                v
//                   When a CPU-heavy task comes:-
//                                |
//                                |
//                                |
//                                v
//              Main thread sends the task to an available worker.
//                                |
//                                |
//                                |
//                                v
//                  Worker performs the task in parallel.
//                                |
//                                |
//                                |
//                                v
//               Worker sends the result back to the main thread.
//                                |
//                                |
//                                |
//                                v
//               Worker goes back to the pool ready for next task.