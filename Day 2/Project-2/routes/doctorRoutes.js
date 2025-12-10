//                                Doctor Router


   const express = require ('express')
   const router= express.Router();

   const {getAllDoctors, getDoctorForm, addDoctorForm, getsingleDoctor} = require('../controllers/doctorController')

   router.get('/',getAllDoctors)

   router.get('/add',getDoctorForm)

   router.post('/add',addDoctorForm)


   router.get('/:id',getsingleDoctor)
    


   module.exports = router;