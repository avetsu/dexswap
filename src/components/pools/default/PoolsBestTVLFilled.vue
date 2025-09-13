<script setup>
defineProps({
  poolList: Array,
});
</script>

<template>
  <div class="pools-best-tvl-filled">
    <span class="pools-best-tvl-filled__title">The best pools by TVL</span>
    <ul class="pools-best-tvl-filled__list">
      <li class="pools-best-tvl-filled__head">
        <span>Pool</span>
        <span>APR</span>
      </li>
      <li class="pools-best-tvl-filled__item" v-for="pool in poolList" :key="pool.id">
        <div class="pools-best-tvl-filled__img">
          <img :src="pool.logoUrl" alt="" />
        </div>
        <div class="pools-best-tvl-filled__content">
          <span class="pools-best-tvl-filled__names">
            {{ pool.names.first }} / {{ pool.names.second }}
          </span>
          <span class="pools-best-tvl-filled__percent">
            <span>{{ pool.percent }}%</span>
          </span>
        </div>
        <span class="pools-best-tvl-filled__apr">
          <span class="pools-best-tvl-filled__apr-name">APR</span>
          {{ pool.apr }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.pools-best-tvl-filled {
  display: flex;
  flex-direction: column;
  gap: 29px;
  max-width: 429px;
}
@media (max-width: 900px) {
  .pools-best-tvl-filled {
    max-width: none;
    gap: 15px;
  }
}
.pools-best-tvl-filled__title {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: clamp(15px, 3vw, 20px);
  color: #22212e;
}

.pools-best-tvl-filled__list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  background: #fff;
  border-radius: 20px;
  max-height: 437px;
}

.pools-best-tvl-filled__head {
  border-radius: 14px;
  background: #eeedf0;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
  padding: 16px 74px 14px 26px;
}

.pools-best-tvl-filled__head span {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  color: #22212e;
}
.pools-best-tvl-filled__item {
  padding: 0 56px 0 26px;
  display: flex;
  align-items: center;
  gap: 17px;
}
.pools-best-tvl-filled__img {
  width: 51px;
  height: 51px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eeedf0;
}

.pools-best-tvl-filled__content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pools-best-tvl-filled__names {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(12px, 3vw, 16px);
  color: #22212e;
}
.pools-best-tvl-filled__percent {
  border-radius: 14px;
  background: rgba(34, 33, 46, 0.05);
  padding: 3.5px 8px;
  max-width: fit-content;
  height: 16px;
  display: flex;
  align-items: center;
}
.pools-best-tvl-filled__percent span {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 8px;
  color: #22212e;
  opacity: 0.5;
}
.pools-best-tvl-filled__apr {
  margin-left: auto;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(12px, 3vw, 16px);
  color: #22212e;
}
.pools-best-tvl-filled__apr-name {
  display: none;
}

@media (max-width: 576px) {
  .pools-best-tvl-filled__list {
    backdrop-filter: none;
    border: none;
    background: transparent;
    padding: 0;
  }
  .pools-best-tvl-filled__head {
    display: none;
  }
  .pools-best-tvl-filled__item {
    background: #fff;
    border-radius: 10px;
    padding: 15px 57px 14px 12px;
    gap: 11px;
  }
  .pools-best-tvl-filled__img {
    width: 35px;
    height: 35px;
  }
  .pools-best-tvl-filled__content {
    flex-direction: row;
    gap: 11px;
    align-items: center;
  }
  .pools-best-tvl-filled__percent {
    height: 18px;
    padding: 0 9px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pools-best-tvl-filled__apr {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .pools-best-tvl-filled__apr-name {
    display: inline;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 10px;
    color: rgba(34, 33, 46, 0.5);
  }
}
</style>
