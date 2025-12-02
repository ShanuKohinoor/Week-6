const jwt = require('jsonwebtoken');
require('dotenv').config();
const { NotFoundError } = require('../utils/error');

const studentSecret = process.env.JWT_SECRET;

function verifyStudent(req, res, next) {
  try {
    const token = req.cookies?.studentToken;
    if (!token) return next(new NotFoundError('Please login first'));

    const decoded = jwt.verify(token, studentSecret);
    req.student = decoded;
    next();
  } catch (err) {
    return next(new NotFoundError('Invalid or expired token'));
  }
}

module.exports =  { verifyStudent };
