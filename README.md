# MovieSearchEngine

A full-stack web application where users can sign-up, search for movies and look up history of their searches

## Built with:

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [The Movie Database API](https://www.themoviedb.org/documentation/api?language=en)
* [jquery](https://jquery.com/)
* [AJAX](api.jquery.com/jquery.ajax)
* [Pug](https://pugjs.org/)

## Deployed Site

https://moviesearch-mira.herokuapp.com/

## Getting Started

These instructions are for getting a copy of the project on your local environment.

* Clone/Fork - `git clone https://github.com/Maxmi/MovieSearchEngine.git`
* Install npm packages - `npm install`

## Setting up your database

* Create database - `npm run db:create` (make sure you don't have a db named "moviesearchengine" as this command will delete it)
* Create tables - `npm run db:schema`

## Setting up your config

* Run `cp .env.template .env` command in the terminal to create your own `.env` file and enter your config values in the `.env` file

## Starting your development server

* Run `npm start`
* To access the app go to `localhost:3333`
