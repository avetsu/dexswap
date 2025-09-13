<script setup>
import { usePoolPricesStore } from '@/stores/PoolPricesStore';
import { usePoolPairStore } from '@/stores/PoolPairStore';
import PoolsCreationPricesFilled from '@/components/pools/creation/PoolsCreationPricesFilled.vue';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const pricesStore = usePoolPricesStore();
const pairStore = usePoolPairStore();

const { selectedPair } = storeToRefs(pairStore);
const { isFilledPrice, currentRange, ranges, minValue, maxValue } = storeToRefs(pricesStore);

const { changeStatusRange, onMinInput, onMaxInput } = pricesStore;
const { changeStatusPair } = pairStore;

const displayPair = computed(() => {
  const pair = selectedPair.value.pair;
  const first = pair[0];
  const second = pair[1];

  return first.isActive ? [first, second] : [second, first];
});

function minInput(e) {
  let filtered = e.target.value.replace(/[^0-9.]/g, '');
  const parts = filtered.split('.');
  if (parts.length > 2) {
    filtered = parts[0] + '.' + parts.slice(1).join('');
  }
  minValue.value = filtered;
  onMinInput(filtered);
}

function maxInput(e) {
  let filtered = e.target.value.replace(/[^0-9.]/g, '');
  const parts = filtered.split('.');
  if (parts.length > 2) {
    filtered = parts[0] + '.' + parts.slice(1).join('');
  }
  maxValue.value = filtered;
  onMaxInput(filtered);
}
</script>

<template>
  <div class="pools-creation-price" v-if="!isFilledPrice">
    <div class="pools-creation-price__head">
      <span class="pools-creation-price__head-title"> Set the price range </span>
      <div class="pools-creation-price__head-btns">
        <button
          class="pools-creation-price-head-btn"
          :class="{ active: wallet.isActive }"
          v-for="wallet in selectedPair.pair"
          :key="wallet.id"
          @click="changeStatusPair()"
        >
          <span>{{ wallet.name }}</span>
        </button>
      </div>
    </div>

    <div
      class="pools-creation-price__range"
      :class="{
        'first-active': currentRange === ranges[0].name,
        'second-active': currentRange === ranges[1].name,
      }"
    >
      <button
        class="pools-creation__range-btn"
        :class="{ active: range.isActive }"
        v-for="range in ranges"
        :key="range.id"
        @click="changeStatusRange(range.id)"
      >
        <span>{{ range.name }}</span>
      </button>
    </div>

    <div class="pools-creation-price__current">
      <span class="pools-creation-price__current-text">
        Full-range liquidity lets you stay live at every price point, offering easy participation
        while exposing you to more impermanent loss.
      </span>
      <div class="pools-creation-price__current-value">
        <span class="pools-creation-price__current-value-text">
          <span class="current-value-text__name">Current price: </span>1 {{ displayPair[0].name }} =
          563,243 {{ displayPair[1].name }}
          <span class="current-value-text__dollar">($563,243)</span>
        </span>
      </div>
      <div class="pools-creation-price__minmax">
        <div class="pools-creation-price__min">
          <span class="pools-creation-price__min-name"> Min. price </span>
          <input
            type="text"
            name="min-price"
            id="min-price"
            class="pools-creation-price__min-input"
            v-model="minValue"
            @input="minInput"
          />
          <span class="pools-creation-price__min-trade">
            {{ displayPair[0].name }} = 1
            {{ displayPair[1].name }}
          </span>
        </div>
        <div class="pools-creation-price__max">
          <span class="pools-creation-price__max-name"> Max. price </span>
          <input
            type="text"
            name="min-price"
            id="min-price"
            class="pools-creation-price__max-input"
            v-model="maxValue"
            @input="maxInput"
          />
          <span class="pools-creation-price__max-trade">
            {{ displayPair[0].name }} = 1
            {{ displayPair[1].name }}
          </span>
        </div>
      </div>
    </div>
    <div class="pools-creation-price__cut">
      <span class="pools-creation-price__cut-left"></span>
      <span class="pools-creation-price__cut-left-bottom"></span>
      <span class="pools-creation-price__cut-left-bottom-bg"></span>
      <span class="pools-creation-price__cut-right"></span>
      <span class="pools-creation-price__cut-right-bottom"></span>
      <span class="pools-creation-price__cut-right-bottom-bg"></span>
    </div>
  </div>
  <transition name="blur" mode="out-in">
    <PoolsCreationPricesFilled v-if="isFilledPrice" />
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
.pools-creation-price {
  border-radius: 10px;
  background: #fff;
  padding: 25px 25px 84px 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  position: relative;
}

@media (max-width: 578px) {
  .pools-creation-price {
    border: none;
    backdrop-filter: none;
    background: transparent;
    padding: 0;
    gap: 15px;
  }
}
input {
  outline: none;
  border: none;
}
.pools-creation-price__cut {
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
  .pools-creation-price__cut {
    display: none;
  }
}
.pools-creation-price__cut-left {
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
.pools-creation-price__cut-left-bottom {
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
.pools-creation-price__cut-left-bottom-bg {
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
.pools-creation-price__cut-right {
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
.pools-creation-price__cut-right-bottom {
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
.pools-creation-price__cut-right-bottom-bg {
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

.pools-creation-price__head {
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: space-between;
}

.pools-creation-price__head-title {
  font-family: var(--font-family);
  font-weight: 500;
  font-size: clamp(15px, 3vw, 20px);
  color: #22212e;
}

.pools-creation-price__head-btns {
  display: flex;
  gap: 12px;
}
.pools-creation-price-head-btn {
  border-radius: 20px;
  max-width: fit-content;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(217, 217, 217, 0.05);
  transition: all 0.3s ease;
}
.pools-creation-price-head-btn span {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 12px;
  color: #22212e;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.pools-creation-price-head-btn.active {
  background: #9ddf1e;
}

.pools-creation-price-head-btn.active span {
  font-weight: 450;
  color: #22212e;
}

.pools-creation-price__range {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  width: 100%;

  border-radius: 50px;

  background: #eeedf0;
  justify-content: space-between;
  position: relative;
}
.pools-creation-price__range span {
  z-index: 1;
}
.pools-creation-price__range::before {
  content: '';
  width: 50%;
  height: 33px;
  display: block;
  border: 2px solid #9ddf1e;
  border-radius: 50px;
  background: #9ddf1e;
  position: absolute;
  left: 10px;
  z-index: 0;
  transition: all 0.3s ease;
}

.first-active::before {
  left: 10px;
}
.second-active::before {
  left: 48.5%;
}

.pools-creation__range-btn {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(10px, 3vw, 14px);
  color: #22212e;
  border: 2px solid transparent;
  border-radius: 50px;
  max-width: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  transition: all 0.3s ease;
}

.pools-creation__range-btn.active {
  color: #161c20;
}
@media (max-width: 576px) {
  .pools-creation-price__range {
    background-color: #fff;
  }
  .pools-creation-price__range::before {
    display: none;
  }
  .pools-creation__range-btn.active {
    background: #9ddf1e;
  }
}

.pools-creation-price__current {
  display: flex;
  flex-direction: column;
}
.pools-creation-price__current-text {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 12px;
  color: #22212e;
  opacity: 0.5;
  max-width: 638px;
  margin-bottom: 16px;
}

.pools-creation-price__current-value {
  border-radius: 8px;
  background: #eeedf0;
  padding: 17px 23px 23px 23px;
  display: flex;
  align-items: center;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(14px, 3vw, 16px);
  color: #22212e;
  margin-bottom: 26px;
}

@media (max-width: 576px) {
  .pools-creation-price__current-value {
    margin-bottom: 10px;
    padding: 16px 10px 16px 10px;
    background-color: #fff;
  }
}

.current-value-text__name {
  color: rgba(34, 33, 46, 0.5);
}

.current-value-text__dollar {
  opacity: 0.5;
  font-size: 14px;
}

.pools-creation-price__minmax {
  display: flex;
  gap: 25px;
}
@media (max-width: 576px) {
  .pools-creation-price__minmax {
    flex-direction: column;
    gap: 10px;
  }
}

.pools-creation-price__min,
.pools-creation-price__max {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}

.pools-creation-price__min-input,
.pools-creation-price__max-input {
  padding: 32px 23px 36px 23px;
  background: #eeedf0;
  border-radius: 8px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 22px;
  color: #22212e;
  width: 100%;
}

.pools-creation-price__min-name,
.pools-creation-price__max-name {
  position: absolute;
  left: 23px;
  top: 13px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(11px, 3vw, 12px);
  color: #22212e;
  opacity: 0.5;
  z-index: 1;
}

.pools-creation-price__min-trade,
.pools-creation-price__max-trade {
  position: absolute;
  bottom: 16px;
  left: 23px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(11px, 3vw, 12px);
  color: #22212e;
  opacity: 0.5;
}
@media (max-width: 576px) {
  .pools-creation-price__min-input,
  .pools-creation-price__max-input {
    background-color: #fff;
    padding: 30px 14px 35px 14px;
  }
  .pools-creation-price__min-name,
  .pools-creation-price__max-name {
    left: 14px;
  }
  .pools-creation-price__min-trade,
  .pools-creation-price__max-trade {
    left: 14px;
  }
}
</style>
