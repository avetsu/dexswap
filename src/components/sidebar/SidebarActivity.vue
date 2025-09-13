<script setup>
import { ref, useId } from 'vue';

const activities = ref([
  {
    id: useId(),
    type: {
      name: 'send',
      text: 'Received',
      iconUrl: '/icons/act-send.svg',
    },
    value: {
      count: 0.07,
      name: 'BNB',
    },
    wallet: '0хefiuvnfsklskwx...',
    time: '2d',
  },
  {
    id: useId(),
    type: {
      name: 'swop',
      text: 'Sent',
      iconUrl: '/icons/act-swop.svg',
    },
    values: {
      first: {
        name: 'BNB',
        count: 0.07,
      },
      second: {
        name: 'USDT',
        count: 450,
      },
    },
    time: '2d',
  },
  {
    id: useId(),
    type: {
      name: 'create',
      text: 'Swapped',
      iconUrl: '/icons/act-create-1.svg',
    },
    value: {
      count: 0.07,
      name: 'BNB',
    },
    wallet: '0хefiuvnfsklskwx...',
    time: '2d',
  },
  {
    id: useId(),
    type: {
      name: 'create',
      text: 'Staked',
      iconUrl: '/icons/act-create-2.svg',
    },
    value: {
      count: 0.07,
      name: 'BNB',
    },
    wallet: '0хefiuvnfsklskwx...',
    time: '2d',
  },
  {
    id: useId(),
    type: {
      name: 'create',
      text: 'Position created',
      iconUrl: '/icons/act-create-3.svg',
    },
    value: {
      count: 0.07,
      name: 'BNB',
    },
    wallet: '0хefiuvnfsklskwx...',
    time: '2d',
  },
  {
    id: useId(),
    type: {
      name: 'create',
      text: 'Position created',
      iconUrl: '/icons/act-create-4.svg',
    },
    value: {
      count: 0.07,
      name: 'BNB',
    },
    wallet: '0хefiuvnfsklskwx...',
    time: '2d',
  },
]);
</script>

<template>
  <ul class="activities__list">
    <li class="activities__item" v-for="activity in activities" :key="activity.id">
      <div class="acitivies__item-img">
        <img :src="activity.type.iconUrl" :alt="activity.type.text" />
      </div>
      <div class="activities__item-content">
        <div class="activities__item-upper">
          <span class="activities__item-name">
            {{ activity.type.text }}
          </span>
          <span class="activities__item-date"> {{ activity.time }} ago </span>
        </div>
        <div
          class="activities__item-in-wallet"
          v-if="activity.type.name === 'send' || activity.type.name === 'create'"
        >
          <span class="activities__item-in-wallet-value">
            {{ activity.value.count.toLocaleString('ru-RU').replace('.', ',') }}
            {{ activity.value.name }}
          </span>
          <span class="activities__item-in-wallet-text">To wallet</span>
          <span class="activities__item-in-wallet-name">{{ activity.wallet }} </span>
        </div>

        <div class="activities__item-swop" v-else-if="activity.type.name === 'swop'">
          <span class="activities__item-swop-first">
            {{ activity.values.first.count.toLocaleString('ru-RU').replace('.', ',') }}
            {{ activity.values.first.name }}
          </span>
          <span class="activities__item-swop-icon">
            <svg
              width="15"
              height="6"
              viewBox="0 0 15 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.77848 3.36401H13.7283M13.7283 3.36401L11.6069 1.24268M13.7283 3.36401L11.6069 5.48535M5.95003 3.36401L1.00024 3.36401M1.00024 3.36401L3.12158 5.48535M1.00024 3.36401L3.12158 1.24268"
                stroke="#58FF84"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span class="activities__item-swop-second">
            {{ activity.values.second.count.toLocaleString('ru-RU').replace('.', ',') }}
            {{ activity.values.second.name }}
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.activities__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.activities__item {
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  gap: 12px;
  padding: 14px;
}

.acitivies__item-img {
  width: 32px;
  height: 32px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activities__item-content {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.activities__item-upper {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

.activities__item-name {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 14px;
  color: #22212e;
}

.activities__item-date {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 10px;
  color: #22212e;
  opacity: 0.5;
}

.activities__item-in-wallet {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.activities__item-in-wallet-value {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 10px;
  color: #22212e;
}

.activities__item-in-wallet-text {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 10px;
  color: #22212e;
  opacity: 0.5;
}

.activities__item-in-wallet-name {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 10px;
  color: #22212e;
}

.activities__item-swop {
  display: flex;
  align-items: center;
  gap: 12px;
}
.activities__item-swop svg {
  transform: translateY(-3px);
}
.activities__item-swop-first,
.activities__item-swop-second {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 10px;
  color: #22212e;
}
</style>
