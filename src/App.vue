<template>
  <div id="dolineo-cennik-wrapper">
    <RangeSlider></RangeSlider>
    <div class="dolineo-container">
      <LeftSide></LeftSide>
      <RightSide></RightSide>
    </div>
  </div>
</template>

<script>
import RangeSlider from './components/cennik/RangeSlider.vue';
import LeftSide from './components/cennik/LeftSide.vue';
import RightSide from './components/cennik/RightSide.vue';

export default {
  name: 'App',
  components: {
    RangeSlider,
    LeftSide,
    RightSide,
  },
};
</script>

<style lang="scss">
.dolineo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 0px;
  }
}
</style>
