<template>
  <div class="rower">
    <div class="main__window">
      <div class="picked__modules">
        <h1 class="top__caption">Wybrane moduły</h1>
        <div class="analiza__item">
          <!-- Platforma z katalogiem szkoleń -->

          <div v-show="isActiveModulePlatform" class="item__holder__option">
            <div class="cart__header__div">
              <h1 class="cart__header">Platforma z katalogiem szkoleń</h1>
            </div>
            <div class="price__final__holder">
              <span> + </span
              ><span class="price__by__module">{{ PlatformPricing }}</span
              ><span>
                PLN
                <span class="first__month__indicator"> / 1 m-с </span>
              </span>
            </div>
          </div>
        </div>

        <!-- Feedback360/Ocena okresowa -->

        <div v-show="isActiveModuleFeedback" class="analiza__item">
          <div class="item__holder__option">
            <div class="cart__header__div">
              <h1 class="cart__header">Feedback360/Ocena okresowa</h1>
            </div>
            <div class="price__final__holder">
              <span> + </span
              ><span class="price__by__module">{{ FeedbackPricing }}</span
              ><span>
                PLN
                <span class="first__month__indicator"> / 1 m-с </span>
              </span>
            </div>
          </div>
        </div>

        <!-- Zarządzanie przez cele -->

        <div v-show="isActiveModuleManagement" class="analiza__item">
          <div class="item__holder__option">
            <div class="cart__header__div">
              <h1 class="cart__header">Zarządzanie przez cele</h1>
            </div>
            <div class="price__final__holder">
              <span> + </span
              ><span class="price__by__module">{{ ManagementPricing }}</span
              ><span>
                PLN <span class="first__month__indicator">/ 1 m-с</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <h1 class="lower__caption">Rozliczenie</h1>

      <div class="button__payment__block">
        <ul class="button__list">
          <li
            data-value="isSelectedYearly"
            @click="handleSelectedPeriod"
            :class="{ active__payment__button: isActivePeriodYearly }"
            class="payment__button"
          >
            Roczne (15% rabatu)
          </li>
          <li
            data-value="isSelectedMonthly"
            @click="handleSelectedPeriod"
            :class="{ active__payment__button: isActivePeriodMonthly }"
            class="payment__button"
          >
            Miesięcznie
          </li>
        </ul>
      </div>

      <div class="bottom_elements">
        <div class="price__holder">
          <!-- only platform -->
          <div
            v-if="
              isActiveModulePlatform &
              !isActiveModuleFeedback &
              !isActiveModuleManagement &
              !AllModulesActive
            "
            class="total__value"
          >
            {{ CartPlatform }} PLN
            <span class="second__month__indicator">/ 1 m-с</span>
          </div>

          <!--  only feedback-->

          <div
            v-if="
              isActiveModuleFeedback &
              !isActiveModulePlatform &
              !isActiveModuleManagement &
              !AllModulesActive
            "
            class="total__value"
          >
            {{ CartFeedback }} PLN
            <span class="second__month__indicator">/ 1 m-с</span>
          </div>

          <!-- only management -->

          <div
            v-if="
              isActiveModuleManagement &
              !isActiveModulePlatform &
              !isActiveModuleFeedback &
              !AllModulesActive
            "
            class="total__value"
          >
            {{ CartManagement }} PLN
            <span class="second__month__indicator">/ 1 m-с</span>
          </div>

          <!-- feedback + management -->

          <div
            v-if="
              isActiveModuleFeedback &
              isActiveModuleManagement &
              !AllModulesActive
            "
            class="total__value"
          >
            {{ Math.round(CartManagement * 1.8) }} PLN
            <span class="second__month__indicator">/ 1 m-с</span> <br />

            <p class="extra-second-option">
              (uwzględniono: zniżka 20% na drugi system)
            </p>
          </div>

          <!-- platform + ZPC /  only monthly-->

          <div
            v-if="
              isActiveModulePlatform &
              isActiveModuleManagement &
              isActivePeriodMonthly &
              !AllModulesActive
            "
            class="total__value"
          >
            {{ Math.ceil((CartPlatform + CartManagement) * 0.95) }} PLN
            <span class="second__month__indicator">/ 1 m-с</span> <br />

            <p class="extra-second-option">
              (uwzględniono: zniżka 5% przy płatności miesięcznej)
            </p>
          </div>

          <!-- platform + Feedback /  only monthly-->

          <div
            v-if="
              isActiveModulePlatform &
              isActiveModuleFeedback &
              isActivePeriodMonthly &
              !AllModulesActive
            "
            class="total__value"
          >
            {{ Math.ceil((CartPlatform + CartFeedback) * 0.95) }} PLN
            <span class="second__month__indicator">/ 1 m-с</span> <br />

            <p class="extra-second-option">
              (uwzględniono: zniżka 5% przy płatności miesięcznej)
            </p>
          </div>

          <!-- platform + ZPC /  only yearly-->

          <div
            v-if="
              isActiveModulePlatform &
              isActiveModuleManagement &
              isActivePeriodYearly &
              !AllModulesActive
            "
            class="total__value"
          >
            {{ Math.round((CartPlatform + CartManagement) * 0.95) }} PLN
            <span class="second__month__indicator">/ 1 m-с</span> <br />

            <p class="extra-second-option">(uwzględniono: zniżka 5% )</p>
          </div>

          <!-- platform + Feedback /  only yearly-->

          <div
            v-if="
              isActiveModulePlatform &
              isActiveModuleFeedback &
              isActivePeriodYearly &
              !AllModulesActive
            "
            class="total__value"
          >
            {{ Math.round((CartPlatform + CartFeedback) * 0.95) }} PLN
            <span class="second__month__indicator">/ 1 m-с</span> <br />

            <p class="extra-second-option">(uwzględniono: zniżka 5% )</p>
          </div>

          <!-- All IN -->

          <div
            v-if="
              isActiveModulePlatform &
              isActiveModuleFeedback &
              isActiveModuleManagement &
              AllModulesActive
            "
            class="total__value"
          >
            {{ Math.ceil(CartPlatform + CartFeedback * 1.8) }} PLN
            <span class="second__month__indicator">/ 1 m-с</span> <br />

            <p class="extra-second-option">
              (uwzględniono: zniżka 20% na Feedback )
            </p>
          </div>

          <!-- <p class="slider__indicators">31-50 pracowników</p>
        <p class="worker__price">17.58 PLN / 1 PRACOWNIK MIESIĘCZNIE</p> -->
        </div>
      </div>
      <div class="description__container">
        <span class="description__holder">Ceny netto bez VAT</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    return {
      handleSelectedPeriod: (e) => {
        const attr = e.target.getAttribute('data-value');
        store.commit('updatePeriod', attr);
      },

      CartPlatform: computed(() => {
        return store.state.cart.platform;
      }),

      CartFeedback: computed(() => {
        return store.state.cart.feedback;
      }),

      CartManagement: computed(() => {
        return store.state.cart.management;
      }),

      AllModulesActive: computed(() => {
        return store.state.allModulesAreActive;
      }),

      isActiveModulePlatform: computed(() => {
        return store.state.activeModules.platform;
      }),
      isActiveModuleFeedback: computed(() => {
        return store.state.activeModules.feedback;
      }),
      isActiveModuleManagement: computed(() => {
        return store.state.activeModules.management;
      }),
      isActivePeriodYearly: computed(() => {
        return store.state.isSelectedYearly;
      }),
      isActivePeriodMonthly: computed(() => {
        return store.state.isSelectedMonthly;
      }),
      rangeSliderValue: computed(() => {
        return store.state.rangeSlider.value;
      }),

      PlatformPricing: computed(() => {
        const value = store.state.rangeSlider.value;
        const isActivePeriodMonthly = store.state.isSelectedMonthly;
        const isActivePeriodYearly = store.state.isSelectedYearly;

        // wow spaghetti code ! xd

        if ((value <= 30) & isActivePeriodMonthly) {
          store.commit(
            'updatePlatformPricing',
            store.state.platformPricing.up30
          );

          return store.state.platformPricing.up30;
        } else if ((value > 30) & (value <= 50) & isActivePeriodMonthly) {
          store.commit(
            'updatePlatformPricing',
            store.state.platformPricing.up31
          );
          return store.state.platformPricing.up31;
        } else if ((value > 50) & (value <= 100) & isActivePeriodMonthly) {
          store.commit(
            'updatePlatformPricing',
            store.state.platformPricing.up51
          );
          return store.state.platformPricing.up51;
        } else if ((value > 100) & (value <= 200) & isActivePeriodMonthly) {
          store.commit(
            'updatePlatformPricing',
            store.state.platformPricing.up100
          );
          return store.state.platformPricing.up100;
        } else if ((value > 200) & (value <= 300) & isActivePeriodMonthly) {
          store.commit(
            'updatePlatformPricing',
            store.state.platformPricing.up200
          );
          return store.state.platformPricing.up200;
        } else if ((value > 300) & (value <= 450) & isActivePeriodMonthly) {
          store.commit(
            'updatePlatformPricing',
            store.state.platformPricing.up300
          );
          return store.state.platformPricing.up300;
        } else if ((value > 450) & (value <= 600) & isActivePeriodMonthly) {
          store.commit(
            'updatePlatformPricing',
            store.state.platformPricing.up450
          );
          return store.state.platformPricing.up450;
        } else if ((value > 600) & (value <= 800) & isActivePeriodMonthly) {
          store.commit(
            'updatePlatformPricing',
            store.state.platformPricing.up600
          );
          return store.state.platformPricing.up600;
        } else if ((value > 800) & (value <= 1000) & isActivePeriodMonthly) {
          store.commit(
            'updatePlatformPricing',
            store.state.platformPricing.up800
          );
          return store.state.platformPricing.up800;
        } else if ((value <= 30) & isActivePeriodYearly) {
          store.commit(
            'updatePlatformPricing',
            Math.round(
              store.state.platformPricing.up30 -
                store.state.platformPricing.up30 * 0.15
            )
          );
          return Math.round(
            store.state.platformPricing.up30 -
              store.state.platformPricing.up30 * 0.15
          );
        } else if ((value > 30) & (value <= 50) & isActivePeriodYearly) {
          store.commit(
            'updatePlatformPricing',
            Math.round(
              store.state.platformPricing.up31 -
                store.state.platformPricing.up31 * 0.15
            )
          );
          return Math.round(
            store.state.platformPricing.up31 -
              store.state.platformPricing.up31 * 0.15
          );
        } else if ((value > 50) & (value <= 100) & isActivePeriodYearly) {
          store.commit(
            'updatePlatformPricing',
            Math.round(
              store.state.platformPricing.up51 -
                store.state.platformPricing.up51 * 0.15
            )
          );
          return Math.round(
            store.state.platformPricing.up51 -
              store.state.platformPricing.up51 * 0.15
          );
        } else if ((value > 100) & (value <= 200) & isActivePeriodYearly) {
          store.commit(
            'updatePlatformPricing',
            Math.round(
              store.state.platformPricing.up100 -
                store.state.platformPricing.up100 * 0.15
            )
          );
          return Math.round(
            store.state.platformPricing.up100 -
              store.state.platformPricing.up100 * 0.15
          );
        } else if ((value > 200) & (value <= 300) & isActivePeriodYearly) {
          store.commit(
            'updatePlatformPricing',
            Math.round(
              store.state.platformPricing.up200 -
                store.state.platformPricing.up200 * 0.15
            )
          );
          return Math.round(
            store.state.platformPricing.up200 -
              store.state.platformPricing.up200 * 0.15
          );
        } else if ((value > 300) & (value <= 450) & isActivePeriodYearly) {
          store.commit(
            'updatePlatformPricing',
            Math.round(
              store.state.platformPricing.up300 -
                store.state.platformPricing.up300 * 0.15
            )
          );
          return Math.round(
            store.state.platformPricing.up300 -
              store.state.platformPricing.up300 * 0.15
          );
        } else if ((value > 450) & (value <= 600) & isActivePeriodYearly) {
          store.commit(
            'updatePlatformPricing',
            Math.round(
              store.state.platformPricing.up450 -
                store.state.platformPricing.up450 * 0.15
            )
          );
          return Math.round(
            store.state.platformPricing.up450 -
              store.state.platformPricing.up450 * 0.15
          );
        } else if ((value > 600) & (value <= 800) & isActivePeriodYearly) {
          store.commit(
            'updatePlatformPricing',
            Math.round(
              store.state.platformPricing.up600 -
                store.state.platformPricing.up600 * 0.15
            )
          );
          return Math.round(
            store.state.platformPricing.up600 -
              store.state.platformPricing.up600 * 0.15
          );
        } else if ((value > 800) & (value <= 1000) & isActivePeriodYearly) {
          store.commit(
            'updatePlatformPricing',
            Math.floor(
              store.state.platformPricing.up800 -
                store.state.platformPricing.up800 * 0.15
            )
          );
          return Math.floor(
            store.state.platformPricing.up800 -
              store.state.platformPricing.up800 * 0.15
          );
        } else return '';
      }),

      // =============

      FeedbackPricing: computed(() => {
        const value = store.state.rangeSlider.value;
        const isActivePeriodMonthly = store.state.isSelectedMonthly;
        const isActivePeriodYearly = store.state.isSelectedYearly;

        // wow spaghetti code ! xd

        if ((value <= 30) & isActivePeriodMonthly) {
          store.commit(
            'updateFeedbackPricing',
            store.state.feedbackPricing.up30
          );

          return store.state.feedbackPricing.up30;
        } else if ((value > 30) & (value <= 50) & isActivePeriodMonthly) {
          store.commit(
            'updateFeedbackPricing',
            store.state.feedbackPricing.up31
          );
          return store.state.feedbackPricing.up31;
        } else if ((value > 50) & (value <= 100) & isActivePeriodMonthly) {
          store.commit(
            'updateFeedbackPricing',
            store.state.feedbackPricing.up51
          );
          return store.state.feedbackPricing.up51;
        } else if ((value > 100) & (value <= 200) & isActivePeriodMonthly) {
          store.commit(
            'updateFeedbackPricing',
            store.state.feedbackPricing.up100
          );
          return store.state.feedbackPricing.up100;
        } else if ((value > 200) & (value <= 300) & isActivePeriodMonthly) {
          store.commit(
            'updateFeedbackPricing',
            store.state.feedbackPricing.up200
          );
          return store.state.feedbackPricing.up200;
        } else if ((value > 300) & (value <= 450) & isActivePeriodMonthly) {
          store.commit(
            'updateFeedbackPricing',
            store.state.feedbackPricing.up300
          );
          return store.state.feedbackPricing.up300;
        } else if ((value > 450) & (value <= 600) & isActivePeriodMonthly) {
          store.commit(
            'updateFeedbackPricing',
            store.state.feedbackPricing.up450
          );
          return store.state.feedbackPricing.up450;
        } else if ((value > 600) & (value <= 800) & isActivePeriodMonthly) {
          store.commit(
            'updateFeedbackPricing',
            store.state.feedbackPricing.up600
          );
          return store.state.feedbackPricing.up600;
        } else if ((value > 800) & (value <= 1000) & isActivePeriodMonthly) {
          store.commit(
            'updateFeedbackPricing',
            store.state.feedbackPricing.up800
          );
          return store.state.feedbackPricing.up800;
        } else if ((value <= 30) & isActivePeriodYearly) {
          store.commit(
            'updateFeedbackPricing',
            Math.round(
              store.state.feedbackPricing.up30 -
                store.state.feedbackPricing.up30 * 0.15
            )
          );
          return Math.round(
            store.state.feedbackPricing.up30 -
              store.state.feedbackPricing.up30 * 0.15
          );
        } else if ((value > 30) & (value <= 50) & isActivePeriodYearly) {
          store.commit(
            'updateFeedbackPricing',
            Math.round(
              store.state.feedbackPricing.up31 -
                store.state.feedbackPricing.up31 * 0.15
            )
          );
          return Math.round(
            store.state.feedbackPricing.up31 -
              store.state.feedbackPricing.up31 * 0.15
          );
        } else if ((value > 50) & (value <= 100) & isActivePeriodYearly) {
          store.commit(
            'updateFeedbackPricing',
            Math.round(
              store.state.feedbackPricing.up51 -
                store.state.feedbackPricing.up51 * 0.15
            )
          );
          return Math.round(
            store.state.feedbackPricing.up51 -
              store.state.feedbackPricing.up51 * 0.15
          );
        } else if ((value > 100) & (value <= 200) & isActivePeriodYearly) {
          store.commit(
            'updateFeedbackPricing',
            Math.round(
              store.state.feedbackPricing.up100 -
                store.state.feedbackPricing.up100 * 0.15
            )
          );
          return Math.round(
            store.state.feedbackPricing.up100 -
              store.state.feedbackPricing.up100 * 0.15
          );
        } else if ((value > 200) & (value <= 300) & isActivePeriodYearly) {
          store.commit(
            'updateFeedbackPricing',
            Math.round(
              store.state.feedbackPricing.up200 -
                store.state.feedbackPricing.up200 * 0.15
            )
          );
          return Math.round(
            store.state.feedbackPricing.up200 -
              store.state.feedbackPricing.up200 * 0.15
          );
        } else if ((value > 300) & (value <= 450) & isActivePeriodYearly) {
          store.commit(
            'updateFeedbackPricing',
            Math.round(
              store.state.feedbackPricing.up300 -
                store.state.feedbackPricing.up300 * 0.15
            )
          );
          return Math.round(
            store.state.feedbackPricing.up300 -
              store.state.feedbackPricing.up300 * 0.15
          );
        } else if ((value > 450) & (value <= 600) & isActivePeriodYearly) {
          store.commit(
            'updateFeedbackPricing',
            Math.round(
              store.state.feedbackPricing.up450 -
                store.state.feedbackPricing.up450 * 0.15
            )
          );
          return Math.round(
            store.state.feedbackPricing.up450 -
              store.state.feedbackPricing.up450 * 0.15
          );
        } else if ((value > 600) & (value <= 800) & isActivePeriodYearly) {
          store.commit(
            'updateFeedbackPricing',
            Math.round(
              store.state.feedbackPricing.up600 -
                store.state.feedbackPricing.up600 * 0.15
            )
          );
          return Math.round(
            store.state.feedbackPricing.up600 -
              store.state.feedbackPricing.up600 * 0.15
          );
        } else if ((value > 800) & (value <= 1000) & isActivePeriodYearly) {
          store.commit(
            'updateFeedbackPricing',
            Math.floor(
              store.state.feedbackPricing.up800 -
                store.state.feedbackPricing.up800 * 0.15
            )
          );
          return Math.floor(
            store.state.feedbackPricing.up800 -
              store.state.feedbackPricing.up800 * 0.15
          );
        } else return '';
      }),

      // =============

      ManagementPricing: computed(() => {
        const value = store.state.rangeSlider.value;
        const isActivePeriodMonthly = store.state.isSelectedMonthly;
        const isActivePeriodYearly = store.state.isSelectedYearly;

        // wow spaghetti code ! xd

        if ((value <= 30) & isActivePeriodMonthly) {
          store.commit(
            'updateManagementPricing',
            store.state.managementPricing.up30
          );

          return store.state.managementPricing.up30;
        } else if ((value > 30) & (value <= 50) & isActivePeriodMonthly) {
          store.commit(
            'updateManagementPricing',
            store.state.managementPricing.up31
          );
          return store.state.managementPricing.up31;
        } else if ((value > 50) & (value <= 100) & isActivePeriodMonthly) {
          store.commit(
            'updateManagementPricing',
            store.state.managementPricing.up51
          );
          return store.state.managementPricing.up51;
        } else if ((value > 100) & (value <= 200) & isActivePeriodMonthly) {
          store.commit(
            'updateManagementPricing',
            store.state.managementPricing.up100
          );
          return store.state.managementPricing.up100;
        } else if ((value > 200) & (value <= 300) & isActivePeriodMonthly) {
          store.commit(
            'updateManagementPricing',
            store.state.managementPricing.up200
          );
          return store.state.managementPricing.up200;
        } else if ((value > 300) & (value <= 450) & isActivePeriodMonthly) {
          store.commit(
            'updateManagementPricing',
            store.state.managementPricing.up300
          );
          return store.state.managementPricing.up300;
        } else if ((value > 450) & (value <= 600) & isActivePeriodMonthly) {
          store.commit(
            'updateManagementPricing',
            store.state.managementPricing.up450
          );
          return store.state.managementPricing.up450;
        } else if ((value > 600) & (value <= 800) & isActivePeriodMonthly) {
          store.commit(
            'updateManagementPricing',
            store.state.managementPricing.up600
          );
          return store.state.managementPricing.up600;
        } else if ((value > 800) & (value <= 1000) & isActivePeriodMonthly) {
          store.commit(
            'updateManagementPricing',
            store.state.managementPricing.up800
          );
          return store.state.managementPricing.up800;
        } else if ((value <= 30) & isActivePeriodYearly) {
          store.commit(
            'updateManagementPricing',
            Math.round(
              store.state.managementPricing.up30 -
                store.state.managementPricing.up30 * 0.15
            )
          );
          return Math.round(
            store.state.managementPricing.up30 -
              store.state.managementPricing.up30 * 0.15
          );
        } else if ((value > 30) & (value <= 50) & isActivePeriodYearly) {
          store.commit(
            'updateManagementPricing',
            Math.round(
              store.state.managementPricing.up31 -
                store.state.managementPricing.up31 * 0.15
            )
          );
          return Math.round(
            store.state.managementPricing.up31 -
              store.state.managementPricing.up31 * 0.15
          );
        } else if ((value > 50) & (value <= 100) & isActivePeriodYearly) {
          store.commit(
            'updateManagementPricing',
            Math.round(
              store.state.managementPricing.up51 -
                store.state.managementPricing.up51 * 0.15
            )
          );
          return Math.round(
            store.state.managementPricing.up51 -
              store.state.managementPricing.up51 * 0.15
          );
        } else if ((value > 100) & (value <= 200) & isActivePeriodYearly) {
          store.commit(
            'updateManagementPricing',
            Math.round(
              store.state.managementPricing.up100 -
                store.state.managementPricing.up100 * 0.15
            )
          );
          return Math.round(
            store.state.managementPricing.up100 -
              store.state.managementPricing.up100 * 0.15
          );
        } else if ((value > 200) & (value <= 300) & isActivePeriodYearly) {
          store.commit(
            'updateManagementPricing',
            Math.round(
              store.state.managementPricing.up200 -
                store.state.managementPricing.up200 * 0.15
            )
          );
          return Math.round(
            store.state.managementPricing.up200 -
              store.state.managementPricing.up200 * 0.15
          );
        } else if ((value > 300) & (value <= 450) & isActivePeriodYearly) {
          store.commit(
            'updateManagementPricing',
            Math.round(
              store.state.managementPricing.up300 -
                store.state.managementPricing.up300 * 0.15
            )
          );
          return Math.round(
            store.state.managementPricing.up300 -
              store.state.managementPricing.up300 * 0.15
          );
        } else if ((value > 450) & (value <= 600) & isActivePeriodYearly) {
          store.commit(
            'updateManagementPricing',
            Math.round(
              store.state.managementPricing.up450 -
                store.state.managementPricing.up450 * 0.15
            )
          );
          return Math.round(
            store.state.managementPricing.up450 -
              store.state.managementPricing.up450 * 0.15
          );
        } else if ((value > 600) & (value <= 800) & isActivePeriodYearly) {
          store.commit(
            'updateManagementPricing',
            Math.round(
              store.state.managementPricing.up600 -
                store.state.managementPricing.up600 * 0.15
            )
          );
          return Math.round(
            store.state.managementPricing.up600 -
              store.state.managementPricing.up600 * 0.15
          );
        } else if ((value > 800) & (value <= 1000) & isActivePeriodYearly) {
          store.commit(
            'updateManagementPricing',
            Math.floor(
              store.state.managementPricing.up800 -
                store.state.managementPricing.up800 * 0.15
            )
          );
          return Math.floor(
            store.state.managementPricing.up800 -
              store.state.managementPricing.up800 * 0.15
          );
        } else return '';
      }),

      // ==============
    };
  },
};
</script>

<style lang="scss">
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.morethanneed__window {
  margin-top: 30px;
  max-width: 480px;
  height: 100%;
  border-radius: 24px;
  background-color: var(--c_bg);

  @media (min-width: 1200px) {
    box-shadow: 4px 4px 32px -6px #ffffff, 6px 6px 48px -6px #dfdede;
  }
}

.morethanneed__caption {
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  text-align: left;
  padding-left: 30px;
  padding-right: 30px;
  text-align: center;
  padding-top: 20%;
  padding-bottom: 20%;
}

.main__window {
  width: 100%;
  min-width: 355px;
  border-radius: 24px;
  background-color: var(--c_bg);

  @media (min-width: 1200px) {
    box-shadow: 4px 4px 32px -6px #ffffff, 6px 6px 48px -6px #dfdede;
    margin-top: 30px;
    width: 630px;
  }
}

.top__caption {
  padding-top: 21px;
  font-family: 'Source Sans Pro';
  color: rgb(24, 24, 24);
  font-weight: 700;
  font-size: 30px;
}

.lower__caption {
  font-family: 'Source Sans Pro';
  color: rgb(24, 24, 24);
  font-weight: 700;
  font-size: 30px;
  text-align: left;

  @media (min-width: 1200px) {
    text-align: center;
  }
}

.module__attention {
  text-align: center;
  font-weight: 700;
  color: #fff;
  margin: auto;
  border-radius: 1rem;
  font-size: 1.35rem;
  width: 466px;
  height: 93px;
  background-color: rgb(124, 115, 255);
}

.unpicked__modules {
  padding-top: 17px;
}

.cart__header__div {
  min-width: 166px;
  width: 65%;
}

.cart__header {
  font-family: 'Raleway', sans-serif;
  text-align: left;
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-size: 16px;
}

.cart__header__zniz {
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-size: 1rem;
}

.picked__modules {
  max-height: 100%;
  width: 100%;
  gap: 0px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1200px) {
    align-items: flex-start;
  }
}

.analiza__item {
  font-family: 'Source Sans Pro';
  width: 100%;
  margin-top: 15px;
}

.korespondencja__item {
  font-family: 'Source Sans Pro';
}
.item__holder__option {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100%;
}

.button__payment__block {
  display: flex;
  gap: 10px;
  min-width: 100%;
  margin: auto;
  padding-bottom: 16px;
  border-bottom: 1px solid #cfd6dd;
}

.button__list {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: auto;
  padding: 0;
  margin-top: 30px;
  width: 100%;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.active__payment__button {
  font-family: 'Source Sans Pro';
  width: 100%;
  height: 46px;
  line-height: 47px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  border-style: solid;
  border-width: thin;
  border-radius: 11px;
  background-color: #f59300 !important;
  color: rgb(255, 255, 255) !important;
  cursor: pointer;
}

.payment__button {
  font-family: 'Source Sans Pro';
  font-size: 13px;
  width: 100%;
  height: 45px;
  line-height: 45px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 11px;
  border-style: solid;
  border-width: thin;
  border-color: #f59300;
  background-color: var(--c_bg);
  color: #f59300;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background-color: #f59300;
    color: #fff;
  }
}

.total__value {
  font-family: 'Source Sans Pro';
  font-weight: 700;
  font-size: 56px;
  text-align: center;
  color: #f59300;
  margin: 0;
}

.slider__indicators {
  font-family: 'Raleway', sans-serif;
  margin-top: 0px;
  margin-bottom: 1rem;
  font-weight: 700;
  font-size: 17px;
  line-height: 1;
  text-align: center;
  color: #1f273d;
  padding-top: 10px;
}

.worker__price {
  margin: auto;
  font-family: 'Raleway', sans-serif;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 240px;
  padding: 0.4em 1em;
  background-color: #9fdad0;
  border: 2px solid #3fb5a1;
  border-radius: 12px;
  border-radius: 12px;
  color: rgb(20, 20, 20);
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 20px;
}

.payment__container {
  border-bottom: 1px solid #cfd6dd;
}

.description__container {
  text-align: right;
}
.description__holder {
  font-family: 'Source Sans Pro';
  margin-bottom: 2rem;
  font-weight: 400;
  font-size: 12px;
  line-height: 2;
  text-align: right;
  color: #1f273d;
}

.admin__button {
  margin: auto;
  margin-top: 35px;
  margin-bottom: 35px;
  font-family: 'Source Sans Pro';
  font-weight: 700;
  font-size: 17px;
  line-height: 19px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;
  width: 200px;
  height: 20px;
  background-color: #f59300;
  box-shadow: #f59300;
  border-radius: 12px;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid #f59300;
}

.admin__button:hover {
  background: #f59300;
}

.price__holder {
  display: flex;
  justify-content: center;
}
.price__final__holder {
  min-width: 80px;
  width: 40%;
  text-align: right;
  font-size: 16px;
}
.second__month__indicator {
  font-family: 'Source Sans Pro';
  font-weight: 700;
  font-size: 18px;
  line-height: 1.2;
  color: #1f273d;
  padding-top: 38px;
}

.first__month__indicator {
  font-family: 'Source Sans Pro';
  color: #1f273d;
}

.rower {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  @media (max-width: 1200px) {
    width: 90%;
    padding: 0px 20px;
  }
}

.few__option__span {
  font-family: 'Source Sans Pro';
  font-size: 1rem;
}

.few_options__holder {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

@media screen and(min-width:868px) {
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;400;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap');

  .main__window {
    // width: 630px;
    height: 100%;
    border-radius: 24px;
    background-color: var(--c_bg);

    box-sizing: border-box;
    @media (min-width: 1200px) {
      box-shadow: 4px 4px 32px -6px #ffffff, 6px 6px 48px -6px #dfdede;
      max-width: 630px;
      padding: 30px;
    }
  }

  .morethanneed__window {
    max-width: 570px;
    height: 100%;
    border-radius: 24px;
    background-color: var(--c_bg);

    @media (min-width: 1200px) {
      box-shadow: 4px 4px 32px -6px #ffffff, 6px 6px 48px -6px #dfdede;
    }
  }

  .morethanneed__caption {
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    text-align: left;
    font-weight: 300;
    padding-left: 30px;
    padding-right: 30px;
    text-align: center;
    padding-top: 20%;
  }

  .decr_column {
    padding-left: 10px;
  }

  .top__caption {
    padding-top: 0px;
    margin-top: 0px;
    font-family: 'Source Sans Pro';
    color: rgb(24, 24, 24);
    font-weight: 700;
    font-size: 30px;
    margin-bottom: 0px;
  }
  .test {
    margin-top: 30px;
  }

  .lower__caption {
    font-family: 'Source Sans Pro';
    margin-bottom: 10px;
    color: rgb(24, 24, 24);
    font-weight: 700;
    font-size: 30px;
  }

  .module__attention {
    text-align: center;
    font-weight: 700;
    color: #fff;
    margin: auto;
    border-radius: 1rem;
    font-size: 1.35rem;
    width: 466px;
    height: 93px;
    background-color: rgb(124, 115, 255);
  }

  .unpicked__modules {
    padding-top: 17px;
  }

  .cart__header__div {
    min-width: 166px;
    width: 60%;
  }
  .cart__header__holder {
    width: 60%;
  }
  .cart__header {
    font-family: 'Raleway', sans-serif;
    text-align: left;

    margin: 0;
    padding: 0;
    font-weight: 400;
    font-size: 16px;
  }

  .picked__modules {
    max-height: 100%;
    max-width: 100%;
    margin-bottom: 30px;
    gap: 0px;
  }

  .analiza__item {
    font-family: 'Source Sans Pro';
  }

  .korespondencja__item {
    font-family: 'Source Sans Pro';
  }
  .item__holder__option {
    margin-top: 15px;
    display: flex;
    width: 100%;
    align-items: center;

    @media (max-width: 1200px) {
      justify-content: flex-start;
    }
  }

  .button__payment__block {
    padding-bottom: 16px;
    border-bottom: 1px solid #cfd6dd;
  }

  .button__list {
    list-style: none;
    display: flex;
    gap: 10px;
    margin: 0;
    padding: 0;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .active__payment__button {
    font-family: 'Source Sans Pro';
    font-size: 17px;
    line-height: 45px;
    font-weight: normal;
    font-style: normal;
    width: 100%;
    height: 45px;
    text-transform: uppercase;
    border-style: solid;
    border-radius: 8px;
    border-width: 1px;
    background-color: #f59300;
    color: rgb(255, 255, 255);
    cursor: pointer;
  }

  .payment__button {
    font-family: 'Source Sans Pro';
    font-size: 17px;
    line-height: 45px;
    width: 100%;
    height: 45px;
    font-weight: normal;
    font-style: normal;
    text-transform: uppercase;
    border-radius: 8px;
    border-style: solid;
    border-width: 1px;
    border-color: #f59300;
    background-color: var(--c_bg);
    color: #f59300;
    cursor: pointer;
    transition: 0.1s;
    &:hover {
      background-color: #f59300;
      color: #fff;
    }
  }

  .total__value {
    font-family: 'Source Sans Pro';
    font-weight: 700;
    font-size: 56px;
    text-align: center;
    color: #f59300;
    margin: 0;
  }

  .slider__indicators {
    font-family: 'Raleway', sans-serif;
    margin-top: 0px;
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: 18px;
    line-height: 1;
    text-align: center;
    color: #1f273d;
    padding-top: 10px;
  }

  .worker__price {
    margin: auto;
    font-family: 'Raleway', sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 240px;
    padding: 0.4em 1em;
    background-color: #9fdad0;
    border: 2px solid #3fb5a1;
    border-radius: 12px;
    color: rgb(20, 20, 20);
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 20px;
  }

  .payment__container {
    border-bottom: 1px solid #cfd6dd;
  }

  .description__container {
    text-align: right;
  }
  .description__holder {
    font-family: 'Source Sans Pro';
    margin-bottom: 2rem;
    font-weight: 400;
    font-size: 12px;
    line-height: 2;
    text-align: right;
    color: #1f273d;
  }

  .admin__button {
    margin: auto;
    margin-top: 35px;
    margin-bottom: 35px;
    font-family: 'Source Sans Pro';
    font-weight: 700;
    font-size: 17px;
    line-height: 19px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 15px;
    width: 278px;
    height: 24px;
    background-color: #f59300;
    box-shadow: #f59300;
    border-radius: 12px;
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid #f59300;
    text-transform: uppercase;
    font-family: 'Source Sans Pro';
    font-weight: 400;
    padding: 12px;
    border-radius: 8px;
    border-width: 1px;
    border-color: #f59300;
    border-style: solid;
    color: white;
  }

  .admin__button:hover {
    background: #f59300;
  }

  .price__holder {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  .price__final__holder {
    min-width: 80px;
    width: 35%;
    text-align: right;
    font-size: 16px;
  }
  .second__month__indicator {
    font-family: 'Source Sans Pro';
    font-weight: 700;
    font-size: 18px;
    line-height: 1.2;
    color: #1f273d;
    padding-top: 38px;
  }

  .first__month__indicator {
    font-family: 'Source Sans Pro';
    color: #1f273d;
  }

  .rower {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }

  .few__option__span {
    font-family: 'Source Sans Pro';
    font-size: 1rem;
  }

  .few_options__holder {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }
}

.few__options__holder {
  text-align: left;
}

.cart__header__zniz {
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-size: 15px;
}

.extra-second-option {
  color: #4b4647;
  font-size: 15px;
  font-weight: 400;
  text-align: center;
}
</style>
