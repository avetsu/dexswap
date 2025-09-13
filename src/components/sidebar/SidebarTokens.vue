<script setup>
import { ref } from 'vue';

const tokens = ref([
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'down',
      value: '0.12',
    },
    visible: true,
  },
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'down',
      value: '0.12',
    },
    visible: true,
  },
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'up',
      value: '0.12',
    },
    visible: true,
  },
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'up',
      value: '0.12',
    },
    visible: true,
  },
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'down',
      value: '0.12',
    },
    visible: true,
  },
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'down',
      value: '0.12',
    },
    visible: true,
  },
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'down',
      value: '0.12',
    },
    visible: true,
  },
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'down',
      value: '0.12',
    },
    visible: false,
  },
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'down',
      value: '0.12',
    },
    visible: false,
  },
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'down',
      value: '0.12',
    },
    visible: false,
  },
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'down',
      value: '0.12',
    },
    visible: false,
  },
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'down',
      value: '0.12',
    },
    visible: false,
  },
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'down',
      value: '0.12',
    },
    visible: false,
  },
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'down',
      value: '0.12',
    },
    visible: false,
  },
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'down',
      value: '0.12',
    },
    visible: false,
  },
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'down',
      value: '0.12',
    },
    visible: false,
  },
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'down',
      value: '0.12',
    },
    visible: false,
  },
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'down',
      value: '0.12',
    },
    visible: false,
  },
  {
    name: 'Tether USDT',
    value: 3672.3172,
    logoUrl: '/icons/tether.svg',
    price: 1.59,
    height: {
      status: 'down',
      value: '0.12',
    },
    visible: false,
  },
]);

const visibleTokens = tokens.value.filter((item) => item.visible === true);

const notVisibleTokens = tokens.value.filter((item) => item.visible !== true);

const isHiddenTokensVisible = ref(false);

const showHiddenTokens = () => {
  isHiddenTokensVisible.value = !isHiddenTokensVisible.value;
};
</script>

<template>
  <div class="sidebar__tokens">
    <ul class="sidebar__tokens-list">
      <li v-for="token in visibleTokens" :key="token.name" class="sidebar__token">
        <img :src="token.logoUrl" width="25" height="25" alt="" />
        <div class="sidebar__token-content">
          <span class="sidebar__token-name">{{ token.name }}</span>
          <span class="sidebar__token-value"> {{ token.value.toLocaleString('ru-RU') }} USDT </span>
        </div>
        <div class="sidebar__token-height">
          <span class="sidebar__token-price"> $ {{ token.price }} </span>
          <span class="sidebar__token-height-value">
            <svg
              v-if="token.height.status === 'down'"
              width="8"
              height="6"
              viewBox="0 0 8 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.99976 6L0.535655 -6.52533e-07L7.46386 -4.68497e-08L3.99976 6Z"
                fill="#E74E4E"
              />
            </svg>
            <svg
              v-else
              width="8"
              height="6"
              viewBox="0 0 8 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style="transform: rotate(180deg)"
            >
              <path
                d="M3.99976 6L0.535655 -6.52533e-07L7.46386 -4.68497e-08L3.99976 6Z"
                fill="#58FF84"
              />
            </svg>
            $ {{ token.height.value.toLocaleString('ru-RU') }}
          </span>
        </div>
      </li>
    </ul>

    <div class="sidebar__hidden-tokens">
      <div class="sidebar__hidden-tokens-row">
        <span class="sidebar__hidden-tokens-count"> Hidden ({{ notVisibleTokens.length }}) </span>
        <button
          :class="{ active: isHiddenTokensVisible === true }"
          class="sidebar__hidden-tokens-btn"
          @click="showHiddenTokens"
        >
        <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.99316 4.99902L0.395088 0.499023L5.59124 0.499024L2.99316 4.99902Z" fill="#22212E" />
</svg>
          <span>{{ !isHiddenTokensVisible ? 'Show' : 'Hide' }}</span>
        </button>
      </div>
      <Transition name="fade">
        <ul class="sidebar__tokens-list" v-if="isHiddenTokensVisible">
          <li v-for="token in notVisibleTokens" :key="token.name" class="sidebar__token">
            <img :src="token.logoUrl" width="25" height="25" alt="" />
            <div class="sidebar__token-content">
              <span class="sidebar__token-name">{{ token.name }}</span>
              <span class="sidebar__token-value">
                {{ token.value.toLocaleString('ru-RU') }} USDT
              </span>
            </div>
            <div class="sidebar__token-height">
              <span class="sidebar__token-price"> $ {{ token.price }} </span>
              <span class="sidebar__token-height-value">
                <svg
                  v-if="token.height.status === 'down'"
                  width="8"
                  height="6"
                  viewBox="0 0 8 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.99976 6L0.535655 -6.52533e-07L7.46386 -4.68497e-08L3.99976 6Z"
                    fill="#E74E4E"
                  />
                </svg>
                <svg
                  v-else
                  width="8"
                  height="6"
                  viewBox="0 0 8 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style="transform: rotate(180deg)"
                >
                  <path
                    d="M3.99976 6L0.535655 -6.52533e-07L7.46386 -4.68497e-08L3.99976 6Z"
                    fill="#58FF84"
                  />
                </svg>
                $ {{ token.height.value.toLocaleString('ru-RU') }}
              </span>
            </div>
          </li>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.sidebar__tokens {
  display: flex;
  flex-direction: column;
  gap: 25px;
}
.sidebar__tokens-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.sidebar__token {
  display: flex;
  align-items: center;
  gap: 15px;
  border-radius: 15px;
  background: rgba(217, 217, 217, 0.05);
  padding: 4px;
  transition: all 0.3s ease;
}

.sidebar__token:hover {
  background: #eeedf0;
}
.sidebar__token-content {
  display: flex;
  flex-direction: column;
}
.sidebar__token-name {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 14px;
  color: #22212e;
}
.sidebar__token-value {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 9px;
  color: #22212e;
  opacity: 0.5;
}
.sidebar__token-height {
  margin-left: auto;
  display: flex;
  flex-direction: column;
}

.sidebar__token-price {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 11px;
  color: #22212e;
}

.sidebar__token-height-value {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 10px;
  text-align: center;
  color: rgba(34, 33, 46, 0.3);
  transform: translateX(-10px);
}

.sidebar__hidden-tokens {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.sidebar__hidden-tokens-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar__hidden-tokens-count {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 14px;
  color: #22212e;
}

.sidebar__hidden-tokens-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 5px 9px;
  border-radius: 20px;
  background: #eeedf0;
  transition: all 0.3s ease;
}
.sidebar__hidden-tokens-btn svg {
  transition: all 0.3s ease;
}
.sidebar__hidden-tokens-btn span {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 12px;
  color: #22212e;
  opacity: 0.5;
}

.sidebar__hidden-tokens-btn.active svg {
  transform: rotate(180deg);
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
</style>
