require('dotenv').config();

module.exports = {
    streamline: {
        tokenKey: process.env.STREAMLINE_TOKEN_KEY,
        tokenSecret: process.env.STREAMLINE_TOKEN_SECRET
    }
};
