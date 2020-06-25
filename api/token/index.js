const fs = require('fs');
const dotenv = require('dotenv');
const cron = require('node-cron');
const router = require('../router');

// Load environment variables
dotenv.config();

const key = process.env.STREAMLINE_TOKEN_KEY;
const secret = process.env.STREAMLINE_TOKEN_SECRET;

module.exports = () => {
    cron.schedule('* * * * * *', async () => {

        '/token': async (context) => {
            const { key, secret } = context;

            if (!key || !secret) {
                context.status = 400;
                context.body = {
                    error: 'Must supply token key and secret'
                };
            } else {
                // context.body = await makeStreamlineRequest('RenewExpiredToken', { token_key: key, token_secret: secret });
                context.body = await setTimeout(() => ({
                    data: {
                        token_key: '6d2dfe75cdb2c1420c08bfc0c588e5a6',
                        token_secret: 'a8c432c72683276a03068e232528bf7a4c442cd1',
                        startdate: '08/18/2016',
                        enddate: '11/18/2016'
                    }
                }), 2000);
            }
            console.debug(context);
        },
        console.log(router['POST']);

        try {
            const renew = await router.POST['/token']({ key, secret });

            if (!renew.ok) {
                throw new Error('Network response was not ok.');
            }

            const env = dotenv.parse(fs.readFileSync('.env'));
            console.debug(env);

            const newEnv = Object.assign({ STREAMLINE_TOKEN_KEY: renew.data.token_key, STREAMLINE_TOKEN_SECRET: renew.data.token_secret }, env);
            console.debug(newEnv);

            // write the new file
            // fs.writeFile('message.txt', JSON.stringify(newEnv), 'utf8', () => {

            // });

        } catch (error) {
            console.error(error);
        }
    });
};
