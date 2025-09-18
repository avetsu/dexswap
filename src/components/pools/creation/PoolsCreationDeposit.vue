<script setup>
import AppModal from '@/components/AppModal.vue';
import UIButtonModal from '@/components/ui/UIButtonModal.vue';
import ModalTokens from '@/components/modals/ModalTokens.vue';
import { getPoolContract } from '@/components/blockchain/pools';
import { ref, provide } from 'vue';
import { usePoolDepositStore } from '@/stores/PoolDepositStore';
import { usePoolPairStore } from '@/stores/PoolPairStore';
import { storeToRefs } from 'pinia';
import { ethers } from 'ethers';
import { getPrice } from '@/components/blockchain/functions';

const depositStore = usePoolDepositStore();
const pairStore = usePoolPairStore();

const { firstValue, max, secondValue } = storeToRefs(depositStore);
const { selectedPair } = storeToRefs(pairStore);

const { onFirstInput, setMaxFirst, onSecondInput, setMaxSecond } = depositStore;

const isModalOpen = ref(false);

const openModal = () => (isModalOpen.value = true);

const closeModal = () => (isModalOpen.value = false);

provide('openModal', openModal);

const selectedUpperToken = ref({ name: 'USDT', logo: '/icons/tether-small.svg' });
const selectedBottomToken = ref({ name: 'BTC', logo: '/icons/bitcoin.svg' });

const openModalFor = ref(null);

const selectToken = (token) => {
  if (openModalFor.value === 'upper') {
    selectedUpperToken.value = { name: token.title, logo: token.logo };
  } else if (openModalFor.value === 'bottom') {
    selectedBottomToken.value = { name: token.title, logo: token.logo };
  }
  openModalFor.value = null;
};

async function inputAmountA(e) {
  const pool = await getPoolContract(
    selectedPair.value.pair[0].address,
    selectedPair.value.pair[1].address,
    // 3000,
    selectedPair.value.commission * 10000,
  );
  const slot0 = await pool.slot0();
  const liquidityBN = await pool.liquidity();
  const liquidity = Number(ethers.BigNumber.from(liquidityBN));
  const sqrtPriceX96 = BigInt(slot0.sqrtPriceX96);
  let price = getPrice(sqrtPriceX96);
  console.log('sqrtPriceX96:', sqrtPriceX96);
  console.log('Current price token1/token0:', price);
  console.log(
    'Current price:',
    firstValue.value *
      price *
      10 ** (selectedPair.value.pair[0].decimals - selectedPair.value.pair[1].decimals),
  );
  onFirstInput(e);
  secondValue.value =
    firstValue.value *
    price *
    10 ** (selectedPair.value.pair[0].decimals - selectedPair.value.pair[1].decimals);
}
async function inputAmountB(e) {
  const pool = await getPoolContract(
    selectedPair.value.pair[0].address,
    selectedPair.value.pair[1].address,
    // 3000,
    selectedPair.value.commission * 10000,
  );
  const slot0 = await pool.slot0();
  const liquidityBN = await pool.liquidity();
  const liquidity = Number(ethers.BigNumber.from(liquidityBN));
  const sqrtPriceX96 = BigInt(slot0.sqrtPriceX96);
  let price = getPrice(sqrtPriceX96);
  console.log('sqrtPriceX96:', sqrtPriceX96);
  console.log('Current price token1/token0:', price);
  console.log(
    'Current price:',
    secondValue.value /
      price /
      10 ** (selectedPair.value.pair[0].decimals - selectedPair.value.pair[1].decimals),
  );
  onSecondInput(e);
  firstValue.value =
    secondValue.value /
    price /
    10 ** (selectedPair.value.pair[0].decimals - selectedPair.value.pair[1].decimals);
}
</script>

<template>
  <AppModal :isOpen="isModalOpen" @close="closeModal">
    <ModalTokens @selectToken="selectToken" @close="closeModal" />
  </AppModal>
  <div class="pools-creation-deposit">
    <div class="pools-creation-deposit-head">
      <span class="pools-creation-deposit-head__title">Deposit tokens</span>
      <span class="pools-creation-deposit-head__text"
        >Choose the amount of tokens to supply for liquidity.</span
      >
    </div>
    <div class="pools-creation-deposit__tokens">
      <div class="pools-creation-deposit__token-first">
        <input
          type="number"
          class="pools-creation-deposit__input-first"
          name="deposit-input-first"
          value="0"
          v-model="firstValue"
          @input="inputAmountA"
        />
        <button class="pools-creation-deposit__btn-max" @click="setMaxFirst">
          ${{ max.toLocaleString('ru-RU').replace('.', ',') }}
        </button>
        <span class="pools-creation-deposit__max-text">
          ${{ max.toLocaleString('ru-RU').replace('.', ',') }} USDT <span>Max</span>
        </span>
        <UIButtonModal
          class="pools-creation-deposit__modal-btn"
          :url="selectedPair.pair[0].logoUrl"
          :text="selectedPair.pair[0].name"
        />

        <!-- <span class="pools-creation-deposit__modal-btn">
          <span> <img :src="selectedPair.pair[0].logoUrl" alt="" /></span>
          {{ selectedPair.pair[0].name }}
        </span> -->
      </div>
      <div class="pools-creation-deposit__token-second">
        <input
          type="number"
          class="pools-creation-deposit__input-second"
          name="deposit-input-second"
          value="0"
          v-model="secondValue"
          @input="inputAmountB"
        />
        <button class="pools-creation-deposit__btn-max" @click="setMaxSecond">
          ${{ max.toLocaleString('ru-RU').replace('.', ',') }}
        </button>
        <span class="pools-creation-deposit__max-text">
          ${{ max.toLocaleString('ru-RU').replace('.', ',') }} USDT <span>Max</span>
        </span>
        <UIButtonModal
          class="pools-creation-deposit__modal-btn"
          :url="selectedPair.pair[1].logoUrl"
          :text="selectedPair.pair[1].name"
        />
      </div>
    </div>
    <div class="pools-creation-deposit__cut">
      <span class="pools-creation-deposit__cut-left"></span>
      <span class="pools-creation-deposit__cut-left-bottom"></span>
      <span class="pools-creation-deposit__cut-left-bottom-bg"></span>
      <span class="pools-creation-deposit__cut-right"></span>
      <span class="pools-creation-deposit__cut-right-bottom"></span>
      <span class="pools-creation-deposit__cut-right-bottom-bg"></span>
    </div>
  </div>
</template>

<style scoped>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.pools-creation-deposit {
  border-radius: 20px;
  background-color: #fff;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 19px;
  position: relative;
  padding-bottom: 84px;
}
.pools-creation-deposit__cut {
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
  .pools-creation-deposit__cut {
    display: none;
  }
}
.pools-creation-deposit__cut-left {
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
.pools-creation-deposit__cut-left-bottom {
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
.pools-creation-deposit__cut-left-bottom-bg {
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
.pools-creation-deposit__cut-right {
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
.pools-creation-deposit__cut-right-bottom {
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
.pools-creation-deposit__cut-right-bottom-bg {
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
.pools-creation-deposit-head {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.pools-creation-deposit-head__title {
  font-family: var(--font-family);
  font-weight: 500;
  font-size: clamp(15px, 3vw, 20px);
  color: #22212e;
}

.pools-creation-deposit-head__text {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: clamp(11px, 3vw, 12px);
  color: #22212e;
  opacity: 0.5;
}

.pools-creation-deposit__tokens {
  display: flex;
  gap: 11px;
}
@media (max-width: 576px) {
  .pools-creation-deposit {
    border: none;
    backdrop-filter: none;
    background-color: transparent;
    padding: 0;
  }
  .pools-creation-deposit__tokens {
    flex-direction: column;
    gap: 10px;
  }
}
.pools-creation-deposit__token-first,
.pools-creation-deposit__token-second {
  position: relative;
  width: 100%;
}

.pools-creation-deposit__input-first,
.pools-creation-deposit__input-second {
  width: 100%;
  height: 90px;
  padding: 16px 0px 38px 22px;
  border: 1px solid #eeedf0;
  border-radius: 10px;
  background: #eeedf0;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 30px;
  color: #22212e;
  overflow: hidden;
}

.pools-creation-deposit__btn-max {
  position: absolute;
  left: 24px;
  bottom: 15px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 15px;
  color: rgba(34, 33, 46, 0.3);
  z-index: 1;
}

.pools-creation-deposit__max-text {
  display: flex;
  gap: 17px;
  position: absolute;
  right: 16px;
  bottom: 17px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  text-align: center;
  color: rgba(34, 33, 46, 0.3);
}
.pools-creation-deposit__max-text span {
  color: #9ddf1e;
}
@media (max-width: 576px) {
  .pools-creation-deposit__input-first,
  .pools-creation-deposit__input-second {
    background-color: #fff;
  }
}
::v-deep(.pools-creation-deposit__modal-btn) {
  position: absolute;
  top: 15px;
  right: 16px;
  background-color: transparent;
}
::v-deep(.pools-creation-deposit__modal-btn svg) {
  display: none;
}
</style>
