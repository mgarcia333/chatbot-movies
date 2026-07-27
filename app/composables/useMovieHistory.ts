import type { Movie } from '~/composables/useChat'

const STORAGE_KEY = 'cineroulette-history'

export interface HistoryEntry {
  action: 'acceptance' | 'rejection'
  movie: Movie
  timestamp: number
}

export const useMovieHistory = () => {
  const record = (action: 'acceptance' | 'rejection', movie: Movie) => {
    if (import.meta.server) return

    const raw = localStorage.getItem(STORAGE_KEY)
    const history: HistoryEntry[] = raw ? JSON.parse(raw) : []
    history.push({ action, movie, timestamp: Date.now() })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }

  return { record }
}
