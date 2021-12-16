<script lang="ts">
import { compute_slots } from "svelte/internal"

  export let theme: 'white' | 'light' | 'dark' = 'light'
  export let opacity = 100
  export let loading = false
  export let height = 'h-24'
  export let className = ''
</script>

<div
  class="grid gap-2 {loading
    ? 'animate-pulse '
    : ''} rounded-md justify-center items-center py-4 {theme == 'white'
    ? 'bg-white'
    : theme == 'light'
    ? 'bg-gray-200'
    : theme == 'dark'
    ? 'bg-gray-700'
    : ''} opacity-{opacity} {height} {className} text-gray-800"
>
  <div class="text-sm flex space-x-1 items-center">
    <svg
      class="text-teal-700"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg><div class="opacity-20">|</div>
    <div>
      {#if $$slots.default === undefined && loading}
        Loading
      {/if}
      <slot />
    </div>
  </div>
  <!-- <div> </div> -->
</div>
