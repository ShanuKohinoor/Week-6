//                                            CLUSTER
//                                            ---*---


// Cluster:-Cluster is the  multiple node processes running the same code to handle requests in parallel.


//             * Node.js runs single threaded(CPU core is used per node processes.That means one CPU core is used, even if our machine has 4, 8, or more cores.).
//             * There is a chance to block eventloop when CPU intensive tasks comes.
//             * With the help of cluster, we can sort this.
//             * Cluster module allows to create multiple Node.js processes(workers) that can share same server port.
//             * Each worker can handle incoming requests independently, so the app can use all CPU cores efficiently.
//             * If one worker crashes, other worker continue serving requests.



//  When we use cluster module, Node.js automatically distinguishes two types of processes:-

//                                     Once require cluster module
//                                                |
//                             ___________________|_____________________                
//                            |                                         |
//                            |                                         |
//                            |                                         |
//                            |                                         |
//                            V                                         V
//                      Master process                            Worker processes
//                     (Manages workers)                      (Handle actual requests)

//                * Doesn't handle requests
//                * Main job is to create,monitor &
//                    manage worker processes.




//                                 Master processes
//                                ---------*-------

//   Fork workers :- It creats multiple worker processe using cluster.fork. 
//   Monitor workers :- If a worker crashes, the master can restart it automatically.
//   Distribute requests
//   Central control  :- Can log or perform actions centrally in the master process.


 // in cluster:-
//  Main process is the primary process.
//  child process is the worker process.

// Need cluster module  and OS






// Comparison with real time example

// Thread Pool: assistants inside the same kitchen chopping vegetables quietly (for blocking tasks).

// Worker Threads: assistant chefs inside same kitchen but doing heavy chopping / kneading.

// Child Process: a separate kitchen with its own chef, communicates by passing ingredients.

// Cluster: multiple kitchens working together to serve lots of customers.


