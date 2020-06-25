const favicons = require('favicons');
const fs = require('fs');

const source = './client/assets/images/logo-icon.png';
const dest = './client/assets/images/favicons';
const html = './client/assets/images/favicons/favicons.html';

favicons(source, {
    appName: 'Glasstone Travel',                // Your application's name. `string`
    appDescription: 'Glasstone Travel Channel', // Your application's description. `string`
    developerName: 'Polen Team',                // Your (or your developer's) name. `string`
    developerURL: 'https://thinkpolen.com',     // Your (or your developer's) URL. `string`
    background: '#ffffff',                      // Background colour for flattened icons. `string`
    path: dest,                                 // Path for overriding default icons path. `string`
    dir: 'ltr',
    lang: 'en-US',
    display: 'standalone',                      // Android display: 'browser' or 'standalone'. `string`
    orientation: 'any',                         // Android orientation: 'portrait' or 'landscape'. `string`
    start_url: '.',                             // Android start application's URL. `string`
    version: '1.0',                             // Your application's version number. `number`
    logging: true,                              // Print logs to console? `boolean`
    online: false,                              // Use RealFaviconGenerator to create favicons? `boolean`
    preferOnline: false,                        // Use offline generation, if online generation has failed. `boolean`
    icons: {
        android: true,                          // Create Android homescreen icon. `boolean`
        appleIcon: true,                        // Create Apple touch icons. `boolean` or `{ offset: offsetInPercentage }`
        appleStartup: true,                     // Create Apple startup images. `boolean`
        coast: false,                           // Create Opera Coast icon with offset 25%.
        favicons: true,                         // Create regular favicons. `boolean`
        firefox: true,                          // Create Firefox OS icons. `boolean` or `{ offset: offsetInPercentage }`
        windows: true,                          // Create Windows 8 tile icons. `boolean`
        yandex: false                           // Create Yandex browser icon. `boolean`
    }
}, (error, response) => {
    if (error) {
        throw error;
    }

    console.info(`Images: ${ response.images }`);
    console.info(`Files: ${ response.files }`);
    console.info(`HTML: ${ response.html }`);

    if (response.images) {
        response.images.forEach(image =>
            fs.writeFileSync(`${ dest }/${ image.name }`, image.contents));
    }

    if (response.files) {
        response.files.forEach(file =>
            fs.writeFileSync(`${ dest }/${ file.name }`, file.contents));
    }

    if (response.html) {
        fs.writeFileSync(html, response.html.join('\n'));
    }
});
