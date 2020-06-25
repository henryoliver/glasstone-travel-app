<template lang="pug">
    footer(role="contentinfo").flex.footer
        .box.flex
            section.flex.flex-3.flex-6-sm.column.footer__info
                figure.footer__logo
                    router-link(:to="{ name: 'home' }")
                        img(
                            src="/assets/images/logo.png" alt="Glasstone Travel"
                            srcset="/assets/images/logo@2x.png 2x"
                        )

                aside.flex.middle.between.footer__social
                    a(href="https://twitter.com/GlasstoneGroup" target="_blank")
                        i.icon-twitter
                    a(href="https://www.facebook.com/glasstonegroup" target="_blank")
                        i.icon-facebook
                    a(href="http://instagram.com/glasstonegroup" target="_blank")
                        i.icon-instagram

                address.flex.column.around.h-adr
                    a(href="tel:1-321-323-1816").p-tel
                        strong
                            | +1 (321) 323 1816
                    small.p-locality
                        | 8865 Commodity Circle unit 11-201 - Orlando, FL, 32819

                small.flex
                    | Glasstone Travel is a registered trademark. All rights reserved.

            aside.flex.flex-3.flex-6-sm.column.footer-navigation
                navigation(location="footer").footer-navigation__menu

                a(href="https://thinkpolen.com").flex.middle.footer-navigation__experience
                    | Experience designed by
                    img(
                        src="/assets/images/polen-logo.png" alt="Polen Experience Studio"
                        srcset="/assets/images/polen-logo@2x.png 2x"
                    ).footer-navigation__polen

</template>

<script>
    import Navigation from './navigation.vue';

    export default {
        name: 'Footer',

        components: {
            navigation: Navigation
        }
    };
</script>

<style lang="stylus">
    @import 'nib'
    @require '../../styles/variables'

    .footer
        background linear-gradient(90deg, white 50%, yellow 50%);
        min-height 384px
        padding-top 49px

        @media small
            background white

    .footer__logo
        height 91px
        width 135px

    .footer__info

        @media small
            min-height 240px

    .footer__social
        max-width 100px

    .footer-navigation
        padding-left 36px
        position relative

        @media small
            padding-left 0
            padding-bottom 20px

        .hamburger
            display none

        .navigation-menu
            background-color transparent
            box-shadow none
            color white
            min-height 184px
            pointer-events auto
            opacity 1
            padding 0
            position relative
            top 0
            right 0

        .navigation-menu__link
            padding 0
            background-color transparent
            margin 0

    .footer-navigation__menu

         @media small
            display none

    .footer-navigation__experience
        color beige-dark
        font-family 'montserrat-bold'
        font-size 9px
        text-transform uppercase

        @media small
            color gray-light

    .footer-navigation__polen
        margin-left 10px

        @media small
            filter brightness(50%) grayscale(100%) // #35113C

</style>
