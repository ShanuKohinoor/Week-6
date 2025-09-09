


const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/jwt');




// Middleware to protect routes (checks if user has a valid token)
 function requireAuth (req,res,next){
  const token = req.cookies?.token;           // Get token from  the cookie
  if(!token) return res.status(401).json({message: 'No token. Please login.'})   // If doesn't found token,not logged in
    try {
        const payload = jwt.verify(token,JWT_SECRET); // Verify token(if valid, attach user info to req.user)
        req.user = payload;     // save user data for later use
        next();                 // go to the next middleware
    } catch(err) {
        return res.status(401).json ({message: 'Invalid or expired token'})  // if token is invalid or expired return this
    }

}

module.exports = requireAuth;


