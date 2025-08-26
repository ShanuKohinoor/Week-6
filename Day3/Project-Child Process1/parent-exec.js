//                    Parent-exec

     const {exec} = require('child_process')  


     //   Run child process: node child-exec.js
     exec(
        'node child-exec.js',                 // command to run
        {
            env: { ...process.env,MY_ENV: 'Hi World'}    // pass environment variable to child process
        },
        (error,stdout,stderr)=>{                    // callback run when child finishes
            if(error){
                console.log('Exec error:',error);
                return;
            }
            console.log('STDOUT:\n',stdout);
            console.log('STDERR:\n',stderr);
            
        }
     )




     //                    1. Parent starts
//                     When node run the parent
//                      ( node parent-exec.js)
//                                |
//                                |
//                                |
//                                v
//                          parent calls:-
//                         exec('node child-exec.js,
//                        { env: {...process.env,MY_ENV: Hi World}},
//                           callback)
//                                |
//                                |
//                                |
//                                v
//                      2. OS creates child process
//                          * OS launches a shell, (then runs the command: node child-exec.js).
//                          * OS creates new process with PID
//                          * Child process recieves :-
//                                 - argv: ['child-exec.js']  (extra arguments if passed)
//                                 - env: inherited from parent &  MY_ENV='Hi World'
//                                 - OS sets up pipes for stdout and stderr to capture the output.
//                                 - Unlike spawn, stdin is not connected by default.
//                                 - exec buffers all output(stdout & stderr) instead of streaming.
//                                |
//                                |
//                                |
//                                v
//                     3. Child Execution
//                            - Child starts running child-exec.js:
//                                 console.log('Child args:', process.argv.slice(2));
//                                 console.log('MY_ENV=', process.env.MY_ENV);
//                                 console.log('This is an error from child');
//                            - stdout (console.log) and stderr (console.error) are captured in buffers by exec.
//                                |
//                                |
//                                |
//                                v
//                     4. Parent Reads Output
//                             * exec waits for the child process to finish.
//                             * Once the child exits:
//                                 - stdout buffer --> passed to callback
//                                 - stderr buffer -->  passed to callback
//                                 - error --> if child failed
//                                 - Parent prints captured output:
//                                       console.log('STDOUT:\n', stdout);
//                                      console.log('STDERR:\n', stderr);
//                                |
//                                |
//                                |
//                                v
//                    5. Child Finishes
//                            *  After child exits:
//                               - OS closes pipes (stdout & stderr)
//                               - exec callback runs
//                               - Parent can now handle the output or errors
//                               - No streaming of data—everything is available after the child process finishes.

//                                

                              