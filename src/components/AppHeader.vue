<script setup>
import { ChevronRight } from 'lucide-vue-next';
import AppBurgerMenu from '@/components/AppBurgerMenu.vue';
import AppSideBar from '@/components/AppSidebar.vue';
import { useCurrentPage } from '@/stores/PoolCurrentPage';
import { useWallet, connectWallet, checkIfWalletIsConnected } from '@/blockchain/wallet';
import { ref, onMounted, onUnmounted, provide, computed } from 'vue';
const defaultSvg = '/icons/site-logo.svg';
const mobileSvg = '/icons/site-logo-mobile.svg';

const currentLogo = ref(defaultSvg);

const currentPage = useCurrentPage();

const { account } = useWallet();

function checkWidth() {
  currentLogo.value = window.innerWidth <= 888 ? mobileSvg : defaultSvg;
}

onMounted(() => {
  checkWidth();
  window.addEventListener('resize', checkWidth);
  checkIfWalletIsConnected();
});
onUnmounted(() => {
  window.removeEventListener('resize', checkWidth);
});
const menuOpen = defineModel('menuOpen');

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const computedAddress = computed(
  () => account.value.substring(0, 3) + '...' + account.value.substring(account.value.length - 5),
);

provide('isSidebarOpen', isSidebarOpen);
provide('toggleSidebar', toggleSidebar);
</script>

<template>
  <AppBurgerMenu />
  <AppSideBar />

  <header>
    <button :class="{ 'burger-open': menuOpen }" class="burger-btn" @click="menuOpen = !menuOpen">
      <div :class="{ open: isOpen }" class="burger-line"></div>
      <div :class="{ open: isOpen }" class="burger-line"></div>
    </button>

    <div class="header__inner">
      <RouterLink to="/" class="header__logo">
        <img :src="currentLogo" alt="" />
      </RouterLink>

      <nav class="header__nav">
        <RouterLink to="/" @click="currentPage.switchPage('trade')">Trade</RouterLink>
        <RouterLink to="/pool" @click="currentPage.switchPage('pool')">Pool</RouterLink>
        <RouterLink to="/bridge" @click="currentPage.switchPage('bridge')">Bridge</RouterLink>
      </nav>

      <form>
        <input type="text" name="search" placeholder="Search tokens" />
        <label for="search">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 17L13.1333 13.1333M15.2222 8.11111C15.2222 12.0385 12.0385 15.2222 8.11111 15.2222C4.18375 15.2222 1 12.0385 1 8.11111C1 4.18375 4.18375 1 8.11111 1C12.0385 1 15.2222 4.18375 15.2222 8.11111Z"
              stroke="#58FF84"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </label>
      </form>

      <div v-if="!account" class="header__account">
        <button class="connect__button" @click="connectWallet">
          Connect{{}}<ChevronRight size="15" />
        </button>
      </div>
      <div v-else class="header__account">
        <span class="account__name">{{ computedAddress }}</span>
        <button class="account__profile" @click="toggleSidebar">
          <svg
            width="37"
            height="37"
            viewBox="0 0 37 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18.5" cy="18.5" r="18.5" fill="#9DDF1E" />
            <path
              d="M18.5 20.6667C15.6551 20.6667 13.1252 22.0272 11.5145 24.1386C11.1678 24.5931 10.9945 24.8203 11.0001 25.1274C11.0045 25.3646 11.1549 25.6639 11.3434 25.8104C11.5873 26 11.9254 26 12.6015 26H24.3985C25.0746 26 25.4127 26 25.6566 25.8104C25.8451 25.6639 25.9955 25.3646 25.9999 25.1274C26.0055 24.8203 25.8322 24.5931 25.4855 24.1386C23.8748 22.0272 21.3449 20.6667 18.5 20.6667Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.5 18C20.7303 18 22.5384 16.2091 22.5384 14C22.5384 11.7909 20.7303 10 18.5 10C16.2697 10 14.4616 11.7909 14.4616 14C14.4616 16.2091 16.2697 18 18.5 18Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button class="account__settings">
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
              stroke="#1C2730"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.955 14C11.6119 14 12.955 12.6569 12.955 11C12.955 9.34315 11.6119 8 9.955 8C8.29815 8 6.955 9.34315 6.955 11C6.955 12.6569 8.29815 14 9.955 14Z"
              stroke="#1C2730"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  margin: 27px auto 0 auto;
  max-width: 1813px;
  padding: 0 15px;
}
.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 15px;
}
.header__nav {
  display: flex;
  align-items: center;
  gap: 38px;
  margin-left: 60px;
}

.header__nav a {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  color: #22212e;
  position: relative;
}
.router-link-active {
  font-weight: 700 !important;
}
.header__nav a::before {
  content: '';
  width: 0%;
  height: 2px;
  background-color: #22212e;
  display: block;
  position: absolute;
  bottom: -5px;
  transition: width 0.3s ease;
}
.header__nav a:hover::before {
  width: 100%;
}
form {
  margin-left: 160px;
  max-width: 480px;
  position: relative;
  width: 100%;
  display: flex;
}
form label {
  position: absolute;
  top: 9px;
  left: 9px;
}
form input {
  width: 100%;
  border: 1px solid #ffffff38;
  border-radius: 20px;
  backdrop-filter: blur(12.100000381469727px);
  background: #fff;
  height: 34px;
  padding: 0px 42px;
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 18px;
  color: #22212e;
}

form input::placeholder {
  opacity: 0.5;
}
@media (max-width: 1130px) {
  .header__inner {
    justify-content: space-between;
    gap: 30px;
  }
  .header__nav {
    margin-left: 0;
    gap: 15px;
  }
  form {
    margin-left: 0;
  }
}
.connect__button {
  border-radius: 18px;
  background: #9ddf1e;
  max-width: 116px;
  height: 37px;
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
.header__account {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 18px;
}

.account__name {
  font-family: var(--third-family);
  font-weight: 400;
  font-size: 12px;
  color: #22212e;
}

.account__profile {
  width: 37px;
  height: 37px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d9d9d9;
}
.account__profile .head {
  transform-origin: center bottom;
}
.account__profile:hover .head {
  animation: headMove 0.5s ease-in-out;
}
.outer {
  transform-origin: center center;
}
.account__settings:hover .outer {
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

@keyframes headMove {
  0% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(10deg);
  }
  66% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.burger-btn {
  display: none;
}
@media (max-width: 888px) {
  header {
    margin-top: 0;
    padding-top: 24px;
  }
  .burger-btn {
    position: absolute;
    z-index: 15;
    top: 24px;
    left: 12px;
    width: 37px;
    height: 19px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: all 0.3s ease;
  }
  .burger-line:first-child {
    width: 100%;
    height: 1px;
    background: #9ddf1e;
    border-radius: 10px;
    border: 1.5px solid #9ddf1e;
    transition: all 0.3s ease;
  }
  .burger-line:last-child {
    width: 55%;
    height: 1px;
    border-radius: 10px;
    border: 1.5px solid #9ddf1e;
    background: #9ddf1e;
    transition: all 0.3s ease;
  }
  .burger-open {
    gap: 0;
  }
  .burger-open .burger-line:first-child {
    transform: rotate(45deg) translateX(1px);
  }
  .burger-open .burger-line:last-child {
    width: 100%;
    transform: rotate(-45deg) translateX(1px);
  }
  .header__nav {
    display: none;
  }
  form {
    display: none;
  }
  .header__logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (max-width: 500px) {
  .account__name {
    display: none;
  }
}
.router-link-active {
  font-weight: 700;
}
</style>
