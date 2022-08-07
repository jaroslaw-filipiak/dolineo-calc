import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import './scss/main.scss';

// Create a new store instance.
const store = createStore({
  state() {
    return {
      cart: {
        platform: null,
        feedback: null,
        management: null,
        monthly: null,
      },
      rangeSlider: {
        value: 55,
        min: 1,
        max: 1001,
        tooltips: false,
        lazy: false,
      },
      allModulesAreActive: false,
      activeModules: {
        platform: true, //Platforma e-learningowa z katalogiem szkoleń gotowych
        feedback: false, //Feedback360/Ocena okresowa
        management: false, //Zarządzanie przez cele
      },
      activeModulesLength: {
        value: 2,
      },
      platformPricing: {
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

      feedbackPricing: {
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

      managementPricing: {
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

      isSelectedMonthly: false,
      isSelectedYearly: true,
    };
  },
  mutations: {
    updateActiveModuleLength(state, payload) {
      state.activeModulesLength.value = payload;
    },
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
    updatePlatformPricing(state, payload) {
      state.cart.platform = payload;
    },
    updateFeedbackPricing(state, payload) {
      state.cart.feedback = payload;
    },
    updateManagementPricing(state, payload) {
      state.cart.management = payload;
    },
    setAllModulesToActive(state, payload) {
      state.allModulesAreActive = payload;
    },
  },
});

createApp(App).use(store).mount('#app');
