<script setup lang="ts">
import type { Message } from '~/composables/useChat'

const props = defineProps<{
  message: Message
}>()

const isUser = computed(() => props.message.role === 'user')

const formattedTime = computed(() => {
  const d = new Date(props.message.timestamp)
  return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
})
</script>

<template>
  <div
    class="flex flex-col gap-1 w-full max-w-2xl mb-5"
    :class="isUser ? 'self-end items-end' : 'self-start items-start'"
  >
    <div
      class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest opacity-70"
      :class="isUser ? 'text-amber-400 flex-row-reverse' : 'text-phosphor-500'"
    >
      <Icon :name="isUser ? 'person' : 'smart_toy'" class="text-[14px]" />
      <span>{{ isUser ? 'OPERATOR_01' : 'SYSTEM_NODE_01' }}</span>
      <ClientOnly>
        <span>[ {{ formattedTime }} ]</span>
      </ClientOnly>
    </div>

    <div
      class="relative max-w-full border px-4 py-3"
      :class="isUser
        ? 'border-amber-500/50 bg-amber-500/5 text-amber-400 text-right'
        : 'border-phosphor-500/50 bg-phosphor-500/5 text-phosphor-400 text-glow'"
    >
      <span
        class="absolute top-4 w-2 h-px"
        :class="isUser ? '-right-2 bg-amber-500/50' : '-left-2 bg-phosphor-500/50'"
      />
      <p class="leading-relaxed whitespace-pre-line text-sm md:text-base">{{ message.text }}</p>

      <div v-if="message.movie" class="mt-4 text-left">
        <MovieCard :movie="message.movie" />
      </div>
    </div>
  </div>
</template>
