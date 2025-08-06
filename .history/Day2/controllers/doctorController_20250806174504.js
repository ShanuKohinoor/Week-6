

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



   //  const getAllDoctors =(req,res)=>{
   //    res.render('doctors',{title:'All Doctors',doctors})} 

       const getAllDoctors = async (req,res)=>{
        try {
            const doctorsList = await fetchAllDoctors()
    res.render('doctors',{title:'All Doctors',doctors:doctorsList})
        } catch(err){
            res.status(500).send('Failed to fetch Doctors')
        }
    }                           
    // Data base will take time. So it is an asynchronous function. So we use async await to handle asynchronous. Here we dont have Database. So


    const getDoctorForm =(req,res)=>{
    res.render('doctor-form',{title:'Add New Doctor'})}


   const addDoctorForm = (req,res)=>{
    const {name,specialization} = req.body;
    const newDoctor = {
        id : doctors.length + 1,
        name,
        specialization
    }
    doctors.push(newDoctor);
    res.redirect('/doctors')
   }

     const singleDoctor = (req,res)=>{
    const doctor  = doctors.find(d=> d.id === parseInt(req.params.id))
    if(!doctor) return res.send('Doctor not found')
        res.render('doctor-detail',{title:'Detail of Doctor',doctor})
   }










    module.exports = {
        getAllDoctors,
        getDoctorForm,
        addDoctorForm,
        singleDoctor
    }