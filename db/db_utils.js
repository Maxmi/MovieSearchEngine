const pgp = require('pg-promise')();

const connectionString = `${process.env.DATABASE_URL}${process.env.NODE_ENV === 'test' ? '_test' : ''}?ssl=${process.env
  .DB_SSL || true}`;

/* bds: when I tried to post a new user from the site, I got this error: 

{
  message: "Failed to add user to db: Error: The server does not support SSL connections"
}

Maybe make ssl false by default...?
Also, you MUST have a .env.template file that indicates what should go in the .env file
(for example, DATABASE_URL, PORT, DB_SSL, etc). When I fixed DB_SSL, I got this error: 

{
  message: "Failed to add user to db: error: database "undefined" does not exist"
}

once I fixed, that, I got this error: 

{
  message: "Failed to add user to db: error: relation "users" does not exist"
}

You need to make a fresh clone from your github repo, and then follow your own instructions
to make sure they're complete. :-) 

*/

const db = pgp(connectionString);

// const closeConnection = () => {
//   pgp.end();
// };

module.exports = db;
