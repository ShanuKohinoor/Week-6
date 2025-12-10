//                           Child-fork.js

console.log('Child started with argS:', process.argv.slice(2));
console.log('MY_ENV=',process.env.MY_ENV);



// Recieve IPC message from parent
process.on('message',(msg)=>{
    console.log('Child recieved message from parent:',msg);

// Reply back to parent
process.send('This is a reply from child via IPC')

// Simulate error output
console.log('This is an error message fromchild');
})


// (stdin/stdout still works,but fork is meant for IPC)
process.stdin.on('end',()=>{
    console.log('Child finished reading stdin');    
})




