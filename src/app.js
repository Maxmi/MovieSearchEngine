require('dotenv').config();
require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const routes = require('./routes');

const port = process.env.PORT || 3333;
const app = express();

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use sessions for tracking logins with cookie-session
app.use(
  session({
    name: 'session',
    keys: [process.env.SESSION_KEY]
  })
);

// serve static files from /public
app.use(express.static('public'));

// setup views
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

// routes
app.use('/', routes);

// catch 404
app.use((req, res, next) => {
  const err = new Error('File not found');
  err.status = 404;
  next();
});

// error handler
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

// listen
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

// module.exports = { app };
