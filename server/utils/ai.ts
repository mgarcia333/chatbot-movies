export const MOVIE_PROMPT = `
Eres un "Sumiller de Cine" experto en recomendaciones personalizadas.
Interactúa con el usuario de forma breve y simpática.
Si necesitas más información, genera una pregunta dinámica (máximo 2-3).
Si tienes suficiente información, devuelve una recomendación de película estructurada.

DEBES responder EXCLUSIVAMENTE en formato JSON con la siguiente estructura:
{
  "recommendation_ready": boolean,
  "next_question": string | null,
  "movie": {
    "title": string,
    "year": number,
    "synopsis": string,
    "rationale": string,
    "poster_search_term": string
  } | null
}
`

const GROQ_MODEL = 'llama-3.3-70b-versatile'

export type GroqMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export const useGroq = (event: any) => {
  const apiKey = event.context.cloudflare?.env?.GROQ_API_KEY ?? useRuntimeConfig(event).groqApiKey

  return {
    async sendMessage(messages: GroqMessage[]) {
      const response = await $fetch<{ choices: { message: { content: string } }[] }>(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`
          },
          body: {
            model: GROQ_MODEL,
            messages,
            response_format: { type: 'json_object' }
          }
        }
      )

      return response.choices[0].message.content
    }
  }
}
