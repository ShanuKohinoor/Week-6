//                     CONTROLLER SPLITTING
//                     --------------------


// Controller splitting is a way of putting the actual work (like fetching data,saving data etc ) for each route into a separate function in a different file.
// This helps to keep routes file clean and  manage the code easier.


//  Eg:- Without Controller splitting 

const express = require('express')
const router = express.Router()


router.get('/products',(req,res)=>{
    res.send('All products')
})


router.post('/products',(req,res)=>{
    res.send('Product added')
})

module.exports = router;   // Everything (route+ logic) in same file which is hard to manage later.




//  Eg:- With controller splitting

//                    Day 1.js
//                       │
//                       ├── controllers/
//                       │     └── productController.js   ( Logic is here)
//                       │
//                       ├── routes
//                       │     └── products.js        ( Routes only, without logic)
//                       │
//                       ├── app.js                   ( Main file)





//  