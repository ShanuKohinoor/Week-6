//                    studentRoutes

                  



   const express = require('express')
   const router = express.Router();

   const { getAllStudents,getStudentForm,addStudentForm,singleStudent } = require('../controllers/studentController')




   // show all students

      router.get('/', getAllStudents)


   // Handle form submission

     router.get('/add', getStudentForm)

  // Handle form submission

      router.post('/add', addStudentForm)



   // View single student

      router.get('/:id', singleStudent)

      module.exports = router;