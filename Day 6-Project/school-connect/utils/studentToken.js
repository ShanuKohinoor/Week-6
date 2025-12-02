// To create student token

  const jwt = require('jsonwebtoken')
  require('dotenv').config()

  const studentSecret = process.env.JWT_SECRET


  function createStudentToken(student) {
   const payload = {
    id: student.id,
    username : student.username,
    role:'student'
   }
   return jwt.sign(payload,studentSecret,{expiresIn: '60m'})
  } 

  module.exports = {createStudentToken}