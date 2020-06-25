<template lang="pug">
    header(role="banner").flex.header
        .box.flex.middle.between
            figure.header-logo
                router-link(:to="{ name: 'home' }")
                    picture
                        source(media="(max-width: 664px)" srcset="/assets/images/logo-letter.png 1x, /assets/images/logo-letter@2x.png 2x")
                        img(src="/assets/images/logo.png" srcset="/assets/images/logo.png 1x, /assets/images/logo@2x.png 2x" alt="Glasstone Travel")

            aside.flex.column.row-sm.middle-sm.end-sm.row-lg.reverse-lg.end-lg.middle-lg.start-by.header-aside
                nav(role="navigation").flex.between.header-aside__social
                    a(href="https://twitter.com/GlasstoneGroup" target="_blank")
                        i.icon-twitter
                    a(href="https://www.facebook.com/glasstonegroup" target="_blank")
                        i.icon-facebook
                    a(href="http://instagram.com/glasstonegroup" target="_blank")
                        i.icon-instagram

                navigation(location="header").header-aside__navigation

</template>

<script>
    import Navigation from './navigation.vue';

    export default {
        name: 'Header',

        components: {
            navigation: Navigation
        }
    };
</script>

<style lang="stylus">
    @import 'nib'
    @require '../../styles/variables'

    header.header
        background-color white
        position relative
        min-height 173px

        @media small
            min-height 90px

        @media large
            min-height 218px

    .header-logo
        display flex
        height 90px
        width 133px

        @media small
            height 34px
            width 133px

    .header-aside
        max-width 125px
        min-height 110px
        position relative

        @media small
            min-height auto

        @media large
            max-width 100%

    .header-aside__navigation

        @media small
            height 61px
            width 70px

        @media large
            margin-left 90px
            margin-right 49px

            .hamburger
                display none

            .navigation-menu
                box-shadow none
                flex-direction row
                pointer-events auto
                opacity 1
                padding 0
                top 0

            .navigation-menu__link
                padding 0
                background-color transparent
                margin 0

    .header-aside__social
        max-width 125px

        a
            display flex

        @media small
            display none

</style>
