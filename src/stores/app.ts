import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Mode } from '@/types'

export const useAppStore = defineStore('app', () => {
  const mode = ref<Mode>('calorie')
  const isDrawerOpen = ref(false)

  function setMode(newMode: Mode) {
    mode.value = newMode
  }

  function toggleDrawer() {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  function closeDrawer() {
    isDrawerOpen.value = false
  }

  function openDrawer() {
    isDrawerOpen.value = true
  }

  return {
    mode,
    isDrawerOpen,
    setMode,
    toggleDrawer,
    closeDrawer,
    openDrawer
  }
})
