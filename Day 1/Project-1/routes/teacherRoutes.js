//                      teacherRoutes


      const express = require('express')
      const router = express.Router()

      const {getAllTeachers, getTeacherForm, addTeacherForm, singleTeacher} = require('../controllers/teacherController')



      router.get('/',getAllTeachers)

      router.get('/add',getTeacherForm)

      
      router.post('/add',addTeacherForm)

      // view single teacher
      router.get('/:id',singleTeacher)

      module.exports = router