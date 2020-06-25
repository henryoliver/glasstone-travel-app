<template lang="pug">
    ol.pagination.flex
        li(v-for="(page, index) in pages").pagination__number
            a(href="#" :class="{ pagination__last: (index == lastIndex) }")
                | {{ index++ }}

</template>

<script>
    export default {
        name: 'Pagination',

        data() {
            return {
                pages: [1, 2, 3, 4, 5]
            };
        },

        computed: {
            lastIndex() {
                return (this.pages.length - 1)
            }
        }
    };
</script>

<style lang="stylus">
    @import 'nib'
    @require '../../styles/variables'

    .pagination
        border-top 1px solid gray-light
        margin 40px 0
        padding-top 30px

    .pagination__number
        color yellow
        font-family 'roboto-bold'
        margin-right 30px

    .pagination__last
        font-size 12px
        line-height 1.33
        text-transform uppercase

        &::after
            content 'Last page'

</style>
