<template lang="pug">
    nav(role="navigation")
        input(ref="trigger" :id="`hamburger-trigger-${ location }`" type="checkbox").hamburger-trigger
        label(:for="`hamburger-trigger-${ location }`").hamburger
            i.icon-hamburger

        ul(@click="closeMenu()").flex.column.between.navigation-menu.hamburger-navigation
            li.navigation-menu__link
                router-link(:to="{ name: 'home' }")
                    | Home
            li.navigation-menu__link
                router-link(:to="{ name: 'about' }")
                    | About us
            li.navigation-menu__link
                router-link(:to="{ name: 'selection' }")
                    | Selection
            li.navigation-menu__link
                router-link(:to="{ name: 'contact' }")
                    | Contact

</template>

<script>
    export default {
        name: 'Navigation',

        props: {
            // Type check
            location: {
                type: String,
                default: 'header',
                required: true
            }
        },

        methods: {
            closeMenu() {
                this.$refs.trigger.checked = false;
            }
        }
    };
</script>

<style lang="stylus">
    @import 'nib'
    @require '../../styles/variables'

    .navigation-menu
        background-color gray-lighter
        top 82%
        box-shadow 4px 16px 32px 0 alpha(black, 0.2)
        pointer-events none
        min-width 200px
        padding 20px
        position absolute
        right 44%
        z-index 1

        @media small
            top 60%
            right 0

        @media large
            background-color transparent
            position relative
            right 0
            min-width 440px

    .navigation-menu__link
        background-color alpha(dark, 0.05)
        font-family 'roboto-medium'
        font-size 12px
        letter-spacing 1.5px
        padding 12px 10px
        margin-bottom 10px
        text-transform uppercase
        transition all 0.2s ease

        &:hover
        &:focus
            font-weight bold
            transform translate(-1px, -1px)

        @media large
            background-color transparent
            padding 0

    .router-link-exact-active
        font-weight bold

</style>
