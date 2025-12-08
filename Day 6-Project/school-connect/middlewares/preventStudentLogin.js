const jwt = require('jsonwebtoken');
require('dotenv').config();

function preventStudentLogin(req, res, next) {
  const token = req.cookies?.studentToken;
  // console.log('student token:',req.cookies);
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
      // Redirect to home
      return res.redirect(`/student/home/${decoded.id}`);
    } catch (err) {
      // Invalid token (get login page for login )
      return next();
    }
  }
  next();
}

module.exports = { preventStudentLogin };
