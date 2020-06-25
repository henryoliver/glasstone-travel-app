// https://github.com/GoogleChrome/sw-precache#options-parameter

export default {
    staticFileGlobs: [
        './client/manifest.webmanifest',
        './client/index.html',
        './client/main.css',
        './client/bundles/*',
        './client/fonts/*',
        './client/styles/**/*.css',
        './client/sounds/*',
        './client/images/**/*.{jpg,png,svg}'
    ],
    stripPrefix: 'channel/',
    swFile: './client/assets/scripts/service-worker.js',
    handleFetch: true,
    clientsClaim: true,
    maximumFileSizeToCacheInBytes: 10000000,
    ignoreUrlParametersMatching: '[/./]',
    verbose: true
};
