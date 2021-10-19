<script lang="ts">
	export let className = '';
	export let artist = 'name';
	export let size: 'sm' | 'md' = 'sm';
</script>

<h2
	class="{size == 'md'
		? 'text-md'
		: 'text-sm'} bg-white bg-opacity-25 rounded-full flex items-center {className} pr-5"
>
	<!-- <img alt="Artist {artist}" class="w-8 h-8 bg-gray-300 mr-2 rounded-full" /> -->
	<div class="w-8 h-8 bg-gray-300 mr-3 rounded-full {size == 'md' ? ' w-12 h-12' : ''}" />
	<slot />
</h2>
