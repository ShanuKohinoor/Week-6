//                              Child-exec.js


    console.log('Child args:', process.argv.slice(2));
                                        // Print any arguments passed to the child
                                        //     process.argv[0] --> node executable
                                        //     process.argv[1] --> script path
                                        //     process.argv.slice(2) -->  extra arguments 

    console.log('MY_ENV=',process.env.MY_ENV);



    console.log('This is an error from child');
    
    
    


