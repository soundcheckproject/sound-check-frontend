<script lang="ts">
	import Container from './Container.svelte'
	import Navigation from './Navigation.svelte'

	export let type: 'split' | 'full' = 'full'
</script>

<div
	class="w-screen {type == 'full'
		? ' h-full sm:h-screen'
		: ''}  bg-gradient-to-r from-indigo-800 to-purple-900 text-white"
>
	<Container className="sm:w-full">
		<div class="grid w-full {type == 'full' ? ' h-screen' : ''} items-center appHeaderGrid ">
			<Navigation />
			<slot />
		</div>
	</Container>
</div>
