const ecosystem = {
    apps: [
        {
            name: 'glasstone-travel-channel',
            script: '/srv/www/glasstone/glasstone-travel/channel/server/server.js',
            cwd: '/srv/www/glasstone/glasstone-travel/channel/',
            instances: 'max',
            exec_mode: 'cluster',
            watch: true,
            env: {
                NODE_ENV: 'production'
            },
            max_memory_restart: '150M'
        }
    ]
};

module.exports = ecosystem;
