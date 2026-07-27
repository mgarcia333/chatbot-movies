import { z } from 'zod'
import { getStore } from '@netlify/blobs'

const RequestSchema = z.object({
  deviceId: z.string().min(1),
  action: z.enum(['acceptance', 'rejection']),
  movie: z.object({
    title: z.string(),
    year: z.number(),
    synopsis: z.string(),
    rationale: z.string(),
    poster_search_term: z.string()
  })
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { deviceId, action, movie } = RequestSchema.parse(body)

  try {
    const store = getStore('movie-history')
    const history = (await store.get(deviceId, { type: 'json' })) as any[] | null ?? []

    history.push({ action, movie, timestamp: Date.now() })
    await store.setJSON(deviceId, history)

    return { success: true }
  } catch (err) {
    console.error('Failed to save history:', err)
    throw createError({ statusCode: 503, statusMessage: 'History storage unavailable' })
  }
})
