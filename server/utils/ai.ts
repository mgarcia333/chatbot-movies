import { GoogleGenerativeAI } from '@google/generative-ai'

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

export const useGemini = () => {
  const config = useRuntimeConfig()
  const genAI = new GoogleGenerativeAI(config.geminiApiKey)
  
  return genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash',
    systemInstruction: MOVIE_PROMPT,
    generationConfig: {
      responseMimeType: 'application/json'
    }
  })
}
