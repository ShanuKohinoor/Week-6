


const jwt = require('jsonwebtoken')

const JWT_SECRET = 'supersecretkey';  // secret uses to sign and verify the JWT token by the user.



// Function to create/sign a JWT for a user
function signToken(user){
    return jwt.sign(
        { id: user.id,email: user.email, name: user.name},  // payload
        JWT_SECRET,                                         // secret key
        { expiresIn: '15m'}                                 // Token will expired in 15 minutes
    )
}


module.exports = { signToken, JWT_SECRET };
