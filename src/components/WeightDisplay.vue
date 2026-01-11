<script setup lang="ts">
import { computed } from 'vue'
import { useWeightStore } from '@/stores/weight'
import { useAppStore } from '@/stores/app'

const weightStore = useWeightStore()
const appStore = useAppStore()

const displayValue = computed(() => {
  if (weightStore.todayWeight) {
    return weightStore.todayWeight.amount.toFixed(1)
  }
  return '-'
})
</script>

<template>
  <div class="weight-display">
    <div class="display-content">
      <div class="label">Today's Weight</div>
      <div class="value">{{ displayValue }}</div>
      <div v-if="displayValue !== '-'" class="unit">lbs</div>
    </div>
    <button class="history-button" @click="appStore.openDrawer">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.weight-display {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
  gap: var(--spacing-md);
  min-height: 0;
}

@media (min-width: 429px) {
  .weight-display {
    border-left: 3px solid var(--color-surface);
    border-right: 3px solid var(--color-surface);
  }
}

.display-content {
  text-align: center;
  padding: var(--spacing-sm);
}

.label {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.value {
  font-size: 56px;
  font-weight: 700;
  color: var(--color-weight-primary);
  line-height: 1;
}

.unit {
  font-size: 24px;
  color: var(--color-text-secondary);
  margin-top: var(--spacing-sm);
  font-weight: 600;
}

.history-button {
  padding: 12px 24px;
  background: var(--color-surface);
  border: 2px solid var(--color-weight-primary);
  border-radius: var(--border-radius);
  color: var(--color-weight-primary);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  transition: all 0.2s ease;
}

.history-button:active {
  transform: scale(0.98);
  background: rgba(245, 158, 11, 0.1);
}
</style>
