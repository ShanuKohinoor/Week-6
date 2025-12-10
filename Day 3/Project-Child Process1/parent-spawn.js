
//                                   parent-spawn




     const {spawn} = require('node:child_process');


     const cp = spawn(
        'node',                          // cmd(program to run)
        ['child-spawn.js', '42'],              // args(arguments to pass)
                                         //         * First argument:- child.js
                                         //         * Second argument :- '42' (accessible inside child.js via process.argv[2]).

        {
            cwd: __dirname,              // working directory(where to run from)
            env: {...process.env, MY_ENV: 'Helloworld'},  // Environment variables(parent + custom)
                                                          //  ...process:-Inherits parent’s environment variables, and 
                                                          //  MY_ENV:- adds a custom variable.
            shell: false,                                 // if it is true:- will run in shell
            detached: false,                              // process tied to parent (will die if parent dies)
                                                          // if it is true:- child lives even if parent dies
            stdio: ['pipe','pipe','pipe']  // default: [stdin,stdout,stderr]

        }
     )


     //  How parent  and child communicates?
     //      There are 3 things for this. They are:-
     //            1. Capture child output(stdout,stderr)
     //                   * When we use stdio :['pipe','pipe','pipe']:- Parent can listen what child prints 
     //            2. Detect when child exit.
     //                    * Parent can listen for 'close or exit' events to know when the child done.
     //            3. Send input to child.
     //                    * If child is expecting any input like typing console,we can write in stdin



     //1. Capture child output(stdout,stderr)

           cp.stdout.on('data',(data)=>{
            console.log('PARENT got STDOUT:',data.toString());
            
           })

               //  Handle error output
            cp.stderr.on('data',(data)=>{
                console.log('PARENT got STDERR:',data.toString());
                
            })

    // 2. Send input to child(stdin)
         
         cp.stdin.write('Hello child process! \n')
         cp.stdin.end()



   //  Handle events
   
      cp.on('spawn', ()=>console.log('Child process spawned!,PID', cp.pid));
      cp.on('exit', (code) => console.log('Child exited with code:',code));
      cp.on('close',(code)=> console.log('Child closed with code:',code));
      cp.on('error',(code)=>console.log('Child process error:',err));







//                         1. Parent starts
//                     When node run the parent
//                      ( node parent-spawn.js)
//                                |
//                                |
//                                |
//                                v
//                          parent calls:-
//                    spawn('node', ['child-spawn.js', '42'], 
//                    { env: {..., MY_ENV:'Helloworld'}, 
//                     stdio:['pipe','pipe','pipe'] })
//                                |
//                                |
//                                |
//                                v
//                      2. OS creates child process
//                          * executes a new process(node childspawn.js 42)
//                          * Passes
//                                  - argv--> ['child-spawn.js', '42'], and
//                                  - env --> includes MY_ENV= Helloworld
//                          * OS also creates three pipes between parent and child(stdin,stdout,stderr)
//                                |
//                                |
//                                |
//                                v
//                     3. Child execution
//                   Child starts running child-spawn.js
//                        * Reads process.argv[2] --> '42'
//                        * Reads process.env.MY_ENV --> 'Helloworld'
//                        * Every console.log of child(stdout)including argv and env flows to parent stdout
//                        * When parent  write cp.stdin.write('Hello ...'), the child’s process.stdin.on('data', ...) triggers
//                                |
//                                |
//                                |
//                                v
//                    4. Communication of two way pipes
//                          * parent to child and -------------------------->
//                          * child to parent---->                          |
//                                |              |                          |
//                                |              |                          |
//                                |              |                          v
//                                |              v                    cp.stdin.write('Hello child process\n') 
//                                |         console.log(...)                |
//                                |             or                          |
//                                |    process.stdout.write(...)            |  triggers
//                                |             |                           |
//                                |             |                    process.stdin.on('data', ...) in child. 
//                                |             | captured in
//                                |             |  parent by
//                                |             v          
//                                |      cp.stdout.on('data', ...)
//                                |
//                                |
//                                v
//                      5. Child finishes
//                 When the child is finishes,
//                    * It signals exit to parents,
//                    *  OS closes the pipes(stdin,stdout,stderr) and parent exit / close events.

      