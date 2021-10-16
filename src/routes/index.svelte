<script>
	import Navigation from '../components/Navigation.svelte';
	import Container from '../components/Container.svelte';
	import Button from '../components/Button.svelte';
	import Header from '../components/Header.svelte';
	let count = 1;
</script>

<Header>
	<Container
		><Navigation />

		<Button onClick={() => count++}>{count}</Button>
	</Container>
</Header>

<h1 class="text-xl font-bold text-blue-500">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
