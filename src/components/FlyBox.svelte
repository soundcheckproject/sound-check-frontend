<script>
  import { slide } from 'svelte/transition'
</script>

<!-- <div in:fly={{ x: -200, opacity: 0, delay: 200 }} out:fly={{ x: 200, opacity: 0 }} class="">
	<slot />
</div> -->
<div transition:slide|local class="grid gap-4">
  <slot />
</div>
