//                                Doctor Router


   const express = require ('express')
   const router= express.Router();

   const {getAllDoctors, getDoctorForm, addDoctorForm, singleDoctor} = require('../controllers/doctorController')

   router.get('/',getAllDoctors)

   router.get('/add',getDoctorForm)

   router.post('/add',addDoctorForm)


   router.get('/:id',singleDoctor)
    


   module.exports = router;