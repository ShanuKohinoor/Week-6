
  //                         pipe.js

const fs = require('fs')

const readStream = fs.createReadStream('input.txt',{encoding: 'utf-8'}) // Create a  readable stream from input.txt

const writeStream = fs.createWriteStream('output.txt')  // Create a writable stream to output.txt

readStream.pipe(writeStream)  //  pipe data from readStream to the writeStream.



writeStream.on('finish',()=>{                   //  This step is optional. But if we write this, 
console.log('Data finished successfully');

})
  // Stream in Node.js are asynchronous. Program continues to running while data is being written.
  // finish event will helps to know whether the written data is finished or not.
  //         The callback inside .on('finish', callback) lets us know exactly when the writing is complete.