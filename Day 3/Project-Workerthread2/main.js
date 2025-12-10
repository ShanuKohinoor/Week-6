//                        MAIN THREAD
//                        -----*-----

// Main thread creates a worker using new Worker().

// It can send data to worker using worker.postMessage().

// Worker thread receives this data via parentPort.on("message").

// Worker processes the task (e.g., heavy calculation).

// Worker sends back the result using parentPort.postMessage().

// Main thread receives the result using worker.on("message").




          const {Worker} = require("worker_threads")  //which means import the Worker class from Node.js’s built-in worker_threads module. So we can create new threads. 

          const worker = new Worker('./worker.js') // Create a new worker

          worker.postMessage(1000) // send first one
          worker.postMessage(50000)  // send second one
        

          worker.on('message',(result)=>{// Listen for response from worker
             console.log('Result from worker:',result);
             
        })


             //  OutPut :- Result from worker: 500500
             //            Result from worker: 1250025000