const env = process.env.NODE_ENV || 'development';

const config = {
    env,
    track: true,
    debug: false,
    silent: true,
    devtools: false,
    performance: false
};

module.exports = config;
