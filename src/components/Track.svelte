<script lang="ts">
	import { goto } from '$app/navigation'

	import { fade } from 'svelte/transition'

	export const track = {}
	export let size: 'sm' | 'md' | 'lg' = 'lg'
	export let add = false
	let hover = false
</script>

{#if add}
	<div
		class={`${
			size == 'sm' ? ' h-32 w-32' : size == 'md' ? ' h-48 w-48' : size == 'lg' ? ' h-64 w-64' : ''
		} bg-gray-100 relative flex justify-center items-center cursor-pointer flex-none group snap-start rounded-md`}
		on:click={() => goto('/portal/artist/demo/submit')}
	>
		<svg
			class="opacity-80"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="12" cy="12" r="10" />
			<line x1="12" y1="8" x2="12" y2="16" />
			<line x1="8" y1="12" x2="16" y2="12" />
		</svg>
	</div>
{:else}
	<div
		class=" relative flex justify-center items-center cursor-pointer flex-none group snap-start"
		on:mouseenter={() => (hover = true)}
		on:mouseleave={() => (hover = false)}
	>
		<img
			alt="Trackname"
			class={`${
				size == 'sm' ? ' h-32 w-32' : size == 'md' ? ' h-48 w-48' : size == 'lg' ? ' h-64 w-64' : ''
			} h-48 w-48 rounded-md mshadow-sm outline-none object-cover`}
			src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flinkstorage.linkfire.com%2Fmedialinks%2Fimages%2Fab15a68d-ef47-4a99-9a25-cd88c7663985%2Fartwork-440x440.jpg&f=1&nofb=1"
		/>
		{#if hover}
			<div
				transition:fade={{ duration: 100 }}
				class={`${
					size == 'sm'
						? ' h-32 w-32'
						: size == 'md'
						? ' h-48 w-48'
						: size == 'lg'
						? ' h-64 w-64'
						: ''
				} flex absolute justify-center items-center bg-gray-800 bg-opacity-25 backdrop-filter backdrop-blur-sm rounded-md text-white flex-col`}
			>
				<div class="mb-4 grid grid-flow-col items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="12" r="10" />
						<polygon points="10 8 16 12 10 16 10 8" />
					</svg>
				</div>
				<div class="text-xs">artist & artist</div>
				<b>trackname</b>
			</div>
		{/if}
	</div>

	<style>
		.snap-start {
			scroll-snap-align: start;
		}
	</style>
{/if}
