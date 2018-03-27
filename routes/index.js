const router = require('express').Router();
const userRoutes = require('./users');
const searchRoutes = require('./searches');

router.use('/', userRoutes);
router.use('/', searchRoutes);

// route to home page
router.get('/', (req, res) =>
  res.render('index', {
    title: 'MovieSearchEngine',
    email: req.session.userID
  })
);

module.exports = router;
