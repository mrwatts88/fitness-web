<script setup lang="ts">
import { computed } from 'vue'
import { useWeightStore } from '@/stores/weight'
import { useCalorieStore } from '@/stores/calorie'
import { useAppStore } from '@/stores/app'

const weightStore = useWeightStore()
const calorieStore = useCalorieStore()
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
    </div>
    <div :style="{display: 'flex', gap: '10px' }">
      <div class="value">{{ displayValue }}</div>
      <button class="history-button" @click="appStore.openDrawer">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.5v5l4 1M4.252 5v4H8M5.07 8a8 8 0 1 1-.818 6"/>
        </svg>
      </button>
    </div>
    <div :style="{height: '40px'}" />
    <div class="label">Loss in 2 weeks</div>
    <div class="value">{{ calorieStore.lossIn2Weeks?.toFixed(1)}}</div>
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
  padding: 12px 12px;
  background: var(--color-surface);
  border: none;
  border-radius: var(--border-radius);
  color: var(--color-weight-primary);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
}

.history-button:active {
  transform: scale(0.98);
  background: rgba(245, 158, 11, 0.1);
}
</style>
