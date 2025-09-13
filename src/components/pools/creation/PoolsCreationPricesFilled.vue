<script setup>
import { usePoolPricesStore } from '@/stores/PoolPricesStore';
import { usePoolPairStore } from '@/stores/PoolPairStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const pricesStore = usePoolPricesStore();
const pairStore = usePoolPairStore();

const { computedPrice } = storeToRefs(pricesStore);
const { selectedPair } = storeToRefs(pairStore);

const { priceEditClick } = pricesStore;

const displayPrices = computed(() => ({
  min:
    computedPrice.value.min +
    ' ' +
    selectedPair.value.pair[0].name +
    '/' +
    selectedPair.value.pair[1].name,
  max:
    computedPrice.value.max +
    ' ' +
    selectedPair.value.pair[0].name +
    '/' +
    selectedPair.value.pair[1].name,
}));
</script>

<template>
  <div class="pools-creation-prices-filled">
    <div class="pools-creation-prices-filled__content">
      <span class="pools-creation-prices-filled-text">
        Min.
        <span>{{ displayPrices.min }}</span>
      </span>
      <span class="pools-creation-prices-filled-text">
        Max.
        <span>{{ displayPrices.max }}</span>
      </span>
    </div>
    <button class="pools-creation-prices-filled__edit-btn" @click="priceEditClick">
      <svg
        width="12"
        height="11"
        viewBox="0 0 12 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.99999 10H11M1 10H1.9303C2.20207 10 2.33795 10 2.46583 9.97095C2.5792 9.94519 2.68759 9.90272 2.787 9.84507C2.89913 9.78006 2.99521 9.68914 3.18738 9.50732L10.1667 2.90358C10.6269 2.46811 10.6269 1.76207 10.1667 1.3266C9.70646 0.891132 8.96026 0.891133 8.50002 1.3266L1.5207 7.93034C1.32853 8.11216 1.23245 8.20308 1.16373 8.30917C1.10281 8.40324 1.05792 8.50579 1.0307 8.61306C1 8.73405 1 8.86263 1 9.11977V10Z"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Edit
    </button>
  </div>
</template>

<style scoped>
.pools-creation-prices-filled {
  border-radius: 20px;
  background-color: #fff;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 30px;
}

@media (max-width: 576px) {
  .pools-creation-prices-filled {
    padding: 15px 13px 16px 13px;
  }
}

.pools-creation-prices-filled__content {
  display: flex;
  align-items: center;
  gap: 39px;
}

.pools-creation-prices-filled-text {
  display: flex;
  align-items: center;
  gap: 19px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  color: #22212e86;
}

.pools-creation-prices-filled-text span {
  color: #22212e;
}
@media (max-width: 576px) {
  .pools-creation-prices-filled__content {
    flex-direction: column;
    gap: 12px;
    align-items: start;
  }
  .pools-creation-prices-filled-text {
    gap: 8px;
  }
  .pools-creation-prices-filled-text span {
    font-size: 10px;
  }
}
.pools-creation-prices-filled__edit-btn {
  margin-left: auto;
  border-radius: 18px;
  background: #eeedf0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
  font-family: var(--third-family);
  font-weight: 700;
  font-size: 12px;
  color: #000;
  max-width: 145px;
  width: 100%;
  height: 36px;
  transition: opacity 0.3s ease;
}
.pools-creation-prices-filled__edit-btn svg {
  transform: translateY(-2px);
}

.pools-creation-prices-filled__edit-btn:hover {
  opacity: 0.8;
}
.pools-creation-prices-filled__edit-btn:hover svg {
  animation: editMove 0.3s alternate;
}

@keyframes editMove {
  0% {
    transform: rotate(0deg) translateY(-2px);
  }
  33% {
    transform: rotate(15deg) translateY(-2px);
  }
  66% {
    transform: rotate(-15deg) translateY(-2px);
  }
  100% {
    transform: rotate(0deg) translateY(-2px);
  }
}
</style>
