const router = require('express').Router();
const { saveSearch, getSearchHistory } = require('../db/actions');

// save searches in db
router.post('/history', (req, res) => {
  const { searchTerm } = req.body;
  const { userID } = req.session;

  saveSearch(searchTerm, userID)
  // bds: argument to .then needs to be a function, not a function call. 
    .then(console.log('Saved this search into db'))

    // bds: better. But make sure you console log the error, too. And 
    // bds: "console.error" would be better here than "console.log"
    .catch(err => {
      console.log('Could not save this search to db');
    });
});

// get search history
router.get('/history', (req, res) => {
  const email = req.session.userID;

  getSearchHistory(email)
    .then(searches => {
      res.render('history', {
        title: 'Search History',
        error: '',
        email: req.session.userID,
        data: searches
      });
    })
    // bds: same comments as the .catch above...
    .catch(err => {
      console.log('Could not retrieve data from db');
    });
});

module.exports = router;
