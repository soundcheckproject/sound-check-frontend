<script lang="ts">
	export let className = '';
	export let theme: 'dark' | 'light' | 'color' = 'dark';
</script>

<h2
	class="-mt-1 font-bold text-2xl lg:text-3xl {theme == 'color'
		? 'text-blue-900 '
		: theme == 'dark'
		? 'text-gray-700'
		: 'text-white text-opacity-90'} {className} {$$props.class}"
>
	<slot />
</h2>
