<template lang="pug">
    section
        article.selection.selection--champions-gate
            .box
                hgroup
                    h4.selection__subtitle
                        | Glasstone selection
                    h1.selection__title
                        | Champions Gate
                    h6.selection__description
                        | Located in the heart of Disney World area, ChampionsGate is in the perfect location for families looking to experience the magic of Central Florida.

                //- Carousel slider
                carousel(:auto="true" :navigation="false" :filter="{ prop: 'locationResortName', value: 'Champions Gate' }").selection-carousel

        article.selection.selection--compass-bay
            .box
                hgroup
                    h4.selection__subtitle
                        | Glasstone selection
                    h1.selection__title
                        | Compass Bay
                    h6.selection__description
                        | Compass Bay is located in Central Florida, just a short drive from all of the major tourist attractions, including Walt Disney World® Resort, SeaWorld®, Discovery Cove® and Universal Orlando® Resort.

                //- Carousel slider
                carousel(:auto="true" :navigation="false" :filter="{ prop: 'locationResortName', value: 'Compass Bay' }").selection-carousel

        article.selection.selection--lucaya-village-resort
            .box
                hgroup
                    h4.selection__subtitle
                        | Glasstone selection
                    h1.selection__title
                        | Lucaya Village Resort
                    h6.selection__description
                        | Lucaya Village is a resort-style condo community that attracts thousands of tourists every year due to its prime location, excellent service and quality.

                //- Carousel slider
                carousel(:auto="true" :navigation="false" :filter="{ prop: 'locationResortName', value: 'Lucaya Village Resort' }").selection-carousel

        article.selection.selection--paradise-palms
            .box
                hgroup
                    h4.selection__subtitle
                        | Glasstone selection
                    h1.selection__title
                        | Paradise Palms
                    h6.selection__description
                        | Paradise Palms features elegant resort vacation townhomes and villas, the perfect place to call home.

                //- Carousel slider
                carousel(:auto="true" :navigation="false" :filter="{ prop: 'locationResortName', value: 'Paradise Palms' }").selection-carousel

        article.selection.selection--storey-lake
            .box
                hgroup
                    h4.selection__subtitle
                        | Glasstone selection
                    h1.selection__title
                        | Storey Lake
                    h6.selection__description
                        | Storey Lake is Kissimmee’s newest resort-style community, located at the corner of State Road (SR535) also known as Kissimmee-Vineland Road - and Osceola Parkway.

                //- Carousel slider
                carousel(:auto="true" :navigation="false" :filter="{ prop: 'locationResortName', value: 'Storey Lake' }").selection-carousel

        article.selection.selection--west-lucaya-village
            .box
                hgroup
                    h4.selection__subtitle
                        | Glasstone selection
                    h1.selection__title
                        | West Lucaya Village
                    h6.selection__description
                        | West Lucaya Village is a resort-style condo community, just seven minutes from Walt Disney World® Resort.

                //- Carousel slider
                carousel(:auto="true" :navigation="false" :filter="{ prop: 'locationResortName', value: 'West Lucaya Village' }").selection-carousel

        article.selection.selection--windsor-at-westside
            .box
                hgroup
                    h4.selection__subtitle
                        | Glasstone selection
                    h1.selection__title
                        | Windsor at Westside
                    h6.selection__description
                        | Windsor at Westside is a Mediterranean-themed community in Kissimmee, Florida.

                //- Carousel slider
                carousel(:auto="true" :navigation="false" :filter="{ prop: 'locationResortName', value: 'Windsor at Westside' }").selection-carousel

</template>

<script>
    import Carousel from '../ui/carousel.vue';

    export default {
        name: 'Selection',

        components: {
            carousel: Carousel
        },

        // Metadata
        metaInfo: {
            // Search Optimization
            title: 'Glasstone Travel | The best selection of vacation homes for rent',
            meta: [
                // Search Optimization
                { name: 'description', content: 'The best selection of vacation homes for rent with the perfect location for families looking to experience the magic of Central Florida.' },

                // Facebook open graph
                { property: 'og:title', content: 'Glasstone Travel | The best selection of vacation homes for rent' },
                { property: 'og:description', content: 'The best selection of vacation homes for rent with the perfect location for families looking to experience the magic of Central Florida.' },

                // Twitter Cards
                { name: 'twitter:title', content: 'Glasstone Travel | The best selection of vacation homes for rent' },
                { name: 'twitter:description', content: 'The best selection of vacation homes for rent with the perfect location for families looking to experience the magic of Central Florida.' },
            ]
        }
    };
</script>

<style lang="stylus">
    @import 'nib'
    @require '../../styles/variables'

    .selection
        background-position top
        background-repeat no-repeat
        background-size 100% 720px

        color white
        min-height 1084px
        padding-top 82px
        position relative
        z-index 0

        &::after
            background linear-gradient(to left top, alpha(black, 0.2) 0%, alpha(black, 0.2) 50%, alpha(black, 0.6) 50%, alpha(black, 0.6) 100%)
            content ''
            height 720px
            left 0
            position absolute
            top 0
            width 100%
            z-index -1

        @media small
            background-size 100% 360px
            padding-top 55px
            min-height 960px

            &::after
                background linear-gradient(to left top, alpha(black, 0.1) 0%, alpha(black, 0.6) 50%, alpha(black, 0.6) 50%, alpha(black, 0.8) 100%)
                height 360px

    .selection--champions-gate
        background-image url('assets/images/selection-champions-gate.jpg')

        @media small
            background-image url('assets/images/selection-champions-gate-small.jpg')

    .selection--compass-bay
        background-image url('assets/images/selection-compass-bay.jpg')

        @media small
            background-image url('assets/images/selection-compass-bay-small.jpg')

    .selection--lucaya-village-resort
        background-image url('assets/images/selection-lucaya-village-resort.jpg')

        @media small
            background-image url('assets/images/selection-lucaya-village-resort-small.jpg')

    .selection--paradise-palms
        background-image url('assets/images/selection-paradise-palms.jpg')

        @media small
            background-image url('assets/images/selection-paradise-palms-small.jpg')

    .selection--storey-lake
        background-image url('assets/images/selection-storey-lake.jpg')

        @media small
            background-image url('assets/images/selection-storey-lake-small.jpg')

    .selection--west-lucaya-village
        background-image url('assets/images/selection-west-lucaya-village.jpg')

        @media small
            background-image url('assets/images/selection-west-lucaya-village-small.jpg')

    .selection--windsor-at-westside
        background-image url('assets/images/selection-windsor-at-westside.jpg')

        @media small
            background-image url('assets/images/selection-windsor-at-westside-small.jpg')

    .selection__subtitle

        @media small
            font-size 14px

    .selection__title

        @media small
            font-size 24px
            margin-bottom 10px

    .selection__description

        @media small
            font-size 14px
            margin-bottom 10px

    .selection-carousel
        transform translateY(480px)
        margin 0 auto
        width 92%
        overflow hidden

        @media small
            transform translateY(140px)
            width 80%

        @media large
            transform translateY(440px)

        .carousel-item__title
            color dark

</style>
