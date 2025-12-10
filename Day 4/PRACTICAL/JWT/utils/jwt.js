const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || '15m';

function signToken(user) {
  return jwt.sign(
    {
         id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY
     }
  );
}


const preventCache =( req,res,next)=>{
  res.set('Cache-Control','no-store')
  next()
}

module.exports = { signToken, JWT_SECRET,preventCache };
