import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { WeightEntry } from '@/types'
import { weightApi } from '@/services/api'

export const useWeightStore = defineStore('weight', () => {
  const entries = ref<WeightEntry[]>([])
  const loading = ref(false)

  const todayWeight = computed(() => {
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    return entries.value.find((entry) => entry.createdAt === today) || null
  })

  async function fetchEntries() {
    try {
      loading.value = true
      const response = await weightApi.getEntries()
      entries.value = response.data
    } catch (error) {
      console.error('Failed to fetch weight entries:', error)
    } finally {
      loading.value = false
    }
  }

  async function addEntry(amount: number) {
    try {
      loading.value = true
      await weightApi.addEntry(amount)
      await fetchEntries()
    } catch (error) {
      console.error('Failed to add weight entry:', error)
    } finally {
      loading.value = false
    }
  }

  async function deleteEntry(date: string) {
    try {
      loading.value = true
      await weightApi.deleteEntry(date)
      await fetchEntries()
    } catch (error) {
      console.error('Failed to delete weight entry:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    entries,
    loading,
    todayWeight,
    fetchEntries,
    addEntry,
    deleteEntry
  }
})
