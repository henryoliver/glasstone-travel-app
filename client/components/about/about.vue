<template lang="pug">
    section
        section.box.flex.about-intro
            article.flex-3.flex-6-sm.about-intro__stand
                h4
                    | Glasstone travel
                h1
                    | We stand out
                    br
                    | by focusing in you
                p
                    | Glasstone Travels services operates, controls, and oversees properties in
                    | Orlando and Kissimmee, FL. We excel in customer service, property-care,
                    | property maintenance, and provide great accountability to our customers.
                p
                    | In the current marketplace, with thousands of websites and services offering a great
                    | variety of products, we stand out by focusing on our customers, guests, and
                    | treating the properties that we manage like they were our own.

            aside.flex-3.flex-6-sm
                figure.panel.about-intro__room
                    img(src="/assets/images/about-standout.jpg" alt="Interior room")

        section.flex.about-trust
            .box.flex.center.bottom
                article(role="article").panel.about-trust__panel
                    h1.about-trust__title
                        | Actions are worth more than words
                    p
                        | We practice what we preach and believe action is worth a thousand words.
                    figure.flex.between.start-sm.about-trust__certs
                        img(src="/assets/images/about-fvrma.jpg" srcset="/assets/images/about-fvrma.jpg 1x, /assets/images/about-fvrma@2x.jpg 2x" height="60" alt="Rental Managers Association")
                        img(src="/assets/images/about-twenty.jpg" srcset="/assets/images/about-twenty.jpg 1x, /assets/images/about-twenty@2x.jpg 2x" height="60" alt="Twenty under 40")
                        img(src="/assets/images/about-equal.png" srcset="/assets/images/about-equal.png 1x, /assets/images/about-equal@2x.png 2x" height="60" alt="Equal Housing Opportunity")
                        img(src="/assets/images/about-lennar.png" srcset="/assets/images/about-lennar.png 1x, /assets/images/about-lennar@2x.png 2x" height="60" alt="Lennar")
                        img(src="/assets/images/about-realtor.png" srcset="/assets/images/about-realtor.png 1x, /assets/images/about-realtor@2x.png 2x" height="60" alt="Political Action Committee")

</template>

<script>
    export default {
        name: 'About',

        // Metadata
        metaInfo: {
            // Search Optimization
            title: 'About Glasstone Travel | Properties in Orlando',
            meta: [
                // Search Optimization
                { name: 'description', content: 'Glasstone Travels services operates, controls, and oversees properties in Orlando and Kissimmee, FL. We excel in customer service, property-care, property maintenance, and provide great accountability to our customers.' },

                // Facebook open graph
                { property: 'og:title', content: 'About Glasstone Travel | Properties in Orlando' },
                { property: 'og:description', content: 'Glasstone Travels services operates, controls, and oversees properties in Orlando and Kissimmee, FL. We excel in customer service, property-care, property maintenance, and provide great accountability to our customers.' },

                // Twitter Cards
                { name: 'twitter:title', content: 'About Glasstone Travel | Properties in Orlando' },
                { name: 'twitter:description', content: 'Glasstone Travels services operates, controls, and oversees properties in Orlando and Kissimmee, FL. We excel in customer service, property-care, property maintenance, and provide great accountability to our customers.' },
            ]
        }
    };
</script>

<style lang="stylus">
    @import 'nib'
    @require '../../styles/variables'

    .about-intro
        padding-top 96px

        @media small
            padding-top 60px

        @media large
            min-height 649px
            padding-top 122px

    .about-intro__stand
        padding-right 40px
        padding-bottom: 20px;

        @media small
            padding-right 0

    .about-intro__room
        top -20px
        height 560px
        position relative
        right 0
        width 560px
        z-index 1

        @media small
            display none

        @media large
            top 40px

    .about-trust
        background-image url('assets/images/about-orlando.jpg')
        background-position top
        background-repeat no-repeat
        background-size contain

        min-height 710px
        padding-bottom 100px
        position relative

        @media large
            background-image url('assets/images/about-orlando-large.jpg')
            background-size 1960px 480px
            min-height 988px

        @media beyond
            background-size 100% 480px

    .about-trust__panel
        text-align left
        padding 54px 44px

        @media large
            width 720px
            height 470px
            padding 69px 76px

    .about-trust__title
        font-size 24px

        @media large
            font-size 48px

    .about-trust__certs

        @media small

            img
                margin-right 10px
                margin-bottom 20px

</style>
