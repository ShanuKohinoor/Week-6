//                       WORKER THREAD
//                       ------*------



// Main thread creates a worker using new Worker().

// It can send data to worker using worker.postMessage().

// Worker thread receives this data via parentPort.on("message").

// Worker processes the task (e.g., heavy calculation).

// Worker sends back the result using parentPort.postMessage().

// Main thread receives the result using worker.on("message").




        const { parentPort, workerData} = require ('worker_threads')

                 parentPort.on ('message',(num)=>{    // Listen for messages from main thread
                    let sum = 0;
                    for(let i=1; i<= num ; i++){
                      sum += i;
                    }

                  parentPort.postMessage(sum)        // Send result back to main thread
                })
