<script setup lang="ts">
const { messages, loading, thinkingProgress, sendMessage, resetChat } = useChat()
const newMessage = ref('')
const chatContainer = ref<HTMLElement | null>(null)

const handleSend = () => {
  if (!newMessage.value.trim() || loading.value) return
  sendMessage(newMessage.value)
  newMessage.value = ''
}

const thinkingLabel = computed(() => (thinkingProgress.value >= 99.5 ? 'LISTO' : 'PROCESANDO'))

watch(messages, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}, { deep: true })

watch(loading, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
})
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center p-2 md:p-4 bg-ink-900">
    <!-- CRT overlays -->
    <div class="fixed inset-0 pointer-events-none z-30 scanlines opacity-70" />
    <div class="fixed inset-0 pointer-events-none z-30 crt-bezel" />
    <div class="fixed inset-0 pointer-events-none z-30 bg-phosphor-500/[0.02] animate-flicker" />

    <div class="relative z-10 w-full max-w-4xl h-[100dvh] md:h-[92vh] flex flex-col border border-phosphor-500/60 border-glow bg-ink-900/95">
      <!-- Header -->
      <header class="flex justify-between items-center border-b border-phosphor-500/60 px-4 py-3 text-phosphor-500 text-glow shrink-0">
        <div class="flex items-center gap-2 min-w-0">
          <Icon name="terminal" class="text-[18px] shrink-0" />
          <span class="font-black uppercase tracking-widest text-sm md:text-lg truncate">CINEROULLETTE_OS [Versión 2.0]</span>
        </div>
        <div class="flex items-center gap-4 shrink-0">
          <span class="hidden sm:inline text-xs uppercase tracking-widest animate-pulse">[ SYSTEM: ONLINE ]</span>
          <Icon name="settings" class="text-[18px] opacity-70 cursor-default" />
          <button type="button" aria-label="Reiniciar sistema" @click="resetChat">
            <Icon name="power_settings_new" class="text-[18px] hover:text-amber-400 transition-colors cursor-pointer" />
          </button>
        </div>
      </header>

      <!-- Chat history -->
      <main
        ref="chatContainer"
        class="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-1 scroll-smooth"
      >
        <ChatMessage
          v-for="(msg, i) in messages"
          :key="i"
          :message="msg"
        />

        <div v-if="loading" class="flex flex-col gap-1 w-full max-w-2xl self-start items-start mb-5">
          <div class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-phosphor-500 opacity-70">
            <Icon name="smart_toy" class="text-[14px]" />
            <span>SYSTEM_NODE_01</span>
          </div>
          <div class="border border-phosphor-500/50 bg-phosphor-500/5 px-4 py-3 w-full max-w-sm">
            <p class="text-phosphor-500 text-glow text-sm mb-2 cursor-blink">{{ thinkingLabel }}</p>
            <TerminalProgressBar :progress="thinkingProgress" :label="thinkingLabel" />
          </div>
        </div>
      </main>

      <!-- Input -->
      <footer class="border-t border-phosphor-500/60 p-4 shrink-0">
        <form class="flex items-center gap-3" @submit.prevent="handleSend">
          <span class="text-phosphor-500 text-glow text-lg font-black animate-pulse">&gt;</span>
          <input
            v-model="newMessage"
            type="text"
            placeholder="ESCRIBE TU RESPUESTA..."
            :disabled="loading"
            class="flex-1 min-w-0 bg-transparent border-none text-phosphor-500 text-glow placeholder-phosphor-500/30 focus:outline-none focus:ring-0 p-0 uppercase text-sm md:text-base disabled:opacity-40"
            style="caret-color: #00ff41"
          />
          <button
            type="submit"
            :disabled="loading || !newMessage.trim()"
            class="border border-phosphor-500 px-4 py-2 text-phosphor-500 text-xs font-bold uppercase tracking-widest hover:bg-phosphor-500 hover:text-ink-900 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-phosphor-500 transition-colors duration-150 shrink-0"
          >
            [ Ejecutar ]
          </button>
        </form>
        <div class="mt-3 flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 text-phosphor-500/40 text-[10px] uppercase tracking-widest">
          <span>Encryption: Enabled</span>
          <span>Data_link: Stable</span>
          <span>Mem: 64K OK</span>
        </div>
      </footer>
    </div>

    <ToastNotification />
  </div>
</template>
