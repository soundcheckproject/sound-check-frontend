<script>
	export let className = '';
</script>

<h2 class="text-lg font-medium flex items-center {className}">
	<div class="w-1 h-5 bg-gray-300 mr-2 rounded-sm" />
	<slot />
</h2>
