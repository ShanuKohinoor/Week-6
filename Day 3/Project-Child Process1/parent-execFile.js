//                          Parent-execFile.js

      const { execFile} = require('child_process')

      execFile(                                   //      execFile(file,args,options,callback)
        'node',
        ['child-execFile.js', '40'],              // arguments passed as array
        { 
            env: {...process.env, MY_ENV: 'HelloWorld'}
        },
    (error,stdout,stderr)=>{
        if (error){
            console.error('ExecFile error',error);
            return;
        }
        console.log('STDOUT:\n',stdout);
        console.log('STDERR:\n',stderr);       
    }     
      );






//                         1. Parent starts
//                     When node run the parent
//                      ( node parent-execFile.js)
//                                |
//                                |
//                                |
//                                v
//                          parent calls:-
//                         execFile(
//                              'node',
//                              ['child-execFile.js', '40'],
//                              { env: {...process.env, MY_ENV: 'HelloWorld'} },
//                              callback
//                          )
//                       - execFile executes the file directly, not shell by default like exec
//                                |
//                                |
//                                |
//                                v
//                      2. OS creates child process
//                           * Executes a new process: node child-execFile.js 40
//                           * Passes:
//                              - argv --> ['child-execFile.js', '40']
//                              - env --> includes MY_ENV='HelloWorld'
//                              - OS manages stdin, stdout, stderr internally
//                                |
//                                |
//                                |
//                                v
//                      3. Child execution
//                          - Child starts running child-execFile.js
//                          - Reads process.argv[2] --> '40'
//                          - Reads process.env.MY_ENV --> 'HelloWorld'
//                          - console.log(...) and console.error(...) write to internal buffers (stdout/stderr)
//                                |
//                                |
//                                |
//                                v
//                      4. Output buffering
//                          - execFile collects all stdout/stderr output in memory
//                          - Parent does not receive anything yet
//                          - If child exits with an error (non-zero exit code), the error is captured
//                                |
//                                |
//                                |
//                                v
//                      5. Callback execution
//                           - Once child finishes:
//                           - stdout buffer --> passed as stdout to callback
//                           - stderr buffer -->  passed as stderr to callback
//                           - error -->  passed as error to callback
//                           - Parent callback runs:
//                                if(error) console.error(...)
//                                  console.log('STDOUT:', stdout)
//                                  console.log('STDERR:', stderr)
//                                |
//                                |
//                                |
//                                v
//                   6. Child process exits
//                    - OS cleans up resources (pipes closed, child process terminated)
//                    - Parent process continues
