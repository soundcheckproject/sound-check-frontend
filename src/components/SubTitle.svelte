<script lang="ts">
	export let className = ''
	export let theme: 'dark' | 'light' | 'color' = 'dark'
</script>

<h2
	class="text-md font-medium  flex items-center {theme == 'color'
		? 'text-blue-900 '
		: theme == 'dark'
		? 'text-gray-700'
		: 'text-white text-opacity-90'} {className}"
>
	<div
		class="w-1 h-5 {theme == 'light'
			? ' bg-gray-100 bg-opacity-50'
			: ' bg-gray-300 '} mr-2 rounded-sm"
	/>
	<slot />
</h2>
