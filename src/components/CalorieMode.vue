<script setup lang="ts">
import { useCalorieStore } from '@/stores/calorie'
import CalorieDisplay from './CalorieDisplay.vue'
import Keyboard from './Keyboard.vue'

const calorieStore = useCalorieStore()

async function handleSubmit(amount: number) {
  await calorieStore.addEntry(amount)
}
</script>

<template>
  <div class="calorie-mode">
    <CalorieDisplay />
    <Keyboard mode="calorie" @submit="handleSubmit" />
  </div>
</template>

<style scoped>
.calorie-mode {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
