export default {
    env: 'development',
    track: false,
    debug: true,
    silent: false,          // Suppress all Vue logs and warnings.
    devtools: true,         // Configure whether to allow vue-devtools inspection.
    performance: true,      // Enable component init, compile, render and patch performance tracing.
    productionTip: true,    // Set this to false to prevent the production tip on Vue startup.
    api: {
        url: 'http://localhost:8000/api'
    }
};
