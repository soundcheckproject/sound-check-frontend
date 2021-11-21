<script>
  import { fade, fly } from 'svelte/transition'
</script>

<!-- <div
  class={`relative grid p-6 py-7 lg:p-12 gap-6 bg-white rounded-md mshadow-xs ${$$props.class}`}
>
  <slot />
</div> -->
<!-- in:fly|local={{ duration: 200, opacity: 0, y: 100, delay: 200 }}
out:fade|local={{ duration: 200 }} -->
<div
  in:fade={{ duration: 200, delay: 200 }}
  out:fade={{ duration: 200 }}
  class={`relative grid p-6 py-7 lg:p-12 gap-6 bg-white rounded-md mshadow-xs ${$$props.class}`}
>
  <slot />
</div>
