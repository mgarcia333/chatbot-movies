<script setup lang="ts">
const { messages, loading, sendMessage } = useChat()
const newMessage = ref('')
const chatContainer = ref<HTMLElement | null>(null)

const handleSend = () => {
  if (!newMessage.value.trim() || loading.value) return
  sendMessage(newMessage.value)
  newMessage.value = ''
}

watch(messages, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}, { deep: true })
</script>

<template>
  <div class="flex flex-col h-screen max-w-2xl mx-auto bg-white shadow-xl">
    <!-- Header -->
    <header class="p-4 border-b bg-white flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">CR</div>
        <h1 class="font-bold text-xl tracking-tight">CineRoulette</h1>
      </div>
    </header>

    <!-- Chat History -->
    <main 
      ref="chatContainer"
      class="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gray-50/50 scroll-smooth"
    >
      <ChatMessage 
        v-for="(msg, i) in messages" 
        :key="i" 
        :message="msg" 
      />
      
      <div v-if="loading" class="flex justify-start mb-4">
        <div class="bg-gray-100 text-gray-400 rounded-2xl px-4 py-2 italic text-sm animate-pulse">
          El sumiller está pensando...
        </div>
      </div>
    </main>

    <!-- Input Area -->
    <footer class="p-4 bg-white border-t">
      <form @submit.prevent="handleSend" class="flex gap-2">
        <input 
          v-model="newMessage"
          type="text" 
          placeholder="Escribe aquí tu respuesta..."
          class="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button 
          type="submit"
          :disabled="loading || !newMessage.trim()"
          class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold px-6 py-2 rounded-xl transition-all shadow-sm active:scale-95"
        >
          Enviar
        </button>
      </form>
      <p class="text-[10px] text-center text-gray-400 mt-2 uppercase tracking-widest font-semibold">
        Specification-Driven Development Chatbot
      </p>
    </footer>
  </div>
</template>

<style>
body {
  @apply bg-gray-100 antialiased;
}
</style>
