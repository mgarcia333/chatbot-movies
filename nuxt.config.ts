// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'CineRoulette — Tu experto en cine',
      meta: [
        { name: 'description', content: 'Cuéntale qué te apetece y encuentra la película perfecta en dos o tres preguntas.' },
        { name: 'theme-color', content: '#07050a' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap' }
      ]
    }
  },
  nitro: {
    preset: 'cloudflare_module'
  },
  runtimeConfig: {
    groqApiKey: process.env.GROQ_API_KEY,
    tmdbApiKey: process.env.TMDB_API_KEY
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt'
  ],
  typescript: {
    strict: true
  },
  pwa: {
    workbox: {
      navigateFallback: undefined
    },
    manifest: {
      name: 'CineRoulette',
      short_name: 'CineRoulette',
      description: 'Cuéntale qué te apetece y encuentra la película perfecta.',
      theme_color: '#0a0a0d',
      background_color: '#0a0a0d',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  }
})
