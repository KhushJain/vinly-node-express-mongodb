const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = (app) =>{
    app.set('view engine', 'pug');
    app.set('views', '../views');

    app.use(express.json());
    // app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));

    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);

    // Error Handling when we get an internal error
    app.use(error);

    app.get('/', (req, res) => {
        res.render('index', { title:'My App',message: 'Hello' })
    });  
};