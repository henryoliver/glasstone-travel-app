// KoaJs
const Koa = require('koa');

// HTTP2
const https = require('spdy');

// NodeJS helpers
const fs = require('fs');
const os = require('os');
const constants = require('constants');

// Renew token
// const renew = require('../api/token');

// Middlewares
const serve = require('koa-static');
const compress = require('koa-compress');
const manpush = require('koa-h2-man-pusher');
const bodyParser = require('koa-bodyparser');
const history = require('koa2-history-api-fallback');

// Router
const router = require('../api/router');

// Configurations
// const config = require('./config');

const env = process.env.NODE_ENV || 'development';
const production = (env === 'production');

const port = 10021;
const source = (production) ? './client/dist' : './client';
const certs = (production) ? '/etc/letsencrypt/live/glasstonetravel.com/' : `${ os.homedir() }/.ssh/`;

const options = {
    key: (production) ? fs.readFileSync(`${ certs }privkey.pem`) : fs.readFileSync(`${ certs }key.pem`),
    cert: (production) ? fs.readFileSync(`${ certs }fullchain.pem`) : fs.readFileSync(`${ certs }cert.pem`),
    ca: (production) ? fs.readFileSync(`${ certs }chain.pem`) : null,

    secureOptions: constants.SSL_OP_NO_SSLv3 || constants.SSL_OP_NO_SSLv2,
    dhparam: (production) ? fs.readFileSync('/etc/nginx/ssl/dhparam.pem') : null,

    spdy: {
        maxStreams: 100
    }
};

const server = new Koa();

if (production) {
    // https://github.com/koajs/koa/blob/master/docs/error-handling.md#default-error-handler
    server.use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            err.status = err.statusCode || err.status || 500;
            throw err;
        }
    });

    // Init the renew token cron job
    // renew();
}

server.use(compress());
server.use(bodyParser());
server.use(router);
server.use(history({
    verbose: true
}));
server.use(manpush.manifestor({ manifest: `${ source }/push_manifest.json` }));
server.use(manpush.pusher({ root: source }));
server.use(serve(source), {
    hidden: false
});

https.createServer(options, server.callback()).listen(port, () => {
    console.info(`Listen on port ${ port } on ${ env } environment`);
});
