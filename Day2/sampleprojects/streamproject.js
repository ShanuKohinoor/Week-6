//                            Notesstream project
//                            -------------------

// Project will be:-

//  Writes some notes to a file using a Write Stream

//  Reads the file back using a Read Stream

// Uses stream events like finish, data, and end to understand how stream lifecycle works





             const fs = require('fs')
const { WritableStream } = require('stream/web')
             const writeStream = fs.createWriteStream('notes.txt')



             writeStream.write('Note 1: Learn CSS \n')
             writeStream.write('Note 2: Learn HTML \n')
             writeStream.write('Note 3: Learn Javascript ')  // write 3 lines of  text into the file using stream.
                                                            // Each .write() sends a chunk of data into the stream (not instantly into the file).


            writeStream.end()                // End the write stream  
             
             

            writeStream.on('finish',()=>{                 // This is an event listener. Runs only after writing is finished. ie, writeStream.end() completes.
                console.log('Notes written to notes.txt');    
                
             })



// Read file

    const readStream = fs.createReadStream('notes.txt','utf-8')
    readStream.on('data',(chunk)=>{      // when we start reading files using stream, it comes like chunks.
                                         // Each time a chunk is ready to be read, Node.js emits a 'data' event.
                                         //  'data'-  Listens 'data event' emitted by stream
                                         // 'chunk' contains piece of files.
        console.log('Reading chunk');
        console.log(chunk);  
        
    })


// Handle end event
    readStream.on('end',()=>{
        console.log('Finished reading notes');
        
    })