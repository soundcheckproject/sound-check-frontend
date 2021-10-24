<script lang="ts">
	import Container from '../components/Container.svelte'
	import Button from '../components/Button.svelte'
	import Header from '../components/Header.svelte'
	import Footer from '../components/Footer.svelte'
	import Title from '../components/Title.svelte'
	import SubTitle from '../components/SubTitle.svelte'
	import Artist from '../components/Artist.svelte'
	import Track from '../components/Track.svelte'
	let count = 0
</script>

<Header>
	<article
		class="max-w-xs sm:max-w-max mx-auto sm:mx-0 lg:-mx-12 md:-mx-24 mb-24 -mt-6 sm:-mt-0 flex gap-6 sm:gap-2 flex-col-reverse sm:flex-row-reverse lg:flex-row lg:space-x-12 lg:items-center space-between "
	>
		<div class="sm:w-2/3  grid gap-4">
			<div>
				<h1 class="text-2xl sm:text-3xl lg:text-5xl font-bold">Release spotlight title</h1>
				<h3 class="text-white text-opacity-50 text-sm sm:text-md">by xxx and xxx</h3>
			</div>
			<p class="hidden sm:inline lg:text-md ">
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
				been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
				galley of type and scrambled it to make a type specimen book. It has survived not only five
				centuries,
			</p>
			<div class=" mb-2 flex justify-start items-end space-x-2">
				<!-- <Artist size="md">Artist</Artist>
					<Artist size="sm">Artist</Artist> -->
				<Artist size="md">Artist</Artist>
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
</Header>
<Container>
	<div class="py-6">
		<section>
			<article>
				<Title className="">Latest releases</Title>
				<div class="sm:grid-cols-3 gap-4 flex overflow-x-scroll mt-2  sm:-mx-6 ">
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
							alt="A photo of Martin Garrix"
							src="https://dynamicmedia.livenationinternational.com/Media/n/r/c/ad6a5ff7-fb0a-4e3f-a5fa-fb26381f186f.jpg"
							class="object-contain sm:object-cover h-64 sm:h-64 box-border w-full rounded-sm "
						/>
					</div>
				</div>
			</article>
		</section>
		<section>
			<article>
				<Title>What is label?</Title>
				<Title>What is label?</Title>
				<SubTitle>🚨 Letsgo!</SubTitle>
				<p>
					Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
					of classical Latin literature from 45 BC, making it over 2000 years old. Richard
					McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the
					more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the
					cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum
					comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
					of Good and Evil) by Cicero, written in 45 BC.$
				</p>
				<SubTitle>🧠 How did it start</SubTitle>
				<p>
					This book is a treatise on the theory of ethics, very popular during the Renaissance. The
					first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
					1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for
					those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
					Cicero are also reproduced in their exact original form, accompanied by English versions
					from the 1914 translation by H. Rackham.
				</p>
			</article>
		</section>
		<Title>Contact</Title>
		<section class="md:flex items-center">
			<article
				class="bg-gray-100 px-6 -mx-6 md:-ml-12 md:mr-12 md:p-12 box-content rounded-md md:w-1/2 lg:w-2/5 "
			>
				<form class="grid gap-4 ">
					<label>Topic<input class="input" placeholder="Royalties, demo, promo, .." /></label>
					<label
						>What's your question?<textarea
							class="input "
							placeholder="For example: I'm interested to know how.."
						/></label
					>

					<label for="file">
						Attachment
						<div class="relative flex items-center justify-end group">
							<div class="input peer text-gray-500">Drag & drop your file!</div>
							<!-- 
								
								<input
								id="file"
								type="file"
								value="Drag & drop!"
								class="hidden"
								placeholder="Drag & drop!"
							/> -->
							<svg
								class="absolute mr-4 mt-2 group-hover:text-blue-800 peer-focus:text-blue-800 transition-colors"
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
								<polyline points="14 2 14 8 20 8" />
								<line x1="16" y1="13" x2="8" y2="13" />
								<line x1="16" y1="17" x2="8" y2="17" />
								<line x1="10" y1="9" x2="8" y2="9" />
							</svg>
						</div>
					</label>
					<Button color="bg-blue-900" size="md">Learn more!</Button>
				</form>
			</article>
			<article class="py-12 md:w-1/2 lg:w-3/5 lg:left">
				<SubTitle>📩 Get in touch with us!</SubTitle>
				<p>
					This book is a treatise on the theory of ethics, very popular during the Renaissance. The
					first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
					1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for
					those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
					Cicero are also reproduced in their exact original form, accompanied by English versions
					from the 1914 translation by H. Rackham.
				</p>
				<p>demo@jajarecords.com</p>
				<p>promo@jajarecords.com</p>
				<p>invoice@jajarecords.com</p>
				<p>demo@jajarecords.com</p>
			</article>
		</section>
	</div>
</Container>

<Footer />

<style>
</style>
