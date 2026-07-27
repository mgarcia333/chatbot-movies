<script setup lang="ts">
import type { Movie } from '~/composables/useChat'

const props = defineProps<{
  movie?: Movie | null
  loading?: boolean
}>()

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const handleAction = async (type: 'acceptance' | 'rejection', feedback?: string) => {
  if (!user.value) {
    return alert('Por favor, inicia sesión para guardar películas.')
  }
  
  try {
    // 1. First ensure movie is in cache (Phase 3 logic)
    const { data: movieData } = await supabase
      .from('movies')
      .upsert({
        title: props.movie?.title,
        synopsis: props.movie?.synopsis,
        // poster_url mapping would go here
      }, { onConflict: 'title' })
      .select()
      .single()

    // 2. Save to user history
    await supabase.from('user_history').insert({
      user_id: user.value.id,
      movie_id: movieData?.id,
      interaction_type: type,
      ai_feedback: feedback || '',
      ai_rationale: props.movie?.rationale
    })

    alert(type === 'acceptance' ? '¡Guardada en tu historial!' : 'Entendido, buscaremos otra.')
  } catch (err) {
    console.error('Error saving action:', err)
  }
}
</script>

<template>
  <div v-if="loading || !movie" class="bg-gray-100 rounded-xl overflow-hidden animate-pulse max-w-sm border border-gray-200">
    <div class="aspect-[2/3] bg-gray-200"></div>
    <div class="p-4 space-y-3">
      <div class="h-6 bg-gray-200 rounded w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="h-4 bg-gray-200 rounded w-5/6"></div>
      <div class="flex gap-2">
        <div class="h-10 bg-gray-200 rounded flex-1"></div>
        <div class="h-10 bg-gray-200 rounded flex-1"></div>
      </div>
    </div>
  </div>

  <div v-else-if="movie" class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md max-w-sm">
    <div class="relative aspect-[2/3] bg-gray-200">
      <div class="absolute inset-0 flex items-center justify-center text-gray-400">
        <span class="text-xs uppercase tracking-widest font-bold">Póster de Película</span>
      </div>
    </div>
    
    <div class="p-4 bg-white">
      <h3 class="font-bold text-lg text-gray-900 line-clamp-1">{{ movie.title }} ({{ movie.year }})</h3>
      <p class="text-xs text-blue-600 font-semibold mb-2 italic">"{{ movie.rationale }}"</p>
      <p class="text-sm text-gray-600 line-clamp-3 mb-4">{{ movie.synopsis }}</p>
      
      <div class="flex gap-2">
        <button 
          @click="handleAction('acceptance')"
          class="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2 rounded-lg transition-colors"
        >
          Ver esta
        </button>
        <button 
          @click="handleAction('rejection')"
          class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-bold py-2 rounded-lg transition-colors"
        >
          Otra
        </button>
      </div>
    </div>
  </div>
</template>
