<script lang="ts">
	import Title from '../../../../components/Title.svelte'
	import SubTitle from '../../../../components/SubTitle.svelte'
	import Track from '../../../../components/Track.svelte'
	import Box from '../../../../components/Box.svelte'
	import Artist from '../../../../components/Artist.svelte'
	import { fade, fly, slide } from 'svelte/transition'

	interface Artist {
		title: string
		genre: string
		description: string
		releaseDate: string
	}

	let newTrack: any = {}

	let artistObj = { artistName: 'Martin garrix', royaltyPercentage: 51 }
	let artistsArray = [artistObj, artistObj]

	let artistSearch = { artistName: '', hover: false }

	const removeArtist = (removeArtistIndex: number) => {
		console.log(removeArtistIndex)
		artistsArray.splice(removeArtistIndex + 1, 1)
		console.log(artistsArray)
	}
	let royaltyPercentageTotal: number = 0

	const calcRoyaltyPercentageTotal = () => {
		let royaltyPercentage: number = 0
		for (let artist of artistsArray) {
			royaltyPercentage += +artist.royaltyPercentage
		}
		console.log(royaltyPercentage)
		return royaltyPercentage
	}
	$: {
		calcRoyaltyPercentageTotal()
	}
</script>

<Box>
	<Title>Submit a new track</Title>
	<SubTitle>📝 Information about your track</SubTitle>
	<div class="grid lg:grid-cols-2 gap-4">
		<label class="portal"
			>Create a title<input
				bind:value={newTrack.title}
				class="input portal"
				placeholder="Password.."
			/></label
		>
		<label class="portal"
			>Pick a genre
			<select
				bind:value={newTrack.genre}
				class="input portal"
				placeholder="For example: Future House, Bass House"
				><option>Future House</option><option>Bass House</option><option>Pop House</option></select
			>
		</label>
		<label class="portal"
			>Describe your track<input
				bind:value={newTrack.description}
				class="input portal"
				placeholder="Password.."
			/></label
		>
		<label class="portal"
			>Preferred release date<input
				bind:value={newTrack.releasedate}
				class="input portal"
				placeholder="For example: August 8th, 2021"
			/></label
		>
	</div>
	<SubTitle>👨🏼‍🎨 Artists</SubTitle>
	<div class="grid lg:grid-cols-2 gap-4">
		<div class="grid gap-4">
			<div
				class="relative"
				on:mouseenter={() => (artistSearch.hover = true)}
				on:mouseleave={() => (artistSearch.hover = false)}
			>
				<label class="portal"
					>Search collaborator<input
						bind:value={artistSearch.artistName}
						class="input portal"
						placeholder="Search by name.."
					/></label
				>
				{#if artistSearch.hover}
					<div
						in:fly={{ y: 25, opacity: 0 }}
						out:fade={{ duration: 200 }}
						class="absolute left-0 right-0 w-full z-10 "
					>
						<div class=" mt-2 mshadow-md p-4  bg-white rounded-sm grid gap-2">
							<p class="text-xs font-semibold ">Select artist</p>
							{#if artistSearch.artistName.length > 0}
								<div class="grid gap-2 grid-cols-3 mt-1">
									{#each ['artist', 'artist'] as artist}<Artist
											onClick={() => {
												artistsArray = [
													...artistsArray,
													{ artistName: 'ghaha', royaltyPercentage: 100 }
												]
											}}>{artist}</Artist
										>
									{/each}
								</div>
							{:else}
								<p class="text-sm animate-pulse	">Loading artists..</p>
							{/if}
						</div>
					</div>
				{/if}
			</div>
			{#if artistsArray.length > 0}
				<div
					class="grid grid-cols-2 gap-2 text-xs items-center"
					style="grid-template-columns:1fr 5rem"
					transition:fade
				>
					<p class="font-semibold">Artist(s)</p>
					<p class="font-semibold text-right">Royalties</p>
				</div>

				{#if calcRoyaltyPercentageTotal() != 100}
					<SubTitle theme="error">Total of royaltiy % should be equal to 100</SubTitle>
				{/if}
			{/if}
			{#each artistsArray as artist, index}
				<div
					class="grid grid-cols-2 gap-2 text-sm items-center"
					style="grid-template-columns:1fr 5rem"
					transition:fade
				>
					<Artist
						size="md"
						remove={() => {
							removeArtist(index)
						}}>{artist.artistName}</Artist
					>
					<div class="relative flex items-center justify-end group">
						<input
							type="number"
							min="0"
							max="100"
							class="input portal pr-5 m-0 bg-gray-100 rounded-sm "
							value={artist.royaltyPercentage}
						/>
						<svg
							class="absolute mr-3 group-hover:text-blue-800 peer-focus:text-blue-800 transition-colors"
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<line x1="19" y1="5" x2="5" y2="19" />
							<circle cx="6.5" cy="6.5" r="2.5" />
							<circle cx="17.5" cy="17.5" r="2.5" />
						</svg>
					</div>
				</div>
			{/each}
			<!-- {#each artists as artist, index}
				<div
					class="grid grid-cols-2 gap-2 text-sm items-center"
					style="grid-template-columns:1fr 5rem"
					transition:fade
				>
					<Artist
						size="md"
						remove={() => {
							removeArtist(index)
						}}>{artist}</Artist
					>
					<div class="relative flex items-center justify-end group">
						<input
							type="number"
							min="0"
							max="100"
							class="input portal pr-5 m-0 bg-gray-100 rounded-sm "
						/>
						<svg
							class="absolute mr-3 group-hover:text-blue-800 peer-focus:text-blue-800 transition-colors"
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<line x1="19" y1="5" x2="5" y2="19" />
							<circle cx="6.5" cy="6.5" r="2.5" />
							<circle cx="17.5" cy="17.5" r="2.5" />
						</svg>
					</div>
				</div>
			{/each} -->
		</div>
	</div>
	<SubTitle>🖼 Artwork for your track</SubTitle>
	<label class="portal"
		>Designer of the artwork<input
			bind:value={newTrack.releasedate}
			class="input portal"
			placeholder="For example: August 8th, 2021"
		/></label
	>
	<label class="portal"
		>Upload Artwork<input
			bind:value={newTrack.releasedate}
			class="input portal"
			placeholder="For example: August 8th, 2021"
		/></label
	>
</Box>
