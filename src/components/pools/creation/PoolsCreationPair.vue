<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import PoolsCreationPairFilled from '@/components/pools/creation/PoolsCreationPairFilled.vue';
import { usePoolPairStore } from '@/stores/PoolPairStore';
import { storeToRefs } from 'pinia';
const pairStore = usePoolPairStore();

const {
  pairsFirst,
  pairsSecond,
  isSelectingFirst,
  isSelectingSecond,
  isFilledPair,
  isValidFirst,
  isSelectedFirst,
  defaultSelectFirst,
  defaultSelectSecond,
  isSelectedSecond,
  isValidSecond,
  commission,
} = storeToRefs(pairStore);

const { changeSelectFirst, changeSelectSecond, selectCommission } = pairStore;

const dropdownRefFirst = ref(null);
const dropdownRefSecond = ref(null);

const handleClickOutside = (event) => {
  if (dropdownRefFirst.value && !dropdownRefFirst.value.contains(event.target)) {
    isSelectingFirst.value = false;
  }
  if (dropdownRefSecond.value && !dropdownRefSecond.value.contains(event.target)) {
    isSelectingSecond.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="creation-pair-wrapper" v-if="!isFilledPair">
    <div class="creation-pair">
      <span class="creation-pair__title">Select pair</span>
      <span class="creation-pair__text">
        Choose the tokens you want to provide liquidity for. <br />
        You can select tokens on all supported networks.
      </span>
      <div class="creation-pair__selects">
        <div
          class="creation-pair__select-first"
          ref="dropdownRefFirst"
          :class="{ notValide: !isValidFirst }"
        >
          <button
            class="creation-pair__select-first-btn"
            @click="isSelectingFirst = !isSelectingFirst"
          >
            <span class="creation-pair__select-btn-content" v-if="isSelectedFirst">
              <span> <img :src="defaultSelectFirst.logoUrl" alt="" /></span>
              {{ defaultSelectFirst.name }}
            </span>
            <span class="creation-pair__select-btn-text" v-else>
              {{ defaultSelectFirst.name }}
            </span>

            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 0.999878L7 6.99988L13 0.999878"
                stroke="#9DDF1E"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <span v-if="!isValidFirst" class="error-message">Please, choose token</span>
          <Transition name="fade">
            <ul class="creation-pair__select-list" v-if="isSelectingFirst">
              <li
                class="creation-pair__select-item"
                v-for="pair in pairsFirst"
                :key="pair.id"
                @click="changeSelectFirst(pair)"
              >
                {{ pair.name }}
              </li>
            </ul>
          </Transition>
        </div>
        <div
          class="creation-pair__select-second"
          ref="dropdownRefSecond"
          :class="{ notValide: !isValidSecond }"
        >
          <button
            class="creation-pair__select-first-btn"
            @click="isSelectingSecond = !isSelectingSecond"
          >
            <span class="creation-pair__select-btn-content" v-if="isSelectedSecond">
              <span><img :src="defaultSelectSecond.logoUrl" alt="" /></span>
              {{ defaultSelectSecond.name }}
            </span>
            <span class="creation-pair__select-btn-text" v-else>
              {{ defaultSelectSecond.name }}
            </span>

            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 0.999878L7 6.99988L13 0.999878"
                stroke="#9DDF1E"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <span v-if="!isValidSecond" class="error-message">Please, choose token</span>
          <Transition name="fade">
            <ul class="creation-pair__select-list" v-if="isSelectingSecond">
              <li
                class="creation-pair__select-item"
                v-for="pair in pairsSecond"
                :key="pair.id"
                @click="changeSelectSecond(pair)"
              >
                {{ pair.name }}
              </li>
            </ul>
          </Transition>
        </div>
      </div>
    </div>

    <div class="creation-pair__commission">
      <span class="creation-pair__commission-title">Fee tier </span>
      <span class="creation-pair__commission-text">
        The income from supplying liquidity. <br />
        Select an amount according to your risk preference and approach.
      </span>
      <div class="creation-pair__commission-select">
        <div class="creation-pair__commission-selects">
          <span class="creation-pair__commission-select-title">0.3% fee tier </span>
          <div class="creation-pair__commission-list">
            <button
              class="creation-pair__commission-item"
              :class="{ active: comm.isActive }"
              v-for="comm in commission"
              :key="comm.id"
              @click="selectCommission(comm.id)"
            >
              <span>{{ comm.value.toLocaleString('ru-RU').replace('.', ',') }}</span>
            </button>
          </div>
        </div>
        <span class="creation-pair__commission-select-text"> The % you will earn in fees </span>
      </div>
    </div>

    <div class="creation-pair__cut">
      <span class="creation-pair__cut-left"></span>
      <span class="creation-pair__cut-left-bottom"></span>
      <span class="creation-pair__cut-left-bottom-bg"></span>
      <span class="creation-pair__cut-right"></span>
      <span class="creation-pair__cut-right-bottom"></span>
      <span class="creation-pair__cut-right-bottom-bg"></span>
    </div>
  </div>

  <transition name="blur" mode="out-in">
    <PoolsCreationPairFilled v-if="isFilledPair" />
  </transition>
</template>

<style scoped>
.blur-enter-active {
  transition:
    opacity 0.5s ease,
    filter 0.5s ease;
}
.blur-enter-from {
  opacity: 0;
  filter: blur(10px);
}
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.error-message {
  font-family: var(--font-family);
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.creation-pair-wrapper {
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 33px;
  padding: 24px 24px 103px 24px;
  position: relative;
}

.creation-pair__cut {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 30px;
  max-width: 225px;
  width: 100%;
  background-color: #eeedf0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
@media (max-width: 578px) {
  .creation-pair__cut {
    display: none;
  }
}
.creation-pair__cut-left {
  width: 40px;
  height: 50px;
  position: absolute;
  display: block;
  background-color: #eeedf0;
  left: -4px;
  bottom: -3px;
  transform: rotate(15deg);
  z-index: 1;
}
.creation-pair__cut-left-bottom {
  width: 40px;
  height: 40px;
  position: absolute;
  display: block;
  background-color: #fff;
  left: -46px;
  bottom: 0px;
  z-index: 3;
  border-bottom-right-radius: 20px;
}
.creation-pair__cut-left-bottom-bg {
  width: 40px;
  height: 40px;
  position: absolute;
  display: block;
  background-color: #eeedf0;
  left: -17px;
  bottom: -22px;
  transform: rotate(59deg);
  z-index: 2;
}
.creation-pair__cut-right {
  width: 40px;
  height: 50px;
  position: absolute;
  display: block;
  background-color: #eeedf0;
  right: -4px;
  bottom: -3px;
  transform: rotate(-15deg);
  z-index: 1;
}
.creation-pair__cut-right-bottom {
  width: 40px;
  height: 40px;
  position: absolute;
  display: block;
  background-color: #fff;
  right: -46px;
  bottom: 0px;
  z-index: 3;
  border-bottom-left-radius: 20px;
}
.creation-pair__cut-right-bottom-bg {
  width: 40px;
  height: 40px;
  position: absolute;
  display: block;
  background-color: #eeedf0;
  right: -17px;
  bottom: -22px;
  transform: rotate(-59deg);
  z-index: 2;
}

.notValide {
  animation: notValide 0.5s ease;
}

@keyframes notValide {
  0% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(2deg);
  }
  66% {
    transform: rotate(-2deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@media (max-width: 576px) {
  .creation-pair-wrapper {
    border: none;
    background: transparent;
    padding: 0;
  }
}
.creation-pair {
  display: flex;
  flex-direction: column;
}
.creation-pair__title {
  font-family: var(--font-family);
  font-weight: 500;
  font-size: clamp(15px, 3vw, 16px);
  color: #22212e;
  margin-bottom: 9px;
}

.creation-pair__text {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: clamp(11px, 3vw, 12px);
  color: #22212e;
  opacity: 0.5;
  margin-bottom: 17px;
  max-width: 405px;
}

.creation-pair__selects {
  display: flex;
  gap: 19px;
  width: 100%;
}

.creation-pair__select-first,
.creation-pair__select-second {
  max-width: 361px;
  width: 100%;
  position: relative;
}

.creation-pair__select-first-btn,
.creation-pair__select-second-btn {
  height: 49px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 17px 16px 10px;
  border: 1px solid #eeedf0;
  border-radius: 8px;
  backdrop-filter: blur(12.100000381469727px);
  background: #eeedf0;
}
.creation-pair__select-btn-text {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(13px, 3vw, 14px);
  color: #22212e;
  opacity: 0.5;
}
.creation-pair__select-btn-content {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(13px, 3vw, 14px);
  color: #22212e;
}
@media (max-width: 578px) {
  .creation-pair__selects {
    flex-direction: column;
  }
  .creation-pair__select-first,
  .creation-pair__select-second {
    max-width: none;
  }
  .creation-pair__select-first-btn,
  .creation-pair__select-second-btn {
    background-color: #fff;
  }
}
.creation-pair__select-list {
  position: absolute;
  bottom: -250%;
  width: 100%;
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.notValide .creation-pair__select-list {
  bottom: -146%;
}
.creation-pair__select-item:first-child {
  padding-top: 10px;
}
.creation-pair__select-item:last-child {
  padding-bottom: 10px;
}
.creation-pair__select-item {
  font-family: var(--third-family);
  font-weight: 700;
  font-size: 12px;
  color: #22212e;
  width: 100%;
  cursor: pointer;
  padding: 3px 10px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
}
.creation-pair__select-item:hover {
  color: #fff;
  background-color: #0f0f16;
}
.creation-pair__select-btn-content {
  display: flex;
  gap: 13px;
  align-items: center;
}
.creation-pair__select-btn-content span {
  width: 33px;
  height: 33px;
  border-radius: 100%;
  background: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.creation-pair__commission {
  display: flex;
  flex-direction: column;
}
.creation-pair__commission-title {
  font-family: var(--font-family);
  font-weight: 500;
  font-size: clamp(15px, 3vw, 16px);
  color: #22212e;
  margin-bottom: 9px;
}

.creation-pair__commission-text {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: clamp(11px, 3vw, 12px);
  color: #22212e;
  opacity: 0.5;
  margin-bottom: 28px;
}
.creation-pair__commission-select {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.creation-pair__commission-selects {
  display: flex;
  align-items: center;
  gap: 17px;
}

.creation-pair__commission-select-title {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(15px, 3vw, 16px);
  color: #22212e;
}

.creation-pair__commission-list {
  display: flex;
  gap: 11px;
  align-items: center;
}

.creation-pair__commission-item {
  border-radius: 20px;
  background: rgba(217, 217, 217, 0.05);
  width: 49px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}
.creation-pair__commission-item span {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: clamp(11px, 3vw, 12px);
  text-align: center;
  color: #22212e;
  opacity: 0.5;
  transition: all 0.3s ease;
}
.creation-pair__commission-item.active {
  background: #9ddf1e;
}
.creation-pair__commission-item.active span {
  opacity: 1;
  font-weight: 400;
  color: #161c20;
}

.creation-pair__commission-select-text {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(11px, 3vw, 12px);
  color: #22212e;
  opacity: 0.5;
}
</style>
