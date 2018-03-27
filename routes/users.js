const router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10; // bds: all "require"s should come before all non-require code

const { addUser, getUser } = require('../db/actions');

// route to signup page - GET
router.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'Sign Up',
    // bds: can you update your templates so you don't have to include "error" at all if 
    // bds: there's no error? 
    error: '', 
    email: req.session.userID // setting property email on req session obj
  });
});

// route to signup page - POST
router.post('/signup', (req, res) => {
  const { email, password } = req.body;

  // confirm that user filled all inputs
  // bds: I think you mean !email || !password, or !(email && password)
  // bds: this logic allowed me to sign up with a blank password...
  if (!(email || password)) { 
    res.render('signup', {
      title: 'Sign Up',
      error: 'Please provide email and password to sign up'
    });
  } else {
    // hash the password and add user info to db
    bcrypt.hash(password, saltRounds, (err, hash) => {
      addUser(email, hash)
        .then(user => {
          // start tracking the user
          req.session.userID = user.email;
          res.redirect('/');
        })
        .catch(err => {
          // bds: it would be a better user experience if you sent an error
          // bds: page, rather than plain JSON
          res.status(400).json({
            message: `Failed to add user to db: ${err.toString()}`
          });
        });
    });
  }
});

// route to login page - GET
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Log In',
    // bds: can you update your templates so you don't have to include "error" at all if 
    // bds: there's no error? 
    error: '',
    email: req.session.userID
  });
});

// route to login page - POST
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // check if user filled both inputs
  if (!email || !password) { // bds: ah, this is better logic :-D
    res.render('login', {
      title: 'Log In',
      error: 'Please provide email and password to log in'
    });
  } else {
    getUser(email, password)
      .then(user => {
        bcrypt.compare(password, user.password).then(result => {
          if (result) {
            req.session.userID = user.email;
            res.redirect('/');
          } else {
            res.render('login', {
              title: 'Log In',
              error: 'Wrong password. Please try again.'
            });
          }
        });
      })
      .catch(err => {
        res.status(400).json({
          message: `Could not find user in db: ${err.toString()}`
        });
      });
  }
});

// route to logout
router.get('/logout', (req, res, next) => {
  // bds: here, you're deleting the session data, not the cookie
  // if this is authenticated user - delete cookies
  if (req.session) {
    req.session = null;
    res.redirect('/');
  } else {
    return next();
  }
});

module.exports = router;
