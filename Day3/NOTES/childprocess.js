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
//  Does NOT buffer all output in memory.
//  Real life comparison:- Its like starting a new machine to do a new job and watch it working live.
//             * Imagine when we watch a live sports game on TV (streaming data).

//             * we don’t wait until the whole game ends to watch it.
//             * we can watch it live as it happens.
//             * This is like spawn(), where we get data continuously and can react to it immediately.






//                            exec 
//                            ----
//  For short commands / small output.
//  Use:-
//      * Small output tasks where we just want the final result.
//      * If we just want to run a command and get its final output (like ls, git status, node -v).
//  Buffers output :- Can crash if output is huge.
//  Real life comparison:- This is like ask a helper to do a task/job, then wait for them to return with all results at once.
//                * This works well if the report is short. But if the report is too long, carrying it all at once might be hard (like buffering too much data).







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
//           * Can run any executable program  * Run javascript only
//           * Can crash independently         * Worker crash affect parent if unhandled
//           * Lifecycle managed by OS         * Lifecycle managed within Node.js runtime































//    Runs outside the main event loop.