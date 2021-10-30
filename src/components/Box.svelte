<script>
	import { fade, fly } from 'svelte/transition'
</script>

<div
	in:fly={{ duration: 200, opacity: 0, y: 100 }}
	out:fade={{ duration: 200 }}
	class="grid p-12 gap-6 bg-white rounded-md mshadow-xs"
>
	<slot />
</div>
