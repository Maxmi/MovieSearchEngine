-- bds: this needs to be part of npm run db:create

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  email varchar(255) UNIQUE NOT NULL PRIMARY KEY,
  password varchar(255) NOT NULL
);


DROP TABLE IF EXISTS searches;

CREATE TABLE searches (
  search_id SERIAL PRIMARY KEY,
  search_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  search_term text NOT NULL,
  email text REFERENCES users
);
