<template>
  <div class="dolineo-range-slider">
    <div class="dolineo-range-slider--title">Cennik abonamentów rocznych</div>
    <div class="slider-wrapper">
      <div class="slider--min">1</div>

      <div>
        <Slider
          v-model="value"
          :min="min"
          :max="max"
          :lazy="lazy"
          :tooltips="tooltips"
        />
      </div>
      <div class="slider--max">1 000</div>
    </div>

    <div
      id="dolineo-range-slider--subtitle__wp-fix"
      class="dolineo-range-slider--subtitle"
    >
      Liczba pracowników:
      <strong
        ><span>{{ employeValue }}</span></strong
      >
      osób
    </div>
  </div>
</template>

<script>
import Slider from '@vueform/slider';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    return {
      value: computed({
        get() {
          return store.state.rangeSlider.value;
        },
        set(value) {
          store.commit('updateRangeSlider', value);
        },
      }),
      min: computed(() => store.state.rangeSlider.min),
      max: computed(() => store.state.rangeSlider.max),
      tooltips: computed(() => store.state.rangeSlider.tooltips),
      lazy: computed(() => store.state.rangeSlider.lazy),
      employeValue: computed(() => {
        if (store.state.rangeSlider.value <= 30) return '1-30';
        else if (
          (store.state.rangeSlider.value > 30) &
          (store.state.rangeSlider.value <= 50)
        ) {
          return '31 - 50';
        } else if (
          (store.state.rangeSlider.value > 50) &
          (store.state.rangeSlider.value <= 100)
        ) {
          return '51 - 100';
        } else if (
          (store.state.rangeSlider.value > 100) &
          (store.state.rangeSlider.value <= 200)
        ) {
          return '101 - 200';
        } else if (
          (store.state.rangeSlider.value > 200) &
          (store.state.rangeSlider.value <= 300)
        ) {
          return '201 - 300';
        } else if (
          (store.state.rangeSlider.value > 300) &
          (store.state.rangeSlider.value <= 450)
        ) {
          return '301 - 450';
        } else if (
          (store.state.rangeSlider.value > 450) &
          (store.state.rangeSlider.value <= 600)
        ) {
          return '451 - 600';
        } else if (
          (store.state.rangeSlider.value > 600) &
          (store.state.rangeSlider.value <= 800)
        ) {
          return '601 - 800';
        } else if (
          (store.state.rangeSlider.value > 800) &
          (store.state.rangeSlider.value <= 999)
        ) {
          return '801 - 1 000';
        } else if (store.state.rangeSlider.value == 1000) {
          return '1 000';
        } else return '1 000+';
      }),
    };
  },

  components: {
    Slider,
  },
};
</script>

<style lang="scss">
@import './../../scss/main.scss';
@import './../../../node_modules/@vueform/slider/themes/default.css';

.slider {
  &--min,
  &--max {
    // font-size: 22px;
    // color: #7a7a7a;

    color: #111111;
    font-family: Raleway, sans-serif;
    font-size: 21px;
    font-weight: 400;

    @media (min-width: 768px) {
      font-size: 26px;
    }

    // color: #f59b00;
    // font-family: Raleway, sans-serif;
    // font-size: 33px;
    // font-weight: 700;
  }
  &--min {
    padding-right: 50px;
    margin-top: 20px;
  }

  &--max {
    padding-left: 50px;
    margin-top: 20px;
  }
  &-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-target {
    width: 180px;
    height: 10px !important;
    margin: 70px 0px 50px 0px;

    @media (min-width: 768px) {
      width: 560px;
    }

    @media (min-width: 1200px) {
      width: 850px;
    }
  }

  &-connect {
    background-color: #ebebeb !important;
  }

  &-connects {
    background-color: #ebebeb;
  }

  &-handle {
    width: 32px !important;
    height: 32px !important;
    top: -12px !important;
    box-shadow: none !important;
  }

  &-touch-area {
    background-color: $accent;
    border-radius: 50px;
  }
}

.dolineo-range-slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 90px;
  @media (max-width: 1200px) {
    margin-bottom: 50px;
  }
  &--title {
    font-size: 34px;
    font-weight: 700;
    @media (max-width: 1200px) {
      text-align: center;
      margin-bottom: 0px;
    }
  }

  &--subtitle {
    color: #111111;
    font-family: Raleway, sans-serif;
    font-size: 26px;
    font-weight: 400;
    @media (max-width: 1200px) {
      text-align: center;
      font-size: 21px;
      width: 90%;
    }

    span {
      color: $accent;
    }
  }
}
</style>
