const router = require('express').Router();
const { saveSearch, getSearchHistory } = require('../db/actions');
const axios = require('axios');

// save searches in db
router.post('/history', (req, res) => {
  const { searchTerm } = req.body;
  const { userID } = req.session;

  saveSearch(searchTerm, userID)
    .then(() => {
      res.json({ message: `Successfully saved the search with term: ${searchTerm}` });
    })
    .catch(err => {
      res.json({ error: `Could not save search with term: ${searchTerm}` });
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
    .catch(err => {
      res.json({ error: 'Could not get search history' });
    });
});

//get info from external API
const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}`;

router.get('/movie/:searchTerm', (req, res) => {
  const { searchTerm } = req.params;
  return axios
    .get(`${moviesUrl}&query=${searchTerm}`)
    .then(movies => {
      res.json(movies.data);
    })
    .catch(err => {
      console.error(err)
      res.json({ error: 'Could not get requested info' });
    });
});

module.exports = router;
