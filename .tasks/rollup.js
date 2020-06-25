import dotenv from 'dotenv';
import vue from 'rollup-plugin-vue';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import resolve from 'rollup-plugin-node-resolve';
import conditional from 'rollup-plugin-conditional';

// Production plugins
import cssnano from 'cssnano';
import hash from 'rollup-plugin-hash';
import postcss from 'rollup-plugin-postcss';
import minify from 'rollup-plugin-minify-es';
import progress from 'rollup-plugin-progress';
import filesize from 'rollup-plugin-filesize';
import purifycss from 'rollup-plugin-purifycss';

// Others
import nib from 'nib';

// Environment variables
dotenv.config();
const env = process.env.NODE_ENV || 'development';
const production = (env === 'production');
const development = (env === 'development');
const test = (env === 'test');

export default {
    input: test ? './test/unit/test' : './client/index',

    output: {
        file: './client/dist/bundle.js',
        format: 'es' // iife, cjs, umd, es
    },

    sourcemap: 'inline',

    watch: {
        include: './client/**',
        exclude: 'node_modules/**'
    },

    plugins: [
        vue({
            css: './client/dist/bundle.css',
            pug: {
                pretty: development
            },
            stylus: {
                use: [(nib)()],
                compress: production,
                linenos: development
            }
        }),
        replace({
            exclude: 'node_modules/**',
            'process.env.NODE_ENV': JSON.stringify(env),
            'process.env.SLAASK_KEY': JSON.stringify(process.env.SLAASK_KEY),
            'process.env.RECAPTCHA_KEY': JSON.stringify(process.env.RECAPTCHA_KEY),
            'process.env.MAP_KEY': JSON.stringify(process.env.MAP_KEY)
        }),
        resolve({
            // use "module" field for ES6 module if possible
            module: true,
            jsnext: true,
            main: true,
            browser: true,
            modulesOnly: false
        }),
        commonjs(),
        globals(),

        // Production plugins
        conditional(production, [
            // Markup

            // Style
            postcss({ plugins: [cssnano()] }),
            purifycss(),

            // Behaviour
            minify(),
            hash({
                dest: './client/dist/bundle.[hash].js',
                replace: true
            }),

            progress(),
            filesize()
        ])
    ]
};
