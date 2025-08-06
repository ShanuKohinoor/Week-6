//   Organize our Code: Controller Splitting
//   Create a controllers/ folder to store your logic functions.
//   Move route logic out of route files into these controller files.
//   ----------------------------------------------------------------

// MVC Architechture is a structure:-
//           M:- Model(Data handling)
//           V:- Views
//           C:- Controllers(will all logic here)

    const express = require('express')
    const app = express()



    const productRoutes = require('./routes/products')


    app.use(express.json());
    app.use(productRoutes)



    app.listen(3001,()=>{
        console.log('Server is running on http://localhost:3001');
        
    })             // Output -All products from controller