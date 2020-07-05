const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    mongoose.connect('mongodb://localhost/vinly', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => winston.info('Connected to MongoDB...'))
    //.catch((e) => console.error('Could not connect to MongoDB...'));
};