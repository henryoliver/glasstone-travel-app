<template lang="pug">
    .splash(ref="splash")

</template>

<script>
    export default {
        name: 'Splash',

        computed: {
            loading() {
                return this.$store.getters.loading;
            }
        },

        mounted() {
            const { splash } = this.$refs;
            const hide = () => splash.classList.add('hidden');

            splash.addEventListener('animationend', () => {
                hide();
                splash.removeEventListener('animationend', hide);
            }, false);
        }
    };
</script>

<style lang="stylus">
    @import 'nib'
    @require '../../styles/variables'

    .splash
        animation 2s ease 2s 1 normal forwards running zoom-out
        backface-visibility hidden
        background-color #f7f1eb
        background-image url('/assets/images/logo-splash.png')
        background-position center
        background-repeat no-repeat
        background-size 186px 126px
        bottom 0
        height 100%
        left 0
        position fixed
        right 0
        top 0
        width 100%
        z-index 100

        @media small
            background-size 93px 63px

</style>
