<script>
	import PortalNavigation from '../../components/portal/PortalNavigation.svelte'
	import { page } from '$app/stores'
	import { fade, fly } from 'svelte/transition'

	let pageBread = []

	$: {
		pageBread = $page.path.split('/')
		pageBread.splice(0, 2)
	}
</script>

<div class="c-portal">
	<PortalNavigation />
	<div class="p-8 py-12  bg-gray-100">
		<p class="text-gray-800 mb-8 flex space-x-2 uppercase text-sm items-center">
			{#each pageBread as bread, index}
				{#if index != 0}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						class="opacity-25"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="9 18 15 12 9 6" />
					</svg>
				{/if}
				<a in:fly={{ x: -50, duration: 200 }} out:fade={{ duration: 200 }} href={``}>{bread}</a>
			{/each}
		</p>
		<slot />
	</div>
</div>

<style>
	.c-portal {
		display: grid;
		grid-template-columns: min-content 1fr;
		height: 100vh;
		width: 100vw;
	}
</style>
