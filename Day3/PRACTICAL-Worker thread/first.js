//                 This is worker file
// Worker thread works here


const {parentPort,workerData} = require ('worker_threads')
console.log('data passed',workerData);

 parentPort.on('message',(msg)=>{ // Here event is message
      console.log(msg);
      
})

let result = workerData.num*2
parentPort.postMessage (result)                              //  To pass from here to main