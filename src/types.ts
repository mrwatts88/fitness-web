export type Mode = 'calorie' | 'weight'

export type DisplayMode = 'consumed' | 'remaining' | 'goal'

export interface CalorieEntry {
  id: number
  amount: number
  created_at: string // YYYY-MM-DD HH:MM:SS
}

export interface WeightEntry {
  amount: number
  created_at: string // YYYY-MM-DD
}

export interface TDEEResponse {
  amount: number
}
