import { z } from 'zod'
import { GEMINI_MODEL, MOVIE_PROMPT, useGemini } from '../utils/ai'

const RequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'model']),
    text: z.string()
  }))
})

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event)
  const { messages } = RequestSchema.parse(body)

  if (messages.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No messages provided' })
  }

  const ai = useGemini()

  // Start chat with history
  const history = messages.slice(0, -1)

  // Gemini requires history to start with 'user'.
  // If the first message is 'model' (initial greeting), we skip it.
  const filteredHistory = history[0]?.role === 'model' ? history.slice(1) : history

  const chat = ai.chats.create({
    model: GEMINI_MODEL,
    config: {
      systemInstruction: MOVIE_PROMPT,
      responseMimeType: 'application/json'
    },
    history: filteredHistory.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }))
  })

  const lastMessage = messages[messages.length - 1].text

  const result = await chat.sendMessage({ message: lastMessage })
  const responseText = result.text ?? ''
  console.log('Gemini Response:', responseText)
  
  try {
    const cleanJson = responseText.replace(/```json|```/g, '').trim()
    return JSON.parse(cleanJson)
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Gemini returned invalid JSON',
      data: responseText
    })
  }
})
