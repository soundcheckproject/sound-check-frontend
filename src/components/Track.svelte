<script lang="ts">
  import type { TrackType } from '../types/Track.type'

  import { fade } from 'svelte/transition'

  export let track: TrackType = undefined
  export let size: 'sm' | 'md' | 'lg' = 'lg'
  export let add = false
  export let hover = false
</script>

{#if add}
  <a
    class={`${
      size == 'sm'
        ? ' h-32 w-32'
        : size == 'md'
        ? ' h-48 w-48'
        : size == 'lg'
        ? ' h-64 w-64'
        : ''
    } bg-gray-100 relative flex justify-center items-center cursor-pointer flex-none group snap-start rounded-md`}
    href="/portal/artist/demo/submit"
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
  </a>
{:else if track}
  <a
    class=" relative flex justify-center items-center cursor-pointer flex-none group snap-start"
    on:mouseenter={() => (hover = true)}
    on:mouseleave={() => (hover = false)}
    href={`/portal/artist/demo/${track.uuid}`}
  >
    <img
      alt="Trackname"
      class={`${
        size == 'sm'
          ? ' h-32 w-32'
          : size == 'md'
          ? ' h-48 w-48'
          : size == 'lg'
          ? ' h-64 w-64'
          : ''
      }  rounded-md mshadow-sm outline-none object-cover`}
      src={track.artwork.resource}
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
        } flex absolute justify-end p-4 bg-gray-800 bg-opacity-25 backdrop-filter backdrop-blur-lg rounded-md text-white flex-col`}
      >
        <!-- <div class="mb-4 grid grid-flow-col items-center gap-2">
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
        </div> -->
        <div class="text-xs">
          {#each track.artistTracks as at, i}
            {i > 0 ? ` & ${at.user.nickName}` : at.user.nickName}
          {/each}
        </div>
        <b class={`${size == 'sm' ? 'text-xs' : ''}`}>{track.title}</b>
      </div>
    {/if}
  </a>

  <style>
    .snap-start {
      scroll-snap-align: start;
    }
  </style>
{/if}
