const express = require('express');
const router = express.Router();

const {getStudent,
     postStudent,
      getStudentHome,
      getEditStudentForm,
      postStudentEdit,
      chatStudentList,
      getPrivateChat,
      getGroupList,
      getGroupChat,
      getStudentBulletins, 
      studentLogout} = require('../controllers/studentControllers');

const { preventStudentLogin } = require('../middlewares/preventStudentLogin');
const { verifyStudent } = require('../middlewares/verifyStudent');


// Login routes
router.get('/login', preventStudentLogin, getStudent);
router.post('/login', preventStudentLogin, postStudent);

// Student home
router.get('/home/:id', verifyStudent, getStudentHome);

//Student EditForm
router.get('/editStudent', verifyStudent, getEditStudentForm);
router.post('/updateProfile', verifyStudent, postStudentEdit);

// Bulletin 
router.get('/bulletins', verifyStudent, getStudentBulletins);

// Logout
router.get('/logout', verifyStudent, studentLogout);


// Private chat
router.get('/privateChatList',verifyStudent, chatStudentList)
router.get('/chat/:senderId-:receiverId', verifyStudent, getPrivateChat);

// Group chat routes
router.get('/group-list', verifyStudent, getGroupList);          // Shows list of all groups

router.get('/groupChat/:groupId', verifyStudent, getGroupChat);     // Opens individual group chat


module.exports = router;
