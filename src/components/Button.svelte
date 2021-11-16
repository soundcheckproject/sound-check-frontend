<script lang="ts">
  export let onClick = () => {}
  export let type: 'default' | 'submit' | 'glass' = 'default'
  export let state: 'default' | 'active' = 'default'
  export let color: 'default' | string = 'default'
  export let rounded: 'default' | 'full' | 'none' = 'default'
  export let size: 'xs' | 'sm' | 'md' | 'lg' | 'stretch' = 'sm'
  export let className: string = ''
</script>

<button
  on:click|preventDefault={onClick}
  type="submit"
  class=" transition-colors hover:bg-opacity-80 mshadow-md bg-gray-50 flex justify-center items-center text-gray-600 cursor-pointer 
	{rounded == 'default'
    ? ' rounded-md'
    : rounded == 'full'
    ? ' rounded-full'
    : 'rounded-sm'}
	{state == 'active' ? '' : ''}
	 {color != 'default' ? `${color} text-white` : ''}
	 {type == 'glass' ? ' bg-opacity-25 text-white hover:bg-opacity-10' : ''}
	 {size == 'xs'
    ? ' px-3 py-2 text-xs'
    : size == 'sm'
    ? ' px-4 py-2 text-sm'
    : size == 'md'
    ? ' px-8 py-4 text-sm'
    : size == 'lg'
    ? ' px-12 py-6 text-md'
    : ''}
	 {className} {$$props.class}
	 "
>
  <slot />
</button>
