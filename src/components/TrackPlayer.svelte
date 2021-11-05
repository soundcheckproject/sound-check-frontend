<script lang="ts">
  import SubTitle from './SubTitle.svelte'

  import { onMount } from 'svelte'

  export let theme: 'light' | 'dark' = 'dark'

  let playerBar
  let audio: any = ''
  let trackInfo: any = {
    duration: '0:00',
    currentTime: '0:00',
    playing: true,
  }

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
      .filter(a => a)
      .join(':')
  }

  onMount(() => {
    console.log('comp has been mounted')

    audio.onloadedmetadata = () => {
      let trackDuration = parseInt(audio.duration.toFixed(0))
      trackInfo.duration = formatTime(trackDuration)

      audio.ontimeupdate = () => {
        let trackCurrentTime = parseInt(audio.currentTime.toFixed(0))
        trackInfo.currentTime = formatTime(trackCurrentTime)

        playerBar.style.width = (100 * trackCurrentTime) / trackDuration + '%'
      }
    }
  })
</script>

{#if $$props.audioSrc}}
  <audio hidden bind:this={audio} preload="auto" controls>
    <source src={$$props.audioSrc} type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
{/if}
<div
  class="overflow-hidden grid bg-gray-800 rounded-md backdrop-blur-sm text-gray-100"
>
  <div
    class="absolute w-full z-1 h-full filter blur-3xl opacity-75"
    style={`background:url('${$$props.artworkSrc}') center center no-repeat;background-size:cover`}
  />
  <div
    class="z-10 grid grid-flow-col gap-8 justify-start p-8"
    style="grid-template-columns: auto 1fr"
  >
    <div
      class="overflow-hidden h-32 w-32 lg:h-64 lg:w-64 bg-gray-100 bg-opacity-10 rounded-md mshadow-md flex justify-center items-center"
    >
      {#if $$props.artworkSrc}
        <img
          alt="img"
          src={`${$$props.artworkSrc}`}
          class="object-cover h-full w-full "
        />
      {:else}
        <svg
          class="text-white opacity-90"
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
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>{/if}
    </div>
    <div
      class=" grid gap-4 items-start "
      style="grid-template-rows:auto repeat(2,min-content) "
    >
      <div class="flex justify-between items-center ">
        <SubTitle theme="light">Title track</SubTitle>
        <div class="text-sm">#genre</div>
      </div>

      <div class="grid gap-2 mt-4">
        <div class="flex justify-between w-full h-12 items-end">
          {#each Array(100) as i}
            <div
              on:click={() => {
                console.log(i)
                audio.currentTime = 1
              }}
              class={`w-0.5 h-full bg-gray-100 rounded-sm cursor-pointer`}
            />
          {/each}
        </div>
        <div class="flex  text-gray-200 ">
          <div class="text-xs mr-2">00:00</div>
          <div class="flex mx-2 items-center opacity-25 w-full">
            <div
              class="bg-gray-100 transition-all h-1 rounded-sm "
              bind:this={playerBar}
            />
            <div
              class="-ml-2 bg-gray-100 h-3 w-3 relative rounded-full"
              style=""
            >
              <div class="absolute text-xs top-4 ml-1.5 -translate-x-1/2	">
                {trackInfo.currentTime}
              </div>
            </div>
          </div>
          <div class="text-xs ml-auto">{trackInfo.duration}</div>
        </div>
      </div>
      <div
        class="mt-2 grid grid-flow-col  items-center justify-between gap-2 self-end py-4 px-5 bg-opacity-10 rounded-md bg-gray-50"
      >
        <div class="grid gap-2 grid-flow-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="19 20 9 12 19 4 19 20" />
            <line x1="5" y1="19" x2="5" y2="5" />
          </svg>
          <svg
            on:click={() => {
              audio.pause()
              trackInfo.playing = false
            }}
            class:active={!trackInfo.playing}
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
          </svg>
          <svg
            on:click={() => {
              audio.play()
              trackInfo.playing = true
            }}
            xmlns="http://www.w3.org/2000/svg"
            class:active={trackInfo.playing}
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="5 4 15 12 5 20 5 4" />
            <line x1="19" y1="5" x2="19" y2="19" />
          </svg>
        </div>
        <div
          on:click={() => {
            audio.muted = !audio.muted
          }}
        >
          {#if !audio.muted}
            <svg
              class:active={!audio.muted}
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
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path
                d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"
              />
            </svg>
          {:else}
            <svg
              class:active={!audio.muted}
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
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          {/if}
        </div>
      </div>
      <!-- <div>show more</div> -->
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
