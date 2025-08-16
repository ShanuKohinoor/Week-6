//                                    Process.nextTick
//                                    ----------------




// process.nextTick is a special method provided by Node.js.
// It set a callback function to run immediately after a normal synchronous operation but before others asynchronous operations like setTimeOut,setInterval ,I/O events etc completes.
//  It runs before the event loop’s next phase, so it has higher priority than other callbacks.
//  Helps to avoid blocking of main thread.
//  If a code contains asynchronous function like setTimeOut, a synchronous function, a process.nextTick and a promise, the order of code running and outPut will be like:-
 


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






//                                          USES:-
//                                          --*--


//  1. Run after the current code:-
//              * Runs a function right after the current synchronous code finishes, but before other asynchronous tasks like timers or I/O.

//  2. Avoid blocking the eventloop :-
//              * If we have long synchronous oprations, we can split works into small chunks  with the help of process.nextTick. Hence we can avoid blockage of mainthread

//   3. Execute High-Priority Callbacks:-
//              * Callbacks scheduled with process.nextTick are executed before Promise microtasks and timers.
//              * Useful when we want critical code to run first in the next iteration. 

//   4. Safe Recursion/ Repeating tasks without Stack Overflow:-
//              * In normal recursion, if we call each function call is pushed into the call stack. Hence callstack grows and becomes overflow.
//              * But by using process.nextTick, callstack doesn't grow. Because each function call is new to the call stack.
//              * Eg:- 

//                       In normal recursion:- 
                                  function countDown(n){
                                    if (n>0) {
                                       console.log(n);
                                       countDown(n-1)
                        
                                    }
                                  }
                                  countDown(5);
                                          // Here each call wait for the next call to finish. 
                                          // If n is very large, the call stack grows too big(looks like too many boxes(piles)). Results in overflow.

//                        In process.nextTick :-
                                   function countDown(n){
                                     if (n>0){
                                       console.log(n);
                                       process.nextTick(()=> countDown(n-1))
                                     }
                                   }
                                  countDown(5);

                                          // Here after current function finishes, process.nextTick schedules the next recursive call to run asynchronously.
                                          // That means, callstack doesn't grow here. Because each call is new to stack here.


//  4.   Internal Library/Framework Use
//                 * Node.js core libraries and many frameworks use process.nextTick to ensure callbacks run immediately after the current operation.                                        
//                 * This is used to make sure critical callbacks run immediately after the current operation finishes, before any other asynchronous code like timers or I/O.







//                                      Drawbacks / sideeffects of process.nextTick
//                                      -------*-------------*--------------*------

// Eventloop starvation:-
//           * Node.js runs on a single thread.
//           * The event loop is used for handling asynchronous operations like timers (setTimeout), I/O (reading files, network requests), and callbacks.
//           * process.nextTick always runs before the event loop moves to the next phase.
//           * If we schedule too many process.nextTick callbacks, Node.js keeps running them over and over without letting timers or I/O callbacks execute.
//           * When some code keeps running repeatedly and prevents the event loop from moving to the next phase, so other async operations get delayed.
//                  This is the starvation of eventloop means








      //                     Difference between process.nextTick and setImmediate
      //                     ------*-------*-----------*----------*------*-------


      // process.nextTick :- Runs before next eventloop phase. After all synchronous.
      // setImmediate() :- runs in the next iteration of eventloop(after I/O callbacks)
  