<script setup>
import { ref } from 'vue';

const nftItems = ref([
  {
    cardName: 'noname.eth',
    name: 'NAME NFT',
    count: '0,04 ETH',
  },
  {
    cardName: 'noname.eth',
    name: 'NAME NFT',
    count: '0,04 ETH',
  },
  {
    cardName: 'noname.eth',
    name: 'NAME NFT',
    count: '0,04 ETH',
  },
  {
    cardName: 'noname.eth',
    name: 'NAME NFT',
    count: '0,04 ETH',
  },
]);
</script>

<template>
  <ul class="nft__list">
    <li class="nft__item" v-for="nft in nftItems" :key="nft.name">
      <div class="nft__item-card">
        <div class="nft__item-img"></div>
        <span class="nft__item-card-text">
          {{ nft.cardName }}
        </span>
      </div>
      <div class="nft__item-content">
        <span class="nft__item-name">
          {{ nft.name }}
        </span>
        <span class="nft__item-count">
          {{ nft.count }}
        </span>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.nft__list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 9px;
}

.nft__item {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.nft__item-card {
  border-radius: 10px;
  background: #eeedf0;
  display: flex;
  align-items: end;
  max-width: 137px;
  width: 100%;
  padding: 137px 28px 10px 10px;
}

.nft__item-card-text {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 18px;
  color: #22212e;
}
.nft__item-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: start;
}
.nft__item-name {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  color: #22212e;
}

.nft__item-count {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 10px;
  text-align: right;
  color: #22212e;
  opacity: 0.5;
}

</style>
