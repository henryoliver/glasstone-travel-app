<template lang="pug">
    section
        .box.flex.properties
            aside(ref="properties-search" role="complementary").flex-2.flex-6-sm.flex-1-by.properties-search
                button(type="button" @click="toggleSearch()").properties-search__accordion
                    i.arrow--small

                form(role="search" v-outside="closeDatepicker").flex.column.row-sm
                    .properties-search__item
                        label(for="picker").label--small
                            | Check-in

                        menu.date
                            input(id="picker" type="checkbox" @change="toggleDatepicker()").date-trigger
                            label(for="picker").date-pick
                                transition(name="fade" mode="out-in")
                                    span(key="1" v-if="!search.startDate")
                                        | Pick a date
                                    span(key="2" v-else).date-pick__output
                                        | {{ search.startDate | day }}
                                        small.date-pick__output-month
                                            | {{ search.startDate | month }}
                                button(type="button").arrow--small.date-pick__arrow

                    .properties-search__item
                        label(for="picker").label--small
                            | Check-out

                        menu.date
                            label(for="picker").date-pick
                                transition(name="fade" mode="out-in")
                                    span(key="1" v-if="!search.endDate")
                                        | Pick a date
                                    span(key="2" v-else).date-pick__output
                                        | {{ search.endDate | day }}
                                        small.date-pick__output-month
                                            | {{ search.endDate | month }}
                                button(type="button").arrow--small.date-pick__arrow

                    .properties-search__item
                        label.label--small
                            | Guests
                        menu.button--trim.button-controller
                            button(name="subtract" type="button" @click.prevent="decrement('occupants', 1)" :disabled="search.occupants <= 0").button.button-controller__input
                                | -
                            output(name="result" v-bind:class="{ 'button-controller__output--small' : (search.occupants <= 0) }").button-controller__output
                                | {{ search.occupants | all }}
                            button(name="add" type="button" @click.prevent="increment('occupants', 1)" :disabled="search.occupants == 23").button.button-controller__input
                                | +

                    .properties-search__item
                        label.label--small
                            | Bedrooms
                        menu.button--trim.button-controller
                            button(name="subtract" type="button" @click="decrement('bedrooms', 1)" :disabled="search.bedrooms <= 0").button.button-controller__input
                                | -
                            output(name="result" v-bind:class="{ 'button-controller__output--small' : (search.bedrooms <= 0) }").button-controller__output
                                | {{ search.bedrooms | all }}
                            button(name="add" type="button" @click="increment('bedrooms', 1)").button.button-controller__input
                                | +

                    .properties-search__item
                        label.label--small
                            | Bathrooms
                        menu.button--trim.button-controller
                            button(name="subtract" type="button" @click="decrement('bathrooms', 1)" :disabled="search.bathrooms <= 0").button.button-controller__input
                                | -
                            output(name="result" v-bind:class="{ 'button-controller__output--small' : (search.bathrooms <= 0) }").button-controller__output
                                | {{ search.bathrooms | all }}
                            button(name="add" type="button" @click="increment('bathrooms', 1)").button.button-controller__input
                                | +

                    .properties-search__date(ref="propertiesDate")
                        datePicker(
                            ref="datePicker"
                            :startDate="new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)"
                            :minNights="2"
                            :maxNights="30"
                            @checkInChanged="set('startDate', $event)"
                            @checkOutChanged="set('endDate', $event)"
                            @closeDatepicker="closeDatepicker()"
                        )

            article(v-show="properties.length" role="article").flex-4.flex-6-sm.flex-5-by
                form(role="search").flex.between.bottom.properties-filter
                    output.flex-3.flex-2-sm
                        | <strong>{{ properties.length }}</strong> properties

                    aside.flex.flex-3.flex-4-sm.bottom
                        label(for="orderby").label--small.flex-2.properties-filter__select-label
                            | Order by
                        select(id="orderby" name="select" @change="reverse()").flex-4.properties-filter__select
                            option(value="asc")
                                | Price: low to high
                            option(value="desc")
                                | Price: high to low

                    hr.properties-filter__line

                transition-group(tag="ul" name="fade" mode="out-in").flex.center.between-lg.properties-list
                    li(v-for="property in list" :key="property.unitId").properties-list-item
                        figure.properties-list-item__figure
                            router-link(:to="{ name: 'property', params: { id: property.unitId } }")
                                img(v-lazy="property.imageUrl" :data-srcset="`${ property.imageUrl } 2x`" alt="property.name").properties-list-item__photo
                            span(v-show="property.minimumDayPrice").properties-list-item__tag
                                | Starting from <i class="icon-dollar">$</i> <strong>{{ property.minimumDayPrice }}</strong> per night
                            figcaption.properties-list-item__title
                                | {{ property.name }}

                        //- Star ratings
                        rating(:count="property.ratingCount" :average="property.ratingAverage")

                        ul.flex.between.properties-list-item__features
                            li
                                i.icon-bed
                                strong
                                    | x {{ property.bedroomCount }}
                            li
                                i.icon-shower
                                strong
                                    | x {{ property.bathroomCount }}
                            li
                                i.icon-person
                                strong
                                    | x {{ property.maxOccupants }}

                        router-link(:to="{ name: 'property', params: { id: property.unitId } }").button.button--large.properties-list-item__button
                            | Book now

                //- Pagination
                pagination.hidden

            //- No properties
            transition(name="fade")
                aside(v-show="properties.length === 0").flex-4.flex-6-sm.flex-5-by
                    span.properties-notfound
                        | No properties were found
                    h2
                        | How about trying different search criterias?

</template>

<script>
    import DatePicker from 'vue-hotel-datepicker';
    import Rating from '../ui/rating.vue';
    import Pagination from '../ui/pagination.vue';

    export default {
        name: 'Properties',

        components: {
            rating: Rating,
            pagination: Pagination,
            datePicker: DatePicker
        },

        // Metadata
        metaInfo: {
            // Search Optimization
            title: 'Glasstone Travel | Fully equipped houses for rent in Kissimmee, FL',

            meta: [
                // Search Optimization
                { name: 'description', content: 'Glasstone Travel has fully equipped houses for rent in the heart of Disney World area.' }
            ],
            script: [
                { type: 'text/javascript', src: 'https://www.google.com/recaptcha/api.js', async: true }
            ]
        },

        data() {
            return {
                list: []
            };
        },

        computed: {
            properties() {
                return this.$store.getters['properties/sortBy']('minimumDayPrice');
            },

            search() {
                return this.$store.getters['search/parameters'];
            }
        },

        created() {
            this.setSearch();
            this.fetchProperties();
        },

        mounted() {
            this.setProperties();
        },

        methods: {
            setSearch() {
                Object.entries(this.$route.query).forEach(([property, value]) => this.$store.commit('search/set', { property, value }));
            },

            fetchProperties() {
                this.$store.dispatch('properties/all').then(() => this.setProperties());
            },

            setProperties() {
                this.list = this.properties.slice();
            },

            set(property, value) {
                this.$store.commit('search/set', { property, value });

                if (property === 'endDate' && value) {
                    this.fetchProperties();
                }
            },

            increment(property, amount) {
                this.$store.commit('search/increment', { property, amount });
                this.fetchProperties();
            },

            decrement(property, amount) {
                this.$store.commit('search/decrement', { property, amount });
                this.fetchProperties();
            },

            toggleDatepicker() {
                this.$refs.datePicker.toggleDatepicker();
                this.$refs.propertiesDate.classList.toggle('properties-search__date--open');
            },

            closeDatepicker() {
                this.$refs.propertiesDate.classList.remove('properties-search__date--open');
            },

            reverse() {
                const reverse = this.list.slice().reverse();
                this.list = reverse;
            },

            toggleSearch() {
                this.$refs['properties-search'].classList.toggle('properties-search--collapse');
            }
        }
    };
</script>

<style lang="stylus">
    @import 'nib'
    @require '../../styles/variables'

    .properties
        padding-top 80px
        padding-bottom 94px
        min-height 640px

        @media small
            padding-top 84px

    .properties-search
        position relative
        transition 0.2s ease-in-out

        @media small
            background-color white
            box-shadow 8px 16px 32px 0 alpha(black, 0.1)
            height auto
            position fixed
            bottom 0
            left 0
            padding 20px 32px 4px
            width 100%
            z-index 1

    .properties-search--collapse
        transform translateY(100%)

        i.arrow--small
            transform rotate(180deg)

    .properties-search__accordion
        display none
        background-color yellow
        text-align center
        position absolute
        top -36px
        left 0
        width 100%
        padding 6px 0

        @media small
            display block

    .properties-search__item
        margin-bottom 60px

        @media small
            width 50%
            margin-bottom 16px

            .label--small
                font-size 10px
                margin-bottom 6px

            .date-pick
                font-size 18px

            .button-controller__input
                height 20px
                width 20px
                font-size 18px

            .button-controller__output
                font-size 24px
                margin 0 2px
                line-height 1

            .button-controller__output--small
                font-size 16px

            &:nth-child(3)
            &:nth-child(4)
            &:nth-child(5)
                width 33.333333333%

    .properties-search__date
        opacity 0
        pointer-events none
        top 240px
        left 0
        position absolute
        transition all 0.2s ease-in-out
        right 0
        width 880px
        z-index 10
        margin 0 auto

        @media small
            position initial
            height 0

    .properties-search__date--open
        opacity 1
        pointer-events auto
        transform translateY(20px)

        @media small
            transform none

    .properties-filter
        background-color white
        padding 40px 40px 0

        @media small
            background-color gray-lighter
            position absolute
            width 100%
            padding 10px 32px
            top 90px
            left 0

    .properties-filter__select-label
        margin-bottom 3px

    .properties-filter__select
        margin-bottom 0
        border-bottom 0
        padding-bottom 0

        @media small
            font-size 15px
            line-height 1.6

    .properties-filter__line
        height 1px
        margin-bottom 0

        @media small
            display none

    .properties-list
        background-color white
        padding 60px 30px 0

        @media small
            padding 0
            background-color transparent

        @media large
            padding 50px 30px 0

    .properties-list-item
        margin-bottom 20px
        text-align left
        position relative
        max-width 100%

        @media small
            margin-bottom 0

        @media large
            width 50%
            margin-bottom 60px
            padding-left 10px
            padding-right 10px

        @media beyond
            width 33.333333333%
            padding-left 20px
            padding-right 20px
            margin-bottom 80px

    .properties-list-item__figure
        position relative

    .properties-list-item__photo
        width 100%
        height 100%

    .properties-list-item__tag
        position absolute
        right 0
        bottom 55px
        padding 10px
        border-radius 2px
        line-height 1
        background-color white
        font-size 12px
        text-align right
        color gray

        @media small
            bottom 44px
            width 100%
            border-radius 0

        strong
            color dark
            font-size 16px
            margin 0 2px

    .properties-list-item__title
        color inherit
        font-family 'tuna'
        font-size 24px
        line-height 1.25
        margin 14px 0 10px
        width 89%
        white-space nowrap
        overflow hidden
        text-overflow ellipsis

    .properties-list-item__features
        margin 20px 0 30px
        max-width 240px

    .properties-list-item__button
        position absolute
        bottom 160px
        left 10px

        @media small
            padding 10px 18px

        @media large
            position relative
            left auto
            bottom auto

    .properties-notfound
        color red
        margin-bottom 40px
        display block
        font-family 'roboto-bold'

</style>
