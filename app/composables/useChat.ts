export interface Movie {
  title: string
  year: number
  synopsis: string
  rationale: string
  poster_search_term: string
}

export interface Message {
  role: 'user' | 'model'
  text: string
  movie?: Movie | null
}

export const useChat = () => {
  const messages = useState<Message[]>('chat-messages', () => [
    { role: 'model', text: '¡Hola! Soy tu Sumiller de Cine. ¿Hoy te apetece un Clásico o algo Moderno?' }
  ])
  const loading = useState('chat-loading', () => false)

  const sendMessage = async (text: string) => {
    loading.value = true
    messages.value.push({ role: 'user', text })

    try {
      const response = await $fetch('/api/chat', {
        method: 'POST',
        body: {
          messages: messages.value.map((m: Message) => ({ role: m.role, text: m.text }))
        }
      })

      const data = response as any
      console.log('Client received data:', data)
      messages.value.push({
        role: 'model',
        text: data.next_question || '¡Tengo una recomendación para ti!',
        movie: data.movie
      })
    } catch (err) {
      console.error('Error sending message:', err)
      messages.value.push({ role: 'model', text: 'Lo siento, he tenido un problema con la conexión. ¿Podemos intentarlo de nuevo?' })
    } finally {
      loading.value = false
    }
  }

  return {
    messages,
    loading,
    sendMessage
  }
}
