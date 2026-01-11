import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { CalorieEntry } from '@/types'
import { calorieApi, tdeeApi } from '@/services/api'

const CALORIE_DEFICIT = 250

export const useCalorieStore = defineStore('calorie', () => {
  const entries = ref<CalorieEntry[]>([])
  const tdee = ref<number>(0)
  const loading = ref(false)

  const totalCalories = computed(() => {
    return entries.value.reduce((sum, entry) => sum + entry.amount, 0)
  })

  const calorieGoal = computed(() => {
    return tdee.value - CALORIE_DEFICIT
  })

  const remainingCalories = computed(() => {
    return calorieGoal.value - totalCalories.value
  })

  async function fetchEntries() {
    try {
      loading.value = true
      const response = await calorieApi.getEntries()
      entries.value = response.data
    } catch (error) {
      console.error('Failed to fetch calorie entries:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchTDEE() {
    try {
      const response = await tdeeApi.getTDEE()
      tdee.value = response.data.amount
    } catch (error) {
      console.error('Failed to fetch TDEE:', error)
    }
  }

  async function addEntry(amount: number) {
    try {
      loading.value = true
      await calorieApi.addEntry(amount)
      await fetchEntries()
    } catch (error) {
      console.error('Failed to add calorie entry:', error)
    } finally {
      loading.value = false
    }
  }

  async function deleteEntry(id: number) {
    try {
      loading.value = true
      await calorieApi.deleteEntry(id)
      await fetchEntries()
    } catch (error) {
      console.error('Failed to delete calorie entry:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    entries,
    tdee,
    loading,
    totalCalories,
    calorieGoal,
    remainingCalories,
    fetchEntries,
    fetchTDEE,
    addEntry,
    deleteEntry
  }
})
