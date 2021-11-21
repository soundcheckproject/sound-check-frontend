<script>
  import { fly, slide } from 'svelte/transition'
</script>

<!-- <div
  in:fly={{ x: -100, duration: 200, opacity: 0, delay: 200 }}
  out:fly={{ x: 100, duration: 200, opacity: 0 }}
  class=""
>
  <slot />
</div> -->
<div transition:slide|local class="grid gap-4">
  <slot />
</div>
