<script>
	import Title from '../../../components/Title.svelte'
	import SubTitle from '../../../components/SubTitle.svelte'
	import { fade, fly, scale } from 'svelte/transition'
</script>

<div
	in:fly={{ duration: 200, opacity: 0.5, y: 100 }}
	out:fade={{ duration: 200 }}
	class="grid p-12 gap-4 bg-white rounded-md mshadow-md"
>
	<Title>Artist portal</Title>
	<SubTitle>💽 Your tracks</SubTitle>
	<a href="/artist/tracks">/artist/tracks</a>
	<a href="/artist/demo">/artist/demo</a>
	<a href="/artist/demo/submit">/artist/demo/submit</a>
	<a href="/artist/demo/12342341">/artist/demo/:trackId</a>
	<a href="/artist/demo/12342341/edit">/artist/demo/:trackId/edit</a>
</div>
