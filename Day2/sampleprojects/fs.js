// readfile,write file and append file

const { log } = require('console');


               const fs = require('fs').promises


//                            write file
//          

      async function writeToFile () {
        try { 
          await fs.writeFile('sample.txt','This is my first File')
           console.log('File written successfully');
        } catch(err) {
            console.log('Error reading File:',err);
            
        }
           
       }

        async function readFromFile(){
          try {
          const Data = await fs.readFile('sample.txt','utf8')
          console.log('File Content:',Data);
          
         } catch(err) {
           console.log('Error reading:',err);
           
         }
        }
        
        async function appendToFile() {
          try{
            await fs.appendFile('sample.txt','\n This is appended file')
            console.log('File appended Successfully');
            
          } catch(err) {
            console.log('Error appending File:',err);
            
          }
        }

       // writeToFile()
       // appendToFile()
       // readFromFile()  
         // If we read file after appended, then only appended file will console. 
                          // Then we will get the output in console like thios:-
                               //  File written successfully
                               // File appended Successfully         
                               // File Content: This is my first File
                               // This is appended file

         // If i call append after read, like this 

                        //   writeToFile()
                        //   readFromFile()         
                        //   appendToFile()


                            //I will get:-
                               //  File written successfully
                               // File appended Successfully         
                               // File Content: This is my first File



       //async function main() {
  //await writeToFile();     // Wait until file is written
  //await appendToFile();    //  Wait until append is done
  //await readFromFile();    // Finally, read the full content
//}

//main();




//   • Working with Directories:-
//    ---------------------------


 //       ◦ readFile, writeFile, appendFile.  
 


 // //        ◦ fs.mkdir() – Create folder (with { recursive: true })
 //           ------------------------------------------------------- 

 //   fs.mkdir helps to creat new directory.
 //   { recursive: true } allows it to create nested folders.
 //  after creating directory we can read files inside that folder with the help of fs.readdir

            async function createFolder(){
              try {
                await fs.mkdir('./myfolder',{recursive:true})
                await fs.mkdir('./myfolder3',{recursive:true})
                await fs.mkdir('./myfolder4',{recursive:true})
        
                console.log('3 Folders Created');
                
              } catch(err) {
                console.log('Error Creating Folder:',err);
                
              }
            }

 //  createFolder()  
             // now a folder named 'myfolder' automatically created.


 //  To add files inside this folder we can use fs.writeFile:-
            async function writeFiles() {
              try {
                await fs.writeFile('myfolder/file1.txt','Welcome to file 1')
                await fs.writeFile('myfolder/file2.txt','Welcome to file 2')
                await fs.writeFile('myfolder3/file3.txt', 'This file is to delete later')
              
                console.log('Three welcome Files created');
                
              }  catch(err) {
                console.log('Error Folder:',err);
                
              }
            }      

      //  writeFiles()
// Now two files created inside myfolder. 

//        ◦ fs.readdir() – Read contents of a folder
//         -----------------------------------------
// Reads all files and folders inside a directory.
// It returns an array of names (as string).

//


          async function listFiles(){
            try {
             const files =  await fs.readdir('myfolder');
             console.log('Files in Folder:',files);
             
            } catch(err) {
             console.log('Error Reading Folder:',err);
             
            }
          }

           // listFiles() 
               // output:-  Files in Folder: [ 'file1.txt', 'file2.txt' ]


 //       ◦ fs. rmdir() – Delete folder (or fs.rm() with { recursive: true })
 //       -------------------------------------------------------------------
  // Helps to remove empty folders
  // Throws err if it is non-empty folder(Throws an error if the folder contains files or subfolders.)

           async function deleteFile(){
            try {
                  // fs.rm('myfolder3', { recursive: true, force: true })
                                     //if we write code like this, await fs.rm('myfolder3',{recursive:true}) // Delete folder with files(). Use fs.rm for folder with files.

                   //console.log('Folder 3 deleted');

              await fs.rmdir('myfolder4')  // Delete empty folder(can use rmdir or rm without recursion)
              console.log('Folder 4 deleted');
              
            } catch(err) {
              console.log('Error in deleting folder 3:', err);
              

            }
           }
           // deleteFiles()









//                            MINI PROJECT
//                            ------------

// Creates a folder named test_folder.

// Reads the contents of the folder (should be empty at first).

// Creates a sample file inside the folder (test_folder/sample.txt).

//Reads folder contents again (now should show the file).

//Deletes the file.

//Deletes the folder.











//                     • File Management:
//                     ------------------



//             • fs.rename() – Rename files
//             ----------------------------


// Syntax:- await fs.rename(oldPath,newPath)
            async function renameFile(){
              try{
                await fs.rename('sample.txt','renamed-sample.txt')
                console.log('File renamed successfully');
                
              } catch(err) {
                console.log('Error renaming file:',err);
                
              }
            }
            // renameFile()

                        //  If oldPath doesn't exist, we will get an error.

                        // If newPath already exists, it will be overwritten.







//              • fs.unlink() – Delete files
//              ----------------------------


//  Syntax:- 


             async function unlinkFile() {
                try {
                   await fs.unlink('renamed-sample.txt');
                   console.log('File deleted successfully');
                   } catch (err) {
                      console.error('Error deleting file:', err);
                   }
              }

//  unlinkFile();






//  Difference between  fs.unlink() and fs.rmdir()

//    Feature             	fs.unlink()	             fs.rmdir()                     fs.rm()
//    -------               -----------              ----------                     -------

//  It removes	             Files only       	   Empty directories             Files and directories
//                         (Delete a file)	      (Delete an empty folder)




//                          • fs.promises:
//                          --------------
 //  • Use await fs.promises.readFile(...) pattern
 //  ---------------------------------------------
//  • Handle with try–catch blocks
//   -----------------------------

//fs.promises:- It is promise-based version.
//        *  It provides asynchronous methods that return Promises.
//        *  Instead of callbacks, use async await here. So, can easily avoid callback hell.

// Syntax:- const fs = require('fs').promises;

//                   Method	                      Description
//                  --------                      -----------
//            fs.readFile(path)	              Reads the content of a file
//            fs.writeFile(path, data)	      Writes data to a file
//            fs.appendFile(path, data)	      Appends data to a file
//            fs.rename(oldPath, newPath)	    Renames a file
//            fs.unlink(path)	                Deletes a file
//            fs.mkdir(path)	                Creates a new directory(folder)
//            fs.rmdir(path)	                Deletes a directory(folder)
//            fs.readdir(path)	              Reads the contents of a directory(folder)



// Must use try..catch. Because these methods return Promises, errors must be handled using try...catch to avoid unhandled promise rejections.

// Eg for fs.promise :-
//  const fs = require('fs').promises;

//               async function manageFile() {
//                    try {
//                       await fs.writeFile('sample.txt', 'This is a test file');
//                           console.log(' File written successfully');
//                           const data = await fs.readFile('sample.txt', 'utf-8');
//                            console.log(' File content:', data);
//                       } catch (err) {
//                          console.log(' Error:', err);
//                       }
//                    }

// manageFile();


























































   async function main() {
  await writeToFile();
  await appendToFile();
  await readFromFile();

  await createFolder()  
  await writeFiles()
  await listFiles()  
  await deleteFile();
  

// await renameFile()          if we call this,it will change the name of file 'sample.txt' to renamed-sample.txt
// await unlinkFile();       if we call this file it will delete the file

}

main();