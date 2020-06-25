<template lang="pug">
    section
        .box.checkout
            nav(role="navigation").breadcrumb
                ul.flex
                    li(:class="{ 'breadcrumb__item--active' : (step === 1) }").breadcrumb__item
                        a(href="#" @click.prevent="setStep(1)")
                            | Contact information
                    li(:class="{ 'breadcrumb__item--active' : (step === 2) }").breadcrumb__item
                        a(href="#" @click.prevent="setStep(2)")
                            | Rules and policies
                    li(:class="{ 'breadcrumb__item--active' : (step === 3) }").breadcrumb__item
                        a(href="#" @click.prevent="setStep(3)")
                            | Payment

            .flex
                section(v-show="status === undefined").flex-3.flex-6-sm
                    transition(name="fade" mode="out-in")
                        //- Contact information
                        form(class="checkout-form" accept-charset="UTF-8" key="1" v-if="(step === 1)" @submit.prevent="nextStep(2)")
                            label(for="givenName")
                                | First name*
                            input(id="givenName" type="text" :value="information.givenName" @input="setInformation('givenName', $event)" title="John" pattern="[a-zA-Z0-9]+" maxlength="30" autocomplete="given-name" required)
                            label(for="familyName")
                                | Last name*
                            input(id="familyName" type="text" :value="information.familyName" @input="setInformation('familyName', $event)" title="Doe" pattern="[a-zA-Z0-9]+" maxlength="30" autocomplete="family-name" required)
                            label(for="email")
                                | Email*
                            input(id="email" type="email" :value="information.email" @input="setInformation('email', $event)" maxlength="30" autocomplete="email" required)
                            label(for="phone")
                                | Phone*
                            input(id="phone" type="tel" :value="information.phone" @input="setInformation('phone', $event)" autocomplete="tel-national" required)
                            small.checkout-form__required
                                | * required fields
                            input(type="submit" value="Next").button.button--large

                        //- Rules and policies
                        form(accept-charset="UTF-8"  key="2" v-if="(step === 2)" @submit.prevent="nextStep(3)")
                            article(role="article").checkout-rules
                                h3.checkout-rules__title
                                    | About this booking
                                p
                                    | The homeowner will have 24 hours to confirm their home is available
                                    | for your stay. When the homeowner confirms your booking you'll
                                    | receive a confirmation email. If the home is unavailable, we'll
                                    | be in touch to help you find a great alternative.
                                p
                                    | Booking with us means being part of a new era of hospitality.
                                p
                                    | Like you, we believe there’s a better way to experience a city.
                                    | They trust us to provide handmade hospitality in their homes,
                                    | and our guests agree to honour five simple club rules.
                                p
                                    | Treat others’ homes as you would have them treat yours.
                                    | If accidents happen, be the first to let us know.
                                p
                                    | Be discreet and keep homeowners’ names and addresses private.
                                p
                                    | Respect the house rules and ensure that others do too.
                                p
                                    | Be considerate of your neighbours — and no parties.

                            label.flex
                                input(name="agree" type="checkbox" :checked="agreement" @change="setAgreement" required)
                                router-link(:to="{ name: 'terms' }").link
                                    small
                                        | I agree to the Terms and Conditions

                            input(type="submit" value="Next").button.button--large

                        //- Payment
                        form(class="checkout-form" accept-charset="UTF-8" key="3" v-if="(step === 3)" @submit.prevent="confirmReservation")
                            label(for="address")
                                | Address*
                            input(id="address" type="text" :value="information.address" @input="setInformation('address', $event)" maxlength="50" autocomplete="street-address" required)
                            label(for="city")
                                | City*
                            input(id="city" type="text" :value="information.city" @input="setInformation('city', $event)" maxlength="30" autocomplete="city" required)
                            label(for="state")
                                | State*
                            input(id="state" type="text" :value="information.state" @input="setInformation('state', $event)" maxlength="30" autocomplete="state" required)
                            label(for="country")
                                | Country*
                            input(id="country" type="text" :value="information.country" @input="setInformation('country', $event)" maxlength="30" autocomplete="country" required)
                            label(for="zip")
                                | ZIP*
                            input(id="zip" type="text" :value="information.zip" @input="setInformation('zip', $event)" title="The Postal Code should be a minimum of 5 characters." pattern=".{5,20}" autocomplete="postal-code" required).input--small
                            label(for="ccNumber")
                                | Credit card number*
                            input(id="ccNumber" type="number" :value="information.ccNumber" @input="setInformation('ccNumber', $event)" pattern="[0-9]{13,16}" autocomplete="cc-number" required)
                            label(for="ccExp")
                                | Expiry date*
                            //- Month
                            select(id="ccExpMonth" :value="information.ccExpMonth" @change="setInformation('ccExpMonth', $event)" autocomplete="cc-exp-month" required).select--date
                                option(:value="information.ccExpMonth" disabled selected)
                                    | MM
                                option(value="01")
                                    | 01
                                option(value="02")
                                    | 02
                                option(value="03")
                                    | 03
                                option(value="04")
                                    | 04
                                option(value="05")
                                    | 05
                                option(value="06")
                                    | 06
                                option(value="07")
                                    | 07
                                option(value="08")
                                    | 08
                                option(value="09")
                                    | 09
                                option(value="10")
                                    | 10
                                option(value="11")
                                    | 11
                                option(value="12")
                                    | 12
                            //- Year
                            select(id="ccExpYear" :value="information.ccExpYear" @change="setInformation('ccExpYear', $event)" autocomplete="cc-exp-year" required).select--date
                                option(:value="information.ccExpYear" disabled selected)
                                    | YY
                                option(value="2018")
                                    | 18
                                option(value="2019")
                                    | 19
                                option(value="2020")
                                    | 20
                                option(value="2021")
                                    | 21
                                option(value="2022")
                                    | 22
                                option(value="2023")
                                    | 23
                                option(value="2024")
                                    | 24
                                option(value="2025")
                                    | 25
                                option(value="2026")
                                    | 26
                                option(value="2027")
                                    | 27
                            label(for="ccCsc")
                                | Security code*
                            input(id="ccCsc" type="number" :value="information.ccCsc" @input="setInformation('ccCsc', $event)" maxlength="4" autocomplete="cc-csc" required).input--small
                            small.checkout-form__required
                                | * required fields
                            input(type="submit" value="Confirm reservation").button.button--large

                    //- Certifications
                    figure.flex.column-sm.between.checkout-certs
                        img(src="/assets/images/checkout-letsencrypt.png" srcset="/assets/images/checkout-letsencrypt.png 1x, /assets/images/checkout-letsencrypt@2x.png 2x" width="183" alt="Let's Encrypt")
                        img(src="/assets/images/checkout-ssl-secure.png" srcset="/assets/images/checkout-ssl-secure.png 1x, /assets/images/checkout-ssl-secure@2x.png 2x" width="142" alt="SSL Secured")

                //- Reservation details
                aside(role="complementary").flex-3.flex-2-lg
                    img(
                        v-lazy="detail.imageUrl" :alt="detail.name"
                        data-srcset="`${ detail.imageUrl } 2x`"
                    ).checkout-image

                    form(ref="checkout-reservation" role="search").flex.checkout-reservation
                        button(type="button" @click="toggleReservation()").checkout-reservation__accordion
                            i.arrow--small

                        h3.checkout-reservation__title
                            | Your reservation

                        .checkout-reservation__search-item
                            label(for="checkin").label--small
                                | Check-in
                            span.checkout-reservation__search-output
                                | {{ search.startDate | day }}
                            | {{ search.startDate | month }}

                        .checkout-reservation__search-item
                            label(for="checkout").label--small
                                | Check-out
                            span.checkout-reservation__search-output
                                | {{ search.endDate | day }}
                            | {{ search.endDate | month }}

                        .checkout-reservation__search-item(v-if="search.occupants")
                            label.label--small
                                | Guests
                            span.checkout-reservation__search-output
                                | {{ search.occupants }}

                        hr

                        dl.flex.between.bottom.list-values
                            dt.list-values__term
                                | Total ({{ detail.dayPrices.length }} nights)
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

                //- Confirmation
                section(v-show="status === 'confirmed'").flex-3.flex-6-sm.checkout-confirmation
                    h3.flex.middle.checkout-confirmation__title
                        i.icon-check--circle
                        | Your reservation is processing.
                    p
                        | We will send you an email conﬁrmation shortly. Meanwhile, feel free to contact us if you have any question or need:
                        br
                        strong
                            a(href="tel:1-321-323-1816")
                                | +1 (321) 323 1816
                        strong
                            a(href="mailto:reservations@glasstonegroup.com?subject=Reservation from Glasstone Travel")
                                | reservations@glasstonegroup.com

                    hr

                    h4
                        | Please, rate your booking experience here!
                    //- Star ratings
                    rating(:rate="true")

                    //- button(name="XX" type="button").button
                    //-     | Print reservation
                    //- button(name="XX" type="button").button
                    //-     | Download pdf

</template>

<script>
    import creditCardType from 'credit-card-type';
    import Rating from '../ui/rating.vue';

    export default {
        name: 'Checkout',

        components: {
            rating: Rating
        },

        computed: {
            detail() {
                return this.$store.getters['property/detail'];
            },

            search() {
                return this.$store.getters['search/parameters'];
            },

            step() {
                return this.$store.getters['reservation/step'];
            },

            agreement() {
                return this.$store.getters['reservation/agreement'];
            },

            information() {
                return this.$store.getters['reservation/information'];
            },

            status() {
                return this.$store.getters['reservation/status'];
            }
        },

        watch: {
            step(step) {
                let option;

                switch (step) {
                    case 2:
                        option = 'Rules and Policies';
                        break;
                    case 3:
                        option = 'Payment';
                        break;
                    default:
                        break;
                }

                this.$ga.ecommerce.setAction('checkout_option', { step, option });
            },

            status(status) {
                if (status === 'confirmed') {
                    this.$ga.ecommerce.setAction('checkout_option', {
                        step: 4,
                        option: 'Confirmed'
                    });

                    this.$ga.ecommerce.setAction('purchase', {
                        id: this.$route.params.id.toString(),
                        affiliation: 'Online Booking',
                        revenue: this.detail.totalPrice.toString(),
                        tax: this.detail.taxAmount.toString()
                    });
                }
            }
        },

        created() {
            this.fetchDetail();
            this.setDefaultState();
        },

        methods: {
            fetchDetail() {
                this.$store.dispatch('property/detail', this.$route.params.id)
                    .then((property) => {
                        // Google Analytics Enhanced Ecommerce
                        this.$ga.ecommerce.addProduct({
                            id: this.$route.params.id.toString(),
                            name: property.name,
                            brand: 'Glasstone Travel',
                            price: property.totalPrice.toString(),
                            quantity: '1'
                        });

                        this.$ga.ecommerce.setAction('checkout', {
                            step: 1,
                            option: 'Contact information'
                        });
                    });
            },

            setDefaultState() {
                this.$store.commit('reservation/setDefaultState');
            },

            setStep(step) {
                this.$store.commit('reservation/setStep', step);
            },

            setAgreement(event) {
                this.$store.commit('reservation/setAgreement', event.target.checked);
            },

            setInformation(property, event) {
                const { value } = event.target;
                this.$store.commit('reservation/setInformation', { property, value });
            },

            toggleSlide() {
                this.$refs['slide-arrow'].classList.toggle('arrow--small--up');
                this.$refs.slide.classList.toggle('slide--closed');
            },

            toggleReservation() {
                this.$refs['checkout-reservation'].classList.toggle('checkout-reservation--collapse');
            },

            nextStep(step) {
                this.setStep(step);
            },

            confirmReservation() {
                const data = {
                    unitId: Number.parseInt(this.$route.params.id, 10),
                    startDate: this.search.startDate,
                    endDate: this.search.endDate,
                    occupants: this.search.occupants || 1,
                    givenName: this.information.givenName,
                    familyName: this.information.familyName,
                    email: this.information.email,
                    phone: this.information.phone,
                    address: this.information.address,
                    city: this.information.city,
                    state: this.information.state,
                    country: this.information.country,
                    zip: this.information.zip,
                    ccTypeId: this.$options.filters.cctype(creditCardType(this.information.ccNumber)[0].type),
                    ccNumber: Number.parseInt(this.information.ccNumber, 10),
                    ccExpMonth: Number.parseInt(this.information.ccExpMonth, 10),
                    ccExpYear: Number.parseInt(this.information.ccExpYear, 10),
                    ccCsc: Number.parseInt(this.information.ccCsc, 10),
                    ccAmount: (this.detail.taxAmount + this.detail.totalPrice).toString()
                };

                this.$store.dispatch('reservation/book', data);
            }
        }
    };
</script>

<style lang="stylus">
    @import 'nib'
    @require '../../styles/variables'

    .checkout
        padding-top 40px
        min-height 1070px

        @media large
            padding-top 95px

    .checkout-form
        max-width 280px

    .checkout-form__required
        display block
        margin-bottom 40px

    .checkout-rules
        padding-right 40px

    .checkout-rules__title
        font-size 16px

    .checkout-certs
        max-width 346px
        margin-top 65px
        margin-bottom 60px

        @media small
            min-height 110px

    .checkout-image
        width 100%

        @media small
            display none

    .checkout-reservation
        background-color white
        padding 30px 30px 0
        text-align left
        margin-bottom 80px
        width 100%
        transition 0.2s ease-in-out

        @media small
            position fixed
            box-shadow 8px 16px 32px 0 alpha(black, 0.2)
            bottom 0
            left 0
            margin-left 0
            margin-bottom 0
            width 100%
            transform translateY(0)
            padding 20px 32px 0
            z-index 1

            hr
                margin-bottom 10px
                height 3px

    .checkout-reservation--collapse
        transform translateY(100%)

        i.arrow--small
            transform rotate(180deg)

    .checkout-reservation__accordion
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

    .checkout-reservation__title
        margin-bottom 29px
        font-size 16px
        width 100%

        @media small
            font-size 16px
            margin-bottom 10px

        @media beyond
            font-size 24px

    .checkout-reservation__search-item
        margin-bottom 30px
        width 100%

        @media small
            width 50%
            float left
            display inline-block
            font-size 14px
            margin-bottom 10px

            .label--small
                font-size 10px
                margin-bottom 6px

        @media beyond
            width 50%

    .checkout-reservation__search-output
        font-size 48px
        line-height 1
        font-family 'francois-one'
        margin-right 5px

        @media small
            font-size 24px

    .checkout-confirmation
        padding-left 40px

        @media small
            padding-left 0

    .checkout-confirmation__title
        font-size 16px

</style>
