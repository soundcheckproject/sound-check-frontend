<script lang="ts">
  import { goto } from '$app/navigation'
  import type { TrackType } from '../types/Track.type'

  import { fade, slide } from 'svelte/transition'
  import Artist from './Artist.svelte'
  import Button from './Button.svelte'
  import type { UserType } from '../types/User.type'
  import { toggleSigned, getAllTracks, updateTrack } from '../utils/useGraphQL'
  import demoTracksStore from '../stores/demoTracksStore'

  export let artworkSource = ''

  export let status: 'accepted' | 'pending' | 'denied' | 'released' = 'denied'

  let playerBar
  let audio: any
  let trackInfo: any = {
    duration: '0:00',
    currentTime: '0:00',
    playing: true,
  }

  let track: TrackType = $$props.track ?? {
    genreId: '6ef2aded-c280-40bf-8e4c-e4b6f38b72d2',
    prefferdReleaseDate: 'No release date found',
    artwork: {
      designer: 'nielsonderbeke2',
    },
  }

  let artistTracks: { user: UserType }[] = track.artistTracks ?? []

  const denyTrack = async () => {
    if (track.isSigned != false) {
      await toggleSigned(false, track.uuid)
      demoTracksStore.set(await getAllTracks())
    }
  }
  const signTrack = async () => {
    if (track.isSigned != true) {
      await toggleSigned(true, track.uuid)
      demoTracksStore.set(await getAllTracks())
    }
  }
</script>

{#if track.resource}
  <audio hidden bind:this={audio} preload="auto" controls>
    <source src={track.resource} type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
{/if}
<div class={`relative flex space-x-4 h-32 `} transition:slide|local>
  <img
    class="h-32 w-32 bg-gray-100 rounded-sm"
    src={track.artwork.resource}
    alt="artwork"
    on:click={() => goto('demo/' + track.uuid)}
  />
  <div
    class={` w-full justify-between flex  rounded-md text-sm transition-colors `}
  >
    <div class="flex space-x-4 w-full justify-between">
      <div class="grid w-full">
        <div class="flex justify-between ">
          <div class="flex flex-col">
            <p class="font-medium text-lg text-gray-700 ">
              {track.title ?? 'No title'}
            </p>
            <div class="flex space-x-3">
              {#if artistTracks.length > 0 && artistTracks}
                {#each artistTracks as artist}
                  {artist.user.nickName}
                {/each}
              {/if}
              <!-- {console.log(track.artistTracks)} -->
            </div>
            <p class="mt-2 text-gray-400 text-xs">
              Preffered release date: {track.prefferdReleaseDate ??
                'not yet determined'}
            </p>
          </div>
          <div class="justify-self-end flex flex-col justify-between items-end">
            <svg
              on:click={denyTrack}
              class="text-red-700 m-2"
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
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>

            <svg
              on:click={signTrack}
              class="text-green-700 m-2"
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
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        </div>

        <div
          class="px-4 py-2 self-end flex rounded-md bg-gray-700 text-gray-100 items-center"
        >
          <svg
            on:click={() => {
              audio.pause()
              trackInfo.playing = false
            }}
            class="mr-1 cursor-pointer"
            class:active={!trackInfo.playing}
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
            <line x1="10" y1="15" x2="10" y2="9" />
            <line x1="14" y1="15" x2="14" y2="9" />
          </svg>
          <svg
            on:click={() => {
              audio.play()
              trackInfo.playing = true
            }}
            class="mr-3 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            class:active={trackInfo.playing}
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
            <polygon points="10 8 16 12 10 16 10 8" />
          </svg>
          <div class="text-xs mr-2">00:00</div>
          <div class="flex ml-2 mr-4 items-center w-full">
            <div class="bg-gray-400 transition-all w-24 h-0.5 rounded-sm " />
            <div
              class="-ml-2 bg-gray-400 group cursor-pointer h-3 w-3 relative rounded-full"
              style=""
            >
              <div
                class="hidden group-hover:flex absolute text-xs top-4 ml-1.5 -translate-x-1/2	text-shadow-lg filter drop-shadow-md"
              >
                00:30
              </div>
            </div>
          </div>
          <div class="text-xs ml-auto ">00:30</div>
          <a
            href="/portal/staff/demo/{track.uuid}"
            class="w-28 text-xs text-right font-medium hover:underline"
            >Learn more..</a
          >
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  svg {
    @apply cursor-pointer opacity-50 transition-opacity;
  }
  svg:hover,
  svg.active {
    @apply opacity-100;
  }
</style>
