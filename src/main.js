import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import './scss/main.scss';

// Create a new store instance.
const store = createStore({
  state() {
    return {
      cartMonthly: {
        platform: null,
        feedback: null,
        management: null,
        yearly: false,
        monthly: true,
      },
      cartYearly: {
        platform: null,
        feedback: null,
        management: null,
        yearly: true,
        monthly: false,
      },
      rangeSlider: {
        value: 55,
        min: 1,
        max: 1001,
        tooltips: false,
        lazy: false,
      },
      activeModules: {
        platform: true, //Platforma e-learningowa z katalogiem szkoleń gotowych
        feedback: false, //Feedback360/Ocena okresowa
        management: false, //Zarządzanie przez cele
      },
      platformPricingMonthly: {
        up30: 673,
        up31: 879,
        up51: 1067,
        up100: 1281,
        up200: 1427,
        up300: 1570,
        up450: 1864,
        up600: 2147,
        up800: 2516,
      },
      platformPricingYearly: {
        up30: 6864,
        up31: 8964,
        up51: 10886,
        up100: 13068,
        up200: 14558,
        up300: 16016,
        up450: 19008,
        up600: 21902,
        up800: 25661,
      },
      feedbackPricingMonthly: {
        up30: 1048,
        up31: 1048,
        up51: 1048,
        up100: 1578,
        up200: 1789,
        up300: 2001,
        up450: 2213,
        up600: 2531,
        up800: 2742,
      },
      feedbackPricingYearly: {
        up30: 10692,
        up31: 10692,
        up51: 10692,
        up100: 16092,
        up200: 18252,
        up300: 20412,
        up450: 22572,
        up600: 25812,
        up800: 27972,
      },
      managementPricingMonthly: {
        up30: 1048,
        up31: 1048,
        up51: 1048,
        up100: 1578,
        up200: 1789,
        up300: 2001,
        up450: 2213,
        up600: 2531,
        up800: 2742,
      },
      managementPricingYearly: {
        up30: 10692,
        up31: 10692,
        up51: 10692,
        up100: 16092,
        up200: 18252,
        up300: 20412,
        up450: 22572,
        up600: 25812,
        up800: 27972,
      },
      isSelectedMonthly: true,
      isSelectedYearly: false,
    };
  },
  mutations: {
    updateRangeSlider(state, payload) {
      state.rangeSlider.value = payload;
    },
    updatePlatformModule(state, payload) {
      state.activeModules.platform = payload;
    },
    updateFeedbackModule(state, payload) {
      state.activeModules.feedback = payload;
    },
    updateManagementModule(state, payload) {
      state.activeModules.management = payload;
    },
    updatePeriod(state, payload) {
      if (payload === 'isSelectedMonthly') {
        state.isSelectedMonthly = true;
        state.isSelectedYearly = false;
        state.cart.monthly = true;
      } else if (payload === 'isSelectedYearly') {
        state.isSelectedMonthly = false;
        state.isSelectedYearly = true;
        state.cart.monthly = false;
      }
    },
    // updatePlatformInCart(state, payload) {
    //   state.cart.platform = payload;
    // },
  },
});

createApp(App).use(store).mount('#app');
