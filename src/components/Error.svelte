<script lang="ts">
  import { fly, slide } from 'svelte/transition'

  export let display = true
  export let onClose = null
  export let filled = true
</script>

{#if display}
  <h2
    transition:slide|local
    class="relative text-xs font-base justify-items-stretch flex items-center normal-case 
    rounded-full font-medium space-x-2  text-gray-800 group cursor-pointer hover:bg-red-100/75 transition-all
     {$$props.class}"
    on:click|preventDefault={onClose}
  >
    <div
      class="w-8 h-8 bg-red-100/75 opacity-100 group-hover:opacity-0 transition-all text-red-600 p-2 rounded-full relative flex items-center justify-center"
    >
      <svg
        class="w-4 h-4 "
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        /></svg
      >
    </div>
    {#if onClose}
      <button
        class="opacity-0 group-hover:opacity-100 transition-all absolute right-3 cursor-pointer "
      >
        <svg
          class="text-red-600"
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
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    {/if}

    <div
      in:fly={{ x: -25, opacity: 0, delay: 200 }}
      out:fly={{ x: -25, opacity: 0 }}
      class="group-hover:-translate-x-6 transition-all group-hover:text-red-600"
    >
      <slot />
    </div>
  </h2>
{/if}
<!--  Old error component
  {#if display}
  <h2
    transition:slide|local
    class="relative text-md font-base justify-items-stretch flex items-center normal-case 
    text-sm rounded-sm py-3 px-4 {$$props.filled
      ? 'bg-red-600 text-white bg-opacity-75'
      : 'text-red-600 bg-black bg-opacity-5 '} 
     {$$props.class}"
  >
    <slot />

    {#if onClose}
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
    {/if}
  </h2>
{/if} -->
