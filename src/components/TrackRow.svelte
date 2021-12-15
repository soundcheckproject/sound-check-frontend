<script lang="ts">
  import { validateStatusTrack } from '../utils/useValidation'

  import TrackStatus from './TrackStatus.svelte'
  import { formatDate } from '../utils/useFormat'
  import { roleStore } from '../stores/stores'
  import type { TrackType } from '../types/Track.type'
  import Artist from './Artist.svelte'

  export let size: 'sm' | 'md' | 'lg' = 'sm'

  export let portal: 'staff' | 'artist' = 'artist'
  export let track: TrackType

  export let artists = false
  export let actions = false
  export let status = true
</script>

{#if track}
  <a
    href={$$props.href ? $$props.href : `/portal/${portal}/demo/${track.uuid}`}
    class="{status ? 'relative' : ''} grid grid-cols-auto-1fr {portal ===
    'staff'
      ? 'gap-x-4'
      : 'gap-4'} {size == 'sm'
      ? 'h-12'
      : size == 'md'
      ? 'h-20'
      : size == 'lg'
      ? 'h-28'
      : ''}  items-center sm:items-stretch focus-ring"
  >
    {#if track.artwork && track.artwork.resource}
      <img
        class="mshadow-sm  rounded-sm object-cover {size == 'sm'
          ? 'h-12 w-12'
          : size == 'md'
          ? 'h-20 w-20'
          : size == 'lg'
          ? 'h-28 w-28'
          : ''} "
        src={track.artwork.resource ? track.artwork.resource : ''}
        alt="artwork"
      />
    {/if}
    <div
      class="{size == 'sm'
        ? 'p-4'
        : size == 'md'
        ? 'p-6'
        : size == 'lg'
        ? 'p-10'
        : ''}  items-center justify-between flex w-full rounded-sm text-sm bg-gray-100 relative {$$props.background
        ? 'overflow-hidden bg-opacity-0'
        : ''}"
    >
      {#if $$props.background && track.artwork}
        <div
          class="absolute w-full z-1 inset-0 blur-3xl h-full filter "
          style="background:url('{track.artwork
            .resource}') center center;backround-size:cover"
        />
      {/if}
      {#if $$props.slot}
        <slot />
      {:else}
        <div>
          <p class={size == 'sm' ? 'text-xs' : 'text-sm'}>
            {track.title ?? 'No title'}
          </p>
          {#if artists}
            {#if track.artistTracks && track.artistTracks.length > 0}
              <div class="mt-2 flex space-x-2">
                {#each track.artistTracks as artist}
                  <Artist artist={artist.user} socials size="sm" theme="glass"
                    >{artist.user.nickName}</Artist
                  >
                {/each}
              </div>
            {:else}
              <p class="mt-2 text-gray-600 text-xs">No artists found..</p>
            {/if}
          {/if}
        </div>
      {/if}

      <div class="grid grid-flow-col gap-3 items-center ">
        <div class="hidden lg:flex text-xs text-gray-500 text-right">
          {#if size == 'lg'}Released on {/if}
          {formatDate(new Date(track.prefferdReleaseDate)) ?? ''}
        </div>
        {#if actions}
          <div class="flex space-x-2 text-gray-700">
            {#if (track.isSigned == true || track.isSigned == null) && ['label-ar', 'label-manager'].includes($roleStore)}
              <a href="/portal/{portal}/demo/{track.uuid}-edit">
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
                  <path
                    d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                  />
                  <path
                    d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                  />
                </svg>
              </a>
            {/if}
            {#if track.isSigned == true}
              <a href="/portal/{portal}/demo/{track.uuid}-finance">
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
                  <path d="M18 12a2 2 0 00-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
                </svg>
              </a>
            {/if}
          </div>
        {/if}
      </div>
    </div>
    {#if status}
      <TrackStatus
        status={validateStatusTrack(track.isSigned, track.prefferdReleaseDate)}
      />
    {/if}
  </a>
{/if}
