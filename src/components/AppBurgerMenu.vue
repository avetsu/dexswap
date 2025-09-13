<script setup>
import { watch } from 'vue';
const menuOpen = defineModel('menuOpen');

watch(menuOpen, (newValue) => {
  if (newValue) {
    document.body.classList.add('body--fixed');
  } else {
    document.body.classList.remove('body--fixed');
  }
});
</script>

<template>
  <transition name="slide">
    <div class="overlay" v-if="menuOpen" @click="menuOpen = false">
      <div class="burger-menu" @click.stop>
        <nav class="burger__nav" @click="menuOpen = !menuOpen">
          <RouterLink to="/">Trade</RouterLink>
          <RouterLink to="/pool">Pool</RouterLink>
          <RouterLink to="/bridge">Bridge</RouterLink>
        </nav>

        <form>
          <input type="text" name="search" placeholder="Search tokens and pools" />
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
      </div>
    </div>
  </transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  background-color: #0f0f16bd;
  z-index: 8;
  inset: 0;
}

.burger-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  position: fixed;
  z-index: 10;
  height: 100dvh;
  width: 50dvw;
  padding: 30px;
  background-color: #0f0f1698;
  backdrop-filter: blur(13px);
}

@media (max-width: 576px) {
  .burger-menu {
    width: 80dvw;
  }
}
.burger__nav {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 38px;
  margin-top: 100px;
}

.burger__nav a {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  color: #fff;
}
form {
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
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background: rgba(217, 217, 217, 0.05);
  height: 34px;
  padding: 0px 42px;
  font-family: var(--font-family);
  font-weight: 275;
  font-size: 18px;
  color: #fff;
}

form input::placeholder {
  opacity: 0.5;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
