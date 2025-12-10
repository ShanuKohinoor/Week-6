//                                      async/await 
//                                      -----------


// asynch await is a feature in Node.js (from version 7.6 and above) that helps to write code in a clean and easy way
// It works with the functions that return a promise. like,
//         *  fs.promises(used for reading and writing files )
//         *  fetch(using node-fetch package to call APIs)
//         *  axios (another tool to make API requests)

//  await only works inside an async function.

//  The function await must return a Promise.




// Syntax:-

      async function functionName(){
        try {
            const result = await asyncFunction();
            console.log(result);
            
        } catch(error){
            console.log('Error:',error);
                                         // We can also write   console.error('Error reading file:', error);
                                         //        * Used to write print errors or warning messages.
                                         //        * It shows output in red colour.
        }
      }

      functionName();





//  Eg:-    



    const fs = require('fs').promises;

    async function readFile(){
        try{
            const data = await fs.readFile('async.txt','utf8');
            console.log('File content:', data);
        
        } catch (error){
          console.error('Error Reading File:',error);
        
        }
    }

    readFile();
                           // Output:- 
                           //      File content: Welcome....


                          //        Hi, This async file...





  // Why use asyncawait??

       //  Async await looks like normal synchronous code.
       //  Easy to read and understand when there is multiple tasks,loops etc
       //  Error handling is with try...catch.











//      Feature                      .then()                                       async/await                          
//      -------                      -------                                       -----------
//     Code Style             Chain-style (.then().then())              Step-by-step, like normal code           
//     Readability            Harder to read if too many .then()        Easy to read, even with many async calls 
//     Error Handling         Use .catch()                              Use try...catch                        
//     Use :-                 One or two quick async tasks              Many async steps or cleaner structure    
//      Function Needed       No special function needed                Must be inside an `async` function     
   
