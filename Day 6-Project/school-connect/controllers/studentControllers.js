const { NotFoundError, BadRequest } = require('../utils/error');
const { createStudentToken } = require('../utils/studentToken');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,'../data/student.json');
const {loadStudents} = require('../utils/loadStudents');
const bulletinsPath = path.join(__dirname,'../data/bulletins.json');

// Load students from JSON(students.json)
// function loadStudents() {
//   if (!fs.existsSync(filePath)) return [];
//   const data = fs.readFileSync(filePath, 'utf-8');
//   return JSON.parse(data);
// }

// Write students to JSON
function writeFile(students) {
  fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
}



//                         LOGIN PAGE

// To getlogin page
const getStudent = (req, res) => {
  res.render('studentLogin', { title: 'Student Login' });
};

// To post login form
const postStudent = (req, res, next) => {
  try {
    // const { username, email, password } = req.body;

    const email = req.body.email.trim();
    const password = req.body.password.trim();
    const studentPassword = '45678'; 
    const students = loadStudents();

    const student = students.find(s => s.email.trim().toLowerCase() === email.toLowerCase());

    if (!student) throw new NotFoundError('Invalid email');

    if (password !== studentPassword) throw new BadRequest('Incorrect password');

    // Create JWT token
    const token = createStudentToken({ id: student.id, username: student.name, role:'student' }); // createStudentToken from adminToken.js

    // Store token named studentToken in cookie
    res.cookie('studentToken', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // expires in 60 minutes
      sameSite: 'Strict'
    });

    // Redirect to student home
    res.redirect(`/student/home/${student.id}`);
  } catch (err) {
    next(err);
  }
};



//                          HOME PAGE


// To get student home page
const getStudentHome = (req, res, next) => {
  try {
    const studentId = parseInt(req.params.id);
    const students = loadStudents();
    const student = students.find(s => s.id === studentId);

    if (!student) throw new NotFoundError('Student not found');
    res.render('studentHome', { title: 'Welcome', student });
  } catch (err) {
    next(err);
  }
};
                                      
//                       EDIT STUDENT FORM
// To Edit student form by student
  
const getEditStudentForm = (req, res, next) => {
  try {

    const students = loadStudents();
    const studentId = Number(req.student.id); // from JWT verifyStudent middleware

    const student = students.find((s) => Number(s.id) === Number(req.student.id));

    if (!student) {
      return next(new NotFoundError('Student not found'));
    }
        res.render('editForm', { title: 'Edit Profile', student });

      } catch (err) {
        next(err);
      }
};



// To Post the Edit Form


const postStudentEdit = (req, res, next) => {
  try {
    const students = loadStudents();
    const studentId = Number(req.student.id);
    if (!studentId) return next(new Error('Invalid Student ID'));

    const student = students.find(s => s.id === studentId);
    if (!student) return next(new Error('Student Not Found'));

    const { name, email, parentMobile } = req.body;
    if (!name || !email || !parentMobile) {
      return next(new Error('Name, Email, and Parent Mobile are required'));
    }


    student.name = name;
    student.email = email;
    student.parentMobile = parentMobile;

    

    writeFile(students);

    res.redirect('/student/home/' + studentId);

  } catch (error) {
    next(error);
  }
};

//                         TO VIEW BULLETIN

// Function to get all bulletins
function getBulletins() {
  if (fs.existsSync(bulletinsPath)) {
    return JSON.parse(fs.readFileSync(bulletinsPath, 'utf-8'));
  }
  return [];
}

// Controller to render student bulletins page
const getStudentBulletins = (req, res, next) => {
  try {
    // check req.student exist
    if (!req.student || !req.student.id) {
      return res.redirect('/student/login'); // redirect to login page
    }

    const studentId = parseInt(req.student.id); 
    const bulletins = getBulletins();
    const students = loadStudents();
    const student = students.find(s => s.id === studentId);

    if (!student) throw new NotFoundError('Student not found');


    res.render('studentBulletins', { student, bulletins });
  } catch (err) {
    next(err);
  }
};


//                      PRIVATE CHAT


 const chatStudentList = (req,res)=>{
  const currentSender = req.student;  
  const students = loadStudents().filter(s=>s.id !== currentSender.id)

  res.render('privateChatList',{students,currentSender})
 }


 // PRIVATE CHAT ROUTE
const getPrivateChat = (req, res, next) => {
  try {
    const fromSenderId = parseInt(req.params.senderId, 10);
    const toReceiverId = parseInt(req.params.receiverId, 10);
    const students = loadStudents();

    const sender = students.find(s => s.id === fromSenderId);
    const receiver = students.find(s => s.id === toReceiverId);

    if (!sender || !receiver) throw new NotFoundError('Student not found');

    const privateRoom = [sender.id, receiver.id].sort((a, b) => a - b).join('_');

    res.render('privateChat', { sender, receiver, privateRoom });
  } catch (err) {
    next(err);
  }
};
 

 //                GROUP CHAT

//  Groups
const schoolGroup = [
  { id: 1, name: 'Science Exhibition' },
  { id: 2, name: 'Maths Excellence Group' },
  { id: 3, name: 'Music Club' },
  { id: 4, name: 'Sports Club' },
  { id: 5, name: 'Arts Fest Crew' },
  { id: 6, name: 'Readers Forum' }
];

// To show group list
const getGroupList = (req, res) => {
  const student = req.student;

  res.render('groupNames', { groups: schoolGroup, student });

};

// To open specific group chat
const getGroupChat = (req, res, next) => {

  try {
    const groupId = parseInt(req.params.groupId);
    const group = schoolGroup.find(g => g.id === groupId);

    if (!group) throw new NotFoundError('Group not found');

    res.render('groupChat', { student: req.student, group });

  } catch (err) {
    next(err);
  }
};



// Logout
const studentLogout = (req, res) => {
  res.clearCookie('studentToken', { httpOnly: true, sameSite: 'Strict' });
  res.redirect('/');
};







module.exports = { getStudent,
   postStudent,
   getStudentHome,
   getEditStudentForm,
   postStudentEdit,
   getStudentBulletins,
   chatStudentList,
   getPrivateChat,
   getGroupList,
   getGroupChat,
   studentLogout };
