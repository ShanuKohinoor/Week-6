const jwt = require('jsonwebtoken')
require('dotenv').config()
const {NotFoundError, UnAuthorized} = require('../utils/error')

const mySecret = process.env.JWT_SECRET


function verifyAdmin(req,res,next) {          // verify admin
    try {
        const token = req.cookies?.adminToken;   // req.cookies:-reads the cookies sent by browser with the request
                                               // adminToken :- cookie name given during create token
        if (!token){
            return next (new NotFoundError('Please login first'))
    }
            // verify token
            const decoded = jwt.verify(token,mySecret);

            // Authorisation(check for role)
            if( decoded.role !== 'admin' ){
              return next(new UnAuthorized('You do not have permission to access this page'))
            }


            req.user = decoded;
            next()
    } catch(err) {
      return next(new NotFoundError('Invalid or expired token'))
    }  
     } 

     module.exports = {verifyAdmin}