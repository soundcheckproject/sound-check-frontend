<script script lang="ts">
  import SubTitle from './SubTitle.svelte'

  import { onMount } from 'svelte'

  let playerBar
  let trackAudio: any = ''
  let trackInfo: any = { duration: '0:00', currentTime: '0:00' }

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

    trackAudio.onloadedmetadata = () => {
      let trackDuration = parseInt(trackAudio.duration.toFixed(0))
      trackInfo.duration = formatTime(trackAudio.duration.toFixed(0))
      trackAudio.ontimeupdate = () => {
        let trackCurrentTime = parseInt(trackAudio.currentTime.toFixed(0))

        trackInfo.currentTime = formatTime(trackAudio.currentTime.toFixed(0))
        console.log(playerBar.style.width)
        playerBar.style.width = (100 * trackCurrentTime) / trackDuration + '%'
      }
    }
  })
</script>

<audio hidden bind:this={trackAudio} preload="auto" controls>
  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>
<div
  class="overflow-hidden grid mshadow-md bg-gray-800 rounded-md backdrop-blur-sm text-gray-100"
>
  <div
    class="absolute w-full z-1 h-full filter blur-3xl opacity-75"
    style={`background:url('${$$props.imgSrc}') center center no-repeat;background-size:cover`}
  />
  <div
    class="z-10 grid grid-flow-col gap-8 justify-start p-8"
    style="grid-template-columns: auto 1fr"
  >
    <div class="">
      <img
        alt="img"
        src={`${$$props.imgSrc}`}
        class="h-64 w-64 rounded-sm mshadow-md"
      />
    </div>
    <div class=" grid gap-2 items-start ">
      <div class="flex justify-between items-center ">
        <SubTitle theme="light">Title track</SubTitle>
        <div class="text-sm">#genre</div>
      </div>

      <div class="grid gap-2">
        <div class="flex justify-between w-full h-12 items-end">
          {#each Array(100) as i}
            <div
              on:click={() => {
                console.log('ja')
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
      <div class="grid grid-flow-col justify-center gap-2 ">
        <svg
          on:click={() => trackAudio.pause()}
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
          on:click={() => trackAudio.play()}
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
          <polygon points="10 8 16 12 10 16 10 8" />
        </svg>
      </div>
      <!-- <div>show more</div> -->
    </div>
  </div>
</div>
