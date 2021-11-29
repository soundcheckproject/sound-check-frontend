<script lang="ts">

  import { slide } from 'svelte/transition'

  export let display = true
  export let onClose


</script>

{#if display}
  <h2
    transition:slide|local
    class="relative text-md font-base justify-items-stretch flex items-center normal-case 
    text-red-600 bg-black bg-opacity-5 text-sm rounded-sm py-3 px-4
     "
  >
    <slot />

    <!-- on:click={() => {
        display = false
        if(onClose) onClose()
      }} -->
    <div
      on:click|preventDefault={onClose}
      class="absolute right-3 cursor-pointer "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </div>
  </h2>
{/if}
