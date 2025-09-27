<script setup>
import AppModal from '@/components/AppModal.vue';
import ModalTokens from '../modals/ModalTokens.vue';
import UIButtonModal from '@/components/ui/UIButtonModal.vue';
import { useTradeStore } from '@/stores/TradeStore';
import { getQuote, getTokenBalance } from '@/blockchain/pools.js';
import { ethers } from 'ethers';
import { ref, provide, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { toReadableAmountWithDecimals, toFixedFloor } from '@/blockchain/functions';
import { trimDecimals } from '@/blockchain/functions';

const tradeStore = useTradeStore();

const { tokenA, tokenB, rate, rateToCurrency, feeToCurrency } = storeToRefs(tradeStore);

const isModalOpen = ref(false);
const openModalFor = ref(null);
const bottomToken = ref(null);
const upperToken = ref(null);
const upperTokenBalance = ref(0);
const bottomTokenBalance = ref(0);
const upperTokenBalanceToCurrency = ref(0);
const bottomTokenBalanceToCurrency = ref(0);
const currency = ref({ address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', decimals: 6 });

const openModal = () => (isModalOpen.value = true);

const closeModal = () => (isModalOpen.value = false);

provide('openModal', openModal);

const selectedUpperToken = ref({
  name: 'USDC',
  symbol: 'USDC',
  logo: 'https://etherscan.io/token/images/usdc_ofc_32.svg',
  address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
  decimals: 6,
});
const selectedBottomToken = ref({
  name: 'WETH',
  symbol: 'WETH',
  logo: 'https://etherscan.io/token/images/weth_28.png?v=2',
  address: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
  decimals: 18,
});

onMounted(async () => {
  upperTokenBalance.value = toReadableAmountWithDecimals(
    await getTokenBalance(selectedUpperToken.value.address),
    selectedUpperToken.value.decimals,
  );
  if (selectedUpperToken.value.address === currency.value.address) {
    upperTokenBalanceToCurrency.value = upperTokenBalance.value;
  } else {
    let op = await getQuote(
      selectedUpperToken.value.address,
      currency.value.address,
      500,
      ethers.utils.parseUnits(
        upperTokenBalance.value.toString(),
        selectedUpperToken.value.decimals,
      ),
      0,
    );
    upperTokenBalanceToCurrency.value = parseFloat(
      ethers.utils.formatUnits(op.amountOut, currency.value.decimals),
    );
  }

  bottomTokenBalance.value = toReadableAmountWithDecimals(
    await getTokenBalance(selectedBottomToken.value.address),
    selectedBottomToken.value.decimals,
  );
  if (selectedBottomToken.value.address === currency.value.address) {
    bottomTokenBalanceToCurrency.value = bottomTokenBalance.value;
  } else {
    let op = await getQuote(
      selectedBottomToken.value.address,
      currency.value.address,
      500,
      ethers.utils.parseUnits(
        bottomTokenBalance.value.toString(),
        selectedBottomToken.value.decimals,
      ),
      0,
    );
    bottomTokenBalanceToCurrency.value = parseFloat(
      ethers.utils.formatUnits(op.amountOut, currency.value.decimals),
    );
  }

  if (selectedUpperToken.value.address !== selectedBottomToken.value.address) {
    let op = await getQuote(
      selectedUpperToken.value.address,
      selectedBottomToken.value.address,
      500,
      ethers.utils.parseUnits('1', selectedUpperToken.value.decimals),
      0,
    );
    rate.value = parseFloat(
      ethers.utils.formatUnits(op.amountOut, selectedBottomToken.value.decimals),
    );
  } else {
    rate.value = 1;
  }
  if (selectedUpperToken.value.address !== currency.value.address) {
    let op = await getQuote(
      selectedUpperToken.value.address,
      currency.value.address,
      500,
      ethers.utils.parseUnits('1', selectedUpperToken.value.decimals),
      0,
    );
    rateToCurrency.value = parseFloat(
      ethers.utils.formatUnits(op.amountOut, currency.value.decimals),
    );
  } else {
    rateToCurrency.value = '1.00';
  }

  tokenA.value.address = selectedUpperToken.value.address;
  tokenA.value.decimals = selectedUpperToken.value.decimals;
  tokenA.value.symbol = selectedUpperToken.value.symbol;
  tokenB.value.address = selectedBottomToken.value.address;
  tokenB.value.decimals = selectedBottomToken.value.decimals;
  tokenB.value.symbol = selectedBottomToken.value.symbol;
});

const selectToken = async (token) => {
  if (openModalFor.value === 'upper') {
    selectedUpperToken.value = {
      name: token.title,
      symbol: token.symbol,
      logo: token.logo,
      address: token.address,
      decimals: token.decimals,
    };
    upperTokenBalance.value = toReadableAmountWithDecimals(
      await getTokenBalance(selectedUpperToken.value.address),
      selectedUpperToken.value.decimals,
    );
    if (selectedUpperToken.value.address === currency.value.address) {
      upperTokenBalanceToCurrency.value = upperTokenBalance.value;
    } else {
      let op = await getQuote(
        selectedUpperToken.value.address,
        currency.value.address,
        500,
        ethers.utils.parseUnits(
          upperTokenBalance.value.toString(),
          selectedUpperToken.value.decimals,
        ),
        0,
      );
      upperTokenBalanceToCurrency.value = parseFloat(
        ethers.utils.formatUnits(op.amountOut, currency.value.decimals),
      );
    }
    tokenA.value.address = selectedUpperToken.value.address;
    tokenA.value.decimals = selectedUpperToken.value.decimals;
    tokenA.value.symbol = selectedUpperToken.value.name;
  } else if (openModalFor.value === 'bottom') {
    selectedBottomToken.value = {
      name: token.title,
      symbol: token.symbol,
      logo: token.logo,
      address: token.address,
      decimals: token.decimals,
    };
    bottomTokenBalance.value = toReadableAmountWithDecimals(
      await getTokenBalance(selectedBottomToken.value.address),
      selectedBottomToken.value.decimals,
    );
    if (selectedBottomToken.value.address === currency.value.address) {
      bottomTokenBalanceToCurrency.value = bottomTokenBalance.value;
    } else {
      let op = await getQuote(
        selectedBottomToken.value.address,
        currency.value.address,
        500,
        ethers.utils.parseUnits(
          bottomTokenBalance.value.toString(),
          selectedBottomToken.value.decimals,
        ),
        0,
      );
      bottomTokenBalanceToCurrency.value = parseFloat(
        ethers.utils.formatUnits(op.amountOut, currency.value.decimals),
      );
    }
    tokenB.value.address = selectedBottomToken.value.address;
    tokenB.value.decimals = selectedBottomToken.value.decimals;
    tokenB.value.symbol = selectedBottomToken.value.symbol;
  }
  if (selectedUpperToken.value.address !== selectedBottomToken.value.address) {
    let op = await getQuote(
      selectedUpperToken.value.address,
      selectedBottomToken.value.address,
      500,
      ethers.utils.parseUnits('1', selectedUpperToken.value.decimals),
      0,
    );
    rate.value = parseFloat(
      ethers.utils.formatUnits(op.amountOut, selectedBottomToken.value.decimals),
    );
  } else {
    rate.value = 1;
  }
  if (selectedUpperToken.value.address !== currency.value.address) {
    let op = await getQuote(
      selectedUpperToken.value.address,
      currency.value.address,
      500,
      ethers.utils.parseUnits('1', selectedUpperToken.value.decimals),
      0,
    );
    rateToCurrency.value = parseFloat(
      ethers.utils.formatUnits(op.amountOut, currency.value.decimals),
    );
  } else {
    rateToCurrency.value = '1.00';
  }
  openModalFor.value = null;
};

async function onTokenAInput(e) {
  let filtered = e.target.value.replace(',', '.');
  filtered = filtered.replace(/[^0-9.]/g, '');
  if (/^0[0-9]+/.test(filtered)) {
    filtered = filtered.replace(/^0+/, '');
  }
  if (filtered === '' || filtered === '0') {
    tokenB.value.amount = '0';
    tokenA.value.amount = '0';
    feeToCurrency.value = '0.00';
    return;
  }
  const parts = filtered.split('.');
  if (parts.length > 2) {
    filtered = parts[0] + '.' + parts.slice(1).join('');
  }
  tokenA.value.amount = filtered;
  if (selectedUpperToken.value.address !== selectedBottomToken.value.address) {
    let op = await getQuote(
      selectedUpperToken.value.address,
      selectedBottomToken.value.address,
      500,
      ethers.utils.parseUnits(filtered, selectedUpperToken.value.decimals),
      0,
    );
    tokenB.value.amount = parseFloat(
      ethers.utils.formatUnits(op.amountOut, selectedBottomToken.value.decimals),
    );
  }
  if (selectedUpperToken.value.address !== currency.value.address) {
    let feeEstimate = await getQuote(
      selectedUpperToken.value.address,
      currency.value.address,
      500,
      ethers.utils.parseUnits(
        trimDecimals(Number(filtered) * 0.05, selectedUpperToken.value.decimals).toString(),
        selectedUpperToken.value.decimals,
      ),
      0,
    );
    feeToCurrency.value = parseFloat(
      ethers.utils.formatUnits(feeEstimate.amountOut, currency.value.decimals),
    );
  } else {
    feeToCurrency.value = (Number(filtered) * 0.05).toString();
  }
}

async function onTokenBInput(e) {
  let filtered = e.target.value.replace(',', '.');
  filtered = filtered.replace(/[^0-9.]/g, '');
  if (/^0[0-9]+/.test(filtered)) {
    filtered = filtered.replace(/^0+/, '');
  }
  if (filtered === '' || filtered === '0') {
    tokenB.value.amount = '0';
    tokenA.value.amount = '0';
    return;
  }
  const parts = filtered.split('.');
  if (parts.length > 2) {
    filtered = parts[0] + '.' + parts.slice(1).join('');
  }
  tokenB.value.amount = filtered;
  if (selectedUpperToken.value.address !== selectedBottomToken.value.address) {
    let op = await getQuote(
      selectedBottomToken.value.address,
      selectedUpperToken.value.address,
      500,
      ethers.utils.parseUnits(filtered, selectedBottomToken.value.decimals),
      0,
    );
    tokenA.value.amount = parseFloat(
      ethers.utils.formatUnits(op.amountOut, selectedUpperToken.value.decimals),
    );
  }
  if (selectedBottomToken.value.address !== currency.value.address) {
    let feeEstimate = await getQuote(
      selectedBottomToken.value.address,
      currency.value.address,
      500,
      ethers.utils.parseUnits(
        trimDecimals(Number(filtered) * 0.05, selectedBottomToken.value.decimals).toString(),
        selectedBottomToken.value.decimals,
      ),
      0,
    );
    feeToCurrency.value = parseFloat(
      ethers.utils.formatUnits(feeEstimate.amountOut, currency.value.decimals),
    );
  } else {
    feeToCurrency.value = (Number(filtered) * 0.05).toString();
  }
}
</script>

<template>
  <AppModal :isOpen="isModalOpen" @close="closeModal">
    <ModalTokens @selectToken="selectToken" @close="closeModal" />
  </AppModal>

  <ul class="swop__cards-list">
    <li class="swop__card">
      <span class="swop__card-top-name" v-if="tradeStore.currentTab === 'swap'">
        SWAP
        <span class="card-angle-left-top"></span>
        <span class="card-angle-left-bottom"></span>
        <span class="card-angle-left-bottom-bg"></span>
        <span class="card-angle-right-top"></span>
        <span class="card-angle-right-bottom"></span>
        <span class="card-angle-right-bottom-bg"></span>
      </span>

      <div class="swop__stats">
        <div class="swop__sell">
          <span class="swop__sell-name">Sell</span>
          <input
            type="text"
            class="swop__sell-number"
            name="deposit-input-a"
            value="0"
            v-model="tokenA.amount"
            @input="onTokenAInput"
          />
        </div>

        <div class="swop__balance">
          <span class="swop__balance-name">Your balance</span>

          <div class="swop__balance-counts">
            <span class="swop__balance-current">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 6.43196V2.93261C14 2.10087 14 1.685 13.8248 1.42943C13.6717 1.20614 13.4346 1.05445 13.1678 1.00904C12.8623 0.957056 12.4847 1.13133 11.7295 1.47988L2.85901 5.57395C2.18551 5.8848 1.84875 6.04022 1.60211 6.28127C1.38406 6.49438 1.21762 6.75451 1.1155 7.04179C1 7.36675 1 7.73764 1 8.47942V13.432M14.5 12.932H14.51M1 9.63196L1 16.232C1 17.3521 1 17.9121 1.21799 18.3399C1.40973 18.7163 1.71569 19.0222 2.09202 19.214C2.51984 19.432 3.07989 19.432 4.2 19.432H15.8C16.9201 19.432 17.4802 19.432 17.908 19.214C18.2843 19.0222 18.5903 18.7163 18.782 18.3399C19 17.9121 19 17.3521 19 16.232V9.63196C19 8.51185 19 7.9518 18.782 7.52398C18.5903 7.14765 18.2843 6.84169 17.908 6.64995C17.4802 6.43196 16.9201 6.43196 15.8 6.43196L4.2 6.43196C3.0799 6.43196 2.51984 6.43196 2.09202 6.64994C1.7157 6.84169 1.40973 7.14765 1.21799 7.52398C1 7.9518 1 8.51185 1 9.63196ZM15 12.932C15 13.2081 14.7761 13.432 14.5 13.432C14.2239 13.432 14 13.2081 14 12.932C14 12.6558 14.2239 12.432 14.5 12.432C14.7761 12.432 15 12.6558 15 12.932Z"
                  stroke="#22212E"
                  stroke-opacity="0.6"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span class="swop__balance-value"
                >{{ Math.floor(upperTokenBalance)
                }}<span
                  >.{{
                    (upperTokenBalance.toString().split('.')[1] || '')
                      .slice(0, 10)
                      .replace(/0+$/, '') || '0'
                  }}</span
                ></span
              >
            </span>
            <span class="swop__balance-dollar"
              >${{ Math.floor(upperTokenBalanceToCurrency)
              }}<span
                >.{{
                  toFixedFloor(upperTokenBalanceToCurrency, 2).toString().split('.')[1] || '0'
                }}</span
              >
            </span>
          </div>
        </div>
        <div class="swop__arrow">
          <span class="swop__arrow-angle-left"></span>
          <span class="swop__arrow-angle-left-top"></span>
          <span class="swop__arrow-angle-left-bg"></span>
          <span class="swop__arrow-angle-right"></span>
          <span class="swop__arrow-angle-right-top"></span>
          <span class="swop__arrow-angle-right-bg"></span>
          <svg
            width="14"
            height="18"
            viewBox="0 0 14 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1V17M7 17L13 11M7 17L1 11"
              stroke="#9DDF1E"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <UIButtonModal
        class="swop__tokens-btn"
        :url="selectedUpperToken.logo"
        :text="selectedUpperToken.name"
        @click="
          openModalFor = 'upper';
          isModalOpen = true;
        "
      />
    </li>

    <li class="swop__card">
      <span class="swop__card-top-name">
        SWAP
        <span class="card-angle-left-top"></span>
        <span class="card-angle-left-bottom"></span>
        <span class="card-angle-left-bottom-bg"></span>
        <span class="card-angle-right-top"></span>
        <span class="card-angle-right-bottom"></span>
        <span class="card-angle-right-bottom-bg"></span>
      </span>
      <div class="swop__stats">
        <div class="swop__sell">
          <span class="swop__sell-name">Buy</span>

          <input
            type="text"
            class="swop__sell-number"
            name="deposit-input-a"
            value="0"
            v-model="tokenB.amount"
            @input="onTokenBInput"
          />
        </div>

        <div class="swop__balance">
          <span class="swop__balance-name">Your balance</span>

          <div class="swop__balance-counts">
            <span class="swop__balance-current">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 6.43196V2.93261C14 2.10087 14 1.685 13.8248 1.42943C13.6717 1.20614 13.4346 1.05445 13.1678 1.00904C12.8623 0.957056 12.4847 1.13133 11.7295 1.47988L2.85901 5.57395C2.18551 5.8848 1.84875 6.04022 1.60211 6.28127C1.38406 6.49438 1.21762 6.75451 1.1155 7.04179C1 7.36675 1 7.73764 1 8.47942V13.432M14.5 12.932H14.51M1 9.63196L1 16.232C1 17.3521 1 17.9121 1.21799 18.3399C1.40973 18.7163 1.71569 19.0222 2.09202 19.214C2.51984 19.432 3.07989 19.432 4.2 19.432H15.8C16.9201 19.432 17.4802 19.432 17.908 19.214C18.2843 19.0222 18.5903 18.7163 18.782 18.3399C19 17.9121 19 17.3521 19 16.232V9.63196C19 8.51185 19 7.9518 18.782 7.52398C18.5903 7.14765 18.2843 6.84169 17.908 6.64995C17.4802 6.43196 16.9201 6.43196 15.8 6.43196L4.2 6.43196C3.0799 6.43196 2.51984 6.43196 2.09202 6.64994C1.7157 6.84169 1.40973 7.14765 1.21799 7.52398C1 7.9518 1 8.51185 1 9.63196ZM15 12.932C15 13.2081 14.7761 13.432 14.5 13.432C14.2239 13.432 14 13.2081 14 12.932C14 12.6558 14.2239 12.432 14.5 12.432C14.7761 12.432 15 12.6558 15 12.932Z"
                  stroke="#22212E"
                  stroke-opacity="0.6"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span class="swop__balance-value"
                >{{ Math.floor(bottomTokenBalance)
                }}<span
                  >.{{
                    (bottomTokenBalance.toString().split('.')[1] || '')
                      .slice(0, 10)
                      .replace(/0+$/, '') || '0'
                  }}</span
                ></span
              >
            </span>

            <span class="swop__balance-dollar"
              >${{ Math.floor(bottomTokenBalanceToCurrency)
              }}<span
                >.{{
                  toFixedFloor(bottomTokenBalanceToCurrency, 2).toString().split('.')[1] || '0'
                }}</span
              >
            </span>
          </div>
        </div>
      </div>

      <UIButtonModal
        class="swop__tokens-btn"
        :url="selectedBottomToken.logo"
        :text="selectedBottomToken.name"
        @click="
          openModalFor = 'bottom';
          isModalOpen = true;
        "
      />
    </li>
  </ul>
</template>

<style scoped>
.swop__cards-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
}

.swop__card {
  width: 100%;
  padding: 13px 25px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  position: relative;
  border: 1px solid #fff;
  border-radius: 24px;
  background-color: #fff;
}

.swop__arrow {
  position: absolute;
  bottom: -23px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px clamp(50px, 9vw, 90px);
  z-index: 4;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
}
.swop__arrow-angle-left {
  height: 21px;
  width: 21px;
  position: absolute;
  left: 0px;
  background-color: #fff;
  border-bottom-left-radius: 16px;
  z-index: 1;
}
.swop__arrow-angle-left-top {
  height: 10px;
  width: 10px;
  position: absolute;
  left: -9px;
  top: 6px;
  background-color: #eeedf0;
  border-top-right-radius: 24px;
  z-index: 2;
}
.swop__arrow-angle-left-bg {
  height: 21px;
  width: 21px;
  position: absolute;
  left: -7px;
  background-color: #fff;
  z-index: 1;
  top: -7px;
}
.swop__arrow-angle-right {
  height: 21px;
  width: 21px;
  position: absolute;
  right: 0px;
  background-color: #fff;
  border-bottom-right-radius: 16px;
  z-index: 1;
}
.swop__arrow-angle-right-top {
  height: 10px;
  width: 10px;
  position: absolute;
  right: -9px;
  top: 6px;
  background-color: #eeedf0;
  border-top-left-radius: 24px;
  z-index: 2;
}
.swop__arrow-angle-right-bg {
  height: 21px;
  width: 21px;
  position: absolute;
  right: -7px;
  background-color: #fff;
  z-index: 1;
  top: -7px;
}
.card-angle-left-top {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #fff;
  border-top-right-radius: 36px;
  left: 0;
  bottom: 0;
  z-index: 1;
}
.card-angle-left-bottom {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #eeedf0;
  border-bottom-left-radius: 25px;
  left: 15px;
  bottom: 0;
  z-index: 3;
}
.card-angle-left-bottom-bg {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #fff;
  left: 15px;
  bottom: -16px;
  z-index: 2;
}
.card-angle-right-top {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #fff;
  border-top-left-radius: 36px;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.card-angle-right-bottom {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #eeedf0;
  border-bottom-right-radius: 25px;
  right: 15px;
  bottom: 0;
  z-index: 3;
}
.card-angle-right-bottom-bg {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #fff;
  right: 15px;
  bottom: -16px;
  z-index: 2;
}
.swop__card-top-name {
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
.swop__card:last-child .swop__card-top-name {
  color: transparent;
}
.swop__arrow-item {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: 1px solid #ffffff38;
  border-radius: 10px;
  backdrop-filter: blur(12.100000381469727px);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background: #2a2a31;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.swop__stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.swop__sell {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
}

.swop__balance {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.swop__sell-name,
.swop__balance-name {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(8px, 3vw, 12px);
  color: #22212e;
  opacity: 0.5;
}
.swop__sell-number {
  width: clamp(29px, 19vw, 151px);
  border: none;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(29px, 3vw, 40px);
  color: #22212e;
  align-items: start;
}
.swop__balance-counts {
  display: flex;
  gap: 23px;
  align-items: end;
}

@media (max-width: 576px) {
  .swop__balance-counts {
    gap: 17px;
  }
}

.swop__balance-current {
  display: flex;
  align-items: center;
}

.swop__balance-current svg {
  margin-right: 6px;
}

.swop__balance-value {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(17px, 3vw, 23px);
  color: rgba(34, 33, 46, 0.3);
}

.swop__balance-value span {
  font-size: clamp(8px, 3vw, 11px);
}

.swop__balance-dollar {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(11px, 3vw, 15px);
  text-align: center;
  color: rgba(34, 33, 46, 0.3);
}

.swop__balance-dollar span {
  font-size: 7px;
}

::v-deep(.swop__tokens-btn) {
  margin-top: 21px;
}

.swop__token-name {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 20px;
  color: #fff;
  margin-left: 7px;
  margin-right: 4px;
}

.swop__dropdown {
  margin-top: 21px;
  background: rgba(217, 217, 217, 0.1);
  gap: 7px;
  display: flex;
  align-items: center;
  max-width: 100px;
  width: 100%;
  height: 35px;
  border-radius: 50px;
  padding: 5px;
}

.swop__dropdown span {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #505050;
}
</style>
