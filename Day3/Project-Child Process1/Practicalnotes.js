


//                                 SPAWN
//                                 --*--

// spawn(cmd,args,options)


// when we want to run  node child.js,
//               * Here, node :- cmd
//               * child.js :- args
//               * options:- 50
//                     - other options also there,like:-
//                          * cwd
//                          * env
//                          * stdio:['pipe','pipe','pipe'] --> cp.stdin,cp.stdout,cp.stderr
//                          * shell(but should give false)
//                          * detached            

// spawn('node',['child.js','50'])
//                                  
// When we write like this in existing Node.js, 
//     * A child process will create. And
//     * Create a stream.
//               - cp.stdin :- writable(parent--> child)
//               - cp.stdout :- Readable(child --> parent)
//               - cp.stderr :- Readable(child --> parent)

//     * Create events.

//              - 'spawn' :- created
//              - 'error' :- failed to start
//              - 'exit'  :- process ended  
//              - 'close' :- stdio closed     





//                                    Exec
//                                   --*--


// Used to run a shell command
// Buffer its output as string.
// Once the child process finishes,buffered  output will pass to callback function.

//    exec(cmd,options,callback)

//  When Node.js(parent process) calls exec(command), 
//  Node.js creates a shell.The shell runs the command.
//  While running, exec is internally colllecting all stdout & stderr into buffers


                         //  Difference between spawn and exec



 //              Spawn                                             Exec
 //              -----                                             ----

 //     Runs node child-spawn.js                            Runs node child-exec.js
 //                |                                                |
//                 |                                                |
//                 |                                                |
//                 v                                                v
//                 OS                                             Shell
 //                |                                                |
//                 |                                                |
//                 |                                                |
//                 v                                                v
//    Child process(streaming stdout,stderr)            Child process(stdout,stderr buffered)
 //                |                                                |
//                 |                                                |
//                 |                                                |
//                 |                                                v
//                 |                                           Buffered output
 //                |                                                |
//                 |                                                |
//                 |                                                |
//                 v                                                v
//    Ends when process finishes                         Callback after completion



// Real-life example to understand the concept of spawn and exec:-
// Spawn:-
//   Spawn's streaming is like, conveyor belt. 
//      - Imagine childprocess as a factory machine producing items(data) one by one.
//      - The item come one by one through cpnveyor belt(streaming), we can take item without waiting untill whole process to complete.

// Exec:- 
//   Exec buffering is like data drop into a bucket.
//       - Imagine the child process as a machine which drops all items(datas) into a bucket. 
//       - We cannot take or access until the process finished. Once it finishes we will get the output at once.





//                                 ExecFile
//                                 ----*---

//    execFile(file,args,options,callback)
//   Arguments passed as array.



//                             Difference between spawn,exec and execFile
//                             --------------*----------------*----------

 //         Spawn                               Exec                              execFile
 //         -----                               ----                              --------

// *  Arguments as array             *  Single string command                 *  Arguments as array 
//    (['child.js','42'])                ('node child.js 42')                      (['child.js','42']) 

// * Supports streaming              * Buffered, input/output via             * Buffered, input/output via 
//   stdin/stdout/stderr                 callback (not streaming)                callback (not streaming)

// * Streamed: parent can read       * Buffered: all stdout/stderr            * Buffered: all stdout/stderr 
//    child stdout/stderr line by       collected, returned in callback          collected, returned in callback
//    line                               after child finishes                       after child finishes


// * Parent<->Child(streaming pipes) *  Parent--> Shell --> Child-->         *  Parent--> Child --> buffer 
//     --> output                          buffer--> callback                       --> callback (no shell)










//                          Difference between spawn, exec, execFile and fork
//                          ---------*----------*-----------*----------*------

//         Spawn                               Exec                              execFile                             Fork
//         -----                               ----                              --------                             ----

// * Arguments as array                * Single string command               * Arguments as array                  * Arguments as array
//   (['child.js','42'])               ('node child.js 42')                     (['child.js','42'])                  (['child-fork.js','42'])

// * Supports streaming                * Buffered, input/output via          * Buffered, input/output via          * Supports streaming + IPC
//   stdin/stdout/stderr                callback (not streaming)                callback (not streaming)             (stdin/stdout streams + message channel)

// * Streamed: parent can read        * Buffered: all stdout/stderr          * Buffered: all stdout/stderr         * Streamed stdout/stderr + 
//   child stdout/stderr line by       collected, returned in callback          collected, returned in callback      IPC messaging (parent ↔ child)

// * Parent<->Child (streaming pipes) * Parent --> Shell --> Child -->       * Parent --> Child --> buffer         * Parent <-> Child (pipes) + IPC channel
//   --> output                         buffer --> callback                       --> callback (no shell)                --> output + message passing

// * Use case: long-running           * Use case: short shell commands       * Use case: run specific file safely   * Use case: run Node module with
//   processes, interactive,          * with pipes, redirection, or complex    with small output                     IPC / messaging between parent and child
//   streaming data                     command strings
