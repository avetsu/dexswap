<script setup>
import { ref, useId } from 'vue';
import { ethers } from 'ethers';
import PoolsCreationPair from '@/components/pools/creation/PoolsCreationPair.vue';
import PoolsCreationPrices from '@/components/pools/creation/PoolsCreationPrices.vue';
import PoolsCreationDeposit from '@/components/pools/creation/PoolsCreationDeposit.vue';
import { usePoolStore } from '@/stores/PoolStore';
import { usePoolStepsStore } from '@/stores/PoolStepsStore';
import { usePoolPairStore } from '@/stores/PoolPairStore';
import { usePoolPricesStore } from '@/stores/PoolPricesStore';
import { usePoolDepositStore } from '@/stores/PoolDepositStore';
import {
  getNFPMContract,
  approveTokens,
  getPoolAddress,
  NFPM_ADDRESS,
} from '@/components/blockchain/pools';
import { useWallet, connectWallet } from '@/components/blockchain/wallet';
import { getSqrtPriceX96, priceToTick, trimDecimals } from '@/components/blockchain/functions';
import { FeeAmount, TICK_SPACINGS } from '@/components/blockchain/constants';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const router = useRouter();

const poolStore = usePoolStore();
const stepsStore = usePoolStepsStore();
const pairStore = usePoolPairStore();
const pricesStore = usePoolPricesStore();
const depositStore = usePoolDepositStore();

const { currentStep } = storeToRefs(stepsStore);
const { selectedPair } = storeToRefs(pairStore);
const { computedPrice } = storeToRefs(pricesStore);
const { firstValue, secondValue } = storeToRefs(depositStore);

const { account } = useWallet();

// const sqrtPriceX96 = BigInt('237668512115345613750168369097');
// const Q96 = 2n ** 96n;

// const price = Number((sqrtPriceX96 * sqrtPriceX96) / (Q96 * Q96));

async function mintPosition() {
  const pair0 = selectedPair.value.pair[0];
  const pair1 = selectedPair.value.pair[1];
  const feeValue = selectedPair.value.commission * 10000;
  // const feeValue = 3000;
  console.log('feeValue', feeValue);

  if (!account.value) {
    await connectWallet();
  }

  await approveTokens(
    selectedPair.value.pair[0].address,
    NFPM_ADDRESS,
    ethers.utils.parseUnits(
      trimDecimals(firstValue.value, pair0.decimals).toString(),
      pair0.decimals,
    ),
  );
  await approveTokens(
    selectedPair.value.pair[1].address,
    NFPM_ADDRESS,
    ethers.utils.parseUnits(
      trimDecimals(secondValue.value, pair1.decimals).toString(),
      pair1.decimals,
    ),
  );

  const poolAddress = await getPoolAddress(pair0.address, pair1.address, feeValue);
  console.log('Pool Address', poolAddress);

  const nfpm = getNFPMContract();
  console.log('Computed Price:', computedPrice.value);
  console.log('Values:', firstValue.value, secondValue.value);

  const amount0 = ethers.utils.parseUnits(
    trimDecimals(firstValue.value, pair0.decimals).toString(),
    pair0.decimals,
  );
  const amount1 = ethers.utils.parseUnits(
    trimDecimals(secondValue.value, pair1.decimals).toString(),
    pair1.decimals,
  );
  let price = (amount1 * 10 ** 18) / amount0;
  price = price / 10 ** 18;
  const params = {
    token0: pair0.address,
    token1: pair1.address,
    fee: feeValue,
    tickLower: priceToTick(computedPrice.value.min, TICK_SPACINGS[feeValue]),
    tickUpper: priceToTick(computedPrice.value.max, TICK_SPACINGS[feeValue]),
    amount0Desired: amount0,
    amount1Desired: amount1,
    // amount0Min: ethers.utils.parseUnits(trimDecimals(firstValue.value / 1.01, 18).toString(), 18),
    // amount1Min: ethers.utils.parseUnits(trimDecimals(secondValue.value / 1.01, 6).toString(), 6),
    amount0Min: ethers.utils.parseUnits(trimDecimals(0, pair0.decimals).toString(), pair0.decimals),
    amount1Min: ethers.utils.parseUnits(trimDecimals(0, pair1.decimals).toString(), pair1.decimals),
    recipient: account.value,
    deadline: Math.floor(Date.now() / 1000) + 60 * 10,
  };

  try {
    await nfpm.createAndInitializePoolIfNecessary(
      pair0.address,
      pair1.address,
      feeValue,
      getSqrtPriceX96(price),
    );

    console.log('sqrtPriceX96:', getSqrtPriceX96(price));
    const tx = await nfpm.mint(params, { value: 0 });
    await tx.wait();
    console.log('Mint TX:', tx.hash);
    console.log('Liquidity position minted!');
  } catch (err) {
    console.error('Mint failed:', err);
  }
}

async function goBack() {
  if (currentStep.value === 3) {
    await mintPosition();
    router.back();
  }
}
async function handleContinueClickAndGoBack() {
  await goBack();
  poolStore.handleContinueClick();
}

const positions = ref([
  {
    id: useId(),
    name: 'Position 1',
  },
  {
    id: useId(),
    name: 'Position 2',
  },
  {
    id: useId(),
    name: 'Position 3',
  },
]);

const defualtPosition = ref('Position');
const isSelecting = ref(false);

const changePosition = (name) => {
  defualtPosition.value = name;
  isSelecting.value = true;
  isSelecting.value = false;
};
</script>
<template>
  <div class="proccess-wrapper" :class="{ 'second-step': currentStep > 1 }">
    <div class="proccess__btns" v-if="currentStep === 1">
      <button class="proccess__reset-btn" @click="poolStore.resetAll">
        Reset
        <svg
          width="14"
          height="13"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 5.27778C1 5.27778 2.2663 3.60836 3.29505 2.61226C4.3238 1.61616 5.74543 1 7.31579 1C10.4551 1 13 3.46243 13 6.5C13 9.53757 10.4551 12 7.31579 12C4.72436 12 2.53796 10.3221 1.85375 8.02778M1 5.27778V1.61111M1 5.27778H4.78947"
            stroke="#22212E"
            stroke-width="1.35"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="proccess__position">
        <button class="proccess__position-btn" @click="isSelecting = !isSelecting">
          {{ defualtPosition }}
          <svg
            width="11"
            height="6"
            viewBox="0 0 11 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.48603 1.45878L5.24301 5.02685L1 1.45878"
              stroke="#22212E"
              stroke-width="1.35"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <Transition name="fade">
          <ul class="proccess__position-list" v-if="isSelecting">
            <li
              class="proccess__position-item"
              v-for="position in positions"
              :key="position.id"
              @click="changePosition(position.name)"
            >
              {{ position.name }}
            </li>
          </ul>
        </Transition>
      </div>
      <button class="proccess__settings-btn">
        <svg
          width="20"
          height="22"
          viewBox="0 0 20 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="outer"
            d="M7.35012 18.3711L7.93457 19.6856C8.1083 20.0768 8.39184 20.4093 8.75079 20.6426C9.10974 20.8759 9.52867 21.0001 9.95679 21C10.3849 21.0001 10.8038 20.8759 11.1628 20.6426C11.5217 20.4093 11.8053 20.0768 11.979 19.6856L12.5635 18.3711C12.7715 17.9047 13.1215 17.5159 13.5635 17.26C14.0082 17.0034 14.5228 16.8941 15.0335 16.9478L16.4635 17.1C16.8891 17.145 17.3187 17.0656 17.7001 16.8713C18.0816 16.6771 18.3984 16.3763 18.6123 16.0056C18.8265 15.635 18.9286 15.2103 18.9061 14.7829C18.8836 14.3555 18.7376 13.9438 18.4857 13.5978L17.639 12.4344C17.3375 12.0171 17.1764 11.5148 17.179 11C17.1789 10.4866 17.3415 9.98635 17.6435 9.57111L18.4901 8.40778C18.742 8.06175 18.888 7.65007 18.9105 7.22267C18.933 6.79528 18.831 6.37054 18.6168 6C18.4029 5.62923 18.086 5.32849 17.7046 5.13423C17.3232 4.93997 16.8936 4.86053 16.4679 4.90556L15.0379 5.05778C14.5272 5.11141 14.0127 5.00212 13.5679 4.74556C13.125 4.48825 12.775 4.09736 12.5679 3.62889L11.979 2.31444C11.8053 1.92317 11.5217 1.59072 11.1628 1.3574C10.8038 1.12408 10.3849 0.99993 9.95679 1C9.52867 0.99993 9.10974 1.12408 8.75079 1.3574C8.39184 1.59072 8.1083 1.92317 7.93457 2.31444L7.35012 3.62889C7.14305 4.09736 6.79299 4.48825 6.35012 4.74556C5.90534 5.00212 5.39079 5.11141 4.88012 5.05778L3.44568 4.90556C3.02001 4.86053 2.59042 4.93997 2.20899 5.13423C1.82757 5.32849 1.51069 5.62923 1.29679 6C1.08261 6.37054 0.98057 6.79528 1.00305 7.22267C1.02554 7.65007 1.17158 8.06175 1.42345 8.40778L2.27012 9.57111C2.57206 9.98635 2.73466 10.4866 2.73456 11C2.73466 11.5134 2.57206 12.0137 2.27012 12.4289L1.42345 13.5922C1.17158 13.9382 1.02554 14.3499 1.00305 14.7773C0.98057 15.2047 1.08261 15.6295 1.29679 16C1.5109 16.3706 1.82782 16.6712 2.20918 16.8654C2.59055 17.0596 3.02004 17.1392 3.44568 17.0944L4.87568 16.9422C5.38634 16.8886 5.90089 16.9979 6.34568 17.2544C6.7902 17.511 7.14188 17.902 7.35012 18.3711Z"
            stroke="#22212E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.955 14C11.6119 14 12.955 12.6569 12.955 11C12.955 9.34315 11.6119 8 9.955 8C8.29815 8 6.955 9.34315 6.955 11C6.955 12.6569 8.29815 14 9.955 14Z"
            stroke="#22212E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <PoolsCreationPair ref="poolPairRef" />
    <transition name="fade" mode="out-in">
      <PoolsCreationPrices ref="poolPriceRef" v-if="currentStep !== 1" />
    </transition>
    <PoolsCreationDeposit ref="poolDepositRef" v-if="currentStep > 2" />
    <button class="proccess__continue-btn" @click="handleContinueClickAndGoBack">
      {{ currentStep === 3 ? 'Add liquidity' : 'Continue' }}
    </button>
  </div>
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
.proccess-wrapper {
  max-width: 790px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 39px;
}
.second-step {
  margin-top: 73px;
}
@media (max-width: 1000px) {
  .proccess-wrapper {
    max-width: none;
    gap: 15px;
  }
  .second-step {
    margin-top: 0px;
  }
}

.proccess__btns {
  display: flex;
  gap: 13px;
  align-items: center;
  align-self: end;
}
@media (max-width: 576px) {
  .proccess__btns {
    display: none;
  }
}
.proccess__reset-btn,
.proccess__position-btn {
  border-radius: 18px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 17px;
  max-width: fit-content;
  height: 36px;
  width: 100%;
  font-family: var(--third-family);
  font-weight: 700;
  font-size: 12px;
  color: #22212e;
  padding: 0 14px 0 18px;
  transition: opacity 0.3s ease;
}
.proccess__reset-btn:hover {
  opacity: 0.8;
}
.proccess__reset-btn svg {
  transition: all 0.5s ease-in-out;
}
.proccess__reset-btn:hover svg {
  transform: rotate(-360deg);
}

.proccess__position {
  position: relative;
}
.proccess__position-btn {
  gap: 10px;
}
.proccess__position-btn:hover svg {
  animation: arrowMove 0.5s ease-in-out;
}

@keyframes arrowMove {
  0% {
    transform: translateY(0);
  }
  33% {
    transform: translateY(3px);
  }
  66% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0);
  }
}
.proccess__position-btn:hover {
  opacity: 0.8;
}

.outer {
  transform-origin: center center;
}
.proccess__settings-btn:hover .outer {
  animation: zoomOut 0.5s ease-in-out;
}

@keyframes zoomOut {
  0% {
    transform: scale(1);
  }
  33% {
    transform: scale(1.1);
  }
  66% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

.proccess__position-list {
  position: absolute;
  width: 100%;
  bottom: -180%;
  border-radius: 12px;
  background-color: #fff;
  overflow: hidden;
  z-index: 10;
}
.proccess__position-item {
  font-family: var(--third-family);
  font-weight: 700;
  font-size: 12px;
  color: #0f0f16;
  width: 100%;
  cursor: pointer;
  padding: 3px 10px;
  transition: all 0.3s ease;
}
.proccess__position-item:hover {
  background-color: #79797a;
  color: #fff;
}
.proccess__continue-btn {
  margin-top: -69px;
  border-radius: 18px;
  background: #9ddf1e;
  max-width: 116px;
  width: 100%;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px;
  font-family: var(--third-family);
  font-weight: 700;
  font-size: 12px;
  color: #000;
  transition: opacity 0.3s ease;
  z-index: 4;
}
@media (max-width: 1000px) {
  .proccess__continue-btn {
    margin-top: -45px;
  }
}
@media (max-width: 578px) {
  .proccess__continue-btn {
    margin-top: 10px;
  }
}
.proccess__continue-btn:hover {
  opacity: 0.8;
}
</style>
