//  In this, the overall concept of behind the scene of Node.js. From the beginning. Connection between each one etc...




//                                   Node.js(runtime environment of Js)
//                                         |     * It allows to run Js outside the browser(like server)
//                                         |     * It has built-in
//                                         |           - V8 engine ( runs Javascript code)
//                                         |           - and libuv(C-library)
//                                         |
//                                         |
//                                  when type :- node app.js
//                                         |
//                                         |------> V8 engine(Executes Js code line by line synchronously)
//                                         |
//                                         | 
//                                         |------> libuv(handles async blocking and non-blocking operations like I/O, timers,networking)
//                                         |   |
//                                         |   |--> Eventloop(which decides when callbacks run)
//                                         |   |          * Used for Non-blocking operatiions like Timers,networking etc
//                                         |   |
//                                         |   |--> Threadpool(hidden workers mainly used for blocking tasks like file system I/O ,crypto tasks)
//                                         |              * Built-in inside libuv
//                                         |              * Has 4 default threads inside it.
//                                         |              * Will work automatically. No need of control manually.
//                                         |
//                                         |
//                                         |------> Worker thread(Js multithreading created by manually with the help of workerthreads_module)
//                                         |
//                                         |
//                                         |------> Child process(run other programs outside the libuv)
//                                         |
//                                         |
//                                         |------> Cluster(run multiple Node.js processes to use all CPU cores)




// Node.js runs JavaScript code using the V8 engine. Whenever asynchronous operations (like I/O, timers, networking) are required, Node.js gives the duty to libuv, which handles them efficiently using its event loop and thread pool.
// When we run node app.js,Node.js uses V8 engine to execute the code. When we have to do any asynchronous function, node.js gets help from libuv to manage that.
// For eg:- when V8 engine sees fs.readfile, Node.js give this to libuv threadpool to handle. Runs non-block. After finishes the task, libuv outs callback in the eventloop queue(pole queue).

//  Node.js runs normally in single threaded. But some heavy tasks like CPU heavy works has a chance to block main thread. such tasks can handle with the help of worker thread. It can require by workerthread module.
//  Main thread send heavy tasks like CPU calculations,loop etc as data to worker thread via message.Solve tasks in worker thread. From workerthread, it sends solved tasks back tomain thread with the help of parentport.
//  From there(main thread),it recieves data with the help of message.on