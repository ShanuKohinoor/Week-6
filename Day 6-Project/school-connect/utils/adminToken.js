 const jwt = require('jsonwebtoken')
 require('dotenv').config()                 // Load secret key from .env file into process.env
 const mySecret = process.env.JWT_SECRET    //Store the secret key


 // Create token

  function createAdminToken(admin){
    const payload ={
        id: admin.id,
        username : admin.username,
        role : 'admin'
    }
    return jwt.sign(payload,mySecret,{expiresIn: '50m'})
  }


  // can also write like this:-
  
//   function createAdminToken({ id, username }) {
//   const payload = {
//     id,
//     username,
//     role: 'admin'
//   }
//   return jwt.sign(payload, mySecret, { expiresIn: '30m' })
// }



// Login page to avoid cached login form
   const preventCache = (req,res,next)=>{
    res.set('Cache-Control','no-store')
    next()
   }

  module.exports = {createAdminToken,preventCache}