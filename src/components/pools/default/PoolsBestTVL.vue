<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

defineProps({
  pools: Array,
});

const isMobile = ref(false);

const checkWidth = () => {
  window.innerWidth < 768 ? (isMobile.value = true) : (isMobile.value = false);
};

checkWidth();

onMounted(() => {
  window.addEventListener('resize', checkWidth);
});
onUnmounted(() => {
  window.removeEventListener('resize', checkWidth);
});
</script>

<template>
  <div class="best-pools">
    <div class="best-pools__top-line">
      <span class="best__pools-line-left"></span>
      <span class="best__pools-line-left-bottom"></span>
      <span class="best__pools-line-left-bottom-bg"></span>
    </div>
    <h3 class="best-pools__title">The best pools by TVL</h3>
    <ul class="best-pools__list" v-if="!isMobile">
      <li class="best-pools__item-head">
        <span class="best-pools__item-head-id"> # </span>
        <span class="best-pools__item-head-pool"> Pool </span>
        <span class="best-pools__item-head-tvl"> TVL </span>
        <span class="best-pools__item-head-apr"> APR </span>
        <span class="best-pools__item-head-volume">24H Volume </span>
      </li>
      <li class="best-pools__item" v-for="pool in pools" :key="pool.id">
        <span class="best-pools__item-id">
          {{ pool.id }}
        </span>
        <div class="best-pools__item-pool">
          <span class="best-pools__item-img">
            <img :src="pool.logoUrl" alt="" />
          </span>
          <span class="best-pools__item-names">
            {{ pool.names.first }} / {{ pool.names.second }}
          </span>
          <span class="best-pools__item-percent"> {{ pool.percent }}% </span>
        </div>
        <span class="best-pools__item-tvl"> $ {{ pool.tvl }}M </span>
        <span class="best-pools__item-apr"> {{ pool.apr }}% </span>
        <span class="best-pools__item-volume"> $ {{ pool.volume }} </span>
      </li>
    </ul>
    <ul class="best-pools-mobile__list" v-else>
      <li class="best-pools-mobile__item" v-for="pool in pools" :key="pool.id">
        <div class="best-pools-mobile__head">
          <span class="best-pools-mobile__img">
            <img :src="pool.logoUrl" alt="" />
          </span>
          <div class="best-pools-mobile__names">
            <span class="best-pools-mobile__name">
              {{ pool.names.first }} / {{ pool.names.second }}
            </span>
            <span class="best-pools-mobile__percent">
              {{ pool.percent.toLocaleString('ru-RU').replace('.', ',') }}%
            </span>
          </div>
        </div>
        <div class="best-pools-mobile__stats">
          <div class="best-pools-mobile__tvl">
            <span class="best-pools-mobile__tvl-name">TVL</span>
            <span class="best-pools-mobile__tvl-value">$ {{ pool.tvl }}M</span>
          </div>
          <div class="best-pools-mobile__apr">
            <span class="best-pools-mobile__apr-name">APR</span>
            <span class="best-pools-mobile__apr-value">{{ pool.apr }}%</span>
          </div>
          <div class="best-pools-mobile__volume">
            <span class="best-pools-mobile__volume-name">Volume for 24 hours</span>
            <span class="best-pools-mobile__tvolume-value">${{ pool.volume }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.best-pools {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
}

.best-pools__top-line {
  position: absolute;
  right: 0;
  max-width: 47vw;
  width: 100%;
  padding: 30px;
  display: block;
  background-color: #fff;
  top: -20px;
  border-top-right-radius: 24px;
  border-top-left-radius: 24px;
}
@media (max-width: 768px) {
  .best-pools__top-line {
    display: none;
  }
}

.best__pools-line-left {
  width: 60px;
  height: 50px;
  display: block;
  position: absolute;
  background-color: #eeedf0;
  border-bottom-right-radius: 52px;
  left: -57px;
  bottom: 1px;
  z-index: 2;
}
.best__pools-line-left-bottom {
  width: 40px;
  height: 40px;
  display: block;
  position: absolute;
  background-color: #fff;
  bottom: 1px;
  left: -39px;
  z-index: 1;
}
.best-pools__title {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: clamp(15px, 3vw, 20px);
  color: #22212e;
}
.best-pools__table-wrapper {
  padding: 10px;
  border-radius: 24px;
}

.best-pools__list {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
  border-bottom-left-radius: 24px;
  padding: 10px;
  gap: 22px;
}

.best-pools__item-head {
  border-radius: 8px;
  background: #eeedf0;
  height: 49px;
  display: flex;
  align-items: center;
  padding: 0 24px;
}
.best-pools__item {
  height: 49px;
  padding: 0 24px;
  display: flex;
  align-items: center;
}
.best-pools__list li span:not(.best-pools__item-percent) {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  color: #22212e;
}

.best-pools__item-head-id,
.best-pools__item-id {
  max-width: 80px;
  width: 100%;
}

.best-pools__item-head-pool,
.best-pools__item-pool {
  max-width: 490px;
  width: 100%;
  min-width: 220px;
  display: flex;
  align-items: center;
  gap: 14px;
}
.best-pools__item-head-tvl,
.best-pools__item-tvl {
  max-width: 213px;
  width: 100%;
}
.best-pools__item-head-apr,
.best-pools__item-apr {
  max-width: 213px;
  width: 100%;
}

.best-pools__item-img,
.best-pools-mobile__img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #eeedf0;
  display: block;
}

.best-pools__item-percent {
  border-radius: 20px;
  background: rgba(34, 33, 46, 0.05);
  padding: 5px 12px;
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 12px;
  color: #22212e;
}

.best-pools-mobile__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.best-pools-mobile__item {
  display: flex;
  flex-direction: column;
  gap: 22px;
  background: #fff;
  border-radius: 24px;
  padding: 15px 12px;
}

.best-pools-mobile__head {
  display: flex;
  gap: 11px;
}
.best-pools-mobile__names {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.best-pools-mobile__name {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  color: #22212e;
}

.best-pools-mobile__item
  span:not(
    .best-pools-mobile__percent,
    .best-pools-mobile__tvl-name,
    .best-pools-mobile__apr-name,
    .best-pools-mobile__volume-name
  ) {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  color: #22212e;
}
.best-pools-mobile__percent {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 9px;
  color: #22212e;
  padding: 3.5px 9px;
  border-radius: 15px;
  background: rgba(34, 33, 46, 0.05);
  max-width: fit-content;
}

.best-pools-mobile__stats {
  display: flex;
  gap: 36px;
  justify-content: space-between;
}
.best-pools-mobile__stats div {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.best-pools-mobile__tvl-name,
.best-pools-mobile__apr-name,
.best-pools-mobile__volume-name {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 10px;
  color: rgba(34, 33, 46, 0.5);
}
</style>
