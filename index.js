const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);    // For validating object id

const app = express()

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


const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('index', { title:'My App',message: 'Hello' })
});     


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});