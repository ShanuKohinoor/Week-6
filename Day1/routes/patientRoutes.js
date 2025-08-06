const express = require ('express')
const router = express.Router();

const {getAllPatients, getPatientForm, addPatientForm,getsinglePatient} = require ('../controllers/patientController')

router.get('/',getAllPatients)


router.get('/add',getPatientForm)

router.post('/add',addPatientForm)


router.get('/:id',getsinglePatient)

module.exports = router;

