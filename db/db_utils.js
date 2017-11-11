const pgp = require('pg-promise')();
const monitor = require('pg-monitor');

monitor.attach({});

const connectionOptions = {
  host: 'localhost',
  port: 5432,
  database: process.env.NODE_ENV === 'test' ? 'moviesearchengine_test' : 'moviesearchengine'
};

const db = pgp(connectionOptions);

const addUser = (email, password) => db.one(
  `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;`, [email, password]
);

const getUser = (email, password) => db.one(
  `SELECT * FROM users WHERE email=$1;`, [email]
);

const saveSearch = (search_term, user_id) => db.one(
  `INSERT INTO searches (search_term, email) VALUES ($1, $2) RETURNING *;`,
  [search_term, user_id]
);

const getSearchHistory = () => db.any(
  `SELECT search_term, search_date FROM searches WHERE user_id = $1;`, [user_id]
);


const closeConnection = () => {
  pgp.end();
};

module.exports = {
  addUser,
  getUser,
  saveSearch,
  getSearchHistory
};
