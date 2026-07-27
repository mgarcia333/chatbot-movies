const TMDB_SEARCH_URL = 'https://api.themoviedb.org/3/search/movie'

export const useTmdb = (event: any) => {
  const apiKey = event.context.cloudflare?.env?.TMDB_API_KEY ?? useRuntimeConfig(event).tmdbApiKey

  return {
    async findPosterUrl(query: string, year?: number): Promise<string | null> {
      if (!apiKey) return null

      try {
        const data = await $fetch<{ results: { poster_path: string | null }[] }>(TMDB_SEARCH_URL, {
          query: {
            api_key: apiKey,
            query,
            year,
            language: 'es-ES',
            include_adult: false
          },
          signal: AbortSignal.timeout(5000)
        })

        const posterPath = data.results?.[0]?.poster_path
        return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null
      } catch (err) {
        console.error('TMDB lookup failed:', err)
        return null
      }
    }
  }
}
