<template lang="pug">
    aside.flex.middle.star-rating

        template(v-if="rate")
            fieldset
                .flex.between.reverse.star-rating__ratings.star-rating__ratings--large
                    input(id="star5" type="radio" name="rating" @change="rating(5)" :disabled="reviewed").hidden
                    label(for="star5" title="Awesome - 5 stars")
                        i.icon-star.icon-star--large

                    input(id="star4" type="radio" name="rating" @change="rating(4)" :disabled="reviewed").hidden
                    label(for="star4" title="Pretty good - 4 stars")
                        i.icon-star.icon-star--large

                    input(id="star3" type="radio" name="rating" @change="rating(3)" :disabled="reviewed").hidden
                    label(for="star3" title="Meh - 3 stars")
                        i.icon-star.icon-star--large

                    input(id="star2" type="radio" name="rating" @change="rating(2)" :disabled="reviewed").hidden
                    label(for="star2" title="Kinda bad - 2 stars")
                        i.icon-star.icon-star--large

                    input(id="star1" type="radio" name="rating" @change="rating(1)" :disabled="reviewed").hidden
                    label(for="star1" title="Sucks big time - 1 star")
                        i.icon-star.icon-star--large

            span(v-show="reviewed").star-rating__thanks
                | <strong>Thank you for your review!</strong>

        template(v-else)
            //- TODO: Need property ratings from the api
            figure.flex.between.star-rating__ratings
                i(v-for='stars in 5').icon-star.icon-star--full

            small(v-if="count").star-rating__opinions.hidden
                | ({{ count }} opinions)

</template>

<script>
    export default {
        name: 'Rating',

        props: {
            // Type check
            average: {
                type: Number,
                default: 5,
                required: false,
                validator(value) {
                    return value >= 0 && value <= 5;
                }
            },

            count: {
                type: Number,
                default: 0,
                required: false
            },

            rate: {
                type: Boolean,
                default: false,
                required: false
            }
        },

        data() {
            return {
                reviewed: false
            };
        },

        methods: {
            rating(stars) {
                this.reviewed = true;

                this.$ga.event({
                    eventCategory: 'Review',
                    eventAction: 'rate',
                    eventLabel: 'HEART Happiness metric',
                    eventValue: stars
                });
            }
        }
    };
</script>

<style lang="stylus">
    .star-rating
        margin-bottom 16px

    .star-rating__ratings
        max-width 98px

    .star-rating__ratings--large
        min-width 200px
        max-width 200px

    .star-rating__opinions
        margin-left 10px

    .star-rating__ratings > input:checked ~ label i, /* show gold star when clicked */
    .star-rating__ratings:not(:checked) > label:hover i, /* hover current star */
    .star-rating__ratings:not(:checked) > label:hover ~ label i  /* hover previous stars in list */
        filter none

    .star-rating__thanks
        display block
        margin-top 20px
        width 100%

</style>
