//                               Promises – .then(), .catch()
//                               ----------------------------

 
     const fs = require('fs').promises

     fs.readFile('async.txt','utf8')
     .then(data=>{
        console.log('File content is',data);    
     }) 
     .catch(error=>{
        console.log('Error reading file is',error);
     })

     //    Output:-
                      // File content is Welcome....

                      // Hi, This is async file...








// ?? When .then .catch use?
//            * When use quick and single async task.
//            * When dont want to define async function.
//            * If we are writing small utility scripts or quick file/API operations.


// ?? When not to use??
//            * When multiple async operations in a row
//                    (e.g., read file --> process data --> write to new file)
//            * It looks messy and hard to read. like this:-

               fs.readFile('file1.txt', 'utf-8')
  .then(data1 => {
    return fs.readFile('file2.txt', 'utf-8')
      .then(data2 => {
        return fs.readFile('file3.txt', 'utf-8')
          .then(data3 => {
            console.log('All files read');
          });
      });
  });

//            * When we want the clean code , readable, and easy to debug

//            * If inside an async function already — use await instead of mixing with .then()

// In modern Node.js projects, developers prefer async/await for better readability and error handling, especially when doing more than one async task.

          






//                           Try–Catch inside async functions
//                           --------------------------------

