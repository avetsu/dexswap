<script setup>
import TradeDropdownContent from '@/components/trade/swop/TradeDropdownContent.vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTradeStore } from '@/stores/TradeStore';

const tradeStore = useTradeStore();

const { tokenA, tokenB, rate, rateToCurrency } = storeToRefs(tradeStore);

const isOpen = ref(false);

function toggleDropDown() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <button class="dropdown__btn" @click="toggleDropDown()">
    <span class="dropdown__change">
      1 {{ tokenA.symbol }} = {{ rate.toString().match(/^-?\d+(\.\d{0,10})?/)[0] }}
      {{ tokenB.symbol }}
    </span>
    <span class="dropdown__dollar">
      ( ${{ (Math.floor(rateToCurrency * 10 ** 2) / 10 ** 2).toFixed(2) }} )
    </span>

    <svg
      :class="{ rotate: isOpen }"
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L7 7L13 1"
        stroke="#9DDF1E"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
  <Transition name="fade">
    <TradeDropdownContent v-if="isOpen" />
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 17px;
}
.dropdown__change {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: clamp(13px, 3vw, 18px);
  color: #22212e;
}
.dropdown__dollar {
  font-family: var(--font-family);
  font-weight: 375;
  font-size: 16px;
  color: #22212e;
  opacity: 0.5;
}
.dropdown__arrow {
  margin-left: auto;
  transition: transform 0.3s ease;
}
svg {
  margin-left: auto;
}
.rotate {
  transform: rotate(-180deg);
}
</style>
