<script lang="ts">
  import { onMount } from 'svelte'
  import Box from '../Box.svelte'

  export let message: string = "Error"

  let LottiePlayer = undefined
  let controlsLayout = [
    'previousFrame',
    'playpause',
    'stop',
    'nextFrame',
    'progress',
    'frame',
    'loop',
    'spacer',
    'background',
    'snapshot',
    'zoom',
    'info',
  ]

  onMount(async () => {
    const module = await import('@lottiefiles/svelte-lottie-player')
    LottiePlayer = module.LottiePlayer
  })
</script>

<Box>
  <article class="m-auto flex flex-col items-center -translate-y-6">
    {#if LottiePlayer}
      <LottiePlayer
        src="/lottie/error-animation.json"
        autoplay={true}
        loop={true}
        controls={false}
        renderer="svg"
        background="transparent"
        height={250}
        width={250}
        {controlsLayout}
      />
    {/if}
    <p class="text-lg font-bold text-gray-700 relative z-10 -translate-y-8">
      {message}
    </p>
  </article>
</Box>
