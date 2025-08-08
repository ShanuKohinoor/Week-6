//                        Buffer & Encoding Basics:
//                        ------------------------

// Buffer:- Temporary storage area in memory to handle binary data(like files,images ,videos etc) in Node.js when deal with streams.
//            * It stores raw binary data.
//            * It is useful when dealing with files,network streams,  or binary formats.


// Normally Javascript strings are UTF-16(text), but streams/files use binary.
//  So Node.js used buffers to  handle binary-to-text conversion.

// Eg:- 
//          1. Create a buffer from a string:-
   
      const buf = Buffer.from('Hello')
      console.log(buf);    // Output:- <Buffer 48 65 6c 6c 6f>


//          2. Create an empty buffer of fixed size:-
// Buffer.alloc(size) is to create a fixed-size empty buffer to store binary data temporarily in memory, especially while working with file systems or streams.



       const  buf1 =  Buffer.alloc(10)  // This creates a buffer of 10 bytes, filled with 0.
       console.log(buf1);   // OUtput :- <Buffer 00 00 00 00 00 00 00 00 00 00>

    
//          3.  Write to a buffer

       const buf2 = Buffer.alloc(10)
       buf2.write('Hi')
       console.log(buf2);    // Output:-<Buffer 48 69 00 00 00 00 00 00 00 00>



//          4. Read buffer from string

       const buf3 = Buffer.from('Welcome to Eonix')
       console.log(buf3.toString());    // Output:- Welcome to Eonix



// Buffer helps in:- 
//  * Reading big files:-	helps to handles small chunks, avoids memory overload
//  * Receiving file uploads:-	helps to stores temporarily the incoming data. 
//  * Streaming video or audio:-	helps to keeps data flowing smoothly in parts
//  * Working with binary (not text):-	Gives access to raw bytes to modify or analyze


       
       
       



//                  Encoding
//                  --------

//  Encoding helps to convert human readable text into binary format(0s and 1s). So,computer can store it.

// Buffer and encoding are related to eachother.
//        *  Buffer is a temporary memory storage for raw binary data(like files,images,videos etc)
//        *  Encoding is how that binary data is converted to and from readable formats like :-
//                 utf-8, ascii, base64 or hex.
//        *  Buffer dont know the meaning of data. Encoding gives the meaning.
// Eg:- 


            const buffer = Buffer.from('Hi Everyone', "utf-8")
            console.log(buffer);
            console.log(buffer.toString());

    //   'Hello' is converted into a buffer using UTF-8 encoding.

    //  The Buffer stores the binary form (48 65 6c...).

    //  .toString() with encoding helps to converts it back to human-readable text.


            
// Use cases of encoding types:-
// ----------------------------

// Encoding types are:-
//       1. utf-8
//             * Read and write human readable text files..
//             * Normal text like,English,Hindi etc.Use it with when working with text files or JSON.
//             * Eg: fs.readFile('file.txt', 'utf-8')

//       2. ascii
//             * Used for basic english characters(no emojis or foriegn letters)


//       3. base64
//             * Converting binary data to redable format.
//             * Used to convert images,files, or binary data into text.


//       4. hex
//             * Used to show binary data in hexadecimal format.

//  hex or base used to secure passwod safely









//  Explain the Overall relation of stream,buffer,encoding and pipe with  a real life example for easy to understand.

//             Amusement park Entrance  =    A BIG DATA FILE like video.mp4
//                                      |
//             People in a long queue   =    DATA waiting to be processed
//                                      |
//             Roller coaster cars      =    STREAMS (move data from entrance to exit)
//                                      |
//             Seat inside cars         =    BUFFERS (hold chunks temporarily)
//                                      |
//             Track                    =    PIPE (path from source to destination)
//                                      |
//             Speaking languages       =    ENCODING (people speak same language throughout)
//                                      |
//             Amusement park Exit      =    OUTPUT FILE or DESTINATION




