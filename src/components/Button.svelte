<script lang="ts">
  import { fade, fly } from 'svelte/transition'

  import FadeBox from './portal/FadeBox.svelte'

  export let onClick = () => {}
  export let type: 'default' | 'submit' | 'glass' = 'default'
  export let state: 'default' | 'active' = 'default'
  export let color: 'default' | string = 'default'
  export let rounded: 'default' | 'full' | 'none' = 'default'
  export let size: 'xs' | 'sm' | 'md' | 'lg' | 'stretch' = 'sm'
  export let className: string = ''
  export let loading = null
</script>

<button
  on:click|preventDefault={onClick}
  type="submit"
  class="space-x-2 transition-colors hover:bg-opacity-80 mshadow-md bg-gray-50 flex justify-center items-center
	{rounded == 'default'
    ? ' rounded-md'
    : rounded == 'full'
    ? ' rounded-full'
    : 'rounded-sm'}
	  {state == 'active' ? '' : ''}
    {type == 'glass' && ' bg-opacity-25 text-white hover:bg-opacity-10'}
	  {color != 'default' ? `${color} text-white` : ''}
	  {size == 'xs'
    ? ' px-3 py-2 text-xs'
    : size == 'sm'
    ? ' px-4 py-2 text-sm'
    : size == 'md'
    ? ' px-8 py-4 text-sm'
    : size == 'lg'
    ? ' px-12 py-6 text-md'
    : ''}
	 {className} {$$props.class} {$$props.disabled
    ? 'opacity-10 cursor-default '
    : 'opacity-100 cursor-pointer '} {loading ? 'animate-pulse' : ''}
	 "
  disabled={$$props.disabled}
>
  {#if loading}
    <div class=" flex space-x-2 justify-center items-center">
      <svg
        class="animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12a9 9 0 11-6.219-8.56" />
      </svg>
      <div>{loading}</div>
    </div>
  {:else}
    <div class=" flex space-x-2 justify-center items-center">
      <slot />
    </div>
  {/if}
</button>
