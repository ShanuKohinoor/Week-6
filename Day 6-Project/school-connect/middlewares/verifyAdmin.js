const jwt = require('jsonwebtoken')
require('dotenv').config()
const {NotFoundError} = require('../utils/error')

const mySecret = process.env.JWT_SECRET


function verifyAdmin(req,res,next) {          // verify admin
    try {
        const token = req.cookies?.adminToken;   // req.cookies:-reads the cookies sent by browser with the request
                                               // adminToken :- cookie name given during create token
        if (!token){
            return next (new NotFoundError('Please login first'))
    }
            const decoded = jwt.verify(token,mySecret);
            req.user = decoded;
            next()
    } catch(err) {
      return next(new NotFoundError('Invalid or expired token'))
    }  
     } 

     module.exports = {verifyAdmin}