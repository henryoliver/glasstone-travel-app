// This file keeps tests from calling Vue.use(Vuex) more than once

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default Vuex;
