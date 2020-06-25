<template lang="pug">
    section
        section(role="banner").flex.property-hero
            figure(ref="slider").property-hero__slider
                img(v-lazy="selection.slide[0]" :alt="detail.name").property-hero__slide

        //- Lightbox
        aside(ref="lightbox").lightbox.property-hero__lightbox.transparent
            .lightbox__box
                header.property-hero__lightbox-header.flex.between.bottom
                    h5.property-hero__lightbox-title
                        | {{ detail.name }}
                    button(name="button" type="button" @click="setLightbox('off')").lightbox__close
                figure(ref="lightbox-slider")
                    img(v-for="(image, index) in selection.lightbox" v-lazy="image" :alt="`${ detail.name } photo ${ index + 1 }`").property-hero__lightbox-slide
                aside
                    button(ref="lightbox-prev" name="lightbox-prev" type="button").property-hero__control.property-hero__control--prev.button.button--clean.arrow.arrow--left
                    button(ref="lightbox-next" name="lightbox-next" type="button").property-hero__control.property-hero__control--next.button.button--clean.arrow.arrow--right

        section(ref="about" role="complementary").box.flex.top.property-details
            article.flex-3.flex-6-sm.flex-4-lg.property-details__info
                ul.flex.between.property-data
                    li.property-data__box
                        small.property-data__title
                            | Capacity
                        span.property-data__output
                            | {{ detail.maxOccupants }}
                    li.property-data__box
                        small.property-data__title
                            | Bedrooms
                        span.property-data__output
                            | {{ detail.bedroomCount }}
                    li.property-data__box
                        small.property-data__title
                            | Bathrooms
                        span.property-data__output
                            | {{ detail.bathroomCount }}
                    li(@click="setLightbox('on')").button.property-data__box.property-data__button
                        small.property-data__title
                            | Pictures
                        i.icon-camera

                h1.property-details__title
                    | {{ detail.name }}

                //- Star ratings component
                //- rating(:count="detail.rating.count" :average="detail.rating.average")

                nav(role="navigation").menu-anchor
                    a(href="#" @click.prevent="scrollTo('about')").menu-anchor__link.menu-anchor__link--active
                        | About this house
                    a(href="#" @click.prevent="scrollTo('amenities')").menu-anchor__link
                        | Amenities
                    a(href="#" @click.prevent="scrollTo('location')").menu-anchor__link
                        | Location
                    a(href="#" @click.prevent="scrollTo('reviews')").menu-anchor__link.hidden
                        | Reviews

                //- TODO: Need property description from api
                p(v-html="detail.description")

            //- Main filter
            form(ref="property-book" role="search" v-outside="closeDatepicker").flex-3.flex-2-lg.property-book
                button(type="button" @click="toggleBook()").property-book__accordion
                    i.arrow--small

                h3.property-book__title
                    | Book this house

                .property-book__search-item
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

                .property-book__search-item
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

                .property-book__search-item
                    label.label--small
                            | Guests
                    menu.button--trim.button-controller
                        button(name="subtract" type="button" @click.prevent="decrement('occupants', 1)" :disabled="search.occupants <= 0").button.button-controller__input
                            | -
                        output(name="result" v-bind:class="{ 'button-controller__output--small' : (search.occupants <= 0) }").button-controller__output
                            | {{ search.occupants | all }}
                        button(name="add" type="button" @click.prevent="increment('occupants', 1)" :disabled="search.occupants == 23").button.button-controller__input
                            | +

                .property-book__date(ref="propertyDate")
                    datePicker(
                        ref="datePicker"
                        :startDate="new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)"
                        :minNights="2"
                        :maxNights="30"
                        @checkInChanged="set('startDate', $event)"
                        @checkOutChanged="set('endDate', $event)"
                        @closeDatepicker="closeDatepicker()"
                    )

                hr

                transition(name="fade" mode="out-in")
                    div(key="1" v-if="available === true && (detail.totalPrice > 0)")
                        dl.flex.between.bottom.list-values
                            dt.list-values__term
                                | Total <em>({{ detail.dayPrices.length }} nights X ${{ average }})</em>
                            dd.list-values__description
                                strong
                                    | ${{ detail.totalPrice }}

                            dt(@click="toggleSlide()").list-values__term.text--pointer
                                | Tax and Fees &nbsp;&nbsp;&nbsp;
                                i(ref="slide-arrow").arrow--small
                            dd(@click="toggleSlide()").list-values__description.text--pointer
                                strong
                                    | ${{ detail.taxAmount }}

                            dl(ref="slide").flex.between.bottom.list-values.list-values--sub.slide.slide--closed
                                template(v-for="fee in detail.fees")
                                    dt.list-values__term.list-values__term--sub
                                        | {{ fee.name }}
                                    dd.list-values__description.list-values__description--sub
                                        strong
                                            | ${{ fee.amount }}

                                template(v-for="tax in detail.taxes")
                                    dt.list-values__term.list-values__term--sub
                                        | {{ tax.name }}
                                    dd.list-values__description.list-values__description--sub
                                        strong
                                            | ${{ tax.amount }}

                            dt.list-values__term
                                | Total
                            dd.list-values__description
                                strong.list-values__total
                                    | ${{ Math.round((detail.totalPrice + detail.taxAmount) * 100) / 100 }}

                        router-link(:to="{ name: 'checkout', params: { id: $route.params.id } }").button.button--large.list-values__button
                            | Book now

                    div(key="2" v-else)
                        aside(v-show="available === false").property-book-notavailable
                            span.property-book-notavailable__title
                                | No availability for these days
                            h2
                                | How about trying different dates?

                        dt(v-show="average").list-values__term
                            | Price per night from <strong>${{ average }}</strong>

                        button(name="add" type="button" @click="checkAvailability()").button.button--large.list-values__button
                            | Check  availability

        aside(ref="amenities" role="complementary").property-ammenities
            .box.flex
                article.flex-6.flex-3-lg.property-ammenities__list
                    h3.property-ammenities__title
                        | Amenities
                    ul.flex.list
                        li(v-for="amenity in detail.amenities").flex-3.list__item.list__item--small
                            i.icon-check--small
                            h6
                                | {{ amenity }}

                aside.flex-6.flex-3-lg.property-rooms
                    h3.property-rooms__title
                        | Rooms details
                    ol.flex
                        li(v-for="bedroom in detail.bedrooms").property-rooms__details
                            strong
                                | {{ bedroom.name }}
                            template(v-for="amenity in bedroom.amenities")
                                <span> {{ amenity }}</span>

        aside(ref="location" role="complementary").property-location
            .box.flex
                .flex-3.flex-6-sm
                    h3
                        | Location

                    map(ref="map").property-map
                        a(:href="`https://www.google.com/maps/place/${ detail.address.address },+${ detail.address.city },+${ detail.address.state }+${ detail.address.zip }`" target="_blank").button.property-map__button
                            | Open in google maps

                //- TODO: Get distances from the client
                .flex-3.flex-6-sm
                    h3
                        | Distances
                    figure.property-distances
                        img(
                            src="/assets/images/distances.png" alt="Distances"
                            srcset="/assets/images/distances@2x.png 2x"
                        ).property-distances__image
                        dl.flex
                            .property-distances__directions.property-distances__directions--north-west
                                dt.flex-3
                                    | Disney Parks
                                dd.flex-3.text--right
                                    span.property-distances__mile
                                        | 17
                                    | min
                            .property-distances__directions.property-distances__directions--north-east
                                dt.flex-3
                                    | Universal Studios
                                dd.flex-3.text--right
                                    span.property-distances__mile
                                        | 25
                                    | min
                            .property-distances__directions.property-distances__directions--east
                                dt.flex-3
                                    | Sea World
                                dd.flex-3.text--right
                                    span.property-distances__mile
                                        | 18
                                    | min
                            .property-distances__directions.property-distances__directions--south-east
                                dt.flex-3
                                    | Convn Center
                                dd.flex-3.text--right
                                    span.property-distances__mile
                                        | 25
                                    | min
                            .property-distances__directions.property-distances__directions--south-west
                                dt.flex-3
                                    | Premium Outlets
                                dd.flex-3.text--right
                                    span.property-distances__mile
                                        | 13
                                    | min
                            .property-distances__directions.property-distances__directions--west
                                dt.flex-3
                                    | ESPN World
                                dd.flex-3.text--right
                                    span.property-distances__mile
                                        | 12
                                    | min

        article(role="article").box.property-reviews.hidden
            h3.property-reviews__title
                | Reviews

            //- TODO: Get the appropriete reviews with author and description from the api
            .flex
                ul.flex-2
                    li.property-review
                        //- Star ratings
                        rating(:average="detail.rating.average")

                        q(cite="XXXXX").property-review__quote
                            | Everything was perfect to the details. We never tought
                            | this level of service could be possible. If you value
                            | peace of mind in regards of accomodation, that's where to go.
                            | I definetly recommend it.
                        b.property-review__author
                            | Rebecca Thompson

</template>

<script>
    import Siema from 'siema';
    import DatePicker from 'vue-hotel-datepicker';
    import Rating from '../ui/rating.vue';

    export default {
        name: 'Property',

        components: {
            datePicker: DatePicker,
            rating: Rating
        },

        // Metadata
        metaInfo() {
            return {
                // Search Optimization
                title: `Glasstone Travel | ${ this.detail.name }`,

                meta: [
                    // Search Optimization
                    { name: 'description', content: this.detail.description },

                    // Social Discovery

                    // Schema.org microdata
                    { itemprop: 'description', content: this.detail.description },
                    { itemprop: 'image', content: this.detail.imageUrl },

                    // Open Graph Protocol
                    { property: 'og:url', content: `https://glasstonetravel.com/property/${ this.$route.params.id }` },
                    { property: 'og:title', content: `Glasstone Travel | ${ this.detail.name }` },
                    { property: 'og:description', content: this.detail.description },
                    { property: 'og:image', content: this.detail.imageUrl }
                ]
            };
        },

        data() {
            return {
                lightbox: null,
                available: undefined
            };
        },

        computed: {
            properties() {
                return this.$store.getters['properties/all'];
            },

            detail() {
                return this.$store.getters['property/detail'];
            },

            average() {
                const prices = this.detail.dayPrices;
                return prices.reduce((a, b) => a + b.price, 0) / prices.length;
            },

            selection() {
                return this.$store.getters['property/selection'];
            },

            map() {
                return this.$store.getters['property/map'];
            },

            search() {
                return this.$store.getters['search/parameters'];
            }
        },

        created() {
            this.fetchProperties();
            this.fetchDetail();
        },

        beforeDestroy() {
            this.lightbox.destroy();
        },

        methods: {
            fetchProperties() {
                this.$store.dispatch('properties/all')
                    .then((properties) => {
                        const available = properties && properties.some(property => property.unitId === Number(this.$route.params.id));
                        this.available = available;
                    });
            },

            fetchDetail() {
                return this.$store.dispatch('property/detail', this.$route.params.id)
                    .then((property) => {
                        this.$nextTick(() => {
                            setTimeout(() => {
                                this.setMap();
                            }, 2000);
                        });

                        // Google Analytics Enhanced Ecommerce
                        this.$ga.ecommerce.addProduct({
                            id: this.$route.params.id.toString(),
                            name: property.name,
                            brand: 'Glasstone Travel',
                            price: this.average.toString(),
                            quantity: '1'
                        });

                        this.$ga.ecommerce.setAction('detail');
                    });
            },

            checkAvailability() {
                this.fetchDetail().then(() => this.fetchProperties());
            },

            set(property, value) {
                this.$store.commit('search/set', { property, value });
                this.available = undefined;
            },

            increment(property, amount) {
                this.$store.commit('search/increment', { property, amount });
                this.available = undefined;
            },

            decrement(property, amount) {
                this.$store.commit('search/decrement', { property, amount });
                this.available = undefined;
            },

            toggleDatepicker() {
                this.$refs.datePicker.toggleDatepicker();
                this.$refs.propertyDate.classList.toggle('property-book__date--open');
                this.$refs['property-book'].classList.toggle('property-book--open');
            },

            closeDatepicker() {
                this.$refs.propertyDate.classList.remove('property-book__date--open');
                this.$refs['property-book'].classList.remove('property-book--open');
            },

            setLightbox(action) {
                if (action === 'on') {
                    this.lightbox = new Siema({
                        selector: this.$refs['lightbox-slider'],
                        duration: 200,
                        easing: 'ease-in-out',
                        perPage: 1,
                        startIndex: 0,
                        draggable: true,
                        multipleDrag: false,
                        threshold: 0,
                        loop: false
                    });
                    this.$refs.lightbox.classList.remove('transparent');
                    this.$refs['lightbox-prev'].addEventListener('click', () => this.lightbox.prev());
                    this.$refs['lightbox-next'].addEventListener('click', () => this.lightbox.next());
                } else if (action === 'off') {
                    this.$refs.lightbox.classList.add('transparent');
                }
            },

            scrollTo(target) {
                this.$refs[target].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            },

            toggleSlide() {
                this.$refs['slide-arrow'].classList.toggle('arrow--small--up');
                this.$refs.slide.classList.toggle('slide--closed');
            },

            toggleBook() {
                this.$refs['property-book'].classList.toggle('property-book--collapse');
            },

            setMap() {
                this.$refs.map.style.backgroundImage = `url(${ this.map })`;
            }
        }
    };
</script>

<style lang="stylus">
    @import 'nib'
    @require '../../styles/variables'

    .property-hero
        background-repeat no-repeat
        background-position center
        background-size cover
        background-image url('../../assets/images/placeholder.svg')

        position relative
        height 332px
        width 100%
        overflow hidden

        @media small
            height auto

        @media large
            height 480px

        @media beyond
            height 600px

    .property-hero__slider
        transform translateY(-20%)
        width 100%

        @media small
            transform translateY(0)

        @media beyond
            transform translateY(-50%)

    .property-hero__slide
        width 100%

    .property-hero__control
        position absolute
        top 50%
        transform translateY(-50%)

        &:active
            transform translateY(-50%) scale(0.9)

    .property-hero__control--prev
        left 32px

    .property-hero__control--next
        right 32px

    .property-hero__lightbox

        .property-hero__control--prev
            left -56px

            @media small
                display none

        .property-hero__control--next
            right -56px

            @media small
                display none

    .property-hero__lightbox-header
        margin-bottom 20px

    .property-hero__lightbox-title
        font-size 24px
        font-family 'francois-one'
        font-weight bold
        line-height 1
        color white

        @media small
            font-size 16px

    .property-hero__lightbox-slide
        width 100%
        max-height 1200px

    .property-details
        min-height 688px

    .property-details__title
        font-size 24px
        margin-bottom 10px

        @media large
            font-size 48px
            margin-bottom 22px

    .property-details__info
        padding-right 46px
        padding-bottom 40px

        @media small
            padding-right 0

    .property-data
        transform translateY(-22px)
        margin-bottom 5px
        max-width 286px

        @media small
            margin 0 auto

        @media large
            transform translateY(-31px)
            margin-bottom 36px
            max-width 514px

    .property-data__box
        background white
        text-align center
        height 56px
        width 70px
        padding-top 8px

        @media large
            height 124px
            width 124px
            padding-top 29px

    .property-data__button
        background yellow-light
        border-radius 0
        padding-left 0
        padding-right 0

    .property-data__title
        font-family 'roboto-regular'
        text-shadow none
        display block
        color gray
        font-size 10px
        text-transform uppercase
        margin-bottom 4px

        @media large
            font-size 12px
            margin-bottom 10px

    .property-data__output
        font-family 'francois-one'
        display block
        color inherit
        font-size 24px
        line-height 1

        @media large
            font-size 48px

    .property-book
        background-color white
        padding 36px
        transform translateY(-31px)
        transition all 0.2s ease-in-out

        @media small
            box-shadow 8px 16px 32px 0 alpha(black, 0.2)
            position fixed
            bottom 0
            left 0
            min-width 100%
            z-index 1
            transform translateY(0)
            padding 20px 32px

            hr
                margin-bottom 10px
                height 3px

    .property-book--collapse
        transform translateY(100%)

        i.arrow--small
            transform rotate(180deg)

    .property-book--open
        top 0

    .property-book__accordion
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

    .property-book__title
        margin-bottom 32px

        @media small
            font-size 16px
            margin-bottom 10px

    .property-book__search-item
        margin-bottom 30px

        @media small
            width 50%
            float left
            display inline-block
            font-size 14px
            margin-bottom 10px

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
                width 50%
                margin 10px 0 20px

            &:nth-child(5)
                width 100%
                margin-bottom 20px

        @media beyond
            width 50%
            float left

    .property-book__date
        opacity 0
        pointer-events none
        top 290px
        right 0
        position absolute
        transition all 0.2s ease-in-out
        width 640px
        z-index 10

        @media small
            position initial
            height 0

        @media large
            top 310px
            width 880px

        @media beyond
            top 180px
            right -220px

    .property-book__date--open
        opacity 1
        pointer-events auto
        transform translateY(20px)

        @media small
            transform none

    .property-book__search-output
        font-size 48px
        line-height 1
        font-family 'francois-one'
        margin-right 5px

        @media small
            font-size 24px

    .property-book-notavailable
        display block
        margin-bottom 30px
        float left
        width 100%

        @media small
            margin-bottom 20px

    .property-book-notavailable__title
        color red
        display block
        margin-bottom 10px
        font-family 'roboto-bold'

    .property-ammenities
        background linear-gradient(-144deg, gray 0%, gray-darker 100%)
        color white
        min-height 770px
        padding-top 55px
        padding-bottom 40px

        @media large
            padding-top 85px
            padding-bottom 80px

    .property-ammenities__list
        margin-bottom 50px

    .property-ammenities__title
        margin-bottom 34px

    .property-rooms
        counter-reset room

    .property-rooms__title
        margin-bottom 34px

    .property-rooms__details
        display block
        height 190px
        width 190px
        border 4px solid yellow-light
        padding 30px
        position relative
        margin-right 20px
        margin-bottom 20px

        &::before
            counter-increment room
            content counter(room)
            font-family 'francois-one'
            font-size 160px
            line-height 1
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            opacity 0.1

    .property-location
        background-color white
        padding-top 56px
        padding-bottom 60px
        min-height 424px

        @media large
            padding-top 96px
            min-height 619px
            padding-bottom 100px

    .property-map
        width 280px
        height 280px
        display block
        overflow hidden
        margin-top 24px
        position relative

        @media small
            margin-bottom 55px

    .property-map__button
        position absolute
        bottom 20px
        width 190px
        left 0
        right 0
        margin auto

    .property-distances
        display block
        height 300px
        position relative
        margin-top 24px

        @media large
            transform translate(27px, 74px)
            width 300px

    .property-distances__image
        display none

        @media large
            display block

    .property-distances__directions
        background-color dark
        border 4px solid gray
        border-radius 2px
        color white
        display flex
        font-family 'roboto-bold'
        font-size 12px
        height 68px
        line-height 1.25
        margin-bottom 10px
        margin-right 10px
        padding 16px 10px
        position relative
        width 136px

        @media large
            position absolute
            margin-bottom 0
            margin-right 0

    .property-distances__mile
        font-family 'francois-one'
        font-size 36px
        line-height 0.81

    .property-distances__directions--north-west

        @media large
            top -20px
            left -86px

    .property-distances__directions--north-east

        @media large
            top -20px
            right -86px

    .property-distances__directions--east

        @media large
            top 114px
            right -127px

    .property-distances__directions--south-east

        @media large
            bottom -20px
            right -86px

    .property-distances__directions--south-west

        @media large
            bottom -20px
            left -86px

    .property-distances__directions--west

        @media large
            top 114px
            left -127px

    .property-reviews
        padding-top 64px
        padding-bottom 96px

    .property-reviews__title
        margin-bottom 30px

    .property-review
        margin-bottom 33px

    .property-review__quote
        display block
        margin-top 16px

    .property-review__author
        display block
        margin-top 8px

</style>
