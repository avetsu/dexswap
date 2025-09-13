<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import AppBurgerMenu from './components/AppBurgerMenu.vue';
import { useCurrentPage } from './stores/PoolCurrentPage';
const menuOpen = ref(false);
const currentPage = useCurrentPage();
</script>

<template>
  <div class="app-wrapper" >
    <AppBurgerMenu v-model:menuOpen="menuOpen" />
    <AppHeader v-model:menuOpen="menuOpen" />

    <RouterView />

    <img :src="'/img/bg-decor.png'" class="background-decor" :class="currentPage.currentPage" alt="" />
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
.pool{
  bottom: -275px;
}
@media (max-width: 1330px) {
  .background-decor {
    display: none;
  }
}
</style>
