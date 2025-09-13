<script setup>
import { ref, provide } from 'vue';
import SideBarTokens from '@/components/sidebar/SidebarTokens.vue';
import SideBarNFT from '@/components/sidebar/SidebarNFT.vue';
import SideBarPools from '@/components/sidebar/SidebarPools.vue';
import SidebarActivity from '@/components/sidebar/SidebarActivity.vue';
import AppModal from '@/components/AppModal.vue';
import { inject } from 'vue';
import ModalQr from './modals/ModalQr.vue';

const isModalOpen = ref(false);

const openModal = () => (isModalOpen.value = true);
const closeModal = () => (isModalOpen.value = false);

provide('openModal', openModal);

const isSidebarOpen = inject('isSidebarOpen');
const toggleSidebar = inject('toggleSidebar');
const navBtns = ref([
  {
    name: 'token',
    text: 'Tokens',
  },
  {
    name: 'nft',
    text: 'NFT',
  },
  {
    name: 'pools',
    text: 'Pools',
  },
  {
    name: 'activity',
    text: 'Activity',
  },
]);

const activeTab = ref('token');

const changeActiveTab = (tabName) => {
  activeTab.value = tabName;
};
</script>

<template>
  <AppModal :isOpen="isModalOpen" @close="closeModal">
    <ModalQr @close="closeModal" />
  </AppModal>
  <Transition name="slide">
    <div v-if="isSidebarOpen" class="sidebar">
      <button @click="toggleSidebar" class="sidebar__close-btn">
        <svg
          width="20"
          height="22"
          viewBox="0 0 20 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.99817 0.999023V10.999M16.3582 5.63902C17.6165 6.89781 18.4734 8.50146 18.8205 10.2472C19.1675 11.993 18.9891 13.8024 18.3078 15.4468C17.6265 17.0911 16.473 18.4966 14.993 19.4854C13.513 20.4742 11.7731 21.0019 9.99317 21.0019C8.21326 21.0019 6.47332 20.4742 4.99334 19.4854C3.51336 18.4966 2.35981 17.0911 1.67853 15.4468C0.997258 13.8024 0.818857 11.993 1.16589 10.2472C1.51291 8.50146 2.36979 6.89781 3.62817 5.63902"
            stroke="#22212E"
            stroke-opacity="0.6"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="sidebar__main">
        <span class="sidebar__main-wallet">
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.9932 6.43098V2.93164C13.9932 2.0999 13.9932 1.68403 13.818 1.42845C13.6649 1.20516 13.4278 1.05348 13.1609 1.00806C12.8554 0.956079 12.4779 1.13035 11.7227 1.4789L2.85218 5.57297C2.17867 5.88382 1.84192 6.03925 1.59527 6.2803C1.37722 6.4934 1.21078 6.75353 1.10867 7.04081C0.993164 7.36577 0.993164 7.73666 0.993164 8.47844V13.431M14.4932 12.931H14.5032M0.993164 9.63098L0.993164 16.231C0.993164 17.3511 0.993164 17.9111 1.21115 18.339C1.4029 18.7153 1.70886 19.0212 2.08518 19.213C2.51301 19.431 3.07306 19.431 4.19316 19.431H15.7932C16.9133 19.431 17.4733 19.431 17.9011 19.213C18.2775 19.0212 18.5834 18.7153 18.7752 18.339C18.9932 17.9111 18.9932 17.3511 18.9932 16.231V9.63098C18.9932 8.51088 18.9932 7.95082 18.7752 7.523C18.5834 7.14668 18.2775 6.84072 17.9011 6.64897C17.4733 6.43098 16.9133 6.43098 15.7932 6.43098L4.19316 6.43098C3.07306 6.43098 2.51301 6.43098 2.08518 6.64897C1.70886 6.84071 1.4029 7.14668 1.21115 7.523C0.993164 7.95082 0.993164 8.51088 0.993164 9.63098ZM14.9932 12.931C14.9932 13.2071 14.7693 13.431 14.4932 13.431C14.217 13.431 13.9932 13.2071 13.9932 12.931C13.9932 12.6548 14.217 12.431 14.4932 12.431C14.7693 12.431 14.9932 12.6548 14.9932 12.931Z"
              stroke="#9DDF1E"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="sidebar__main-wallet-value">$ 8450<span>.00</span></span>
        </span>
        <span class="sidebar__main-height">
          <svg
            width="8"
            height="6"
            viewBox="0 0 8 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 6L0.535899 -6.52533e-07L7.4641 -4.68497e-08L4 6Z" fill="#E74E4E" />
          </svg>
          $0,12
        </span>
      </div>
      <button class="sidebar__get-token-btn" @click="openModal">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9932 -0.000976562C5.39316 -0.000976562 -0.00683594 5.39902 -0.00683594 11.999C-0.00683594 18.599 5.39316 23.999 11.9932 23.999C18.5932 23.999 23.9932 18.599 23.9932 11.999C23.9932 5.39902 18.5932 -0.000976562 11.9932 -0.000976562ZM16.4332 12.839L12.8332 16.439C12.7132 16.559 12.5932 16.679 12.4732 16.679C12.2332 16.799 11.8732 16.799 11.5132 16.679C11.3932 16.679 11.2732 16.559 11.1532 16.439L7.55316 12.839C7.07316 12.359 7.07316 11.639 7.55316 11.159C8.03316 10.679 8.75316 10.679 9.23316 11.159L10.7932 12.719V8.39902C10.7932 7.67902 11.2732 7.19902 11.9932 7.19902C12.7132 7.19902 13.1932 7.67902 13.1932 8.39902V12.719L14.7532 11.159C15.2332 10.679 15.9532 10.679 16.4332 11.159C16.9132 11.639 16.9132 12.359 16.4332 12.839Z"
            fill="white"
          />
        </svg>
        Receive
      </button>
      <nav class="sidebar__nav">
        <button
          v-for="button in navBtns"
          :class="{ active: activeTab === button.name }"
          class="sidebar__nav-btn"
          :key="button.name"
          @click="changeActiveTab(button.name)"
        >
          {{ button.text }}
        </button>
      </nav>

      <TransitionGroup tag="div" class="sidebar__content" name="out">
        <SideBarTokens v-if="activeTab === 'token'" />
        <SideBarNFT v-if="activeTab === 'nft'" />
        <SideBarPools v-if="activeTab === 'pools'" />

        <SidebarActivity v-if="activeTab === 'activity'" />
      </TransitionGroup>
    </div>
  </Transition>
</template>

<style scoped>
.out-enter-active {
  transition:
    opacity 1s ease,
    transform 0.5s ease;
}
.out-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.sidebar {
  position: fixed;
  top: 80px;
  right: 32px;
  bottom: 10px;
  border-radius: 20px;
  background: #fff;
  overflow-y: auto;
  padding: 19px;
  max-width: 321px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  z-index: 10;
}

@media (max-width: 375px) {
  .sidebar {
    max-width: none;
    width: 95dvw;
  }
}
.sidebar__close-btn {
  position: absolute;
  top: 26px;
  right: 18px;
}
.sidebar__close-btn svg path {
  transition: all 0.3s ease;
}
.sidebar__close-btn:hover svg path {
  stroke-opacity: 1;
}

.sidebar::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}

.sidebar__main {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  align-self: start;
}
.sidebar__main-wallet {
  display: flex;
  align-items: center;
  gap: 12px;
}
.sidebar__main-wallet-value {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 23px;
  text-align: right;
  color: #22212e;
}
.sidebar__main-wallet-value span {
  font-size: 11px;
}
.sidebar__main-height {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  color: rgba(34, 33, 46, 0.3);
}

.sidebar__get-token-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 10px;
  background: #9ddf1e;
  width: 100%;
  padding: 18px 19px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  color: #22212e;
}

.sidebar__nav {
  display: flex;
  align-items: center;
  gap: 23px;
}

.sidebar__nav-btn {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 16px;
  color: #22212e;
}
.sidebar__content {
  position: relative;
}
.sidebar__nav-btn.active {
  font-weight: 600;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
