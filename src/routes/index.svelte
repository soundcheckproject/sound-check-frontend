<script>
	import Navigation from '../components/Navigation.svelte';
	import Container from '../components/Container.svelte';
	import Button from '../components/Button.svelte';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import Title from '../components/Title.svelte';
	import SubTitle from '../components/SubTitle.svelte';
	import Artist from '../components/Artist.svelte';
	import Track from '../components/Track.svelte';
	let count = 1;
</script>

<Header>
	<Container className="sm:w-full">
		<div class="grid w-full h-screen items-center appHeaderGrid ">
			<Navigation />
			<article
				class="max-w-xs sm:max-w-max mx-auto sm:mx-0 lg:-mx-12 md:-mx-24 mb-24 -mt-6 sm:-mt-0 flex gap-6 sm:gap-2 flex-col-reverse sm:flex-row-reverse lg:flex-row lg:space-x-12 lg:items-center space-between "
			>
				<div class="sm:w-2/3  grid gap-4">
					<div>
						<h1 class="text-2xl sm:text-3xl lg:text-5xl font-bold">Release spotlight title</h1>
						<h3 class="text-white text-opacity-50 text-sm sm:text-md">by xxx and xxx</h3>
					</div>
					<p class="hidden sm:inline lg:text-md ">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type specimen book. It has
						survived not only five centuries,
					</p>
					<div class=" mb-2 flex justify-start items-end space-x-2">
						<!-- <Artist size="md">Artist</Artist>
					<Artist size="sm">Artist</Artist> -->
						<Artist size="xs">Artist</Artist>
						<Artist size="xs">Artist</Artist>
						<Artist size="xs">Artist</Artist>
						<Artist size="xs">Artist</Artist>
					</div>
					<div class="flex">
						<Button onClick={() => count++} type="glass" rounded="none">Learn more!</Button>
					</div>
				</div>
				<div class="sm:w-1/3  px-6 flex justify-end">
					<img
						class="rounded-sm mshadow-lg sm:max-h-96  h-full max-w-xs w-full object-cover "
						src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.sndcdn.com%2Fartworks-000454520877-chf2n6-t500x500.jpg&f=1&nofb=1"
						alt="Artwork"
					/>
				</div>

				<!-- <Button type="glass" rounded="default" size="md">Learn more{count}</Button> -->
			</article>
		</div>
	</Container>
</Header>
<Container>
	<div class="py-6">
		<section>
			<article>
				<Title className="">Latest releases</Title>
				<div class="sm:grid-cols-3 gap-4 flex overflow-x-scroll">
					<Track />
					<Track />
					<Track />
					<Track />
					<Track />
					<Track />
					<Track />
					<Track />
					<Track />
					<Track />
				</div>
			</article>
		</section>

		<section class="even:bg-gray-100 px-6 -mx-6 sm:px-12 sm:-mx-12 rounded-md">
			<article>
				<Title>New artists</Title>
				<div>artists</div>
			</article>
			<article>
				<SubTitle>🔦 Artist spotlight</SubTitle>
				<div class="space-y-4 sm:space-y-0 sm:flex justify-between sm:space-x-8 items-center">
					<div class="grid flex-col justify-items-start sm:w-1/2 lg:w-2/3 ">
						<h4 class="text-lg font-semibold">Martin Garrix</h4>
						<p class="text-sm mt-2 max-w-xl">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
							has been the industry's standard dummy text ever since the 1500s, when an unknown
							printer took a galley of type and scrambled it to make a type specimen book. It has
							survived not only five centuries, but also the leap into electronic typesetting,
							remaining essentially unchanged. It was popularised in the 1960s with the release of
							Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
							publishing software like Aldus PageMaker including versions of Lorem Ipsum.
						</p>
						<div class="hidden sm:inline mt-4 self-end md:mt-10">
							<Artist size="md">Martijntje</Artist>
						</div>
					</div>
					<div class=" sm:w-1/2  lg:w-1/3">
						<img
							src="https://dynamicmedia.livenationinternational.com/Media/n/r/c/ad6a5ff7-fb0a-4e3f-a5fa-fb26381f186f.jpg"
							class="object-contain sm:object-cover h-64 sm:h-64 box-border w-full rounded-sm "
							alt="A photo of Martin Garrix"
						/>
					</div>

					<!-- svelte-ignore a11y-img-redundant-alt -->
				</div>
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
	.appHeaderGrid {
		grid-template-rows: min-content auto;
	}
</style>
