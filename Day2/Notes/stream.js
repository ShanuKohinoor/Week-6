//                                    STREAM
//                                    ------

// Stream is a sequence of data that is being moved from one point to another over time.
// That means, it is a way to handle data(read,write etc) chunk by chunk instead of loading entire data into memory at once. 
//  Eg:- A stream of data over the internet moved from one computer to another.

//       *  It is useful when working with the large files.

//       *  Streams don’t load the full file into memory.

//       *  Improves performance and reduces memory usage.

//       * Can handle large and continous data.
// Stream is an event-emitting object

//TYPES OF STREAMS IN NODE.JS

//  Readable:-	For reading data. 
//         * Eg: fs.createReadStream() reads a file.

//  Writable:-	For writing data.
//         * Eg:- fs.createWriteStream() to write a file.

//  Duplex:- 	For both reading & writing.
//         * Eg:- A network socket.

//  Transform:-	It is a special type of duplex stream to modify data or transform data while reading/writing
//        * Eg:- Compressing file while reading and writing.




//             • createReadStream() and createWriteStream()
//             --------------------------------------------
 
//  Used to read and write files using the streams.



//Syntax:-  
               
                 const fs = require('fs')

                 const readStream = fs.createReadStream('read.txt')
                 const writeStream = fs.createWriteStream('write.txt')

                 readStream.pipe(writeStream)



        //   fs.createReadStream helps to reads the files chunk by chunk from read.txt.
        //                              |    
        //   fs.createWriteStream helps to write those chunks into write.txt.
        //                              |
        //   pipe() helps to connects the readStream to the writeStream. So the data can flows automatically



// In Node.js, we can use streams to read and write large files efficiently without loading the whole file into memory. Using .pipe(), we connect a readable stream to a writable stream to transfer data smoothly.






// A WriteStream is a way to write data to a file in chunks (piece by piece) instead of all at once. It's useful for writing large amounts of data without blocking the event loop.
//Syntax:-
//             const fs = require('fs');
//              const writeStream = fs.createWriteStream('output.txt');

 //      1. writeStream.write(data, encoding, callback)

                     const fs = require('fs');

                     const writeStream1 = fs.createWriteStream('output.txt');

                     writeStream1.write('Hello, ', 'utf8', () => {
                       console.log('First chunk written');
                     });

                     writeStream1.write('World!\n', 'utf8', () => {
                         console.log('Second chunk written');
                     });

                    writeStream1.end(); // Close the stream






      // Normally size of chunk is 64 KB(which is default) 
      
    // We can write like this, otherwise will take default  
      const myReadStream = fs.createReadStream('myfile.txt',{
        encoding:'utf-8',
        highWaterMark:16    //Read 16 bytes per chunk      
      })