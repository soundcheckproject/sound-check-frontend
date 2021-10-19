<script>
	export let onClick;
	export const type = 'normal';
</script>

<div on:click={onClick} class="px-4 py-3 rounded-sm bg-gray-50 flex text-gray-600 cursor-pointer">
	<slot />
</div>
