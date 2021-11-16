<script lang="ts">
  import { goto } from '$app/navigation'

  import { fade } from 'svelte/transition'
import Artist from './Artist.svelte';
  import Button from './Button.svelte'

  export let artworkSource = ''
  export let size: 'sm' | 'md' | 'lg' = 'sm'
  export let status: 'accepted' | 'pending' | 'denied' | 'released' = 'denied'

  let playerBar
  let audio: any
  let trackInfo: any = {
    duration: '0:00',
    currentTime: '0:00',
    playing: true,
  }

  let track = $$props.track ?? {
    genreId: '6ef2aded-c280-40bf-8e4c-e4b6f38b72d2',
    prefferdReleaseDate: 'No release date found',
    artwork: {
      designer: 'nielsonderbeke2',
    },
  }

  let hoverStatus = false
  $: {
    console.log($$props.track)
  }
</script>

{#if $$props.audioSrc}}
  <audio hidden bind:this={audio} preload="auto" controls>
    <source src={$$props.audioSrc} type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
{/if}
<div class={`relative flex space-x-4 h-32 `}>
  <img
    class="h-32 w-32 bg-gray-100 rounded-sm"
    src={artworkSource}
    alt="artwork"
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
              Naam,naam,naam
            
            </div>
          </div>
          <div class="justify-self-end flex flex-col justify-between items-end">
            <svg
              class="text-red-700"
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
            class="mr-1"
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
            class="mr-3"
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
                class="hidden group-hover:flex absolute text-xs top-4 ml-1.5 -translate-x-1/2	"
              >
                00:30
              </div>
            </div>
          </div>
          <div class="text-xs ml-auto ">00:30</div>
          <p class="w-28 text-xs text-right font-medium">Learn more..</p>
        </div>
      </div>
    </div>
  </div>
</div>
