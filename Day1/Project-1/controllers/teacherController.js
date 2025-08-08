//                                   teacherController



// Array to store teacher data in memory

    let teachers = [
        {id: 1, name: 'Mrs.Beena', subject: 'Chemistry'},
        {id: 2, name: 'Mrs.Sumathy', subject: 'Malayalam'},
        {id: 3, name: 'Mr.Salam', subject:'Hindi'}
    ]
// Controller to handle GET request for all teachers.
// It renders the 'teachers' view, passing the list of teachers and a title.
    const getAllTeachers =(req,res)=>{
        res.render('teachers',{title: 'All teachers', teachers})
      }

// Controller to handle GET request for the form to add a new teacher.
// It renders the 'teacher-form' view with a title.
  const getTeacherForm = (req,res)=>{
        res.render('teacher-form',{title: 'Add teachers'})
      }


 // Controller to handle POST request when adding a new teacher.
// It takes name and subject from the form submission (req.body).
// Creates a new teacher object with a unique id.
// Adds the new teacher to the teachers array.
// Redirects the user back to the teachers list page.
     
    const addTeacherForm =(req,res)=>{
        const {name,subject}  = req.body;
        const newTeacher = {
            id: teachers.length + 1,
            name,
            subject
        }
        teachers.push(newTeacher)
        console.log(teachers); 
        res.redirect('/teachers')
      }
 

// Controller to handle GET request for a single teacher's details.
// Finds a teacher by id from the URL parameter (req.params.id).
// Note: Using Number() to ensure type match (id is numeric).
// If no teacher is found, sends 'Teachers not found' message.
// Otherwise, renders 'teacher-detail' view passing the teacherdata.
   
      const singleTeacher =(req,res)=>{
        const teacher = teachers.find(t=> t.id === Number(req.params.id));
        if(!teacher) return res.send('Teachers not found')
            res.render('teacher-detail',{title: 'Teacher Details', teacher})
      }
  
// Export all controllers so routes can use them.
      module.exports = {
       getAllTeachers,
       getTeacherForm,
       addTeacherForm,
       singleTeacher
      }


