const STORAGE_KEY = 'cineroulette-device-id'

export const useDeviceId = (): string => {
  if (import.meta.server) return ''

  const existing = localStorage.getItem(STORAGE_KEY)
  if (existing) return existing

  const id = crypto.randomUUID()
  localStorage.setItem(STORAGE_KEY, id)
  return id
}
