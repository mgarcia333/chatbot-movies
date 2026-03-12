<script setup lang="ts">
import type { Message } from '~/composables/useChat'

defineProps<{
  message: Message
}>()
</script>

<template>
  <div 
    class="flex w-full mb-4"
    :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
  >
    <div 
      class="max-w-[80%] rounded-2xl px-4 py-2"
      :class="message.role === 'user' 
        ? 'bg-blue-600 text-white rounded-tr-none' 
        : 'bg-gray-100 text-gray-800 rounded-tl-none'"
    >
      <p class="text-sm md:text-base">{{ message.text }}</p>
      
      <div v-if="message.movie" class="mt-4">
        <MovieCard :movie="message.movie" />
      </div>
    </div>
  </div>
</template>
