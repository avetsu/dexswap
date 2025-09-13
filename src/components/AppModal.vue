<script setup>
const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['close']);
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-if="props.isOpen" class="modal-overlay" @click="emit('close')">
        <div class="modal-content" @click.stop>
          <button class="modal__back" @click="emit('close')">
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L1 7L7 1"
                stroke="#9DDF1E"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <slot />
        </div>
      </div>
    </transition>
  </Teleport>
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

.modal-overlay {
  position: fixed;
  inset: 0;
  backdrop-filter: blur(5px);
  z-index: 15;
}

.modal-content {
  max-width: 480px;
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}

@media (max-width: 576px) {
  .modal-content {
    padding: 10px;
  }
}

.modal__back {
  position: absolute;
  left: 20px;
  top: 34px;
  z-index: 5;
}
@media (max-width: 785px) {
  .modal__back {
    top: 27px;
  }
}
@media (max-width: 576px) {
  .modal__back {
    top: 15px;
  }
}
</style>
