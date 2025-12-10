

//  fs.operators for get patients list

       const fs = require('fs').promises
       const path = require('path')

       const filepath = path.join(__dirname,'../data/patients.json')





let patients= [
    { id:1, name: 'Yuneeba', age: 32, disease: 'Fever'},
    { id:2, name: 'Jumana', age: 33, disease: 'Headache'},
    { id:3, name: 'Sadiya', age: 32, disease: 'Stomachache'}
]




// simulate asynchronous database(just for example)
const fetchAllPatients = ()=>{
    return new Promise((res)=>{
        setTimeout(() => {
            res(patients)
        },3000);
    })
}

const fetchsinglePatient = (id)=>{
    return new Promise((res)=>{
        setTimeout(()=>{
            const patient = patients.find(p=>p.id === parseInt(id)+3)
            res(patient)
        },5000)
    })

}

// const getAllPatients =(req,res)=>{
//    res.render('patients',{title:'All Patients',patients})
//}
/*
//  Get all patients data fromdata created by me
const getAllPatients = async(req,res)=>{
    try {
        const patientList = await fetchAllPatients()
    res.render('patients',{title:'All Patients',patients})

    } catch(error){
    res.status(500).send('Failed to fetch patients')
    }
}
*/

// Taking all patient data with help of fs.operator
const getAllPatients = async(req,res)=>{
    try {
        const data = await fs.readFile(filepath,'utf-8')
        const patientsList = JSON.parse(data)

       // const patientList = await fetchAllPatients()
    res.render('patients',{title:'All Patients',patients:patientsList})

    } catch(error){
    res.status(500).send('Failed to fetch patients')
    }
}



const getPatientForm  =(req,res)=>{
    res.render('patient-form')
}

/*
//  Here we can add patient to the data of patient array already i created
const addPatientForm = (req,res)=>{
    const {name,age,disease} = req.body;
    const newPatient = {
        id: patients.length + 1,
        name,
        age,
        disease
    }
    patients.push(newPatient)
    res.redirect('/patients')
}   */

const addPatientForm = async (req,res)=>{
    const {name,age,disease} = req.body;
      const data =await fs.readFile(filepath,'utf-8')
      const patients = JSON.parse(data)
    const newPatient = {
        id: Date.now(),
        name,
        age,
        disease
    }
    patients.push(newPatient)
    await fs.writeFile(filepath,JSON.stringify(patients,null,2))
    res.redirect('/patients')
}




// const singlePatient = (req,res)=>{
//     const patient = patients.find(patient => patient.id === parseInt(req.params.id))
//     if(!patient) return res.send('Patient not found')
//     res.render('patient-detail',{title:'Single patient',patient})
// }



// Normal error Handling (asynchronous function) 
//    const getsinglePatient =async(req,res)=>{
//       try{  
//         const patient = await fetchsinglePatient(req.params.id)
//         if(!patient) return res.status(404).send('Patient not found')
//          res.render('patient-detail',{title:'Single patient',patient})
//         } catch (err){
//           return res.status(500).send('Something went wrong')
//         }
//         }



/*  Got single patient details from the data i wrote
// Centralized error handling
const getsinglePatient =async(req,res,next)=>{
    try{  
    const patient = await fetchsinglePatient(req.params.id)
    if(!patient) {
       //  const err = new Error('Patient is not  found')               // error handling
        const err = new notFoundError('Patient is not  found')         // custom error handling from inside errors.js inside utils

            err.statusCode = 404
    //     return next(err)
             throw (err)  // In an asynchronous function,we can use 'throw' inside try catch only...otherwise we cant use throw(err) instead of next(err)
    }                      //  if we use throw without try catch function our entire app will crash
                              // Wheras in a synchronous function, express will handle the error. In asynchronous we have to handle.
    //return res.status(404).send('Patient not found')
    res.render('patient-detail',{title:'Single patient',patient})
    } catch (err){
        next(err)
       // return res.status(500).send('Something went wrong')
    }
}   */


  //  with the help of fs.operator we can save data  
const getsinglePatient =async(req,res,next)=>{
    try{  
        const data =await  fs.readFile(filepath,'utf-8')
        const patients = JSON.parse(data)
        const patient = patients.find(p=> p.id == req.params.id)
    // const patient = await fetchsinglePatient(req.params.id)
    if(!patient) {
        const err = new notFoundError('Patient is not  found')     

            err.statusCode = 404
    //     return next(err)
             throw (err) 
    }                   
    res.render('patient-detail',{title:'Single patient',patient})
    } catch (err){
        next(err)
    }
}






module.exports = {
    getAllPatients,
    getPatientForm,
    addPatientForm,
    getsinglePatient
}
 