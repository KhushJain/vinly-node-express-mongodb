const config = require('config');   // For configuring settings

module.exports = () => {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined!');
        
        // OR    
        //console.log('FATAL ERROR: jwtPrivateKey is not defined!');
        // // For setting this, type the following command in terminal: set vinly_jwtPrivateKey=mySecureKey
        // process.exit(1);
    }
};