<template lang="pug">
    section
        section(role="banner").flex.center.column-lg.middle-lg.home-hero
            hgroup.home-hero__title
                h5.text--uppercase
                    | The florida experience in its fullness
                h1.text--shadow Amazing and fully equipped houses in <b>Orlando</b> and <b>Kissimmee</b>

            form(role="search" v-outside="closeDatepicker").flex.column.start.row-lg.panel.home-search
                .home-search__column
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

                .home-search__column
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

                    hr.home-search__line

                .home-search__column
                    label.label--small
                        | Guests
                    menu.button--trim.button-controller
                        button(name="subtract" type="button" @click.prevent="decrement('occupants', 1)" :disabled="search.occupants <= 0").button.button-controller__input
                            | -
                        output(name="result" v-bind:class="{ 'button-controller__output--small' : (search.occupants <= 0) }").button-controller__output
                            | {{ search.occupants | all }}
                        button(name="add" type="button" @click.prevent="increment('occupants', 1)" :disabled="search.occupants == 23").button.button-controller__input
                            | +

                .home-search__column.home-search__column--secondary
                    router-link(type="button" :to="{ name: 'properties', query: { startDate: (search.startDate) ? new Date(search.startDate).toISOString().split('T')[0] : null,  endDate: (search.endDate) ? new Date(search.endDate).toISOString().split('T')[0] : null, occupants: search.occupants } }").button.button--block
                        | Check availability

                .home-search__date(ref="homeDate")
                    datePicker(
                        ref="datePicker"
                        :startDate="new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)"
                        :minNights="2"
                        :maxNights="30"
                        @checkInChanged="set('startDate', $event)"
                        @checkOutChanged="set('endDate', $event)"
                        @closeDatepicker="closeDatepicker()"
                        @nextMonth="toggleLoader()"
                    )

        section.home-feel
            .box.flex.column.middle
                hgroup.flex-6.flex-4-lg.self-start.home-feel__title
                    h4
                        | It does feel like home
                    h1
                        | We put so much work so our houses are...

                ul.self-start-sm.list
                    li.list__item
                        i.icon-check
                        h6
                            | Spotless
                            strong.text--uppercase
                                | &nbsp;clean
                    li.list__item
                        i.icon-check
                        h6
                            | Fully
                            strong.text--uppercase
                                | &nbsp;equipped
                    li.list__item
                        i.icon-check
                        h6
                            | Perfectly
                            strong.text--uppercase
                                | &nbsp;located

                //- Carousel slider
                carousel(:auto="false" :navigation="true").home-carousel

        section.flex.home-details
            h1.box.flex.bottom.home-details__title
                | It's all about the details

        aside(role="complementary").flex.home-people
            .box.flex.middle-lg
                h2.flex-4.flex-3-lg.home-people__title
                    | Technology is important, but not more than people
                ul.flex-4.flex-3-lg.row-by.list.home-people__list
                    li.list__item
                        | Beautifully decorated <strong class="text--uppercase">homes</strong>
                    li.list__item
                        | We inspect <strong class="text--uppercase">every property</strong> after a check out and before a check in
                    li.list__item
                        | Support and accountability from <strong class="text--uppercase"> real state professionals 24/7

        article(role="article").box.flex.home-process
            header.flex-4.flex-6-sm.flex-3-lg
                h4.home-process__subtitle
                    | What our clients say
                h2.home-process__title
                    | We super loved it and would recommend anyone to stay in this house...

                ul(ref="quotes")
                    li
                        blockquote(cite="Caroline")
                            p.home-process__quote
                                | "This house is AMAZING! We super loved it and would recommend
                                | anyone to stay in this house. Safe area with a guard before
                                | entering the area. Rooms are big and nice. When service any
                                | staff form Glasstone was always there to help out quick!
                                | Thanks for a great stay!""

                            span.home-process__author
                                strong
                                    | Caroline
                                small
                                    | SL 4904 Clock Tower
                    li
                        blockquote(cite="Paul")
                            p.home-process__quote
                                | "Spacious home in a great location. The new water complex is incredible. We will be back, probaly with a few more families! Thanks for an awesome stay!"

                            span.home-process__author
                                strong
                                    | Paul
                                small
                                    | SL 4904 Clock Tower
                    li
                        blockquote(cite="Ryan")
                            p.home-process__quote
                                | "This place is beautifully appointed and had a lot of space for a large group. It was also conveniently located near a Publix grocery store, Universal, and Disney. We loved the place. The host was also very accommodating and quick to respond.

                            span.home-process__author
                                strong
                                    | Ryan
                                small
                                    | SL 4904 Clock Tower

            figure.flex-6.flex-3-lg.home-process__picture

</template>

<script>
    import Siema from 'siema';
    import DatePicker from 'vue-hotel-datepicker';
    import Carousel from '../ui/carousel.vue';

    export default {
        name: 'Home',

        components: {
            datePicker: DatePicker,
            carousel: Carousel
        },

        data() {
            return {
                slider: null
            };
        },

        computed: {
            search() {
                return this.$store.getters['search/parameters'];
            }
        },

        mounted() {
            setTimeout(() => {
                this.setSlider();
            }, 2000);
        },

        beforeDestroy() {
            this.slider.destroy();
        },

        methods: {
            set(property, value) {
                this.$store.commit('search/set', { property, value });
            },

            increment(property, amount) {
                this.$store.commit('search/increment', { property, amount });
            },

            decrement(property, amount) {
                this.$store.commit('search/decrement', { property, amount });
            },

            setSlider() {
                if (this.$refs.quotes) {
                    this.slider = new Siema({
                        selector: this.$refs.quotes,
                        duration: 2000,
                        easing: 'ease-in-out',
                        perPage: 1,
                        loop: true
                    });
                    setInterval(() => this.slider.next(), 10000);
                }
            },

            toggleDatepicker() {
                this.$refs.datePicker.toggleDatepicker();
                this.$refs.homeDate.classList.toggle('home-search__date--open');
            },

            closeDatepicker() {
                this.$refs.homeDate.classList.remove('home-search__date--open');
            },

            toggleLoader() {
                this.$store.commit('toggleLoader', true);
                setTimeout(() => { this.$store.commit('toggleLoader', false) }, 1000);
            }
        }
    };
</script>

<style lang="stylus">
    @import 'nib'
    @require '../../styles/variables'

    .home-hero
        background-position top
        background-repeat no-repeat
        background-size auto
        background-image url('assets/images/home-hero.jpg')
        min-height 627px
        padding-top 60px
        position relative

        @media small
            padding-top 90px

        @media large
            background-image url('assets/images/home-hero-large.jpg')
            background-position-y 27%
            padding-top 134px

        @media beyond
            background-size cover
            min-height 1080px

    .home-hero__title
        color white
        max-width 889px
        margin-bottom 10px
        margin-left 32px
        margin-right 32px

        h1
            line-height 1.21
            letter-spacing 2.4px

        h5
            line-height 2

        b
            font-weight normal
            color yellow-light

        @media small
            text-align center

            h1
                font-size 24px
                text-transform uppercase

            h5
                font-size 14px

        @media large
            text-align left

    .home-search
        top 280px
        left 0
        margin 0 auto
        padding-top 30px
        position absolute
        right 0
        width 240px
        z-index 1

        @media large
            padding-top 0
            min-height 162px
            max-height 162px
            position relative
            top auto
            width 889px

    .home-search__column
        display inline-block
        padding 16px 30px
        position relative
        width 100%

        @media small
            padding 12px 30px

        @media large
            padding 40px 30px
            width 25%

    .home-search__column--secondary
        background-color gray-lighter
        margin-top 20px
        padding 20px 30px

        @media large
            padding-top 67px
            margin-top 0

    .home-search__line
        background-color gray-light
        height 57px
        position absolute
        right 0
        top 50%
        transform translateY(-50%)
        width 1px

    .home-search__date
        opacity 0
        pointer-events none
        top 240px
        left -200px
        position absolute
        transition all 0.2s ease-in-out
        right 0
        width 640px
        z-index 10
        margin 0 auto

        @media small
            position initial
            height 0

        @media large
            top 110px
            left 0
            width 880px

    .home-search__date--open
        opacity 1
        pointer-events auto
        transform translateY(20px)

        @media small
            transform none

    .home-feel
        background-color white
        min-height 1082px
        padding-top 160px
        position relative
        z-index 0

        &::before
            background linear-gradient(to top left, white 0%, white 50%, beige 50%, beige 100%)

            content ''
            height 75%
            left 0
            position absolute
            top 0
            width 50%
            z-index -1

     @media small
        min-height 810px
        padding-top 100px

    .home-feel__title
        margin-bottom 76px

        @media small
            margin-bottom 53px

    .home-carousel
        margin-top 76px
        margin-bottom 80px
        width 92%

        @media small
            width 80%

    .home-details
        background-position bottom
        background-repeat no-repeat
        background-size cover
        border-bottom 6px solid white
        background-image url('assets/images/home-details.jpg')
        min-height 600px

        @media small
            background-image url('assets/images/home-details-small.jpg')

    .home-details__title
        color white
        line-height 1
        margin-bottom 0

        @media large
            font-size 96px

    .home-people
        background linear-gradient(to right bottom, yellow 0%, beige-darker 100%)
        color white
        min-height 434px
        position relative
        padding-top 48px
        z-index 0

        &::before
            background linear-gradient(to right bottom, alpha(black, 0) 0%, alpha(black, 0) 50%, black 50%, black 100%)
            bottom 0
            content ''
            height 100%
            opacity 0.05
            position absolute
            right 0
            width 100%
            z-index -1

        @media large
            min-height 528px
            padding-top 0

    .home-people__title
        background-color yellow
        margin-bottom 44px
        padding 25px 16px 25px 0
        position relative
        width 100%

        &::before
            background-color yellow
            content ''
            display block
            height 100%
            left -64px
            position absolute
            top 0
            width 64px

        @media large
            font-size 48px
            margin-bottom 0
            padding 37px 66px 37px 0

    .home-people__list
        margin-bottom 40px

        @media large
            padding-left 40px

    .home-process
        min-height 811px
        padding-top 73px
        position relative

        @media small
            min-height 940px

        @media large
            min-height 697px
            padding-top 97px

    .home-process__title
        padding-right 40px

        @media large
            font-size 48px

    .home-process__subtitle
        font-size 12px
        margin-bottom 5px

        @media large
            font-size 16px
            margin-bottom 18px

    .home-process__quote
        font-size 14px
        margin-top 19px
        margin-bottom 32px
        padding-right 40px

        @media large
            font-size 16px

    .home-process__author

        & > *
            display block

    .home-process__picture
        background-position center
        background-repeat no-repeat
        background-size cover
        background-image url('assets/images/home-process.jpg')
        position absolute
        width 100%
        bottom 0
        left 0
        right 0
        height 50%

        @media large
            position relative
            height auto

</style>
