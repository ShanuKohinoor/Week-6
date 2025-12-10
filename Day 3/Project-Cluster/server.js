//                            Cluster
//                            ---*---

     const cluster = require('cluster')
     const os = require ('os')

//                     Master / primary process
//                     ------------------------

     if(cluster.isPrimary){                   // Ensures only main process create workers. runs only once in the main process. Creates multiple workers
        const cpuCount = os.cpus().length   //  will get no:of cpu cores

        for (let i=0; i< cpuCount; i++){      // worker creates per CPU
            cluster.fork()                    // starts a new worker process(child)
        }

        // If any worker fails, create new
        cluster.on('exit',(worker,code,signal)=>{
         console.log(`Worker ${worker.process.pid} died ${code}`);
         cluster.fork()   // Will automatically restart a new worker if one dies
        })
     } else {

//                           Worker process
//                          ---------------
        const express = require('express')
        const app = express();
        app.get('/',(req,res)=>{
            res.send('Hello')
        })
        app.listen(3000,()=>{               // Each worker listens on same port.
         console.log(`Single worker PID ${process.pid} listening on http://localhost:3000`);
         
        })
     }

     //  Out put will be:-
// Single worker PID 13728 listening on http://localhost:3000
// Single worker PID 4524 listening on http://localhost:3000
// Single worker PID 15320 listening on http://localhost:3000
// Single worker PID 6336 listening on http://localhost:3000      All workers share single port 3000
