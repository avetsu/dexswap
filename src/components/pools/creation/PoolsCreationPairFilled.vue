<script setup>
import { usePoolPairStore } from '@/stores/PoolPairStore';
import { storeToRefs } from 'pinia';

const pairStore = usePoolPairStore();
const { selectedPair } = storeToRefs(pairStore);

const { pairEditClick } = pairStore;
</script>

<template>
  <div class="pools-pair-filled">
    <div class="pools-pair-filled__content">
      <div class="pools-pair-filled__img">
        <img :src="selectedPair.logoUrl" alt="" />
      </div>
      <div class="pools-pair-filled__names">
        <span class="pools-pair-filled__name">
          {{ selectedPair.pair[0].name }} / {{ selectedPair.pair[1].name }}
        </span>
        <span class="pools-pair-filled__commission">
          <span>{{ selectedPair.commission }}%</span>
        </span>
      </div>
    </div>

    <button class="pools-pair-filled__btn-edit" @click="pairEditClick">
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
.blur-enter-active {
  transition:
    opacity 0.5s ease,
    filter 0.5s ease;
}
.blur-enter-from {
  opacity: 0;
  filter: blur(10px);
}
.pools-pair-filled {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  backdrop-filter: blur(12.100000381469727px);
  background: #fff;
  border-radius: 10px;
  padding: 25px;
}

@media (max-width: 576px) {
  .pools-pair-filled {
    gap: 12px;
    padding: 14px 10px;
  }
}
.pools-pair-filled__content {
  display: flex;
  align-items: center;
}
.pools-pair-filled__img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 14px;
}

.pools-pair-filled__name {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(12px, 3vw, 16px);
  color: #22212e;
  margin-right: 26px;
}

.pools-pair-filled__commission {
  border-radius: 20px;
  background: rgba(217, 217, 217, 0.05);
  padding: 5px 12px;
  max-width: fit-content;
}
@media (max-width: 576px) {
  .pools-pair-filled__names {
    display: flex;
    flex-direction: column;
  }
  .pools-pair-filled__commission {
    padding: 3px 9px;
  }
}
.pools-pair-filled__commission span {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 12px;
  color: #22212e;
  opacity: 0.5;
}

.pools-pair-filled__btn-edit {
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
.pools-pair-filled__btn-edit svg {
  transform: translateY(-2px);
}
.pools-pair-filled__btn-edit:hover {
  opacity: 0.8;
}
.pools-pair-filled__btn-edit:hover svg {
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
