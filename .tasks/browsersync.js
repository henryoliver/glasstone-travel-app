const sync = require('browser-sync').create();

// NodeJS helpers
const os = require('os');

// Browser Sync
sync.init({
    ui: {
        port: 8080,
        weinre: {
            port: 9090
        }
    },

    proxy: 'https://localhost:10021',
    port: 8000,

    httpModule: 'spdy',
    https: {
        key: `${ os.homedir() }/.ssh/key.pem`,
        cert: `${ os.homedir() }/.ssh/cert.pem`
    },

    files: [
        './client/index.html',
        './client/dist/base.css',
        './client/dist/bundle.js'
    ],
    serveStatic: [
        './client',
        './client/dist'
    ],

    ghostMode: {
        clicks: true,
        forms: true,
        scroll: true
    },

    logLevel: 'debug', // Can be either "info", "debug", "warn", or "silent"
    logPrefix: 'Channel',
    logConnections: true,
    logFileChanges: true,
    logSnippet: true,

    open: false,
    browser: ['google chrome canary', 'firefoxdeveloperedition'],
    // tunnel: 'glasstone-travel',

    online: true,
    reloadOnRestart: true,
    injectChanges: true,
    notify: true,

    scrollProportionally: true
});
