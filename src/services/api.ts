import axios from 'axios'
import type { CalorieEntry, WeightEntry, TDEEResponse } from '@/types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Calorie API
export const calorieApi = {
  getEntries: () => api.get<CalorieEntry[]>('/calories'),
  addEntry: (amount: number) => api.post<CalorieEntry>('/calories', { amount }),
  deleteEntry: (id: number) => api.delete(`/calories/${id}`)
}

// Weight API
export const weightApi = {
  getEntries: () => api.get<WeightEntry[]>('/weight'),
  addEntry: (amount: number) => api.post<WeightEntry>('/weight', { amount }),
  deleteEntry: (date: string) => api.delete(`/weight/${date}`)
}

// TDEE API
export const tdeeApi = {
  getTDEE: () => api.get<TDEEResponse>('/tdee')
}
