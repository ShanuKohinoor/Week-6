//     • File Uploads with Multer
//     • Install and configure multer middleware
//     • Accept single file upload using upload.single('file')
//     • Store uploaded files in an uploads/ folder
//     •  Access file info via req.file
//     • Add basic file type/size validation in controller

//     • Build a backend-only project combining all major concepts from this week.
//     • App Theme: School Connect
// A simplified school portal with two roles – admin and student.
//     • Authentication
// Login page (using static credentials)
// Generate JWT on login and store in HTTP-only cookie
// Use middleware to protect all private routes
//     • File Uploads
// Allow admin to upload school bulletins (PDFs or images)
// Save files using Multer and store filenames in an in-memory array
// Students can view the uploaded bulletins on /student/home
//     • Live Chat with Socket.IO
// Admin and students can send/receive real-time messages
// Broadcast messages with sender name and time
// Show “user joined/left” status
// Use Middlewares
//     • .env ,helmet, cors, compression ,express-rate-limit,morgan 





//  How to do this project step by step?



//  STEP-1        Requirements understanding
//                          |
//                          |
//                          v
//  STEP-2     Initialize project + install dependencies
//                          |
//                          |
//                          v
//  STEP-3    Setup basic Express server(Create a folder named school-connect folder)
//                          |
//                          |
//                          v
//  STEP-4           Plan folder structure 
//                          |
//                          |
//                          v                 
//  STEP-5          Add Authentication
//                          | (JWT,cookie-parser, auth Middleware)
//                          |
//                          v
//  STEP-6           Add File Upload
//                          |
//                          |
//                          v
//  STEP-7          Add Chat (Socket.IO)
//                          |
//                          |
//                          v
//  STEP-8         Add middlewares & polish








        // school-connect/
        // |
        // |
        // ├── /controllers                      // Logic for each route
        // │        ├── adminController.js
        // │        └── authController.js
        // │
        // |
        // ├── /middlewares                     // Custom middlewares
        // │        ├── errorHandlings.js              // Authentification
        // |
        // |
        // ├── /public                          // Static  (CSS, JS, images)
        // │      └── style.css
        // │
        // |
        // ├── /routes                         //  All route files
        // │      ├── adminRoutes.js              //  Admin routes (login, upload bulletin, etc.)
        // │      └── authRoutes.js               //  Authentication routes if separate
        // │
        // │
        // ├── /uploads                       //  Folder where Multer stores uploaded files
        // │      └── (bulletins saved here)
        // │
        // │
        // ├── /utils                        // Helper files
        // |      └── error.js               // Custom AppError class
        // │
        // │
        // ├── /views                       // EJS templates (use EJS for rendering)
        // │      ├── adminLogin.ejs
        // │      ├── error.ejs
        // │      ├── studentLogin.ejs
        // │      └── welcome.ejs
        // │
        // ├── .env                   # Environment variables (JWT secret, port, etc.)
        // │
        // |
        // ├── server.js                # Main entry file (Express app, middlewares, routes, socket.io setup)
        // │
        // |
        // └── package.json

