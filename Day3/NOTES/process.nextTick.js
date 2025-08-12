//                                    Process.nextTick
//                                    ----------------




// process.nextTick is a special method provided by Node.js.
// It set a callback function to run immediately after a normal synchronous operation but before others asynchronous operations like setTimeOut,setInterval ,I/O events etc completes.
//  If a code contains asynchronous function like setTimeOut, a synchronous function, a process.nextTick and a promise, the order of code running and outPut will be like:-
//  It runs before the event loop’s next phase, so it has higher priority than other callbacks.
//  Helps to avoid blocking of main thread.
 


//                         Synchronous
//                             |
//                             | 
//                             |
//                             V
//                       process.nextTick
//                             |
//                             | 
//                             |
//                             V
//                       Microtask queue(promise)
//                             |
//                             | 
//                             |
//                             V
//                       Callback queue(setTimeout)
//                             |
//                             | 
//                             |
//                             V
//                         Callstack





//    Eg:-

       console.log('Start');          //Synchronous 
       


      setTimeout(()=>{
        console.log('Inside the set Timeout');    //Asynchronous(setTimeOut) --> Call back queue
        
      },2000)



      setTimeout(()=>{
        console.log('Inside the set Timeout 2');           //Asynchronous(setTimeOut) --> Call back queue
        
      },0)



      Promise.resolve().then(()=>{
           console.log('Inside the promise');      //Asynchronous(Promise) --> Microtask queue

           
      })


      console.log('Middle');           //  Synchronous



      process.nextTick(()=>{
        console.log('Inside the process');         // process.nextTick:- will run first
        
      })


      console.log('End');       // Synchronous



      
      //                Output will be:-
      //                         Start
      //                         Middle
      //                         End
      //                         Inside the process
      //                         Inside the promise
      //                         Inside the set Timeout 2
      //                         Inside the set Timeout