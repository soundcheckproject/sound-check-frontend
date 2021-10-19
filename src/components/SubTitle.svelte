<script>
	export let className = '';
</script>

<h2 class="text-md font-medium uppercase flex items-center text-gray-700 {className}">
	<div class="w-1 h-5 bg-gray-300 mr-2 rounded-sm" />
	<slot />
</h2>
