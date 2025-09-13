<script setup>
import { ref, useId } from 'vue';

const pools = ref([
  {
    id: useId(),
    imgUrl: '',
    names: {
      first: 'BNB',
      second: 'USDT',
    },
    prices: {
      position: 0.0,
      commission: 0.0,
    },
    trade: {
      first: 530.067,
      second: 80.067,
    },
  },
  {
    id: useId(),
    imgUrl: '',
    names: {
      first: 'BNB',
      second: 'USDT',
    },
    prices: {
      position: 0.0,
      commission: 0.0,
    },
    trade: {
      first: 530.067,
      second: 80.067,
    },
  },
  {
    id: useId(),
    imgUrl: '',
    names: {
      first: 'BNB',
      second: 'USDT',
    },
    prices: {
      position: 0.0,
      commission: 0.0,
    },
    trade: {
      first: 530.067,
      second: 80.067,
    },
  },
]);
</script>

<template>
  <ul class="pools__list">
    <li class="pools__item" v-for="pool in pools" :key="pool.id">
      <div class="pools__item-upper">
        <div class="pools__item-img-box">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="16" fill="#D9D9D9" />
          </svg>
        </div>
        <span class="pools__item-title"> {{ pool.names.first }} / {{ pool.names.second }} </span>
      </div>
      <div class="pools__item-prices">
        <div class="pools__item-position">
          <span class="pools__item-position-value">
            $ {{ pool.prices.position.toLocaleString('ru-RU').replace('.', ',') }}
          </span>
          <span class="pools__item-position-text"> Position </span>
        </div>
        <div class="pools__item-commission">
          <span class="pools__item-commission-value">
            $ {{ pool.prices.commission.toLocaleString('ru-RU').replace('.', ',') }}
          </span>
          <span class="pools__item-commission-text"> Commission </span>
        </div>
      </div>
      <div class="pools__item-trade">
        <span class="pools__item-trade-first">
          {{ pool.trade.first.toLocaleString('ru-RU').replace('.', ',') }}
          <span>{{ pool.names.first }}</span>
        </span>
        <span class="pools__item-trade-icon">
          <svg width="15" height="6" viewBox="0 0 15 6" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.77848 3.36401H13.7283M13.7283 3.36401L11.6069 1.24268M13.7283 3.36401L11.6069 5.48535M5.95003 3.36401L1.00024 3.36401M1.00024 3.36401L3.12158 5.48535M1.00024 3.36401L3.12158 1.24268" stroke="#9DDF1E" stroke-linecap="round" stroke-linejoin="round" />
</svg>
        </span>
        <span class="pools__item-trade-second">
          {{ pool.trade.second.toLocaleString('ru-RU').replace('.', ',') }}
          <span> {{ pool.names.second }}</span>
        </span>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.pools__list {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
}
.pools__item {
  display: flex;
  flex-direction: column;
  padding: 15px 14px;
  gap: 13px;
  backdrop-filter: blur(12.100000381469727px);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #ffffff38;
  border-radius: 10px;
}

.pools__item-upper {
  display: flex;
  align-items: center;
  gap: 14px;
}

.pools__item-img-box {
  flex-shrink: 0;
}

.pools__item-title {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 18px;
  color: #22212e;
}
.pools__item-prices {
  display: flex;
  gap: 27px;
}
.pools__item-position,
.pools__item-commission {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 2px;
}

.pools__item-position-value,
.pools__item-commission-value {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  color: #22212e;
}
.pools__item-position-text,
.pools__item-commission-text {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 10px;
  color: #22212e;
  opacity: 0.5;
}

.pools__item-trade {
  display: flex;
  align-items: end;
  gap: 19px;
}

.pools__item-trade-first,
.pools__item-trade-second {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  color: #22212e;
}
.pools__item-trade-first span,
.pools__item-trade-second span {
  font-size: 8px;
}
</style>
