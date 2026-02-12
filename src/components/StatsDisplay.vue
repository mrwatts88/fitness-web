<script setup lang="ts">
import { computed } from 'vue'
import { useCalorieStore } from '@/stores/calorie'

const calorieStore = useCalorieStore()

function formatCaloriesPerDay(value: number | null | undefined) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return '-'
  }

  return value.toLocaleString(undefined, {
    maximumFractionDigits: 0
  })
}

function toFiniteNumber(value: number | null | undefined) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return null
  }

  return value
}

const showOvereatWarning = computed(() => {
  const eaten = toFiniteNumber(calorieStore.eatenPerDay)
  const burned = toFiniteNumber(calorieStore.tdee)

  if (eaten === null || burned === null) {
    return false
  }

  return eaten > burned
})

const averageEatenDisplay = computed(() => {
  return formatCaloriesPerDay(calorieStore.eatenPerDay)
})

const averageBurnedDisplay = computed(() => {
  return formatCaloriesPerDay(calorieStore.tdee)
})

</script>

<template>
  <div class="stats-display">
    <div v-if="showOvereatWarning" class="warning-indicator" aria-label="Calories exceeded warning">
      <span class="warning-mark">!</span>
    </div>
    <div class="stats-item">
      <div class="label">Avg Eaten / Day</div>
      <div class="value eaten">{{ averageEatenDisplay }}</div>
    </div>
    <div class="stats-item">
      <div class="label">Avg Burned / Day</div>
      <div class="value burned">{{ averageBurnedDisplay }}</div>
    </div>
  </div>
</template>

<style scoped>
.stats-display {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-md);
  min-height: 0;
}

.stats-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.warning-indicator {
  width: 132px;
  height: 132px;
  border-radius: 999px;
  border: 12px solid #dc2626;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -150px;
  margin-bottom: 20px;
}

.warning-mark {
  color: #dc2626;
  font-size: 84px;
  font-weight: 800;
  line-height: 1;
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
  line-height: 1;
}

.value.eaten {
  color: var(--color-calorie-primary);
}

.value.burned {
  color: var(--color-weight-primary);
}

@media (min-width: 429px) {
  .stats-display {
    border-left: 3px solid var(--color-surface);
    border-right: 3px solid var(--color-surface);
    border-bottom: 3px solid var(--color-surface);
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }
}

@media (max-width: 360px) {
  .value {
    font-size: 46px;
  }
}
</style>
