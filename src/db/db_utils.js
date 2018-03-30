const pgp = require('pg-promise')();

const connectionString = `${process.env.DATABASE_URL}${process.env.NODE_ENV === 'test' ? '_test' : ''}?ssl=${process.env
  .DB_SSL || true}`;

const db = pgp(connectionString);

module.exports = db;
