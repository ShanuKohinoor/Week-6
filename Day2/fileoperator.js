//                     File Operator
//                     -------------


           const fs= require('fs')
// WriteFile
    fs.writeFile('plain.text','Hello',(err)=>{
        if(err) return console.log('write error:',err);
        console.log('Success');
        
    })

// AppendFile

   fs.appendFile('plain.text','\nGood-morning',(err)=>{
    if(err) return console.log('Append error:',err);
    console.log('Success Append');
    
   })

   // ReadFile

   fs.readFile('plain.text','utf-8',(err,data)=>{
    if(err) return console.log('Read error:',err);
    console.log('Data:',data);
    
   })

   // These all are plain text...So we can store it as json data. 