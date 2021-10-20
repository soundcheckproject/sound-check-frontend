<script>
	import Container from './Container.svelte';
</script>

<div class="w-screen h-full sm:h-screen bg-gradient-to-r from-indigo-800 to-purple-900 text-white">
	<Container className="sm:w-full">
		<div class="grid w-full h-screen items-center appHeaderGrid ">
			<slot />
		</div>
	</Container>
</div>
