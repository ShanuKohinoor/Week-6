const { notFoundError, badRequest } = require("../utils/errors")
const fs = require('fs').promises   
const path = require('path')

const filepath =path.join(__dirname,'../data/doctors.json')


   const doctors = [
    { id: 1, name: 'Dr. Vasundhara', specialization: 'Gynecologist'},
    { id: 2, name: 'Dr. Shamsudheen', specialization: 'General Surgeon'},
    { id: 3, name: 'Dr. Faisal', specialization: 'Pediatrcian'}
   ]

      // simulate asynchronous database(just for example as same done in patientControllers.js)
          
         const fetchAllDoctors = (req,res) =>{
             return new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve(doctors)
                },1000)
             })
        }

     
        const fetchsingleDoctor = (id) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                  const doctor = doctors.find(d => d.id === parseInt(id) + 3); 
                  resolve(doctor);
                }, 1000);
            });
        };





//This code is used to get all doctors details with our normal data.
   //  const getAllDoctors =(req,res)=>{
   //    res.render('doctors',{title:'All Doctors',doctors})} 


/*
// This code is used to get all doctors details with async await 
      // Data is from the array we created.
       const getAllDoctors = async (req,res)=>{     //    // Getting data from data base will take time. So it is an asynchronous function. So we use async await to handle asynchronous. Here we dont have Database. So, we simulate it from our data for solving asynchronous.
        try {
            const doctorsList = await fetchAllDoctors()
    res.render('doctors',{title:'All Doctors',doctors:doctorsList})
        } catch(err){
            res.status(500).send('Failed to fetch Doctors')
        }       
    }                    
   */       

    //   Add all doctors.(Uses fs.readFile to get all doctors from the file and renders the doctors view page)
       const getAllDoctors = async (req,res)=>{   
        try {
            const data = await fs.readFile(filepath,'utf-8')
            const doctorsList = JSON.parse(data)
    res.render('doctors',{title:'All Doctors',doctors:doctorsList})
        } catch(err){
            res.status(500).send('Failed to fetch Doctors')
        }
    }                    


    const getDoctorForm =(req,res)=>{
      res.render('doctor-form',{title:'Add New Doctor'})}


/*          // Data is from the array i created

   const addDoctorForm = (req,res)=>{
    const {name,specialization} = req.body;
    const newDoctor = {
        id : doctors.length + 1,
        name,
        specialization
    }
    doctors.push(newDoctor);
    res.redirect('/doctors')
   }*/



    //     Uses fs.readfile to get new added doctor fron the list

   const addDoctorForm =async (req,res)=>{
    const {name,specialization} = req.body;

    const data = await fs.readFile(filepath,'utf-8')
    const doctors = JSON.parse(data)
    const newDoctor = {
        id : Date.now(),
        name,
        specialization
    }
    doctors.push(newDoctor);
    await fs.writeFile(filepath,JSON.stringify(doctors,null,2))
    res.redirect('/doctors')
   }

   



   /*
     const getsingleDoctor = (req,res)=>{
    const doctor  = doctors.find(d=> d.id === parseInt(req.params.id))
    if(!doctor) return res.send('Doctor not found')
        res.render('doctor-detail',{title:'Detail of Doctor',doctor})
   }
  */

/*
        const getsingleDoctor = async (req,res)=>{
            try {
                const doctor  = await  fetchsingleDoctor(req.params.id)
                if(!doctor) return res.status(404).send('Doctor not found')
                 res.render('doctor-detail',{title:'Detail of Doctor',doctor})
            }  catch(err){
                return res.status(500).send('Something went wrong')
            }
   }
*/

    // In normal errorhandling middleware with async await,we have to repeat writing try...catch blocks in every route or function, which leads to repeated code.
    // So,we use centralized errorhandling middleware. Which allows to write the error-handling logic once in a middleware, reducing repetition and keeping our code cleaner.
    // Centralized errror handling prevents repeating res.status().send() in every function



//             CENTRALIZED ERROR HANDLING :-

/*
        const getsingleDoctor = async (req,res,next)=>{
            try {
                const doctor  = await  fetchsingleDoctor(req.params.id)
                if(!doctor) {
                    const err = new Error('Doctor not found')   // Create an object with a custom message 'Doctor not found'.
                                                                   // This new Error object helps to trigger an error and pass it to the  centralized error handling middleware.
                    err.statusCode = 404       // set status code for the error in error object
                    return next(err);           // return to next middleware instead of response.
                                                //  if we write an argument(err) inside next it will go to error middleware only...Wont go to the normal middleware.
                                                 // if there is 4 arguments, it is definetly centralized middleware
                }
              res.render('doctor-detail',{title:'Detail of Doctor',doctor})
            }  catch(err){

                next(err)            // will give the error to error handling middleware.
               // return res.status(500).send('Something went wrong')
            }
   }

   We dont want to create each error status code repeatedly..so we can create an custom class error other than object . For that we have to write a code in a subfolder named error.js in a folder utils and export that to here.
  */

   
 /*//                      Custom class error

// Here we are writing custom class error in our existing code instead of object.

      const getsingleDoctor =async (req,res,next)=>{
        try {
            const doctor = await fetchsingleDoctor(req.params.id)
            if(!doctor){
                // here we have to write code for custom  error class.
                const err = new notFoundError('Doctor not found in array')  // no need to write statusCode here. Because we already set statusCode in utils.
              // return next(err)    :- next() is express specific
               throw err            // :- whereas throw() is javascript specific..So,try..catch is must.
            }                                     //if we write trow  without try..catch, app will crash. 
              res.render('doctor-detail',{title:'Detail of Doctor',doctor})
        } catch(err){
            next(err);
        }

      }   */

      const getsingleDoctor =async (req,res,next)=>{
        try {
            const data = await fs.readFile(filepath,'utf-8')
            const doctors = JSON.parse(data)

             const doctor = doctors.find(d => d.id == Number(req.params.id));

           // const doctor = await fetchsingleDoctor(req.params.id)
            if(!doctor){
                const err = new notFoundError('Doctor not found in array')  // no need to write statusCode here. Because we already set statusCode in utils.
              // return next(err)    
               throw err            
            }            
              res.render('doctor-detail',{title:'Detail of Doctor',doctor})
        } catch(err){
            next(err);
        }

      }




    module.exports = {
        getAllDoctors,
        getDoctorForm,
        addDoctorForm,
        getsingleDoctor
    }