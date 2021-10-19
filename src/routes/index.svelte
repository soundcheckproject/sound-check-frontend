<script>
	import Navigation from '../components/Navigation.svelte';
	import Container from '../components/Container.svelte';
	import Button from '../components/Button.svelte';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	let count = 1;
</script>

<Header>
	<Container
		><Navigation />
		<article>
			<h1>Release spotlight title</h1>
			<p>blalblalb</p>
			<div>
				<div>Artist</div>
				<div>Artist</div>
				<div>Artist</div>
			</div>
			<Button onClick={() => count++}>Learn more{count}</Button>
		</article>
	</Container>
</Header>
<Container>
	<div class="py-6">
		<section>
			<article>
				<h2 class="mshadow-xl">Latest releases</h2>
				<div>
					<div>release</div>
					<div>release</div>
					<div>release</div>
				</div>
			</article>
		</section>

		<section class="mshadow-sm even:bg-gray-100 px-12 -mx-12 rounded-md">
			<article>
				<h2>New artists</h2>
				<div>artists</div>
			</article>
			<article>
				<h3>Artist spotlight</h3>
				<div>azelk</div>
			</article>
		</section>
		<section>
			<article>
				<h2>What is label?</h2>
				<p>smth</p>
			</article>
		</section>
		<section>
			<article>
				<h2>Contact</h2>
			</article>
		</section>
	</div>
</Container>
<Footer />

<style>
</style>
