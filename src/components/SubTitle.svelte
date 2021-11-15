<script lang="ts">
	export let className = ''
	export let theme: 'dark' | 'light' | 'color' | 'error' = 'dark'
</script>

<h2
	class="relative text-md font-medium justify-items-stretch flex items-center normal-case {theme ==
	'error'
		? 'text-red-400 bg-red-100 text-sm rounded-sm p-3 '
		: theme == 'color'
		? 'text-blue-900 '
		: theme == 'dark'
		? 'text-gray-700'
		: 'text-white text-opacity-90'} pr-8 {className} "
>
	<div
		class="w-1 h-5 {theme == 'error'
			? ' bg-red-400 '
			: theme == 'light'
			? ' bg-gray-100 bg-opacity-50'
			: ' bg-gray-300 '} mr-2 rounded-sm"
	/>
	<slot />
	{#if theme === 'error'}
		<div class="absolute right-3 cursor-pointer ">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		</div>
	{/if}
</h2>
