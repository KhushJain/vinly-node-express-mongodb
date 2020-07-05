// For error handling
// Use this if express-async-errors module isn't working
// In this app, asyncMiddleware function is never used as express-async-errors works
const asyncMiddleware = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch(e) {
            next(e);
        }
    };
};

module.exports = asyncMiddleware;