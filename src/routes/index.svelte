<script>
	import Navigation from '../components/Navigation.svelte';
	import Container from '../components/Container.svelte';
	import Button from '../components/Button.svelte';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import Title from '../components/Title.svelte';
	import SubTitle from '../components/SubTitle.svelte';
	import Artist from '../components/Artist.svelte';
	let count = 1;
</script>

<Header>
	<Container
		><Navigation />
		<article>
			<h1 class="text-3xl font-bold">Release spotlight title</h1>
			<p class="mt-4">blalblalb</p>
			<div class="mt-4 mb-4 flex space-x-4">
				<Artist size="md">Artist</Artist>
				<Artist size="sm">Artist</Artist>
				<Artist size="sm">Artist</Artist>
			</div>
			<Button onClick={() => count++} type="glass" rounded="none">Learn more{count}</Button>
			<Button type="glass" rounded="default" size="md">Learn more{count}</Button>
		</article>
	</Container>
</Header>
<Container>
	<div class="py-6">
		<section>
			<article>
				<Title className="mshadow-xl">Latest releases</Title>
				<div>
					<div>release</div>
					<div>release</div>
					<div>release</div>
				</div>
			</article>
		</section>

		<section class="mshadow-sm even:bg-gray-100 px-12 -mx-12 rounded-md">
			<article>
				<Title>New artists</Title>
				<div>artists</div>
			</article>
			<article>
				<SubTitle>Artist spotlight</SubTitle>
				<div>azelk</div>
			</article>
		</section>
		<section>
			<article>
				<Title>What is label?</Title>
				<p>smth</p>
			</article>
		</section>
		<section>
			<article>
				<Title>Contact</Title>
			</article>
		</section>
	</div>
</Container>
<Footer />

<style>
</style>
