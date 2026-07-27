import { z } from 'zod'
import { MOVIE_PROMPT, useGroq, type GroqMessage } from '../utils/ai'
import { useTmdb } from '../utils/tmdb'

const RequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'model']),
    text: z.string()
  }))
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { messages } = RequestSchema.parse(body)

  if (messages.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No messages provided' })
  }

  const chatMessages: GroqMessage[] = [
    { role: 'system', content: MOVIE_PROMPT },
    ...messages.map(m => ({
      role: (m.role === 'model' ? 'assistant' : 'user') as 'assistant' | 'user',
      content: m.text
    }))
  ]

  const groq = useGroq(event)

  let responseText: string
  try {
    responseText = await groq.sendMessage(chatMessages)
  } catch (err: any) {
    throw createError({
      statusCode: err?.response?.status ?? 502,
      statusMessage: 'Groq request failed',
      data: err?.data ?? err?.message
    })
  }

  let parsed: any
  try {
    const cleanJson = responseText.replace(/```json|```/g, '').trim()
    parsed = JSON.parse(cleanJson)
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Groq returned invalid JSON',
      data: responseText
    })
  }

  if (parsed.movie) {
    const tmdb = useTmdb(event)
    parsed.movie.poster_url = await tmdb.findPosterUrl(
      parsed.movie.poster_search_term || parsed.movie.title,
      parsed.movie.year
    )
  }

  return parsed
})
