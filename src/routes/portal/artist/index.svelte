<script>
	import Title from '../../../components/Title.svelte'
	import SubTitle from '../../../components/SubTitle.svelte'
	import Track from '../../../components/Track.svelte'
	import Box from '../../../components/Box.svelte'
</script>

<Box>
	<Title>Artist portal</Title>
	<SubTitle>
		<div class="flex justify-between w-full">
			<div>💽 Your tracks</div>
			<div>Add</div>
		</div>
	</SubTitle>
	<div class="sm:grid-cols-3 gap-4 mt-2 flex overflow-x-scroll snap rounded-md">
		<Track add />
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
	<SubTitle>hoi</SubTitle>
	<a href="/artist/tracks">/artist/tracks</a>
	<a href="/artist/demo">/artist/demo</a>
	<a href="/artist/demo/submit">/artist/demo/submit</a>
	<a href="/artist/demo/12342341">/artist/demo/:trackId</a>
	<a href="/artist/demo/12342341/edit">/artist/demo/:trackId/edit</a>
</Box>

<style>
	.snap {
		scroll-snap-type: x mandatory;
	}
</style>
