const express = require('express');
const winston = require('winston');     // For logging errors
const app = express()

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;   

app.listen(port, () => {
    winston.info(`Listening on port ${port}`);
});