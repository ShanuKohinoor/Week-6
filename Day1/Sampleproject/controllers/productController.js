//   Organize our Code: Controller Splitting
//   Create a controllers/ folder to store your logic functions.
//   Move route logic out of route files into these controller files.
//   ----------------------------------------------------------------




//                         This file handles the logic part


    exports.getAllProducts = (req,res)=>{
        res.send('All products from controller')
    }

    exports.addProducts = (req,res)=>{
        res.send('Products added from controller')
    }