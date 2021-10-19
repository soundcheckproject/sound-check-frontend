<script lang="ts">
	export let onClick = () => {};
	export let type: 'default' | 'submit' | 'glass' = 'default';
	export let state: 'default' | 'active' = 'default';
	export let color: 'default' | string = 'default';
	export let rounded: 'default' | 'full' | 'none' = 'default';
	export let size: 'sm' | 'md' | 'lg' | 'stretch' = 'sm';
	export let className: string = '';
</script>

<div
	on:click={onClick}
	class=" bg-gray-50 flex justify-center items-center text-gray-600 cursor-pointer
	{rounded == 'default' ? ' rounded-md' : rounded == 'full' ? ' rounded-full' : ''}
	{state == 'active' ? '' : ''}
	 {color != 'default' ? color : ''}
	 {type != 'default' ? '' : ''}
	 {size == 'sm'
		? ' px-4 py-2 text-sm'
		: size == 'md'
		? ' px-8 py-4 text-md'
		: size == 'lg'
		? ' px-12 py-6 text-lg'
		: ''}
	 {className}
	 "
>
	<slot />
</div>
