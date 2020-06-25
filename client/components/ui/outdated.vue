<template lang="pug">
    .outdated(v-if="outdated")
        .outdated-inner
            span.outdated-inner__message
                | You are using an
                strong
                    | outdated
                | browser. Please
                a(href="http://outdatedbrowser.com")
                    | upgrade your browser
                | to improve your experience.

</template>

<script>
    export default {
        name: 'Outdated',

        data() {
            return {
                outdated: false
            };
        },

        mounted() {
            this.checkBrowser();
        },

        methods: {
            checkBrowser() {
                this.outdated = !('fetch' in window);
            }
        }
    };
</script>

<style lang="stylus">
    @import 'nib'
    @require '../../styles/variables'

    .outdated
        backface-visibility hidden
        background-color alpha(white, 0.9)
        height 100vh
        left 0
        position fixed
        top 0
        width 100vw
        z-index 1

    .outdated-inner
        left 50%
        position absolute
        top 50%
        transform translate(-50%, -50%)

    .outdated-inner__message
        font-size 20px

</style>
