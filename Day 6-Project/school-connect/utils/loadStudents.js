const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../data/student.json');



// Get students from json file(student.json inside data folder)
function loadStudents(){
  if(!fs.existsSync(filePath)) return []
  const data = fs.readFileSync(filePath,'utf-8')
  return JSON.parse(data )
}



module.exports = {loadStudents}