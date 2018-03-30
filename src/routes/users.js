const router = require('express').Router();
const bcrypt = require('bcrypt');
const { addUser, getUser } = require('../db/actions');
const saltRounds = 10;

// route to signup page - GET
router.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'Sign Up',
    email: req.session.userID // setting property email on req session obj
  });
});

// route to signup page - POST
router.post('/signup', (req, res) => {
  const { email, password } = req.body;

  // confirm that user filled all inputs
  if (!email || !password) {
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
          res.render('error', {
            error: 'Failed to add user to database'
          });
        });
    });
  }
});

// route to login page - GET
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Log In',
    email: req.session.userID
  });
});

// route to login page - POST
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // check if user filled both inputs
  if (!email || !password) {
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
              error: 'Wrong email or password. Please try again.'
            });
          }
        });
      })
      .catch(err => {
        res.render('error', {
          error: 'Could not find user in the database'
        });
      });
  }
});

// route to logout
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session = null;
    res.clearCookie('session');
    res.redirect('/');
  } else {
    return next();
  }
});

module.exports = router;
