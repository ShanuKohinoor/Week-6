const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const { signToken} = require('./utils/jwt');
const loginAuth = require('./middleware/auth');
const preventCache = require('./middleware/preventCache')
const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Demo user
const DEMO_USER = { id: 'SHAN', email: 'shanshan@gmail.com', password: 'shan123', name: 'Shan' };

//                                             ROUTES 

// Welcome page
app.get('/', (req, res) => {
  res.render('welcome');
});

// Login form page
app.get('/login', (req, res) => {
  res.render('login', { demo: DEMO_USER });
});

// Handle login form
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
    return res.render('login', { demo: DEMO_USER, error: 'Invalid credentials' });
  }

  const token = signToken(DEMO_USER);
  res.cookie('token', token, {
    httpOnly: true, 
    secure: false,
    sameSite: 'Lax',
    maxAge: 60 * 60 * 1000 
  });

  res.redirect('/me');
});

// Protected route
app.get('/me', loginAuth,preventCache, (req, res) => {
  res.render('profile', { user: req.user });
});

// Logout
app.post('/logout', loginAuth,preventCache, (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: false, sameSite: 'Lax' });
  res.redirect('/');
});

// server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
