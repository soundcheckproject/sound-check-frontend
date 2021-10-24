<aside class="w-auto bg-gray-900 p-12 text-white mshadow-md">
	<div class="flex gap-6 flex-col justify-between h-full ">
		<div class="flex gap-6 flex-col items-start ">
			<h1 class="text-3xl font-bold -mt-2 relative flex items-center group">
				<div class="opacity-25 ">SoundCheck</div>
				<div
					class="transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer bg-gray-700 backdrop-blur-sm absolute -right-16 p-2 rounded-full"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						class="-ml-px"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="15 18 9 12 15 6" />
					</svg>
				</div>
			</h1>

			<hr />
			<div class="text-lg flex space-x-4 items-center">
				<img
					alt="Artist"
					src="https://partyflock.nl/images/artist/61243_1080x1080_585775/Martin-Garrix.webp"
					class=" w-12 h-12 bg-gray-300  rounded-full mshadow-sm"
				/><b>Alex Silves</b>
			</div>
			<hr />
			<div class="text-sm grid gap-4 w-full">
				<a href="" class="">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
						<polyline points="9 22 9 12 15 12 15 22" />
					</svg>
					<p>Overview</p>
				</a>

				<a href="" class="">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
						<circle cx="9" cy="7" r="4" />
						<path d="M23 21v-2a4 4 0 00-3-3.87" />
						<path d="M16 3.13a4 4 0 010 7.75" />
					</svg>
					<p>Music</p>
				</a>
				<div class="-mt-1 ml-8 opacity-60 space-y-2 text-xs">
					<a href=""><p>Submit</p></a>
					<a href=""><p>All tracks</p></a>
					<a href=""><p>Pending</p></a>
					<a href=""><p>Approved</p></a>
					<a href=""><p>Denied</p></a>
				</div>
				<a href="" class="">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4" />
						<path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
						<path d="M16 12a2 2 0 00-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
					</svg>
					<p>Royalties</p>
				</a>
				<a href="" class="">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
						<path d="M13.73 21a2 2 0 01-3.46 0" />
					</svg>
					<p>Notifications</p>
				</a>
			</div>
			<!-- <hr /> -->
		</div>
		<a
			href=""
			class="flex space-x-4 items-center justify-between text-sm p-4 px-6 bg-gray-100 -m-4 rounded-sm bg-opacity-10 mshadow-md"
		>
			<p>Logout</p>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				class="rotate-180"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
				<polyline points="16 17 21 12 16 7" />
				<line x1="21" y1="12" x2="9" y2="12" />
			</svg>
		</a>
	</div>
</aside>

<style>
	hr {
		background: white;
		border: 1px solid white;
		@apply border-gray-400;
		opacity: 0.2;
		width: 100%;
	}
	a {
		@apply flex;
		@apply space-x-4;
		@apply items-center;
		@apply text-white;
		@apply text-opacity-90;
	}
	p {
		position: relative;
	}
	a p::before {
		content: '';
		position: absolute;
		bottom: -4px;

		height: 2px;

		opacity: 0;
		border-radius: 1px;

		@apply bg-white;
		width: 25%;

		transition: width 0.2s ease-out, opacity 0.2s ease-out;
		will-change: width, opacity;
	}
	a p:hover::before {
		width: 100%;
		opacity: 0.6;
	}
	svg {
		@apply text-teal-300;
	}
</style>
