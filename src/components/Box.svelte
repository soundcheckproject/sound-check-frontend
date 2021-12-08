<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import FadeBox from './portal/FadeBox.svelte'

  export let size: 'sm' | 'md' = 'md'
</script>

<!-- <div
  class={`relative grid p-6 py-7 lg:p-12 gap-6 bg-white rounded-md mshadow-xs ${$$props.class}`}
>
  <slot />
</div> -->
<!-- in:fly|local={{ duration: 200, opacity: 0, y: 100, delay: 200 }}
out:fade|local={{ duration: 200 }} -->
<FadeBox>
  {#if size === 'sm'}
    <div
      class={`p-2 lg:p-4 gap-2 bg-white rounded-md mshadow-xs ${$$props.class}`}
    >
      <slot />
    </div>
  {:else}
    <div
      class={`relative grid p-6 py-7 lg:p-12 gap-6 bg-white rounded-md mshadow-xs ${$$props.class}`}
    >
      <slot />
    </div>
  {/if}
</FadeBox>
