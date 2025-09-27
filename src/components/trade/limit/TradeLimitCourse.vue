<script setup>
import { ref, provide } from 'vue';
import AppModal from '@/components/AppModal.vue';
import UIButtonModal from '@/components/ui/UIButtonModal.vue';
import ModalTokens from '@/components/modals/ModalTokens.vue';
const isModalOpen = ref(false);

const openModal = () => (isModalOpen.value = true);

const closeModal = () => (isModalOpen.value = false);

provide('openModal', openModal);

const prices = ref([
  {
    count: 'Market',
    price: 87602.25,
    isActive: true,
  },
  {
    count: '1%',
    price: 17602.25,
    isActive: false,
  },
  {
    count: '5%',
    price: 57602.25,
    isActive: false,
  },
  {
    count: '10%',
    price: 97602.25,
    isActive: false,
  },
]);

const changePrice = (index) => {
  prices.value.forEach((item, i) => {
    item.isActive = i === index;
  });
};

const selectedToken = ref({ name: 'USDT', logo: '/icons/tether-small.svg' });

const openModalFor = ref(null);

const selectToken = (token) => {
  selectedToken.value = { name: token.title, logo: token.logo };
  openModalFor.value = null;
};
</script>

<template>
  <AppModal :isOpen="isModalOpen" @close="closeModal">
    <ModalTokens @selectToken="selectToken" @close="closeModal" />
  </AppModal>
  <div class="limit__upper">
    <span class="limit__card-top-name">
      LIMIT
      <span class="limit-angle-left-top"></span>
      <span class="limit-angle-left-bottom"></span>
      <span class="limit-angle-left-bottom-bg"></span>
      <span class="limit-angle-right-top"></span>
      <span class="limit-angle-right-bottom"></span>
      <span class="limit-angle-right-bottom-bg"></span>
    </span>
    <div class="limit__upper-content">
      <span class="limit__upper-title">
        When 1 BTC
        <img :src="'./icons/bitcoin-limit.svg'" alt="" />
      </span>
      <input
        type="text"
        class="limit__upper-value"
        v-model="prices.find((item) => item.isActive).price"
      />
      <!-- <span class="limit__upper-value">
        {{ prices.find((item) => item.isActive).price.toLocaleString('ru-RU') }}
      </span> -->
      <div class="limit__upper-btns">
        <button
          class="limit__upper-btn"
          v-for="(item, index) in prices"
          :key="index"
          :class="{ active: item.isActive }"
          @click="changePrice(index)"
        >
          {{ item.count }}
        </button>
      </div>
    </div>
    <UIButtonModal
      class="limit__tokens-btn"
      :url="selectedToken.logo"
      :text="selectedToken.name"
      @click="isModalOpen = true"
    />
  </div>
</template>

<style scoped>
.limit__upper {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 13px 25px;
  border-radius: 24px;
  position: relative;
}

.limit__upper-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.limit__upper-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(8px, 3vw, 12px);
  color: #22212e;
  opacity: 0.5;
}
.limit__upper-value {
  width: clamp(29px, 19vw, 151px);
  border: none;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(29px, 3vw, 40px);
  color: #22212e;
  align-items: start;
}

.limit__upper-btns {
  display: flex;
  align-items: center;
  gap: 7px;
}
.limit__upper-btn {
  border-radius: 20px;
  background: #eeedf0;
  font-family: var(--font-family);
  font-weight: 300;
  font-size: clamp(8px, 3vw, 12px);
  color: #22212e;
  opacity: 0.5;
  padding: 5px 10px;
}
.active {
  opacity: 1;
  font-weight: 400;
  color: #fff;
  background: #9ddf1e;
}
.limit__tokens-btn {
  margin-top: 30px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px;
  background: #eeedf0;
  height: 35px;
  border-radius: 50px;
  gap: 11px;
}

.limit__token-name {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(14px, 3vw, 20px);
  color: #fff;
}
@media (max-width: 576px) {
  .limit__tokens-btn {
    padding: 3px;
  }
  .limit__tokens-btn {
    max-width: 81px;
    gap: 8px;
  }
}

.limit-angle-left-top {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #fff;
  border-top-right-radius: 36px;
  left: 0;
  bottom: 0;
  z-index: 1;
}
.limit-angle-left-bottom {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #eeedf0;
  border-bottom-left-radius: 25px;
  left: 15px;
  bottom: 0;
  z-index: 3;
}
.limit-angle-left-bottom-bg {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #fff;
  left: 15px;
  bottom: -16px;
  z-index: 2;
}
.limit-angle-right-top {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #fff;
  border-top-left-radius: 36px;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.limit-angle-right-bottom {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #eeedf0;
  border-bottom-right-radius: 25px;
  right: 15px;
  bottom: 0;
  z-index: 3;
}
.limit-angle-right-bottom-bg {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #fff;
  right: 15px;
  bottom: -16px;
  z-index: 2;
}
.limit__card-top-name {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 18px;
  text-transform: uppercase;
  text-align: center;
  color: rgba(34, 33, 46, 0.2);
  max-width: fit-content;
  width: 100%;
  background-color: #eeedf0;
  padding: 5px clamp(50px, 9vw, 90px);
  display: block;
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translateX(-50%);
  z-index: 1;
}
</style>
