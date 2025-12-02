const {NotFoundError,UnAuthorized} = require('../utils/error')

const fs = require('fs')
const path = require('path')
const { createAdminToken } = require('../utils/adminToken')
const {loadStudents} = require('../utils/loadStudents')

// Json file path
const filePath = path.join(__dirname,'../data/student.json')



// Write students to json file

function writeFile(students){
  fs.writeFileSync(filePath,JSON.stringify(students,null,2))  // saves students
}


//                      LOGIN PAGE

// To get Admin login page
const getAdmin =(req,res)=>{
  res.render('adminLogin',{title:'Admin Login'})
}



// To post Admin login page(Generate JWT token here)
const postAdmin= (req,res,next)=>{
  // const { username,password} = req.body;
     const username = req.body.username.trim();
     const password = req.body.password.trim();

  if (username === 'Admin' && password === '12345'){

    const token = createAdminToken({ id: 1, username: 'Admin'}) 
                                                     // can also write {(id:1, username)}..use username from req.body

    // store token in cookie(HTTP only)
    res.cookie('adminToken', token,{       // adminToken :- The cookie name ,
                                           //  token:- Token which we created
      httpOnly: true,
      sameSite: 'Strict',
      maxAge: 50 * 60 * 1000
    })
   return res.redirect('/admin/home')
  } 
   return next (new NotFoundError('Admin not Found'))
}




//                      HOME PAGE

const getadminHome = (req,res)=>{
  const studentsList = loadStudents() // get all students
  res.render('adminHome',{title: 'Admin DashBoard',userName:'Admin',studentsList})
}

// Show add student form
const getAddStudent = (req,res)=>{
  res.render('addStudent',{title:'Add new Student'})
}

// Post add student form
const postAddStudent = (req, res, next) => {
  try {
    const { name, email, year, division, parentMobile, attendance } = req.body;
    const students = loadStudents();      // Read existing student from student.json

    const newStudent = {
      id: Number(String(Date.now()).slice(6)),
      name,
      email,
      year,
      division,
      parentMobile,
      attendance
    };

    students.push(newStudent);      // Add new students to the list (temporary store)
    writeFile(students);            // Permanent store in the file(student.json). Save updated students

    res.redirect('/admin/home');
  } catch (err) {
    next(new NotFoundError('Unable to add student'));
  }
};


// shows the edit form
 const getEditform = (req,res,next)=>{
  try{
    const studentId = parseInt(req.params.id)
    const students= loadStudents();
    const student = students.find(s=>s.id === studentId)
    if(!student){
      throw  new NotFoundError('Student not found with this id')
      // if student exists render the editForm
     } res.render('editAdminStudent',{title: 'Edit student',student})
     } catch(err){
      next(err)
    }
  }



// post edited student (updates student data in students.json)
    const postEditform = (req,res,next)=>{
      
      const {name,email,year,division,parentMobile,attendance} = req.body;
      const students = loadStudents();
      const studentId = parseInt(req.params.id)
      const student = students.find(s=>s.id === studentId)

      if (student){
        student.name = name;
        student.email = email;
        student.year= year;
        student.division = division;
        student.parentMobile = parentMobile;
        student.attendance = attendance
      }
      writeFile(students)
      res.render('studentProfile', {title:'Student profile',student})

    }


// Delete student profile 
  const deleteStudent = (req, res) => {
      const studentId = Number(req.params.id);
      let students = loadStudents();

    // Remove student by filtering
     deletedStudent = students.filter(student => student.id !== studentId);

     writeFile(deletedStudent); // Save updated list
     res.redirect('/admin/home');
  };



//                      BULLETIN

// Function to read bulletin file( from bulletins.json inside data)
        function getBulletins() {
          const bulletinsPath = path.join(__dirname, '../data/bulletins.json');
          if (fs.existsSync(bulletinsPath)) {
            return JSON.parse(fs.readFileSync(bulletinsPath, 'utf-8'));
          } else {
            return [];
          }
        }

// To get bulletin page
        const getBulletinPage = (req, res) => {
          const bulletins = getBulletins();  // fetch all uploaded bulletins
          res.render('bulletin', { message: '', bulletins });  // render EJS view
        };

 // To handle file upload       
       const uploadBulletin= (req,res)=>{
          const bulletinsPath = path.join(__dirname,'../data/bulletins.json');
            let bulletins = getBulletins();

            if (req.file) {
              bulletins.push({
                filename: req.file.filename,
                uploadTime: new Date().toISOString()
              });
              fs.writeFileSync(bulletinsPath, JSON.stringify(bulletins, null, 2));
              res.render('bulletin', { message: 'File Upload Successfully', bulletins });
            } else {
              res.render('bulletin', { message: 'Upload Failed', bulletins });
            }
          };


  //                     To delete uploaded file Bulletin
  
        const deleteBulletin = (req, res) => {
          const filename = req.params.filename;  // Get filename from URL
          const bulletinsPath = path.join(__dirname, '../data/bulletins.json');
          let bulletins = [];

          // Read existing bulletins
          if (fs.existsSync(bulletinsPath)) {
            bulletins = JSON.parse(fs.readFileSync(bulletinsPath, 'utf-8'));
          }

          // Filter  the bulletin to delete
          const updatedBulletins = bulletins.filter(b => b.filename !== filename);

          // Save updated bulletins
          fs.writeFileSync(bulletinsPath, JSON.stringify(updatedBulletins, null, 2));

          // Delete the actual file from uploads folder
          const filePath = path.join(__dirname, '../public/uploads', filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }

          // Redirect back to bulletin page
          res.redirect('/admin/bulletin');
        };


  // Logout admin page 
  const logOutAdmin = (req,res)=>{
    res.clearCookie('adminToken',{httpOnly:true, sameSite: 'Strict'})
    res.redirect('/')
  }



module.exports = {getAdmin,postAdmin,getadminHome,getAddStudent,postAddStudent,getEditform,
                   postEditform,deleteStudent,getBulletinPage,uploadBulletin,deleteBulletin,logOutAdmin}
