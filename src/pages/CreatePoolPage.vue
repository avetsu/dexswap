<script setup>
import PoolsCreationSteps from '@/components/pools/creation/PoolsCreationSteps.vue';
import PoolsCreationProccess from '@/components/pools/creation/PoolsCreationProccess.vue';
</script>

<template>
  <div class="creation-wrapper">
    <PoolsCreationSteps />
    <PoolsCreationProccess />
  </div>
</template>

<style scoped>
.creation-wrapper {
  max-width: 1325px;
  padding: 0 15px;
  margin: 80px auto 0 auto;
  width: 100%;
  display: flex;
  gap: 30px;
  justify-content: space-between;
}

@media (max-width: 1000px) {
  .creation-wrapper {
    flex-direction: column;
    gap: 41px;
  }
}

@media (max-width: 576px) {
  .creation-wrapper {
    margin: 25px auto 0 auto;
    padding-bottom: 50px;
  }
}
</style>
