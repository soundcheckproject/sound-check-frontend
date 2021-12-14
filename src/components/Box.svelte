<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import FadeBox from './portal/FadeBox.svelte'

  export let size: 'sm' | 'md' = 'md'
  export let theme: 'dark' | 'light' | 'white' | 'gray' = 'white'
</script>

<FadeBox>
  {#if size === 'sm'}
    <div
      class={`p-2 lg:p-4 gap-2  ${theme === 'dark' && 'bg-gray-700'} ${
        theme === 'light' && 'bg-gray-100'
      } ${theme === 'white' && 'bg-white'}  ${
        theme === 'gray' && 'bg-gray-300'
      } rounded-md mshadow-xs ${$$props.class}`}
    >
      <slot />
    </div>
  {:else}
    <div
      class={`relative grid p-6 py-7 lg:p-12 gap-6  ${
        theme === 'dark' && 'bg-gray-700'
      } ${theme === 'light' && 'bg-gray-100'} ${
        theme === 'white' && 'bg-white'
      }  ${theme === 'gray' && 'bg-gray-300'} rounded-md mshadow-xs ${
        $$props.class
      }`}
    >
      <slot />
    </div>
  {/if}
</FadeBox>
