<template lang="pug">
    section
        .box.flex.reverse-sm.contact
            transition(name="fade" mode="out-in")
                form(accept-charset="UTF-8" v-if="status === null" @submit.prevent="validate()").flex-3.flex-6-sm
                    fieldset.contact-fieldset
                        label(for="name").contact-fieldset__label
                            | Name*
                        input(id="name" type="text" :value="contact.name" @input="setContact('name', $event)" title="John Doe" maxlength="30" autocomplete="name" required)
                        label(for="phone").contact-fieldset__label
                            | Phone*
                        input(id="phone" type="tel" :value="contact.phone" @input="setContact('phone', $event)" autocomplete="tel-national" required)
                        label(for="email").contact-fieldset__label
                            | Email*
                        input(id="email" type="email" :value="contact.email" @input="setContact('email', $event)" maxlength="30" autocomplete="email" required)
                        label(for="message").contact-fieldset__label
                            | Message*
                        textarea(id="message" name="textarea" :value="contact.message" @input="setContact('message', $event)" rows="3" maxlength="144" required)

                        small.contact-fieldset__required
                            | * required fields

                        //- Recaptcha
                        div(ref="recaptcha")
                        input(type="submit" value="Submit").button.button--large

                //- Confirmation
                aside(v-if="status === 'success'").flex-3.flex-6-sm
                    h1.contact-title
                        i.icon-check--circle
                        | Thank you!
                    p
                        | Our staff will respond to you as soon as possible

            aside(role="complementary").flex-3.flex-6-sm
                h1.contact-title
                    | Contact us
                address.flex.column.between.h-adr.contact-h-adr
                    a(href="tel:1-321-323-1816").p-tel
                        | +1 (321) 323 1816

                    span.p-locality
                        | 8865 Commodity Circle unit 11-201 -
                        br
                        | Orlando, FL, 32819

</template>

<script>
    export default {
        name: 'Contact',

        // Metadata
        metaInfo: {
            // Search Optimization
            title: 'Contact Glasstone Travel | The best place to rent homes',

            meta: [
                // Search Optimization
                { name: 'description', content: 'We have a huge catalog of modern houses for rent, near all attractions, with special offers. Contact us!' }
            ],
            script: [
                { type: 'text/javascript', src: 'https://www.google.com/recaptcha/api.js', async: true }
            ]
        },

        computed: {
            contact() {
                return this.$store.getters['email/contact'];
            },

            status() {
                return this.$store.getters['email/status'];
            }
        },

        mounted() {
            setTimeout(() => {
                this.renderRecaptcha();
            }, 1000);
        },

        methods: {
            renderRecaptcha() {
                const render = () => {
                    window.grecaptcha.render(this.$refs.recaptcha, {
                        sitekey: process.env.RECAPTCHA_KEY,
                        callback: this.submit,
                        size: 'invisible'
                    });
                };

                if (window.grecaptcha) {
                    render();
                } else {
                    window.addEventListener('load', function load() {
                        render();
                        window.removeEventListener('load', load);
                    });
                }
            },

            setContact(property, event) {
                const { value } = event.target;
                this.$store.commit('email/setContact', { property, value });
            },

            validate() {
                window.grecaptcha.execute();
            },

            submit() {
                this.$store.dispatch('email/send', this.contact);
            }
        }
    };
</script>

<style lang="stylus">
    @import 'nib'
    @require '../../styles/variables'

    .contact
        padding-top 100px
        padding-bottom 100px
        min-height 800px

        @media small
            padding-top 54px

    .contact-fieldset
        max-width 300px
        padding-left 36px

        @media small
            padding-left 0

        @media large
            max-width 360px

    .contact-fieldset__label

        @media large
            font-family 'tuna'
            font-size 24px

    .contact-fieldset__required
        display block
        margin-bottom 30px

    .contact-title
        font-size 24px

        @media large
            font-size 48px

    .contact-h-adr
        margin-top 33px
        margin-bottom 60px
        min-height 84px
        font-size 14px

        @media large
            font-size 16px
            min-height 96px
            margin-top 38px

</style>
