const pgp = require('pg-promise')();
// const monitor = require('pg-monitor');

// monitor.attach({});

// const connectionOptions = {
//   host: 'localhost',
//   port: 5432,
//   database: process.env.NODE_ENV === 'test' ? 'moviesearchengine_test' : 'moviesearchengine'
// };
//
const connectionString = `${process.env.DATABASE_URL}?ssl=${process.env.DB_SSL || true}` || 'postgres://localhost:5432/moviesearchengine';

console.log(process.env.DATABASE_URL);

const db = pgp(connectionString);

const addUser = (email, password) => db.one(
  `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;`,
  [email, password]
);

const getUser = (email, password) => db.one(
  `SELECT * FROM users WHERE email=$1;`, [email]
);

const saveSearch = (search_term, user_id) => db.one(
  `INSERT INTO searches (search_term, email) VALUES ($1, $2) RETURNING *;`,
  [search_term, user_id]
);

const getSearchHistory = (email) => {return db.any(
  `SELECT search_date, search_term FROM searches WHERE email = $1;`, [email]
)};


const closeConnection = () => {
  pgp.end();
};

module.exports = {
  addUser,
  getUser,
  saveSearch,
  getSearchHistory,
  closeConnection
};
