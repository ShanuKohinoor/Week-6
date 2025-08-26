//                         Parent-fork.js

   const{fork} = require('child_process')
  
  const cp =  fork  (                          // fork(modulepath,args,option)
        'child-fork.js',                       // module path(must be in js file)
        ['42'],                                // args passed to child
        {
          cwd: __dirname,                      // working directory
          env: {...process.env,MY_ENV: 'HiWorld'},  // pass custom env
            stdio: ['pipe','pipe','pipe', 'ipc']  // default: [stdin,stdout,stderr]
                                                  // including IPC for messaging      
        }             
  )


    cp.stdout.on ('data',(data)=>{
        console.log('PARENT got STDOUT:', data.toString());     
    })
    cp.stderr.on('data',(data)=>{
        console.log(('PARENT got STDERR:',data.toString()));
    })

//    send a message via IPC(instead of stdin)
    cp.send('Hello child process')

//   Listen for message from child
   cp.on('message',(msg)=>{
    console.log('PARENT got message(IPC)',msg);   
   })


//  Handle events
  cp.on('spawn',()=> console.log('Child process  forked!,PID:', cp.pid));
  cp.on('exit', (code) => console.log('Child exited with code:',code));
  cp.on('close',(code)=> console.log('Child closed with code:',code));
  cp.on('error',(code)=>console.log('Child process error:',err));



//                         1. Parent starts
//                     When node run the parent
//                      ( node parent-fork.js)
//                                |
//                                |
//                                |
//                                v
//                          parent calls:-
//                    fork('child-fork.js', ['42'], 
//                    { cwd, env,stdio {...process, MY_ENV:'Hiworld'}, 
//                     stdio:['pipe','pipe','pipe','ipc'] })
//                      - fork creates a special child process designed for IPC
//                                |
//                                |
//                                |
//                                v
//                    2. OS creates child process
//                           * Executes a new process: node child-fork.js 42
//                           * Passes:
//                                - argv --> ['child-fork.js','42']
//                                - env --> includes MY_ENV='HiWorld'
//                          *  OS sets up three standard pipes (stdin, stdout, stderr)
//                          * Additional IPC channel is created for messaging between parent and child
//                                |
//                                |
//                                |
//                                v
//                 3. Child execution
//                      Child starts running child-fork.js
//                        * Reads process.argv[2] --> '42'
//                        * Reads process.env.MY_ENV --> 'HiWorld'
//                           - console.log(...) --> writes to stdout buffer, captured by parent cp.stdout.on('data')
//                           - console.error(...) --> writes to stderr, captured by parent cp.stderr.on('data')
//                      * Listens for IPC messages from parent via process.on('message', ...)
//                                |
//                                |
//                                |
//                                v
//             4. IPC Communication
//                     * Parent sends message: cp.send('Hello child process')
//                     * Child receives message: process.on('message', msg)
//                     * Child can reply: process.send('This is a reply from child via IPC')
//                     * Parent listens: cp.on('message', msg) --> receives child’s reply
//                                |
//                                |
//                                |
//                                v
//           5. Standard IO (optional)
//                    * stdin/stdout still works:
//                    * Parent can write to cp.stdin.write(...)
//                    * Child can listen via process.stdin.on('data', ...)
//                    * But fork is mainly used for IPC messaging
//                                |
//                                |
//                                |
//                                v
//            6. Child finishes
//                  * When the child exits:
//                       - OS closes pipes and IPC channel
//                       - Parent receives 'exit' and 'close' events
//                       - Resources are cleaned up
