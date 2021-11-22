<script>
  import { fade, fly } from 'svelte/transition'
  import FadeBox from './portal/FadeBox.svelte'
</script>

<!-- <div
  class={`relative grid p-6 py-7 lg:p-12 gap-6 bg-white rounded-md mshadow-xs ${$$props.class}`}
>
  <slot />
</div> -->
<!-- in:fly|local={{ duration: 200, opacity: 0, y: 100, delay: 200 }}
out:fade|local={{ duration: 200 }} -->
<FadeBox>
  <div
    class={`relative grid p-6 py-7 lg:p-12 gap-6 bg-white rounded-md mshadow-xs ${$$props.class}`}
  >
    <slot />
  </div>
</FadeBox>
