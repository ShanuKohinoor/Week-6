//                              Child Process
//                              -------------

//  Child process is completely separate operating system process created by Node.js.
//  It has its own memory,its own event loop and its own V8 engine.
//  It doesn't share javascript variables or heap with the parent process.
//  Runs independently from main Node.js process.
//  Can communicate with it through IPC (Inter-Process Communication), e.g., .send() and .on('message').
//  It’s like opening a new terminal window and running a different Node.js script.
//  Use:-
//      * Running CPU-heavy calculations in parallel.
//      * To run shell commands (e.g., ls, mkdir, git status).
//      * To run other programs or scripts from Node.js.
//      * Starting another Node.js instance for parallel work.
// Eg:-
//     * Compressing a big file.
//     * Processing huge amounts of data.
//     * Running git commands from Node.js.
//     * Spawning multiple worker scripts for large-scale operations.


//  When we use child_process.spawn() / exec() / fork():-
//          - Node creates a new process in the OS.
//  It is like hiring another person to work in a separate office.



//               Node.js process                                        Child process
//               ---------------                                        -------------
//   * When we type node app.js in the terminal,                 * From already running Node.js process(parent),
//      the OS(Windows/Linux/Mac) creates a new                     OS asked to create another new process..
//      process.                                                    That is child process.

//   * Inside that process, V8 engine,libuv,C++,                  * In this child process,it has its own V8 engine,
//       node cores, global objects,node apis,                     memory,eventloop,node cores,global objects, etc
//       eventloop etc are initialized.

//                                                                 * Communication between parent and child through 
//                                                                    IPC(Inter-Process Communication).
//                                                                    - IPC is implemented via pipes(streams by default)
//                                                                    - If we use child_process.fork(),Node will give
//                                                                      built in IPC channel(child.send & child.on('message'))


// WAYS TO CREATE CHILD PROCESS:-
// ----*-------*-------*----*----
//  We have 4 APIs to create child process.
//    These 4 APIs are existed inside the child process module. We have to take that


//  Main APIs:

//    1. spawn() :- runs a command, streams output(watch live as it happens).


//    2. exec() :- runs a command, buffers output(ask, wait, get all at once).

//    3. fork() :- creates another Node.js process that can communicate easily with the parent.

// Syntax :- const { spawn, exec, fork } = require('child_process');



//                           spawn()
//                           -------

//  For long running process or streaming output.
//  Use:-
//      * when expect large data output and want to process it in chunks.
//      * If we need real-time streaming, like video processing or live logs.
//      * In long running task(need more output).
//      * If we want to run continously.
//  Does Not buffer all output in memory.
//  Real life comparison:- Its like starting a new machine to do a new job and watch it working live.
//             * Imagine when we watch a live sports game on TV (streaming data).

//             * we don’t wait until the whole game ends to watch it.
//             * we can watch it live as it happens.
//             * This is like spawn(), where we get data continuously and can react to it immediately.


//  spawn(cmd,args,options) 
//           cmd,args and options are the arguments inside the spawn
//         - When we get child process with spawn, a stream will create between process and child process to communicate.
//              
//                     Process                                 Child Process
//                  ___________                                 ____________
//                 |           |            Stream             |            |
//                 |           |<----------------------------- |            |
//                 |           |                               |            | 
//                 |___________|                               |____________|

// If we write console.log, it will directly goes to stdout.
// If we write console.error, it will directly goes to stderr.




//                            exec 
//                            ----
//  For short commands / small output.
//  Use:-
//      * Small output tasks where we just want the final result.
//      * If we just want to run a command and get its final output (like ls, git status, node -v).
//  Buffers output :- Can crash if output is huge.
//  Real life comparison:- This is like ask a helper to do a task/job, then wait for them to return with all results at once.
//                * This works well if the report is short. But if the report is too long, carrying it all at once might be hard (like buffering too much data).

//    exec(cmd,options,callback)
//        * Runs inside shell. So there is a chance to attack.
//        * Output will goes to buffer. And we will get it in a callback.
//                  ___________                                 ____________
//                 |           |                               |            |
//                 |           |------------------------------ |            |------>Output
//                 |           |                               |            |        |
//                 |___________|                               |____________|        |
//                                                                                   |
//                                                                                   V
//                                                                                 Buffer
//                                                                                   |
//                                                                                   |
//                                                                                   |
//                                                                                   v
//                                                                                Callback



//                              execFile
//                              --------
// Like exec. But not  shell through. Its like spawn directly OS.
//    execFile(file,args,options,callback)
//  * It is safe because it is not through shell.



//                               fork 
//                               ----
// For running another Node.js script.
// Special version of spawn made for running Node.js scripts.
// Use:-
//      * Creating worker processes that communicate with the parent process via messages.
//      * When we want two Node.js programs to talk to each other.
// Real life comparison:- This is like when we create a mini version of Node.js to run a separate script alongside our main program. Means create a helper just like us, who can chat with us while working.
//      * Useful when our program needs to do multiple things at the same time without getting stuck.
//      * When two Node.js programs want to talk to each other: They send messages to coordinate work.



//  fork(modulepath,args,option)
//  Only for node script.
//  Other than stream we will get a communication channel too.
//  It is like spawwn only.But in spawn we have only stream, here we have both stream and extra one communication channel. 
//          * And here it is for node script alone unlike spawn

//                    Process                                  Child Process
//                  ___________                                 ____________
//                 |           |            Stream             |            |
//                 |           |<----------------------------- |            |        Send message:- send() 
//                 |           |                               |            |        Recieve message:- on('message')
//                 |___________|                               |____________|
//                      |                                            |
//                      |                                            |
//                      |------------Communication Channel-----------|

//  Then we can send message and recieve it with the help of communication channel.
//       * So this helps in intercommunication









//  Difference between child process APIs in simple:-
// 1. spawn:- 
//      * Work direct to OS.
//      * When we want continous results.
// 2. exec:- 
//      * Work  through shell.
//      * When we want single output.
// 3. execFile:-
//      * Work direct to OS.

// 4. fork:-
//      * Interchannel communication with the help of communication channel.


//                         Child process v/s Worker thread


//  Both used for CPU heavy task.
//  Both allow parallel work.
//  Both can be stopped independently.


//                   _________________           ___________________
//                  |                 |         |                   |
//                  | CHILD PROCESS   |         |   WORKER THREAD   | 
//                  |_________________|         |___________________|
//                          |                             |
//                          |                             |
//                          |                             |
//                          V                             v
//           *  Separate OS process(heavy)     * Thread in same process(lighter)
//           *  Has own memory space           * Shared memory with parent.
//           *  Useful for running             * Useful for CPU-intensive JS computation.
//                non-Js tasks
//           * Can run any external program  * Run javascript only
//              like,python,git
//           * Can crash independently         * Worker crash affect parent if unhandled
//           * Lifecycle managed by OS         * Lifecycle managed within Node.js runtime





























//    Runs outside the main event loop.