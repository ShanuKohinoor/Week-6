

//                                     CALLBACK FUNCTION
//                                     -----------------



// Callback:-  
//     DEFINITION:- In Js and Nodejs,Callback is a function passed as an argument to another function. 
//        That second function calls it later, usually when an async task is done 
//        (like reading a file or waiting for time).
// Eg:-


         function greetUser(name,callback) {
            console.log('Hi,'+name);
            callback();   
         }

         function askQuestion(){
            console.log('How are you?');  
         }
         greetUser('Shanu', askQuestion)


   // Eg 2 :- Node.js callback example with file



      const fs = require('fs')

      fs.readFile('callback.txt','utf8',(err,data)=>{ 
                                                               // callback.js:- file name
                                                               // utf8:-UTF-8 is a common way to encode text in files.
                                                               //         - Files stores data as bytes(binary data)                           |
                                                               //         - fs.readFile() reads these bytes.
                                                               //         - By default, it returns a binary bytes, not text.
                                                               //         - If we write 'utf8', Node.js converts these binary data bytes into readable text. That means, utf8 helps to get normal string instead of raw bytes.
                                                               //            * if we wont use utf8, then we will get output(the content inside callback.text file) like binary data like this:- 
                                                               //                    Output:- 
                                                               //                             File content: <Buffer 0d 0a 0d 0a 0d 0a 48 69 2c 20 69 74 73 20 6d 65 20 53 68 61 6e 75 2e 0d 0a 49 20 61 6d 20 61 20 73 74 75 64 65 6e 74 20 6f 66 20 45 6f 6e 69 78 20 73 ... 8 more bytes>
                                                               //            * if we use utf8, we will get the output (the content inside callback.text file):-
                                                               //                     Output:-
                                                               //                             File content: Hi, its me Shanu.
                                                               //                             I am a student of Eonix solution.     

                                                         

                                                               //function(err,data):- Callback function

         if(err){
            console.log('Error:', err);
            return;
         }
         console.log('File content:', data);
         

      })



//  Node.js handles things like:
//             * reading files
//             * calling APIs
//             * accessing databases
//      These all will take time. So, with the help of cb function, 
//               * Node.js starts the task and doesn't wait for it to finish.
//               * Instead, it continues doing other work.
//               * When the task is finally done, the callback function is automatically called,with the results(like file data, API response, etc.).
//               * This helps Node.js fast and handle many tasks at the same time without blocking the program.




//                            CALLBACK HELL
//                            -------------

// DEFINITION:- Callback Hell is a situation in asynchronous programming where multiple nested callback functions are used, making the code difficult to read, debug, and maintain.
//                    * Also know as PYRAMID OF DOOM.

// Drawbacks of callback hell are:- 
//                 *  Hard to Read 
//                 *  Hard to Maintain
//                 *  Error Handling Becomes Messy 
//                 *  Difficult to Reuse Logic 
//                 *  Debugging is Tough


// To avoid callback hell:-
//             * Use Promises    :- Refer promise.js
//             * Use async/await  :- Refer asyncawait.js
//             * Break code into smaller named functions




// Eg for callback hell in Node.js:-
      fs.readFile('./CallbackFiles/file1.txt','utf8',(err,data1)=>{       // Text content for this is inside a subfolder named file1.txt inside a folder named CallbackFiles.   
         if (err) {
            console.log('Error1:', err); 
            return;                                           
         }

         fs.readFile('./CallbackFiles/file2.txt','utf8',(err,data2)=>{     // Text content for this is inside a subfolder named file2.txt inside a folder named CallbackFiles
             if(err){
              console.log('Error2:',err);    
              return; 
             }

            fs.readFile('./CallbackFiles/file3.txt','utf8', (err,data3)=>{    // Text content for this is inside a subfolder named file3.txt inside a folder named CallbackFiles
               if(err){
                 console.log('Error3:',err);  
                 return; 
               }

               fs.readFile('./CallbackFiles/file4.txt','utf8',(err,data4)=>{     // Text content for this is inside a subfolder named file4.txt inside a folder named CallbackFiles
                   if(err){
                       console.log('Error4:',err);  
                       return;    
                      }
                       console.log('All files read successfully');
               })
            })
         })
      })



// We can create file1.txt,file2.txt,file3.txt and file4.txt inside a folder outside a folder...If we create a folder, we must mention the file path in our code.Eg:-
// If we dont create separate folder for txt files, we write code like this:-
 
//       fs.readFile('file1.txt','utf8',(err,data1)=>{      (Path :- inside day1.js--> file1.txt...so write like this)
//           if (err) {
//            console.log('Error1:', err); 
//            return;
//         }       


// If we create separate folder for txt files, we write code like this:-

//       fs.readFile('./CallbackFiles/file1.txt','utf8',(err,data1)=>{    (path:- inside day1.js --> CallbackFiles(folder)--> file1.txt(subfolder))
//         if (err) {
//            console.log('Error1:', err); 
//            return;
//         }
