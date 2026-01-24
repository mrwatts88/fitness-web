<script setup lang="ts">
import { useWeightStore } from '@/stores/weight'

const weightStore = useWeightStore()

</script>

<template>
  <div class="weight-display">
    <h1>{{ weightStore.todayWeight?.amount }}</h1>
  </div>
</template>

<style scoped>
.weight-display {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* padding: var(--spacing-md); */
  min-height: 0;
}

@media (min-width: 429px) {
  .weight-display {
    border-left: 3px solid var(--color-surface);
    border-right: 3px solid var(--color-surface);
    border-bottom: 3px solid var(--color-surface);
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }
}
</style>
