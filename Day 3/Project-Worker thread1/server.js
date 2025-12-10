
//  Main thread works here

const {Worker} = require ('worker_threads')                     // Take worker class from worker threads
const worker = new Worker('./first.js',{workerData:{num:5}})    // create new thread(worker instance)
                           // 2 Arguments:- 
                           //         *  1:- File name
                           //         *  2:- Data
worker.postMessage ('Message from main thread')





worker.on('message',(data)=>{
    console.log('Data from worker thread',data);
    
})