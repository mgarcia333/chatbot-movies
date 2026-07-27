<script setup lang="ts">
import type { Movie } from '~/composables/useChat'

const props = defineProps<{
  movie?: Movie | null
  loading?: boolean
}>()

const { show } = useToast()

const dismissed = ref(false)
const posterFailed = ref(false)
const posterProgress = ref(0)

let posterTimer: ReturnType<typeof setInterval> | null = null

const clearPosterTimer = () => {
  if (posterTimer !== null) {
    clearInterval(posterTimer)
    posterTimer = null
  }
}

const animatePosterIn = () => {
  clearPosterTimer()
  posterProgress.value = 0
  posterTimer = setInterval(() => {
    posterProgress.value += (100 - posterProgress.value) * 0.15
    if (posterProgress.value > 99.5) {
      posterProgress.value = 100
      clearPosterTimer()
    }
  }, 60)
}

onMounted(() => {
  // Purely a "materializing" entrance flourish — always runs from mount rather than
  // waiting on the <img> load event, which can fire before the listener attaches
  // when the image is served from cache (leaving the bar stuck at 0%).
  animatePosterIn()
})

onScopeDispose(clearPosterTimer)

const handlePosterError = () => {
  posterFailed.value = true
}

const showRealPoster = computed(() => !!props.movie?.poster_url && !posterFailed.value)

// Deterministic-per-movie flavour stat (retro terminal flourish, not a real ML confidence score).
const matchRate = computed(() => {
  const movie = props.movie
  if (!movie) return '0.0'
  const source = `${movie.title}${movie.year}`
  let hash = 0
  for (let i = 0; i < source.length; i++) {
    hash = (hash * 31 + source.charCodeAt(i)) >>> 0
  }
  return (90 + (hash % 1000) / 100).toFixed(1)
})

const handleAction = (type: 'acceptance' | 'rejection') => {
  try {
    if (!props.movie) return
    useMovieHistory().record(type, props.movie)
    show(type === 'acceptance' ? 'Guardada en tu historial. Buena elección.' : 'Entendido, busco otra.')
  } catch (err) {
    console.error('Error saving action:', err)
    show('No se pudo guardar el historial, pero disfruta la película.')
  }
}

const openTrailer = () => {
  if (!props.movie) return
  const query = encodeURIComponent(`${props.movie.title} ${props.movie.year} trailer`)
  window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank', 'noopener')
}
</script>

<template>
  <!-- Skeleton: still waiting on a movie payload -->
  <div v-if="loading || !movie" class="border border-phosphor-500/30 bg-ink-800 max-w-xl overflow-hidden">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div class="aspect-[2/3] bg-ink-700 bar-stripes animate-stripe" />
      <div class="space-y-3">
        <div v-for="i in 5" :key="i" class="h-4 bg-ink-700 bar-stripes animate-stripe" :style="{ width: `${60 + i * 6}%` }" />
      </div>
    </div>
  </div>

  <div
    v-else-if="!dismissed"
    class="border border-phosphor-500/60 border-glow bg-ink-800/90 max-w-2xl w-full font-mono"
  >
    <!-- Terminal window header -->
    <div class="flex justify-between items-center border-b border-phosphor-500/40 px-4 py-2 text-phosphor-500 text-glow text-xs uppercase tracking-widest">
      <span>[ STATUS: MATCH FOUND ]</span>
      <button
        type="button"
        class="hover:text-amber-400 transition-colors leading-none px-1"
        aria-label="Cerrar recomendación"
        @click="dismissed = true"
      >
        X
      </button>
    </div>

    <div class="p-4 md:p-6">
      <div class="text-center mb-6">
        <h3 class="text-glow text-phosphor-500 font-black uppercase tracking-tight text-xl md:text-2xl leading-tight cursor-blink">
          RECOMENDACIÓN_SISTEMA: {{ movie.title }} ({{ movie.year }})
        </h3>
        <p class="text-amber-400/80 text-xs italic mt-2">"{{ movie.tagline }}"</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Poster -->
        <div class="flex flex-col gap-2">
          <div class="relative aspect-[2/3] border border-phosphor-500/50 bg-ink-900 overflow-hidden">
            <img
              v-if="showRealPoster"
              :src="movie.poster_url!"
              :alt="`Póster de ${movie.title}`"
              class="absolute inset-0 w-full h-full object-cover"
              style="filter: saturate(0.85) contrast(1.05)"
              @error="handlePosterError"
            />
            <div v-if="showRealPoster" class="absolute inset-0 bg-phosphor-500/10 mix-blend-multiply" />
            <div v-if="showRealPoster" class="absolute inset-0 scanlines opacity-40" />

            <template v-if="!showRealPoster">
              <Icon name="movie" class="absolute -bottom-4 -right-4 text-[140px] text-phosphor-500/[0.06] pointer-events-none" />
              <div class="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 border-2 border-phosphor-500/30 m-2">
                <span class="text-phosphor-500/50 text-[10px] uppercase tracking-widest mb-2">// no signal //</span>
                <p class="text-phosphor-500 text-glow font-bold uppercase tracking-tight leading-snug">
                  {{ movie.title }}
                </p>
              </div>
            </template>
          </div>
          <TerminalProgressBar :progress="posterProgress" label="LOADED" />
        </div>

        <!-- Details -->
        <div class="flex flex-col justify-center gap-3 text-phosphor-500 text-sm">
          <div class="flex justify-between border-b border-phosphor-500/30 pb-2">
            <span class="opacity-70">&gt; GENRE:</span>
            <span class="text-glow font-semibold">{{ movie.genre }}</span>
          </div>
          <div class="flex justify-between border-b border-phosphor-500/30 pb-2">
            <span class="opacity-70">&gt; YEAR:</span>
            <span class="text-glow font-semibold">{{ movie.year }}</span>
          </div>
          <div class="flex justify-between border-b border-phosphor-500/30 pb-2">
            <span class="opacity-70">&gt; MATCH_RATE:</span>
            <span class="text-glow font-semibold">{{ matchRate }}%</span>
          </div>
          <div class="flex justify-between border-b border-phosphor-500/30 pb-2">
            <span class="opacity-70">&gt; DIRECTOR:</span>
            <span class="text-glow font-semibold text-right">{{ movie.director }}</span>
          </div>
          <div class="flex justify-between pb-2">
            <span class="opacity-70">&gt; RUNTIME:</span>
            <span class="text-glow font-semibold">{{ movie.runtime_minutes ? `${movie.runtime_minutes} MIN` : 'N/D' }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-4 mb-6 text-sm">
        <div class="border-l-2 border-amber-500 pl-3">
          <p class="text-[10px] uppercase tracking-widest text-amber-400/70 mb-1">&gt; Por qué te encaja</p>
          <p class="text-amber-300 italic">"{{ movie.rationale }}"</p>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest text-phosphor-500/60 mb-1">&gt; Sinopsis</p>
          <p class="text-phosphor-400/90 leading-relaxed">{{ movie.synopsis }}</p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          class="flex-1 border border-phosphor-500 text-phosphor-500 hover:bg-phosphor-500 hover:text-ink-900 text-xs font-bold uppercase tracking-widest py-3 transition-colors duration-150 active:translate-y-px"
          @click="handleAction('acceptance')"
        >
          [ Me la quedo ]
        </button>
        <button
          type="button"
          class="flex-1 border border-phosphor-500/50 text-phosphor-500/80 hover:bg-phosphor-500/10 text-xs font-bold uppercase tracking-widest py-3 transition-colors duration-150 active:translate-y-px"
          @click="handleAction('rejection')"
        >
          [ Otra ]
        </button>
        <button
          type="button"
          class="flex-1 border border-amber-500/60 text-amber-400 hover:bg-amber-500/10 text-xs font-bold uppercase tracking-widest py-3 transition-colors duration-150 active:translate-y-px"
          @click="openTrailer"
        >
          [ Ver trailer ]
        </button>
      </div>
    </div>
  </div>
</template>
