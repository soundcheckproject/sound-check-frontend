<script lang="ts">
  import { goto } from '$app/navigation'
  import type { TrackInfoType, TrackType } from '../types/Track.type'

  import { fade, slide } from 'svelte/transition'

  import type { UserType } from '../types/User.type'
  import { query } from '../utils/useGraphQL'

  import { formatDate, formatTimeForPlayer } from '../utils/useFormat'
  import { onMount } from 'svelte'

  import { denyTrack, signTrack } from '../utils/useTrack'

  export let artworkSource = ''

  export let status: 'accepted' | 'pending' | 'denied' | 'released' = 'denied'

  let audioPlayer: HTMLAudioElement
  let trackInfo: TrackInfoType = {
    duration: '0:00',
    currentTime: '0:00',
    playing: null,
  }
  export let track: TrackType

  let artistTracks: { user: UserType }[] = track.artistTracks ?? []

  // const blobToBase64 = (blob: Blob) => {
  //   const reader = new FileReader()
  //   reader.readAsDataURL(blob)
  //   // let readerFile: string | ArrayBuffer

  //   reader.onloadend = () => {
  //     audioFile = reader.result
  //   }
  // }

  let isFetched = undefined
  let loadTrack = false
  let trackPlayable = false

  const loadTrackInfo = (media: HTMLAudioElement) => {
    if (media) {
      media.onloadedmetadata = () => {
        let trackDuration = parseInt(media.duration.toFixed(0))
        trackInfo.duration = formatTimeForPlayer(trackDuration)

        trackPlayable = true
        audioPlayer.currentTime = track.previewStart
        media.ontimeupdate = () => {
          let trackCurrentTime = parseInt(media.currentTime.toFixed(0))

          trackInfo.currentTime = formatTimeForPlayer(trackCurrentTime)
          trackInfo.playerBar.style.width =
            (100 * trackCurrentTime) / trackDuration + '%'
        }
      }
    }
  }

  const loadTrackBlob = async () => {

    try {
      isFetched = false
      const encodedFile = await query(
        'getTrackById',
        `query Query($trackId: String!) {
            getTrackById(trackId: $trackId) {
              encodedFile
            }
          }`,
        { trackId: track.uuid },
      )
      track.encodedFile = encodedFile.encodedFile
      isFetched = true
    } catch (error) {
      isFetched = null
    }
  }

  $: {
    if (loadTrack)
      if (track.encodedFile) {
        loadTrackInfo(audioPlayer)
      }
  }

  // const handleKeyDown = (e: KeyboardEvent) => {
  //   // 32 = spacebar
  //   if (e.keyCode === 32) {
  //     if (track.encodedFile) {
  //       trackInfo.playing = !trackInfo.playing
  //       audioPlayer.play()
  //     }
  //   }
  // }
</script>

<!-- <svelte:window on:keydown={handleKeyDown} /> -->
{#if track.encodedFile}
  <audio hidden bind:this={audioPlayer} preload="auto" controls>
    <source src={track.encodedFile} type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
{/if}
<div
  class="relative grid grid-cols-auto-1fr grid-rows-auto-auto gap-4"
  in:slide|local={{ duration: 200, delay: 200 }}
  out:slide|local={{ duration: 200 }}
  on:mouseenter={() => {
    if (!trackPlayable) {
      loadTrackBlob()
      loadTrack = true
    }
  }}
>
  <a
    class="focus-ring"
    href={`demo/${track.uuid}`}
    on:focus={() => {
      if (!trackPlayable) {
        loadTrackBlob()
        loadTrack = true
      }
    }}
  >
    <img
      class="h-32 w-32 bg-gray-100 rounded-sm hover:opacity-75 transition-opacity"
      src={track.artwork.resource}
      alt="artwork"
    />
  </a>

  <div
    class={`w-full justify-between flex  rounded-md text-sm transition-colors `}
  >
    <div class="flex space-x-4 w-full justify-between">
      <div class="grid w-full">
        <div class="flex justify-between ">
          <div class="flex flex-col">
            <p class="font-medium text-lg text-gray-700 ">
              {track.title ?? 'No title'}
            </p>
            <div class="flex space-x-2">
              {#if artistTracks.length > 0 && artistTracks}
                {#each artistTracks as artist}
                  <div>{artist.user.nickName}</div>
                {/each}
              {/if}
            </div>
            <p class="mt-2 text-gray-400 text-xs">
              Preffered release date: {formatDate(
                new Date(track.prefferdReleaseDate),
              ) ?? 'not yet determined'}
            </p>
          </div>

          <div class="justify-self-end flex flex-col justify-around items-end">
            {#if track.isSigned != false}
              <button class="outline-none focus:scale-150">
                <svg
                  on:click={() => denyTrack(track)}
                  class="text-red-700 mx-2"
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
              </button>
            {/if}
            {#if track.isSigned != true}
              <button class="outline-none focus:scale-150">
                <svg
                  on:click={() => signTrack(track)}
                  class="text-green-700 mx-2"
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
              </button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="h-10 px-4 py-2 self-end flex rounded-md bg-gray-700 text-gray-100 items-center col-span-2 shadow-md"
  >
    {#if trackPlayable && isFetched}
      <button
        class="focus:text-green-300 outline-none"
        on:click={() => {
          trackInfo.playing = false
          audioPlayer.pause()
        }}
        ><svg
          class="mr-1"
          class:active={trackInfo.playing}
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
          <line x1="10" y1="15" x2="10" y2="9" />
          <line x1="14" y1="15" x2="14" y2="9" />
        </svg></button
      >
      <button
        class="focus:text-green-300 outline-none"
        on:click={() => {
          trackInfo.playing = true
          audioPlayer.play()
        }}
      >
        <svg
          class="mr-1 "
          xmlns="http://www.w3.org/2000/svg"
          class:active={!trackInfo.playing}
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
          <polygon points="10 8 16 12 10 16 10 8" />
        </svg>
      </button>
      <button
        class="focus:text-green-300 outline-none"
        on:click={() => {
          audioPlayer.currentTime += 5
        }}
      >
        <svg
          class="mr-3"
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
          <polygon points="13 19 22 12 13 5 13 19" />
          <polygon points="2 19 11 12 2 5 2 19" />
        </svg>
      </button>
      <div class="text-xs mr-2">00:00</div>
      <div class="flex ml-2 mr-4 items-center w-full">
        <div
          class="bg-gray-400 transition-all h-0.5 rounded-sm "
          bind:this={trackInfo.playerBar}
        />
        <div
          class="-ml-2 bg-gray-400 group cursor-pointer h-3 w-3 relative rounded-full "
          style=""
        >
          <div
            class="opacity-0 transition-opacity hover:bg-gray-400 rounded-full py-1 px-2 group-hover:opacity-100 absolute text-xs top-[6px] ml-1.5 -translate-y-1/2 -translate-x-1/2	text-shadow-lg filter drop-shadow-md"
          >
            {trackInfo.currentTime}
          </div>
        </div>
      </div>
      <div class="text-xs ml-auto">{trackInfo.duration}</div>
      <a
        href="/portal/staff/demo/{track.uuid}"
        class="flex items-center transition-all hover:opacity-75 space-x-1 ml-4 text-xs uppercase text-white text-right font-medium outline-none focus:text-teal-300"
        ><div>details</div>
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
          <polyline points="13 17 18 12 13 7" />
          <polyline points="6 17 11 12 6 7" />
        </svg></a
      >
    {:else if isFetched === false}<p class="text-xs">Fetching the track..</p>
    {:else if isFetched === null}<p class="text-xs">
        Error while fetching the track.
      </p>
    {:else}<p class="text-xs">Audio is not loaded yet.</p>
    {/if}
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
