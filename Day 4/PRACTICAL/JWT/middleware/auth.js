const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/jwt');

function loginAuth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.redirect('/login');  // Redirect to login if no token

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();                       // go to next middleware
  } catch (err) {
    return res.redirect('/login'); // Redirect if token invalid/expired
  }
}

module.exports = loginAuth;
