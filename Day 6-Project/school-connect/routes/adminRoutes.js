const express = require('express')
const router = express.Router()

const multer = require('multer')
const path = require('path')
const fs = require('fs')

 const {getAdmin,postAdmin,getadminHome, getAddStudent,postAddStudent,getEditform,postEditform,
      deleteStudent,getBulletinPage,uploadBulletin,deleteBulletin,logOutAdmin} = require('../controllers/adminControllers')
 
      const {preventCache} = require('../utils/adminToken')

 const {preventAdminLogin} = require('../middlewares/preventAdminLogin')
 const {verifyAdmin} = require('../middlewares/verifyAdmin')



//                         MULTER

// Setting multer
    const storage = multer.diskStorage({    //destination folder and file name define in storage
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../public/uploads'))
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname))
        }

    })
    const uploader =multer({storage});  //multer instance 



//                           BULLETIN ROUTES

// To get bulletin page
router.get('/bulletin', verifyAdmin,getBulletinPage )

// To post file upload
router.post('/fileUpload', verifyAdmin, uploader.single('file'), uploadBulletin);

// Delete bulletin route
router.get('/delete-bulletin/:filename', verifyAdmin, deleteBulletin);




// Admin login routes
router.get('/login',preventCache,preventAdminLogin,getAdmin);
router.post('/login',preventCache,preventAdminLogin,postAdmin)

                                                // preventCache:- To stop browser from showing login after logout
                                                // preventAdminLogin:- Ensures already logged admin cant see login page
//  Admin Dashboard routes
router.get('/home',verifyAdmin,getadminHome)

// Add new student
router.get('/add-student',verifyAdmin,getAddStudent)
router.post('/add-student',verifyAdmin,postAddStudent)


// Edit single student
router.get('/edit-student/:id',verifyAdmin,getEditform)
router.post('/edit-student/:id',verifyAdmin,postEditform)

//Delete singlestudent
 router.get('/delete-student/:id',verifyAdmin,deleteStudent);


// Logout Admin page
 router.get('/logout',verifyAdmin,logOutAdmin)




module.exports = router;
