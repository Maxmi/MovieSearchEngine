const db = require('./db');

/**
 * Function to sign user up
 *
 * // bds: no brackets around the descriptions for jsdoc
 * @param {String} email    [email user entered at sign up]
 * @param {String} password [password user entered at sign up]
 * @return {Promise}        [Promise resolving to object with user credentials]
 */
const addUser = (email, password) => {
  const query = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING *
  `;
  return db.one(query, [email, password]);
};

/**
 * Function to retrieve a user from db
 * @param  {String} email    [email provided by user at sign in]
 * @param  {String} password [password provided by user at sign in]
 * @return {Promise}         [Promise resolving to object with user credentials]
 */
const getUser = (email, password) => {
  const query = `
    SELECT *
    FROM users
    WHERE email=$1
  `;
  return db.oneOrNone(query, [email, password]);
};

/**
 * Function to save searches made by a user
 * @param  {String} searchTerm [word(s) entered by user into search field]
 * @param  {String} email      [user's email retrieved from session]
 * @return {Promise}           [Promise resolving to object with search data]
 */
const saveSearch = (searchTerm, email) => {
  const query = `
    INSERT INTO searches (search_term, email)
    VALUES ($1, $2)
    RETURNING *
  `;
  return db.one(query, [searchTerm, email]);
};

/**
 * Function to retrieve search history of a user
 * @param  {String} email [signed in user's email taken from session]
 * @return {Promise}      [Promise resolving to array of objects with search history data ]
 */
const getSearchHistory = email => {
  const query = `
    SELECT search_date, search_term
    FROM searches
    WHERE email = $1
  `;
  return db.any(query, [email]);
};

module.exports = {
  addUser,
  getUser,
  saveSearch,
  getSearchHistory
};
