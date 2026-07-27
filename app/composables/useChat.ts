export interface Movie {
  title: string
  year: number
  director: string
  genre: string
  tagline: string
  synopsis: string
  rationale: string
  poster_search_term: string
  runtime_minutes?: number
  poster_url?: string | null
}

export interface Message {
  role: 'user' | 'model'
  text: string
  movie?: Movie | null
  timestamp: number
}

const INITIAL_GREETING = 'Hola, estoy aquí para ayudarte a encontrar qué ver. ¿La vas a ver solo o en compañía?'

// Module-scope (not useState): a setInterval handle isn't serializable and doesn't need to be reactive.
let progressTimer: ReturnType<typeof setInterval> | null = null

const clearProgressTimer = () => {
  if (progressTimer !== null) {
    clearInterval(progressTimer)
    progressTimer = null
  }
}

export const useChat = () => {
  const messages = useState<Message[]>('chat-messages', () => [
    { role: 'model', text: INITIAL_GREETING, timestamp: Date.now() }
  ])
  const loading = useState('chat-loading', () => false)
  const thinkingProgress = useState('chat-thinking-progress', () => 0)

  onScopeDispose(() => clearProgressTimer())

  const startProgress = () => {
    clearProgressTimer()
    thinkingProgress.value = 0
    progressTimer = setInterval(() => {
      thinkingProgress.value += (92 - thinkingProgress.value) * 0.06
    }, 100)
  }

  const finishProgress = async () => {
    clearProgressTimer()
    progressTimer = setInterval(() => {
      thinkingProgress.value += (100 - thinkingProgress.value) * 0.4
    }, 30)
    await new Promise((resolve) => setTimeout(resolve, 380))
    clearProgressTimer()
    thinkingProgress.value = 100
  }

  const sendMessage = async (text: string) => {
    if (loading.value) return
    loading.value = true
    messages.value.push({ role: 'user', text, timestamp: Date.now() })
    startProgress()

    try {
      const response = await $fetch('/api/chat', {
        method: 'POST',
        body: {
          messages: messages.value.map((m: Message) => ({ role: m.role, text: m.text }))
        }
      })

      await finishProgress()

      const data = response as any
      messages.value.push({
        role: 'model',
        text: data.message,
        movie: data.movie,
        timestamp: Date.now()
      })
    } catch (err) {
      console.error('Error sending message:', err)
      await finishProgress()
      messages.value.push({
        role: 'model',
        text: 'Ha habido un problema de conexión. ¿Lo intentamos de nuevo?',
        timestamp: Date.now()
      })
    } finally {
      clearProgressTimer()
      loading.value = false
      thinkingProgress.value = 0
    }
  }

  const resetChat = () => {
    clearProgressTimer()
    loading.value = false
    thinkingProgress.value = 0
    messages.value = [
      { role: 'model', text: INITIAL_GREETING, timestamp: Date.now() }
    ]
  }

  return {
    messages,
    loading,
    thinkingProgress,
    sendMessage,
    resetChat
  }
}
