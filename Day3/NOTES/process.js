//                   • What is a Process?
//                   --------------------


// Process is a global object which helps to give information about current Node.js program and allows us to control it.
//     * It is like a back stage manager for our Node.js app.
//     * It knows everything about how the program is running, & helps to exit,read input, set environmental variables etc.
//     * It is an inbuilt global object in Node.js. So, no need to import or require() it.
//     * It is part of Node.js’s core API, created when our program starts running.
//     * It comes from Node.js's C++ core (process.binding) which connects to libuv and V8.
//     * It acts as a bridge between Node.js and OS(Operating System).
//                  - Node.js runs outside the browser. The process which acts like a bridge helps to communicate with OS.
//                  - Hence, it can:-
//                        * Control program execution.
//                        * Access environment variables.
//                        * Handle signals (like stopping the program).
//                        * Get input / output from command line.


//  Eg:-            When we run (node myApp.js)
//                             |
//                             | 
//                             |
//                             V
//                 Node.js starts a PROCESS to run our file
//                             |
//                             | 
//                             |
//                             V
//                Automatically creates a process object. So our code can interact with
//                      * The environment (process.env) 
//                      * Command- Line arguments (process.argv)
//                      * Execution control ( process.exit())
//                      * System info (platform,memory, uptime etc)






//                                USES OF PROCESS


//    Information (properties):-
//            *   process.pid, process.cwd(), process.version, process.env
//            *   Read-only data about our process
//    Control (methods):-
//            *   process.exit(), process.kill()	
//            *   Actions we take to control the process


// Properties of process:- 
//     Process information :- Process helps us to give information and control current running program.
//               *a) process.pid:- Process ID (Unique number assigned by OS)
//                    Eg:- console.log("Process ID:", process.pid);

//               *b) process.version :- Node.js version 
//                    Eg:- console.log("Node.js Version:", process.version);

//               *c) process.versions :- All dependencies versions (V8)
//               *d) process.cwd() :- Current working directory
//                    Eg:- console.log("Current Directory:", process.cwd());
//                    - It returns absolute path of the folder from where we started the Node.js process( node app.js)


//                           When you run node app.js
//                                     |
//                                     | 
//                                     |
//                                     V
//                            process.cwd() returns exact path.
//                         Eg:- If your current working directory is /Users/shanu/projects.
//                          The output will be  /Users/shanu/projects

//                 Difference between __dirname and process.cwd() are :-
//                   *  process.cwd() :-  where Node.js was started.
//                        Eg:- console.log(process.cwd()); 
//                               Output :- /Users/shanu
//                            * It’s dynamic — it depends on where we were when we executed the script.
//                            * If we run the same file from different folders, the result changes.
//                                  Eg:-Case 1:-  Running from inside the same folder as the file

//                                      cd /Users/shanu/projects

//                                         node app.js
//                                              |
//                                              | 
//                                              v
//                                        console.log(process.cwd()); 
//                                              |
//                                              | 
//                                              v
//                                       /Users/shanu/projects


//                                  Eg:- Case 2 — Running from outside the file’s folder

//                                      cd /Users/shanu

//                                     node projects/app.js
//                                              |
//                                              | 
//                                              v
//                                        console.log(process.cwd()); 
//                                              |
//                                              | 
//                                              v
//                                       /Users/shanu

 


//                  * __dirname :- directory where the current script file exists.
//                        Eg:-  console.log(__dirname);     
//                              Output:-  /Users/shanu/projects
//                            * It’s static — it depends only on the file’s location on disk, not on where you start the Node.js process.



   
 

//                             |
//                             | 
//                             |
//                             V




//                         

//               *e) process.argv :- Command line arguments
//                    Eg:- console.log("Arguments:", process.argv);
//                          * It is an array containing commands used to run node.js script and any extra arguments we pass
                               console.log( process.argv);
//                                   If we console.log (process.argv), and give extra information in terminal like SHAN SHANU, output will be like:-
//                                   [
//                                      'C:\\Program Files\\nodejs\\node.exe',
//                                      'C:\\Users\\User\\Desktop\\SHANU EONIX\\NodeJS\\Week-6 Nodejs\\Day3\\NOTES\\process.js',
//                                      'SHAN',
//                                      'SHANU'
//                                   ]
//                   Eg 2:-  
                          console.log('Hello' + process.argv[2]);
//                                  If we console.log (process.argv[2]), and give extra values in terminal like Fraza-Filza, output will be like:-
           
//                                    [
//                                      'C:\\Program Files\\nodejs\\node.exe',
//                                      'C:\\Users\\User\\Desktop\\SHANU EONIX\\NodeJS\\Week-6 Nodejs\\Day3\\NOTES\\process',
//                                      'Faraza-Filza'
//                                    ]
//                                     Hello Faraza-Filza                           
           


//               *f) process.env :- env is a property that stores the Enviroment variables.
//                                   - These environment values are key-value pairs.
//                                   -  Values will be always string.
//                    Eg 1:- 
//                          console.log (process.env)
//                          OutPut:-
//                                  {
//                                    PATH: '/usr/local/bin:/usr/bin:/bin',
//                                    HOME: '/Users/username',
//                                    USER: 'shanu',
//                                    NODE_ENV: 'development',
//                                    PORT: '3000',
//                                    ...
//                                   }

//                                process.env :- an object containing all environment variables for our current session.


//                     Eg 2:-     
//                        console.log("Env Variables:", process.env.PATH);
//                                 process.env.PATH  :-specifically the PATH variable, which is a string containing directories where our OS looks for executables.











//  Method of process:-
//            * process.exit():- Immediately stops Node.js process and skips remaining codes. Remaining codes wont run.
                 console.log('Start the Program');
                 console.log('Continuing the program');
                 process.exit(0)   // if we write process.exit ,the program will immediately stops here.
                 console.log('End the Program');    
                 
//              There are two types of exit codes:-
//                  * 0 :- which means Success(no errors)   
//                              * process.exit(0)    
//                  * 1 :- which means Failure or abnormal Termination
//                              * process.exit(1)    

//                    -  Both 0 & 1 will stops the program immediately. And wont allow to run next codes. 
//                    -  This exit code sent to the Operating System, so it can know whether the program ended successfully or with an error.
//                    -  Exit codes are useful when we run Node scripts from other programs or automation tools — they can check the exit code to decide what to do next.






//       Feature	               Type	                   Purpose
//       -------                   ----                    -------
//     process.env        	      Object	       Store and access environment variables
//     process.argv	              Array	           Get command-line arguments
//     process.exit()	          Function	       Exit the program with a code











//  process  :- the name of the built-in global variable.
//               process = The running program (in the OS)



// Process object :- the actual object stored in that variable.
//               process object = Node’s way to give the info and control over that running program.









//                             |
//                             | 
//                             |
//                             V


//                             |
//                             | 
//                             |
//                             V






























//     Understanding the process object
//     Using process.env, process.argv, process.exit()
