<script setup>
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import AppBurgerMenu from './components/AppBurgerMenu.vue';
import { useCurrentPage } from './stores/PoolCurrentPage';
import { createAppKit } from '@reown/appkit/vue';
import { sepolia } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { cookieStorage, createStorage } from '@wagmi/vue';

// 1. Get projectId from https://dashboard.reown.com
const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID;

// 2. Create a metadata object
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'http://localhost:4002/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

// 3. Set the networks
const networks = [sepolia];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({ storage: cookieStorage }),
  networks,
  projectId,
});

// 5. Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});
const menuOpen = ref(false);
const currentPage = useCurrentPage();
</script>

<template>
  <div class="app-wrapper">
    <AppBurgerMenu v-model:menuOpen="menuOpen" />
    <AppHeader v-model:menuOpen="menuOpen" />

    <RouterView />

    <img
      :src="'/img/bg-decor.png'"
      class="background-decor"
      :class="currentPage.currentPage"
      alt=""
    />
  </div>
</template>

<style scoped>
.app-wrapper {
  overflow-y: auto;
  height: 100vh;
}

@media (max-width: 576px) {
  .app-wrapper {
    height: auto;
  }
}
.background-decor {
  position: absolute;
  z-index: -1;
  left: -52px;
  bottom: -156px;
}
.pool {
  bottom: -275px;
}
@media (max-width: 1330px) {
  .background-decor {
    display: none;
  }
}
</style>
