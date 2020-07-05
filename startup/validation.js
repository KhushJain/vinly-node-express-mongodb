const Joi = require('joi');     // For data validation

module.exports = () => {
    Joi.objectId = require('joi-objectid')(Joi);    // For validating object id
};