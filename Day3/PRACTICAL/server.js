
             // Eg for Common js


// console.log('server.js start')
// require('./first.js')
// console.log('server.js after first');


                    //  Output:-
                    //          server.js start
                    //          first.js start
                    //          second.js start
                    //          Third.js running
                    //          Second js after Third
                    //          first.js after second
                    //          server.js after first


             // Eg for ES Module

 console.log('server.js start')
import  './first.js'
console.log('server.js after first');

                    //    Output
            //                  Third.js running
            //                  second.js start
            //                  Second js after Third
            //                  first.js start
            //                  first.js after second
            //                  server.js start
            //                  server.js after first

   
            





  // Common js is synchronous.         
  // Es Module is asynchronous.
  //  In case of ES module static will work first.
           