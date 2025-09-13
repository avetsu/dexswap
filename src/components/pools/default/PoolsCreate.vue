<script setup>
import { ref, useId, onMounted, onUnmounted, watch } from 'vue';
import { usePoolStore } from '@/stores/PoolStore';
import { useRouter } from 'vue-router';
const router = useRouter();
const poolStore = usePoolStore();
const positionStatus = ref([
  {
    id: useId(),
    name: 'Status',
    type: null,
  },
  {
    id: useId(),
    name: 'In range',
    type: 'created',
  },
  {
    id: useId(),
    name: 'Closed',
    type: 'closed',
  },
]);

const currentStatus = ref('Status');
const isDropDownOpen = ref(false);
const changeStatus = (name) => {
  currentStatus.value = name;
  isDropDownOpen.value = false;
};
const dropdownRef = ref(null);

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropDownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const handleCreateClick = () => {
  poolStore.isCreating = true;
  router.push({ name: 'create' });
};

defineProps({
  resultData: Array,
});

const localData = ref(null);

watch(
  () => poolStore.finalData,
  (newData) => {
    localData.value = newData;
  },
  { immediate: true, deep: true },
);

const filtredArr = ref([]);

watch(
  localData,
  (newData) => {
    if (newData) {
      filtredArr.value = newData.map((item) => ({ ...item }));
    }
  },
  { immediate: true },
);

function changeTokensList(status) {
  if (status === 'Status') {
    filtredArr.value = [...localData.value];
    return;
  }
  const isStatusExist = positionStatus.value.some((item) => item.name === status);

  let statusType = null;

  if (isStatusExist) {
    statusType = positionStatus.value.find((item) => item.name === status).type;

    filtredArr.value = localData.value.filter((item) => item.depositData.type === statusType);
  } else {
    filtredArr.value = [...localData.value];
  }
}

const isSearchHelp = ref(true);
</script>

<template>
  <div class="pool-create" :class="{ poolFilled: localData }">
    <h2 class="pools__title">Your positions</h2>
    <div class="pool-create__btns" ref="dropdownRef">
      <button class="pool-create__new-btn" @click="handleCreateClick">
        <span>+ New</span>
      </button>
      <button class="pool-create__status-btn" @click="isDropDownOpen = !isDropDownOpen">
        {{ currentStatus }}
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
        <ul class="pool-create__status-list" v-if="isDropDownOpen">
          <li
            class="pool-create__status-item"
            v-for="status in positionStatus"
            :key="status.id"
            @click="(changeStatus(status.name), changeTokensList(currentStatus))"
          >
            {{ status.name }}
          </li>
        </ul>
      </Transition>
    </div>
    <TransitionGroup tag="ul" class="pool-create__list" v-if="localData" name="blur">
      <li class="pool-create__item" v-for="pool in filtredArr" :key="pool.id">
        <div class="pool-create__head">
          <div class="pool-create__head-img">
            <img :src="pool.pairData.tokens.logoUrl" alt="" />
          </div>
          <div class="pool-create__head-content">
            <div class="pool-create__head-name">
              <span class="pool-create__head-tokens-name">
                {{ pool.pairData.tokens.first }} / {{ pool.pairData.tokens.second }}
              </span>
              <span class="pool-create__head-tokens-commission">
                <span> {{ pool.pairData.commission }}%</span>
              </span>
            </div>
            <span
              class="pool-create__head-status"
              :class="{
                created: pool.depositData.type === 'created',
                closed: pool.depositData.type !== 'created',
              }"
            >
              {{ pool.depositData.type === 'created' ? '• Within the range' : '• Closed' }}
            </span>
          </div>
        </div>
        <div class="pool-create__data">
          <div class="pool-create__data-position">
            <span class="pool-create__data-value">$6,49</span>
            <span class="pool-create__data-name">Position</span>
          </div>
          <div class="pool-create__data-commission">
            <span class="pool-create__data-value">0,42%</span>
            <span class="pool-create__data-name">APR</span>
          </div>
          <div class="pool-create__data-apr">
            <span class="pool-create__data-value">$6,49</span>
            <span class="pool-create__data-name">Fees</span>
          </div>
          <div class="pool-create__data-minmax">
            <span class="pool-create__data-min"
              >Мин.
              <span
                >{{ pool.priceData.minValue }} {{ pool.priceData.wallet.selected }} /
                {{ pool.priceData.wallet.notSelected }}</span
              ></span
            >
            <span class="pool-create__data-max"
              >Макс.
              <span
                >{{ pool.priceData.maxValue }} {{ pool.priceData.wallet.selected }} /
                {{ pool.priceData.wallet.notSelected }}</span
              ></span
            >
          </div>
        </div>
      </li>
    </TransitionGroup>
    <div
      class="pool-create__help"
      v-if="!localData || (Array.isArray(localData) && localData.length === 0)"
    >
      <div class="pool-create__help-img">
        <img :src="'/icons/pool-create.svg'" alt="pool-create logo" />
      </div>
      <div class="pool-create__help-content">
        <span class="pool-create__help-title">Open a pool position</span>
        <span class="pool-create__help-text"
          >Here you can add liquidity to the pool and view your positions.</span
        >
      </div>
    </div>
    <div
      class="pool-create__search-help"
      v-if="!(Array.isArray(localData) && localData.length === 0) && isSearchHelp"
    >
      <span class="pool-create__search-img">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 15V11M11 7H11.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
            stroke="#58FF84"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <div class="pool-create__search-help-content">
        <span class="pool-create__search-title">Need to see your closed positions? </span>
        <span class="pool-create__search-text"
          >Simply use the filter above.</span
        >
      </div>
      <button class="pool-create__search-close-btn" @click="isSearchHelp = !isSearchHelp">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.3"
            d="M11 1L1 11M1 1L11 11"
            stroke="#22212E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.blur-enter-active {
  transition:
    opacity 0.5s ease,
    filter 0.5s ease;
}
.blur-enter-from {
  opacity: 0;
  filter: blur(10px);
}
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
.pool-create {
  display: flex;
  flex-direction: column;
  max-width: 660px;
  width: 100%;
}
@media (max-width: 768px) {
  .pool-create {
    max-width: none;
  }
}
.pool-create__status-btn svg {
  transition: all 0.3s ease;
}
.pool-list__status-open {
  transform: rotate(180deg);
}

.pools__title {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: clamp(20px, 3vw, 30px);
  color: #22212e;
  margin-bottom: 32px;
}

.pool-create__btns {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  margin-bottom: 25px;
}

.pool-create__new-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  max-width: 116px;
  width: 100%;
  background: #9ddf1e;
  font-family: var(--third-family);
  font-weight: 700;
  font-size: 12px;
  color: #000;
  padding: 11px 0;
  transition: opacity 0.3s ease;
}

.pool-create__new-btn:hover {
  opacity: 0.8;
}

.pool-create__status-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  max-width: fit-content;
  padding: 11px 19px;
  border-radius: 18px;
  background: rgba(34, 33, 46, 0.1);
  font-family: var(--third-family);
  font-weight: 700;
  font-size: 12px;
  color: #22212e;
}

.pool-create__status-list {
  background-color: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 100px;
  width: 100%;
  position: absolute;
  top: 40px;
  left: 135px;
  overflow: hidden;
  z-index: 1;
}

.pool-create__status-item {
  font-family: var(--third-family);
  font-weight: 700;
  font-size: 12px;
  color: #0f0f16;
  width: 100%;
  cursor: pointer;
  padding: 3px 10px;
  transition: all 0.3s ease;
}

.pool-create__status-item:hover {
  background-color: #79797a;
  color: #fff;
}

.pool-create__help {
  border-radius: 10px;
  background: #fff;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 14px;
}

.pool-create__help-img {
  width: 47px;
  height: 47px;
  border-radius: 5px;
  background: #9ddf1e;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pool-create__help-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.pool-create__help-title {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 15px;
  color: #22212e;
}
.pool-create__help-text {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 12px;
  color: #22212e;
}
.poolFilled {
  max-width: 790px;
  width: 100%;
}

.pool-create__list {
  display: flex;
  flex-direction: column;

  gap: 18px;
}

.pool-create__item {
  border-radius: 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 34px;
  padding: 23px 24px 31px 24px;
}

.pool-create__head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pool-create__head-img {
  height: 51px;
  width: 51px;
  border-radius: 50%;
  background-color: #eeedf0;
  flex-shrink: 0;
}

.pool-create__head-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.pool-create__head-name {
  display: flex;
  align-items: center;
  gap: 15px;
}

.pool-create__head-tokens-name {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  color: #22212e;
}

.pool-create__head-tokens-commission {
  border-radius: 14px;
  background: rgba(34, 33, 46, 0.05);
  padding: 3px 8px;
  max-width: fit-content;
  max-height: 17px;
  display: flex;
  align-items: center;
}
.pool-create__head-tokens-commission span {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 8px;
  color: #22212e;
  opacity: 0.5;
}

.pool-create__head-status {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
}
.pool-create__head-status.created {
  color: #9ddf1e;
}
.pool-create__head-status.closed {
  color: rgba(34, 33, 46, 0.5);
}

.pool-create__data {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  max-width: 555px;
  width: 100%;
}

.pool-create__data-position,
.pool-create__data-commission,
.pool-create__data-apr,
.pool-create__data-minmax {
  display: flex;
  flex-direction: column;
  gap: 11px;
}
@media (max-width: 576px) {
  .pool-create__list {
    gap: 10px;
  }
  .pool-create__item {
    padding: 23px 28px 18px 24px;
  }
  .pool-create__data {
    flex-wrap: wrap;
    justify-content: start;
    gap: 33px;
  }
  .pool-create__data-minmax {
    flex-direction: row;
    gap: 34px;
  }
}
.pool-create__data-value {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  color: #22212e;
}
.pool-create__data-name {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  color: #22212e;
  opacity: 0.5;
}

.pool-create__data-min,
.pool-create__data-max {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  color: #22212e81;
}
.pool-create__data-min span,
.pool-create__data-max span {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  color: #22212e;
  margin-left: 10px;
}

.pool-create__search-help {
  border-radius: 10px;
  background: #fff;
  display: flex;
  align-items: center;
  gap: 26px;
  padding: 17px 24px 24px 24px;
  position: relative;
  margin-top: 18px;
}

.pool-create__search-help-content {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.pool-create__search-title {
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 16px;
  color: #22212e;
}
.pool-create__search-text {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 12px;
  color: #22212e;
  opacity: 0.5;
}
.pool-create__search-close-btn {
  position: absolute;
  right: 27px;
  top: 27px;
}
@media (max-width: 576px) {
  .pool-create__search-help {
    padding: 19px 40px 13px 24px;
    align-items: start;
    gap: 13px;
  }
  .pool-create__search-help-content {
    gap: 7px;
  }
  .pool-create__search-close-btn {
    top: 15px;
    right: 15px;
  }
}
</style>
