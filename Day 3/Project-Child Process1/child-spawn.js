//                         Child-spawn.js

        console.log('Child started with args:',process.argv.slice(2)); // process.argv:- Array of 
                                                                           // * full path to executable Node.js           
                                                                           // * full path to the script file we are running.
                                                                           // * Any extra argument we passed.
                                                                      // If, i type and run node child-spawn.js with any two extra arguments,like :-  40 Hello,
                                                                      //    -  like, node child-spawn.js 40 Hello:- Output will be like:-
                                                                      //        Child started with args: [ '40', 'hello' ]
                                                                      //    - Because the slice cuts offfirst two paths(node path and script path)
                                                                      // Otherwise(without slice),if i type and run node child-spawn.js with any two extra arguments,like :-  40 Hello,
                                                                      //  Output will be:-
                                                                      //   Child started with args: 
                                                                      //    ['C:\\Program Files\\nodejs\\node.exe',
                                                                      //     'C:\\Users\\User\\Desktop\\SHANU EONIX\\NodeJS\\Week-6 Nodejs\\Day3\\Project-Child Process1\\child.js',
                                                                      //      '40',
                                                                      //      'hello'
                                                                      //    ]

   console.log('MY_ENV =', process.env.MY_ENV);
                                   // if we run child.js directly  in terminal, MY_ENV = undefined because it is not set in the terminal, but when we run it via parent.js using spawn with env: {...process.env, MY_ENV: 'Helloworld'}, the parent  passes MY_ENV to the child, so it prints 'Helloworld'.
   

   //  Read message from parent                                
   process.stdin.on('data',(buf)=>{
        const msg = buf.toString().trim()
        console.log('Child recieved message:',msg);    
   })
   //  Simulate error output
   console.error('This is an error message from child');
   

    
   process.stdin.on('end',()=>{                       // this event means, there is no more data is there to come from stdin(parent closes its stdin stream)
        console.log(('Child finished reading stdin'));
        
   })                                               // When the child process has received all input and stdin is closed, run this callback to indicate input is finished.






   // Working of three pipes:-

   //    1. stdout :-
   //         Every console.log goes to parent cp.stdout
   //          - child stdout (everything from console.log) --> flows to parent cp.stdout
   //             * In parent, it is PARENT got STDOUT: ...).

   //   2. stderr :-
   //         Every console.error goes to parent cp.stderr
   //          - child stderr (everything from console.error) → flows to parent cp.stderr
   //             * In parent, it is PARENT got STDERR: ...).

   //   3. stdin :-

   //               cp.stdin.write('text') in parent
   //                         |
   //                         |
   //                         |
   //                         v 
   //               triggers child process.stdin.on('data', ...) 
   //                         |
   //                         |
   //                         |
   //                         v 
   //                       child logs 
   //                         |
   //                         |
   //                         |
   //                         v 
   //               parent can  see this on stdout

