<template lang="pug">
    aside(v-show="properties.length").carousel
        ul(ref="slider")
            li(v-for="property in properties.slice(0, 10)").carousel-item
                figure
                    router-link(:to="{ name: 'property', params: { id: property.unitId } }")
                        img(v-lazy="property.imageUrl" width="100%" :alt="property.name")
                    figcaption.carousel-item__title
                        | {{ property.name }}

                //- Star ratings
                rating(:count="property.ratingCount" :average="property.ratingAverage")

                router-link(:to="{ name: 'property', params: { id: property.unitId } }").button
                    | Check availability

        aside(v-show="navigation")
            button(ref="prev" name="prev" type="button").carousel__control.carousel__control--prev.button.button--clean.arrow.arrow--left
            button(ref="next" name="next" type="button").carousel__control.carousel__control--next.button.button--clean.arrow.arrow--right

</template>

<script>
    import Siema from 'siema';
    import Rating from './rating.vue';

    export default {
        name: 'Carousel',

        components: {
            rating: Rating
        },

        props: {
            // Type check
            auto: {
                type: Boolean,
                default: false,
                required: false
            },

            navigation: {
                type: Boolean,
                required: false
            },

            filter: {
                type: Object,
                default() { return { prop: '', value: '' }; },
                required: false
            }
        },

        data() {
            return {
                slider: null
            };
        },

        computed: {
            properties() {
                return this.$store.getters['properties/filterBy'](this.filter);
            },

            search() {
                return this.$store.getters['search/parameters'];
            }
        },

        mounted() {
            this.reset();
            this.fetchProperties();
        },

        beforeDestroy() {
            this.slider.destroy();
        },

        methods: {
            fetchProperties() {
                if (!this.properties.length) {
                    this.$store.dispatch('properties/all')
                        .then(() => {
                            this.$nextTick(() => {
                                this.setSlider();
                            });
                        });
                } else {
                    this.$nextTick(() => {
                        this.setSlider();
                    });
                }
            },

            reset() {
                this.$store.commit('search/reset');
            },

            setSlider() {
                this.slider = new Siema({
                    selector: this.$refs.slider,
                    duration: 1000,
                    easing: 'ease',
                    perPage: {
                        320: 1,
                        664: 2,
                        814: 3
                    },
                    startIndex: 0,
                    draggable: false,
                    multipleDrag: false,
                    threshold: 0,
                    loop: true,
                    onInit: () => {
                        const slides = this.$refs.slider.children[0].childElementCount;
                        if (slides < 3) {
                            this.$refs.slider.classList.add('carousel--center');
                        }
                    }
                });

                const { prev, next } = this.$refs;
                prev.addEventListener('click', () => this.slider.prev());
                next.addEventListener('click', () => this.slider.next());

                if (this.auto) {
                    setInterval(() => this.slider.next(), 10000);
                }
            }
        }
    };
</script>

<style lang="stylus">
    @import 'nib'
    @require '../../styles/variables'

    .carousel
        position relative

        & > ul > .carousel-item
            display none

    .carousel--center
        width fit-content
        margin 0 auto

        @media small
            width auto

    .carousel-item
        width 100%
        padding 0 10px

    .carousel-item__title
        color inherit
        font-family 'tuna'
        font-size 24px
        line-height 1.25
        margin 14px 0 10px
        width 89%
        white-space nowrap
        overflow hidden
        text-overflow ellipsis

    .carousel__control
        position absolute
        top 25%

    .carousel__control--prev
        left -50px

    .carousel__control--next
        right -50px

</style>
