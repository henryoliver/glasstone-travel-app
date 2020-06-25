<template lang="pug">
    .loader(v-if="loading")
        .loader-inner
            .loader-inner__layer
            .loader-inner__layer
            .loader-inner__layer

</template>

<script>
    export default {
        name: 'Loader',

        computed: {
            loading() {
                return this.$store.getters.loading;
            }
        }
    };
</script>

<style lang="stylus">
    @import 'nib'
    @require '../../styles/variables'

    .loader
        backface-visibility hidden
        background-color alpha(white, 0.9)
        height 100vh
        left 0
        position fixed
        top 0
        width 100vw
        z-index 10

    @keyframes ball-scale
        0%
            transform scale(0)
            opacity 0
        5%
            opacity 1
        100%
            transform scale(1)
            opacity 0

    ball-scale(num = 3, start = 2)
        for int in (start)..(num)
            & > .loader-inner__layer:nth-child({int})
                animation-delay (0.2s * ((int - num) - 1))

    .loader-inner
        ball-scale()

        left 50%
        position absolute
        top 50%
        transform translate(-50%, -50%)

        & > .loader-inner__layer
            animation ball-scale 1s 0s linear infinite
            animation-fill-mode both
            background-color yellow-light
            border-radius 100%
            height 60px
            left -30px
            margin 0
            opacity 0
            position absolute
            top -30px
            width 60px

</style>
