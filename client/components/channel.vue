<template lang="pug">
    main(role="main").channel
        //- Splash
        splash

        //- Loader
        loader

        //- Browser outdated
        outdated

        //- Main header
        channel-header

        //- Main view
        transition(name="fade" mode="out-in")
            router-view

        //- Main footer
        channel-footer
</template>

<script>
    import Splash from './ui/splash.vue';
    import Loader from './ui/loader.vue';
    import Outdated from './ui/outdated.vue';

    import Header from './page/header.vue';
    import Footer from './page/footer.vue';

    export default {
        name: 'Channel',

        components: {
            splash: Splash,
            loader: Loader,
            outdated: Outdated,
            channelHeader: Header,
            channelFooter: Footer
        },

        // Metadata
        metaInfo: {
            htmlAttrs: {
                lang: 'en'
            },

            // Search Optimization
            title: 'Glasstone Travel | Houses for rent in Orlando and Kissimmee, FL',

            meta: [
                // Main config
                { charset: 'utf-8' },
                { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
                { name: 'viewport', content: 'user-scalable=no, width=device-width' },
                { name: 'format-detection', content: 'telephone=no' },

                // Search Optimization
                { name: 'robots', content: 'all' },
                { name: 'author', content: 'Polen Experience Studio' },
                { name: 'description', content: 'Looking for a vacation house for rent? Visit Glasstone Travel and find the best house of vacation rentals in Orlando and Kissimmee, FL' },

                // Prerender
                // https://prerender.io/documentation/best-practices
                // { name: 'prerender-status-code', content: '404' },
                // { name: 'prerender-status-code', content: '301' },
                // { name: 'prerender-header', content: 'Location: http://www.example.com' },

                // Social Discovery

                // Schema.org microdata
                { itemscope: '', itemtype: 'http://schema.org/Article' },
                { itemprop: 'headline', content: 'Glasstone Travel | Houses for rent in Orlando and Kissimmee, FL' },
                { itemprop: 'description', content: 'Looking for a vacation house for rent? Visit Glasstone Travel and find the best house of vacation rentals in Orlando and Kissimmee, FL' },
                { itemprop: 'image', content: '/assets/images/logo.png' },

                // Open Graph Protocol
                { property: 'og:type', content: 'website' },
                { property: 'og:site_name', content: 'Glasstone Travel' },
                { property: 'og:url', content: 'https://glasstonetravel.com' },
                { property: 'og:title', content: 'Glasstone Travel | Houses for rent in Orlando and Kissimmee, FL' },
                { property: 'og:description', content: 'Looking for a vacation house for rent? Visit Glasstone Travel and find the best house of vacation rentals in Orlando and Kissimmee, FL' },
                { property: 'og:image', content: '/assets/images/home-hero.jpg' },

                // Twitter Cards
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:site', content: 'Glasstone Travel' },
                { name: 'twitter:creator', content: '@glasstone' },
                { name: 'twitter:url', content: 'https://glasstonetravel.com' },
                { name: 'twitter:title', content: 'Glasstone Travel | Houses for rent in Orlando and Kissimmee, FL' },
                { name: 'twitter:description', content: 'Looking for a vacation house for rent? Visit Glasstone Travel and find the best house for rent in Orlando and Kissimmee, FL' },
                { name: 'twitter:image', content: '/assets/images/home-hero.jpg' },

                // Android
                { name: 'theme-color', content: '#f7f1eb' },
                { name: 'application-name', content: 'Glasstone Travel' },
                { name: 'mobile-web-app-capable', content: 'yes' },

                // iOS
                { name: 'apple-mobile-web-app-capable', content: 'yes' },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
                { name: 'apple-mobile-web-app-title', content: 'Glasstone Travel' },

                // Windows
                // Turn on IE cleartype
                { 'http-equiv': 'cleartype', content: 'on' },
                { name: 'msapplication-TileColor', content: '#f7f1eb' },
                { name: 'msapplication-TileImage', content: '/assets/images/favicons/mstile-144x144.png' },
                { name: 'msapplication-config', content: '/assets/images/favicons/browserconfig.xml' }
            ],
            link: [
                // Search Optimization
                { rel: 'canonical', href: 'https://glasstonetravel.com' },
                // { rel: 'alternate', hreflang: 'en-us', href: 'http://m.example.com/' },

                // Engagement
                { rel: 'manifest', href: '/manifest.json' },

                // iOS
                { rel: 'apple-touch-icon', sizes: '57x57', href: '/assets/images/favicons/apple-touch-icon-57x57.png' },
                { rel: 'apple-touch-icon', sizes: '60x60', href: '/assets/images/favicons/apple-touch-icon-60x60.png' },
                { rel: 'apple-touch-icon', sizes: '72x72', href: '/assets/images/favicons/apple-touch-icon-72x72.png' },
                { rel: 'apple-touch-icon', sizes: '76x76', href: '/assets/images/favicons/apple-touch-icon-76x76.png' },
                { rel: 'apple-touch-icon', sizes: '114x114', href: '/assets/images/favicons/apple-touch-icon-114x114.png' },
                { rel: 'apple-touch-icon', sizes: '120x120', href: '/assets/images/favicons/apple-touch-icon-120x120.png' },
                { rel: 'apple-touch-icon', sizes: '144x144', href: '/assets/images/favicons/apple-touch-icon-144x144.png' },
                { rel: 'apple-touch-icon', sizes: '152x152', href: '/assets/images/favicons/apple-touch-icon-152x152.png' },
                { rel: 'apple-touch-icon', sizes: '167x167', href: '/assets/images/favicons/apple-touch-icon-167x167.png' },
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/images/favicons/apple-touch-icon-180x180.png' },

                { rel: 'apple-touch-startup-image', media: '(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)', href: '/assets/images/favicons/apple-touch-startup-image-320x460.png' },
                { rel: 'apple-touch-startup-image', media: '(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)', href: '/assets/images/favicons/apple-touch-startup-image-640x920.png' },
                { rel: 'apple-touch-startup-image', media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)', href: '/assets/images/favicons/apple-touch-startup-image-640x1096.png' },
                { rel: 'apple-touch-startup-image', media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)', href: '/assets/images/favicons/apple-touch-startup-image-750x1294.png' },
                { rel: 'apple-touch-startup-image', media: '(device-width: 414px) and (device-height: 736px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3)', href: '/assets/images/favicons/apple-touch-startup-image-1182x2208.png' },
                { rel: 'apple-touch-startup-image', media: '(device-width: 414px) and (device-height: 736px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3)', href: '/assets/images/favicons/apple-touch-startup-image-1242x2148.png' },
                { rel: 'apple-touch-startup-image', media: '(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 1)', href: '/assets/images/favicons/apple-touch-startup-image-748x1024.png' },
                { rel: 'apple-touch-startup-image', media: '(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1)', href: '/assets/images/favicons/apple-touch-startup-image-768x1004.png' },
                { rel: 'apple-touch-startup-image', media: '(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)', href: '/assets/images/favicons/apple-touch-startup-image-1496x2048.png' },
                { rel: 'apple-touch-startup-image', media: '(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)', href: '/assets/images/favicons/apple-touch-startup-image-1536x2008.png' },

                // Favicons
                { rel: 'shortcut icon', href: '/assets/images/favicons/favicon.ico' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/images/favicons/favicon-16x16.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/images/favicons/favicon-32x32.png' },
            ],
            script: [
                { type: 'text/javascript', src: 'https://cdn.slaask.com/chat.js', async: true }
            ],
            noscript: [
                { innerHTML: 'This website requires JavaScript.' }
            ]
        },

        mounted() {
            this.initSlaask();
            this.scrollTop();
        },

        methods: {
            initSlaask() {
                const init = () => {
                    window._slaask.init(process.env.SLAASK_KEY);
                };

                if (window._slaask) {
                    init();
                } else {
                    window.addEventListener('load', function load() {
                        init();
                        window.removeEventListener('load', load);
                    });
                }
            },

            scrollTop() {
                setTimeout(() => {
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                }, 1000);
            }
        }
    };
</script>


<style lang="stylus">
    @import 'nib'
    @require '../styles/variables'

    .channel
        overflow hidden

</style>
