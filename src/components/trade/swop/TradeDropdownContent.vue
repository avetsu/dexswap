<script setup>
import { storeToRefs } from 'pinia';
import { useTradeStore } from '@/stores/TradeStore';

const tradeStore = useTradeStore();

const { feeToCurrency } = storeToRefs(tradeStore);
</script>

<template>
  <div>
    <ul class="dropdown__list">
      <li class="dropdown__item">
        <span class="dropdown__item-name">Fee (0,50%)</span>
        <span class="dropdown__item-value"
          ><strong>{{ (Math.floor(feeToCurrency * 10 ** 2) / 10 ** 2).toFixed(2) }} $</strong></span
        >
      </li>
      <li class="dropdown__item">
        <span class="dropdown__item-name">Network cost</span>
        <span class="dropdown__item-value">&lt; 0,1$</span>
      </li>
      <li class="dropdown__item">
        <span class="dropdown__item-name">Order routing</span>
        <span class="dropdown__item-value"><strong>X1 Blockchain API</strong></span>
      </li>
      <li class="dropdown__item">
        <span class="dropdown__item-name">Impact on price</span>
        <span class="dropdown__item-value">-0,779%</span>
      </li>
      <li class="dropdown__item">
        <span class="dropdown__item-name">Max. slippage</span>
        <span class="dropdown__item-value"><strong>2,5%</strong></span>
      </li>
    </ul>
  </div>
</template>

<style>
.dropdown__list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 480px;
  width: 100%;
}

.dropdown__item {
  display: flex;
  justify-content: space-between;
}

.dropdown__item-name {
  font-family: var(--font-family);
  font-weight: 375;
  font-size: clamp(13px, 3vw, 18px);
  color: #22212e;
}

.dropdown__item-value {
  font-family: var(--font-family);
  font-weight: 375;
  font-size: clamp(13px, 3vw, 18px);
  color: #22212e;
}
.dropdown__item-value strong {
  font-weight: 500;
}
</style>
