const pgp = require('pg-promise')();

let dbName = process.env.DB_NAME;


if (process.env.NODE_ENV === 'test') {
  dbName = "moviesearchengine_test";
} else if (process.env.NODE_ENV === "development") {
  dbName = "moviesearchengine";
}

let connectionString = `${process.env.DATABASE_URL}${dbName}?ssl=${process.env.DB_SSL || true}`;

if(process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'development') {
  connectionString = `${process.env.DATABASE_URL}?ssl=${process.env.DB_SSL || true}`;
}


console.log(connectionString);
console.log(process.env.NODE_ENV);


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
