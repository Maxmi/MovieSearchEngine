const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');

const saltRounds = 10;

const {
  addUser, getUser, saveSearch, getSearchHistory,
} = require('../db/db_utils');

// route to home page
router.get('/', (req, res) => res.render('index', { email: req.session.userID }));

// route to signup page - GET
router.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'Sign Up',
    error: '',
    email: req.session.userID, // setting property email on req session obj
  });
});

// route to signup page - POST
router.post('/signup', (req, res) => {
  const { email, password } = req.body;

  // confirm that user filled all inputs
  if (!(email || password)) {
    res.render('signup', {
      title: 'Sign Up',
      error: 'Please provide email and password to sign up',
    });
  } else {
    // hash the password and add user info to db
    bcrypt.hash(password, saltRounds, (err, hash) => {
      addUser(email, hash)
        .then((user) => {
        // start tracking the user
          req.session.userID = user.email;
          res.redirect('/');
        }).catch((err) => {
          res.render('signup', {
            title: 'Sign Up',
            error: 'Could not add user to database',
          });
        });
    });
  }
});

// route to login page - GET
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Log In',
    error: '',
    email: req.session.userID,
  });
});

// route to login page - POST
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // check if user filled both inputs
  if (!email || !password) {
    res.render('login', {
      title: 'Log In',
      error: 'Please provide email and password to log in',
    });
  } else {
    getUser(email, password)
      .then((user) => {
        bcrypt.compare(password, user.password)
          .then((result) => {
            if (result) {
              req.session.userID = user.email,
              res.redirect('/');
            } else {
          res.render('login', {
                title: 'Log In',
                error: 'Wrong password. Please try again.',
              });
            }
          });
      }).catch((err) => {
        res.render('login', {
          title: 'Log In',
          error: 'Could not find this user in db.',
        });
      });
  }
});

// route to logout
router.get('/logout', (req, res, next) => {
  // if this is authenticated user - delete cookies
  if (req.session) {
    req.session = null;
    res.redirect('/');
  } else {
    return next();
  }
});

// save searches in db
router.post('/history', (req, res) => {
  const { searchTerm } = req.body;
  const { userID } = req.session;

  saveSearch(searchTerm, userID)
    .then(console.log('Saved this search into db'))
    .catch((err) => {
      console.log('Could not save this search to db');
    });
});

// route to history page - GET
router.get('/history', (req, res) => {
  const email = req.session.userID;

  getSearchHistory(email)
    .then((searches) => {
      res.render('history', {
        title: 'Search History',
        error: '',
        email: req.session.userID,
        data: searches,
      });
    }).catch((err) => {
      console.log('Could not retrieve data from db');
    });
});

module.exports = router;
