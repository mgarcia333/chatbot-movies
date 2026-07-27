<script setup lang="ts">
const { toast } = useToast()
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="toast"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-ink-800 border border-phosphor-500 border-glow text-phosphor-500 text-glow text-sm font-mono font-semibold px-5 py-3 uppercase tracking-wide"
      >
        &gt; {{ toast.message }}
      </div>
    </Transition>
  </Teleport>
</template>
