<template>
  <div class="choose__modules">
    <h1 class="main__caption">Wybierz moduły</h1>
    <div class="panel__holder">
      <div class="parent">
        <h1 class="undercaption">
          Platforma e-learningowa z katalogiem szkoleń gotowych
        </h1>
        <div class="title__row">
          <p class="description">
            W cenie m.in.: onboarding, kreator testów, kreator ankiet, kreator
            szkoleń
          </p>

          <div class="switcher">
            <Toggle @change="updateDataInAllModules" v-model="platform" />
          </div>
        </div>
        <div class="options__hold"><ul class="buttons"></ul></div>
      </div>
      <div class="parent">
        <h1 class="undercaption">Feedback360/Ocena okresowa</h1>
        <div class="title__row">
          <p class="description">
            W cenie m.in.: onboarding, kreator testów, kreator ankiet, kreator
            szkoleń
          </p>
          <div class="switcher">
            <Toggle @change="updateDataInAllModules" v-model="feedback" />
          </div>
        </div>
        <div class="options__hold"><ul class="buttons"></ul></div>
      </div>
      <div class="parent">
        <h1 class="undercaption">Zarządzanie przez cele</h1>
        <div class="title__row">
          <p class="description">
            W cenie m.in.: onboarding, kreator testów, kreator ankiet, kreator
            szkoleń
          </p>
          <div class="switcher">
            <Toggle @change="updateDataInAllModules" v-model="management" />
          </div>
        </div>
        <div class="options__hold"><ul class="buttons"></ul></div>
      </div>
    </div>
  </div>
</template>

<script>
import Toggle from '@vueform/toggle';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    return {
      updateDataInAllModules: computed(() => {
        const activePlatform = store.state.activeModules.platform;
        const activeFeedback = store.state.activeModules.feedback;
        const activeManagement = store.state.activeModules.management;
        const activeAll = false;

        if (activePlatform & activeFeedback & activeManagement) {
          store.commit('setAllModulesToActive', true);
          return activePlatform;
        } else {
          store.commit('setAllModulesToActive', false);
          return activePlatform;
        }
      }),
      platform: computed({
        get() {
          return store.state.activeModules.platform;
        },
        set(value) {
          store.commit('updatePlatformModule', value);
        },
      }),
      feedback: computed({
        get() {
          return store.state.activeModules.feedback;
        },
        set(value) {
          store.commit('updateFeedbackModule', value);
        },
      }),
      management: computed({
        get() {
          return store.state.activeModules.management;
        },
        set(value) {
          store.commit('updateManagementModule', value);
        },
      }),
    };
  },
  components: {
    Toggle,
  },
};
</script>

<style lang="scss">
@import './../../scss/main.scss';

.toggle-container {
  display: inline-block;
}
.toggle-container:focus {
  outline: none;
}
.toggle {
  align-items: center;
  border: var(--toggle-border, 0.125rem) solid;
  border-radius: 999px;
  box-sizing: content-box;
  cursor: pointer;
  display: flex;
  font-size: var(--toggle-font-size, 0.75rem);
  height: var(--toggle-height, 1.25rem);
  line-height: 1;
  position: relative;
  transition: all 0.3s;
  width: var(--toggle-width, 3rem);
}
.toggle-on {
  background: var(--toggle-bg-on, $accent);
  border-color: var(--toggle-border-on, $accent);
  color: var(--toggle-text-on, #fff);
  justify-content: flex-start;
}
.toggle-off {
  background: var(--toggle-bg-off, #e5e7eb);
  border-color: var(--toggle-border-off, #e5e7eb);
  color: var(--toggle-text-off, #374151);
  justify-content: flex-end;
}
.toggle-on-disabled {
  background: var(--toggle-bg-on-disabled, #d1d5db);
  border-color: var(--toggle-border-on-disabled, #d1d5db);
  color: var(--toggle-text-on-disabled, #9ca3af);
  cursor: not-allowed;
  justify-content: flex-start;
}
.toggle-off-disabled {
  background: var(--toggle-bg-off-disabled, #e5e7eb);
  border-color: var(--toggle-border-off-disabled, #e5e7eb);
  color: var(--toggle-text-off-disabled, #9ca3af);
  cursor: not-allowed;
  justify-content: flex-end;
}
.toggle-handle {
  background: var(--toggle-handle-enabled, #fff);
  border-radius: 50%;
  display: inline-block;
  height: var(--toggle-height, 1.25rem);
  position: absolute;
  top: 0;
  transition-duration: var(--toggle-duration, 0.15s);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  width: var(--toggle-height, 1.25rem);
}
.toggle-handle-on {
  left: 100%;
  transform: translateX(-100%);
}
.toggle-handle-off {
  left: 0;
}
.toggle-handle-on-disabled {
  background: var(--toggle-handle-disabled, #f3f4f6);
  left: 100%;
  transform: translateX(-100%);
}
.toggle-handle-off-disabled {
  background: var(--toggle-handle-disabled, #f3f4f6);
  left: 0;
}
.toggle-label {
  box-sizing: border-box;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  white-space: nowrap;
  width: calc(var(--toggle-width, 3.25rem) - var(--toggle-height, 1.25rem));
}

.choose__modules {
  width: 90%;
  padding: 0px 20px;
  @media (min-width: 1200px) {
    width: 530px;
    padding: 0px;
  }
}

.blocks__container {
  display: flex;
  justify-content: center;
  gap: 50px;
  vertical-align: middle;
  align-items: center;
}

.panel__holder {
  width: 100%;
  @media (min-width: 1200px) {
    width: 530px;
    margin-top: 10%;
    margin-bottom: 20%;
  }
}

.title__row {
  display: flex;
  justify-content: space-between;
  margin: 0px;
  align-items: center;
}

.description {
  font-family: 'Raleway', sans-serif;
  margin: 0;
  text-align: left;
  font-weight: 400;
  font-size: 15px;
}

.main__caption {
  font-family: 'Source Sans Pro';
  font-weight: 700;
  font-size: 30px;
  color: var(--c_text);
  text-align: left;
  margin: 0;
}

.position__left {
  display: flex;
  width: 42px;
  height: 21px;
  border: none;
  padding: 1px 0;
  border-radius: 12px;
  cursor: pointer;
  background-color: rgb(153, 153, 153);
  transition: all 250ms linear;
}

.position__right {
  display: flex;
  width: 42px;
  height: 21px;
  border: none;
  padding: 1px 0;
  border-radius: 12px;
  cursor: pointer;
  background-color: rgb(247, 169, 51);
  transition: all 250ms linear;
}

.round__switcher {
  display: flex;
  height: 18px;
  width: 18px;
  margin-top: 1px;
  margin-left: 2px;
  border-radius: 100%;
  background-color: #fff;
  transition: all 250ms linear;
}

.position__right .round__switcher {
  margin-left: calc(46px / 2);
}

.kore__round__switcher {
  display: flex;
  height: 16px;
  width: 16px;
  margin-top: 0.1rem;
  margin-left: 2px;
  border-radius: 100%;
  background-color: #fff;
  transition: all 250ms linear;
}

.position__right .kore__round__switcher {
  margin-left: calc(46px / 2);
}

.active__pick {
  font-family: 'Source Sans Pro';
  font-size: 13px;
  line-height: 13px;
  font-weight: 700;
  padding: 0.4rem 0.6rem;
  border-style: solid;
  border-width: thin;
  text-transform: uppercase;
  border-radius: 11px;
  border-color: #f59300;
  color: #fff;
  background-color: #f59300;
  cursor: pointer;
}

.disabled__pick {
  font-family: 'Source Sans Pro';
  font-size: 13px;
  line-height: 13px;
  font-weight: 700;
  padding: 0.4rem 0.6rem;
  text-transform: uppercase;
  border-radius: 11px;
  border-style: solid;
  border-width: thin;
  border-color: #f59300;
  background-color: var(--c_bg);
  color: #f59300;
  cursor: pointer;
  transition: 0.1s;
}

.disabled__pick:hover {
  background-color: #f59300;
  color: #fff;
}

.off__pick {
  font-family: 'Source Sans Pro';
  font-size: 13px;
  line-height: 13px;
  font-weight: 700;
  padding: 0.4rem 0.6rem;
  text-transform: uppercase;
  border-radius: 11px;
  border-style: solid;
  border-width: thin;
  border-color: rgb(231, 231, 231);
  background-color: rgb(231, 231, 231);
  color: rgb(139, 139, 139);
  cursor: default;
  transition: 0.1s;
}

.analiza {
  display: flex;
  flex-direction: column;
  align-items: left;
}

.undercaption {
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  text-align: left;
}

.button__holder {
  margin-top: 20px;
  align-items: left;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding-top: 15px;
  margin-bottom: 10px;
}

.korespondencja {
  margin-top: 50px;
}

.options__hold {
  display: flex;
  justify-content: center;
}

.option__position__left {
  display: flex;
  margin-top: 18px;
  width: 42px;
  height: 21px;
  border: none;
  padding: 1px 0;
  border-radius: 12px;
  cursor: pointer;
  background-color: rgb(153, 153, 153);
  transition: all 250ms linear;
}

.option__position__right {
  display: flex;
  margin-top: 18px;
  width: 42px;
  height: 21px;
  border: none;
  padding: 1px 0;
  border-radius: 12px;
  cursor: pointer;
  background-color: rgb(115, 164, 255);
  transition: all 250ms linear;
}

.option__round__switcher {
  display: flex;
  height: 16px;
  width: 16px;
  margin-top: 1px;
  margin-left: 2px;
  border-radius: 100%;
  background-color: #fff;
  transition: all 250ms linear;
}

.option__position__right .option__round__switcher {
  margin-left: calc(46px / 2);
}

.few__option__holder {
  margin-top: 8px;
  margin-left: 39px;
  margin-bottom: 26px;
  display: flex;
  gap: 20px;
  align-items: center;
}

.few__option__position__left {
  display: flex;
  width: 42px;
  height: 21px;
  border: none;
  padding: 1px 0;
  border-radius: 12px;
  cursor: pointer;
  background-color: rgb(153, 153, 153);
  transition: all 250ms linear;
}

.few__option__position__right {
  display: flex;
  width: 42px;
  height: 21px;
  border: none;
  padding: 1px 0;
  border-radius: 12px;
  cursor: pointer;
  background-color: rgb(180, 140, 255);
  transition: all 250ms linear;
}

.few__option__round__switcher {
  display: flex;
  height: 16px;
  width: 16px;
  margin-top: 1px;
  margin-left: 2px;
  border-radius: 100%;
  background-color: #fff;
  transition: all 250ms linear;
}

.few__option__position__right .few__option__round__switcher {
  margin-left: calc(46px / 2);
}

.few__option__holder {
  font-family: 'Source Sans Pro';
  font-size: 17px;
  align-items: center;
}

.pick__few__disabled {
  font-family: 'Source Sans Pro';
  font-size: 13px;
  line-height: 13px;
  font-weight: 700;
  padding: 0.4rem 0.6rem;
  text-transform: uppercase;
  border-radius: 11px;
  border-style: solid;
  border-width: thin;
  border-color: rgb(180, 140, 255);
  background-color: var(--c_bg);
  color: rgb(180, 140, 255);
  cursor: pointer;
  transition: 0.1s;
}

.pick__few__disabled:hover {
  background-color: rgb(180, 140, 255);
  color: #fff;
}

.pick__few__enabled {
  font-family: 'Source Sans Pro';
  font-size: 13px;
  line-height: 13px;
  font-weight: 700;
  padding: 0.4rem 0.6rem;
  text-transform: uppercase;
  border-radius: 11px;
  border-style: solid;
  border-width: thin;
  border-color: rgb(180, 140, 255);
  background-color: rgb(180, 140, 255);
  color: #fff;
  cursor: pointer;
  transition: 0.1s;
}
</style>
