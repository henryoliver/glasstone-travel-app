// Vue
import Vue from 'vue';

// Vue plugins
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';
import VueAnalytics from 'vue-analytics';
import VueLazyload from 'vue-lazyload';

// Config
import config from './config';

// Filters
import {
    capitalize,
    lowercase,
    all,
    day,
    month,
    cctype
} from './filters';

// Directives
import outside from './directives';

// State management
import store from './store';

// Components
import Channel from './components/channel.vue';
import Home from './components/home/home.vue';
import About from './components/about/about.vue';
import Selection from './components/selection/selection.vue';
import Contact from './components/contact/contact.vue';
import Terms from './components/terms/terms.vue';

import Properties from './components/properties/properties.vue';
import Property from './components/property/property.vue';
import Checkout from './components/checkout/checkout.vue';

// Error pages
import ClientError from './components/page/error/client.vue';
import ServerError from './components/page/error/server.vue';

// Config
Vue.config.silent = config.silent;
Vue.config.devtools = config.devtools;
Vue.config.performance = config.performance;
Vue.config.productionTip = config.productionTip;

// Start plugins

// Router
Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/about', name: 'about', component: About },
        { path: '/selection', name: 'selection', component: Selection },
        { path: '/contact', name: 'contact', component: Contact },
        { path: '/terms', name: 'terms', component: Terms },
        { path: '/properties', name: 'properties', component: Properties },
        { path: '/property/:id', name: 'property', component: Property },
        { path: '/checkout/:id', name: 'checkout', component: Checkout },
        { path: '*', component: ClientError }
    ],
    scrollBehavior() {
        return { x: 0, y: 0 };
    }
});

Vue.use(VueMeta);
Vue.use(VueAnalytics, {
    id: 'UA-106149616-1',
    router,
    autoTracking: {
        page: config.track,
        pageviewTemplate(route) {
            return {
                page: route.path,
                title: document.title,
                location: window.location.href
            };
        },
        exception: true
    },
    debug: {
        enabled: false,
        trace: true,
        sendHitTask: true
    },
    ecommerce: {
        enabled: true,
        enhanced: true
    }
});
Vue.use(VueLazyload, {
    preLoad: 1.3,
    attempt: 1
});

// Register filters globally
Vue.filter('capitalize', capitalize);
Vue.filter('lowercase', lowercase);
Vue.filter('all', all);
Vue.filter('day', day);
Vue.filter('month', month);
Vue.filter('cctype', cctype);

// Register directives globally
Vue.directive('outside', outside);

// Create and mount root instance.
new Vue({
    router,
    store,
    render: h => h(Channel)
}).$mount('#channel');
