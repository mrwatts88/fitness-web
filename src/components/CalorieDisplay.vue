<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCalorieStore } from '@/stores/calorie'
import { useAppStore } from '@/stores/app'
import type { DisplayMode } from '@/types'

const calorieStore = useCalorieStore()
const appStore = useAppStore()
const displayMode = ref<DisplayMode>('consumed')

const displayValue = computed(() => {
  switch (displayMode.value) {
    case 'consumed':
      return calorieStore.totalCalories
    case 'remaining':
      return calorieStore.remainingCalories
    case 'goal':
      return calorieStore.calorieGoal
    default:
      return calorieStore.totalCalories
  }
})

const displayLabel = computed(() => {
  switch (displayMode.value) {
    case 'consumed':
      return 'Calories Today'
    case 'remaining':
      return 'Calories Remaining'
    case 'goal':
      return 'Daily Goal'
    default:
      return 'Calories Today'
  }
})

function cycleDisplayMode() {
  const modes: DisplayMode[] = ['consumed', 'remaining', 'goal']
  const currentIndex = modes.indexOf(displayMode.value)
  const nextIndex = (currentIndex + 1) % modes.length
  displayMode.value = modes[nextIndex] as DisplayMode
}
</script>

<template>
  <div class="calorie-display">
    <div class="display-content" @click="cycleDisplayMode">
      <div class="label">{{ displayLabel }}</div>
      <div class="value">{{ displayValue.toLocaleString() }}</div>
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
.calorie-display {
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
  .calorie-display {
    border-left: 3px solid var(--color-surface);
    border-right: 3px solid var(--color-surface);
  }
}

.display-content {
  text-align: center;
  cursor: pointer;
  user-select: none;
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  transition: background 0.2s ease;
}

.display-content:active {
  background: rgba(255, 255, 255, 0.05);
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
  color: var(--color-calorie-primary);
  line-height: 1;
}

.history-button {
  padding: 12px 24px;
  background: var(--color-surface);
  border: 2px solid var(--color-calorie-primary);
  border-radius: var(--border-radius);
  color: var(--color-calorie-primary);
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
  background: rgba(16, 185, 129, 0.1);
}
</style>
