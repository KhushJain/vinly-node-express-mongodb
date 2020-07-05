require('express-async-errors');    // Used for handling errors
const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const winston = require('winston');     // For logging errors
require('winston-mongodb');     // For logging errors in mongodb
const error = require('./middleware/error');
const config = require('config');   // For configuring settings
const Joi = require('joi');     // For data validation
Joi.objectId = require('joi-objectid')(Joi);    // For validating object id

const app = express()

// // For Uncaught Exceptions
// process.on('uncaughtException', (e) => {
//     //console.log('We got an uncaught exception!');
//     winston.error(e.message, e);
//     process.exit(1);
// });
// OR
winston.handleExceptions(new winston.transports.File({ filename: 'exceptions.log' }));


// For Unhandled Promise Rejections
process.on('unhandledRejection', (e) => {
    //console.log('We got an unhandled promise rejection!');
    // winston.error(e.message, e);
    // process.exit(1);
    throw e;
});

// For logging erros
winston.add(winston.transports.File, { filename: 'logfile.log' });
// For logging errors in mongodb (database)
winston.add(winston.transports.MongoDB, { 
    db: 'mongodb://localhost/vinly',
    //level: 'error'
});


if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined!');
    // For setting this type the following command in terminal: set vinly_jwtPrivateKey=mySecureKey
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vinly', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((e) => console.error('Could not connect to MongoDB...'));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Error Handling when we get an internal error
app.use(error);


const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.render('index', { title:'My App',message: 'Hello' })
});     


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});