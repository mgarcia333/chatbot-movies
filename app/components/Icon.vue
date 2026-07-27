<script setup lang="ts">
withDefaults(defineProps<{ name: string; fill?: boolean }>(), { fill: false })
</script>

<template>
  <span
    class="material-symbols-outlined leading-none select-none"
    :style="{ fontVariationSettings: `'FILL' ${fill ? 1 : 0}` }"
  >{{ name }}</span>
</template>
