console.log('dirname:', __dirname)
require('dotenv').config({path: __dirname + '/../../.env'});
const db = require('../../src/db/db');

const usersTable = ['users'];
const searchesTable = ['searches'];

const truncateTable = table => {
  const query = `
    TRUNCATE ${table} RESTART IDENTITY CASCADE
  `;
  return db.any(query, [table]);
};

// const createUserQuery = `
//   INSERT INTO users (email, password)
//   VALUES ($/email, $/password)
//   RETURNING *
// `;
//
//
//
// const createSearchQuery = `
//   INSERT INTO searches (date, term, email)
//   VALUES ($/date, $/term, $/email)
//   RETURNING *
// `;


const seedTable = table => {};

module.exports = {truncateTable}
