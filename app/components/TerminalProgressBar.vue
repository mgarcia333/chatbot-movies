<script setup lang="ts">
const props = withDefaults(defineProps<{
  progress: number
  label?: string
  segments?: number
}>(), {
  label: 'LOADED',
  segments: 10
})

const clamped = computed(() => Math.min(100, Math.max(0, props.progress)))
const filled = computed(() => Math.round((clamped.value / 100) * props.segments))
const barText = computed(() =>
  '[' + '█'.repeat(filled.value) + '░'.repeat(props.segments - filled.value) + ']'
)
const active = computed(() => clamped.value < 100)
</script>

<template>
  <div class="w-full font-mono text-xs">
    <div class="flex items-baseline justify-between gap-2 text-phosphor-500 text-glow tabular-nums">
      <span>{{ barText }}</span>
      <span>{{ Math.round(clamped) }}% {{ label }}</span>
    </div>
    <div class="mt-1 h-1.5 w-full bg-ink-700 border border-phosphor-600/40 overflow-hidden">
      <div
        class="h-full transition-[width] duration-300 ease-out"
        :class="active ? 'bar-stripes animate-stripe' : 'bg-phosphor-500'"
        :style="{ width: clamped + '%' }"
      />
    </div>
  </div>
</template>
