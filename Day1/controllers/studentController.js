//                              studentController



// Array to store student data in memory
   let students = [
    { id: 1, name:'Neethu', grade: '10' },
    { id: 2, name:'Rasheena', grade: '9'},
    { id: 3, name:'Denipa', grade:'10'}
   ]

// Controller to handle GET request for all students.
// It renders the 'students' view, passing the list of students and a title.
const getAllStudents = (req,res)=>{
    res.render('students',{title:'All Students',students})
}

// Controller to handle GET request for the form to add a new student.
// It renders the 'student-form' view with a title.
const getStudentForm = (req,res) =>{
    res.render('student-form',{title: 'Add Students'})
}


// This is Controller to handle POST request when adding a new student.
// It takes name and grade from the form submission (req.body).
// Creates a new student object with a unique id.
// Adds the new student to the students array.
// Redirects the user back to the students list page.
const addStudentForm =(req,res)=>{
        const {name, grade} = req.body;
        const newStudent = {
            id: students.length +1,
            name,
            grade
        };
        students.push(newStudent);
        res.redirect('/students')
      };


// Controller to handle GET request for a single student's details.
// Finds a student by id from the URL parameter (req.params.id).
// If student is not found, sends 'Students not found' message.
// Otherwise, renders 'student-detail' view passing the student data.  
const singleStudent =  (req,res)=>{
        const student  = students.find(s => s.id == Number(req.params.id));
        if (!student) return res.send('Students not found');
        res.render('student-detail', {title: 'Student Details', student})
      }

// Export all controllers so routes can use them.
module.exports = { 
    getAllStudents,
    getStudentForm,
    addStudentForm,
    singleStudent
    
}