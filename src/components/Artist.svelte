<script lang="ts">
	export let className = '';
	export let artist = 'name';
	export let size: 'xs' | 'sm' | 'md' = 'sm';
</script>

<div class="inline">
	<div
		class="relative mshadow-md bg-white bg-opacity-25 rounded-full  {size == 'md'
			? 'text-md'
			: 'text-sm'} {className} {size != 'xs' ? 'pr-5' : ''}"
	>
		<!-- <img alt="Artist {artist}" class="w-8 h-8 bg-gray-300 mr-2 rounded-full" /> -->
		<div class="peer cursor-pointer flex items-center">
			<img
				src="https://partyflock.nl/images/artist/61243_1080x1080_585775/Martin-Garrix.webp"
				class=" w-8 h-8 bg-gray-300  rounded-full {size != 'xs' ? 'mr-3' : ''} {size == 'md'
					? ' w-12 h-12'
					: ''}"
			/>
			{#if size != 'xs'}<slot />{/if}
		</div>
		<div
			class="hidden z-10 peer-hover:grid absolute bg-white mshadow-sm text-gray-700 text-sm p-3 rounded-sm -mt-2  gap-1 justify-items-start"
		>
			{#if size == 'xs'}{artist}
				<hr class="w-full border-gray-100 mb-2 mt-1" />{/if}

			<a href="instagram.com" class="hover:underline grid grid-flow-col gap-2 items-center ">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
					<path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
					<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
				</svg>Instagram
			</a>
			<a href="twitter.com" class="hover:underline grid grid-flow-col gap-2 items-center ">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path
						d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.28-.03-.56-.08-.83A7.72 7.72 0 0023 3z"
					/>
				</svg>Twitter
			</a>
		</div>
	</div>
</div>
