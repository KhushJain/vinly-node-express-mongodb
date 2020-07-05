const winston = require('winston');     // For logging errors
require('winston-mongodb');     // For logging errors in mongodb
require('express-async-errors');    // Used for handling errors

module.exports = () => {
    // // For Uncaught Exceptions
    // process.on('uncaughtException', (e) => {
    //     //console.log('We got an uncaught exception!');
    //     winston.error(e.message, e);
    //     process.exit(1);
    // });
    // OR
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),    
        new winston.transports.File({ filename: 'exceptions.log' })
    );


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
};