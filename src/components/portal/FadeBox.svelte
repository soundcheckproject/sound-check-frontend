<script>
  import { fade } from 'svelte/transition'
</script>

<div in:fade|local={{ duration: 200, delay: 200 }} out:fade|local={{ duration: 200 }}>
  <slot />
</div>
