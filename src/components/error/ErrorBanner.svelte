<script lang="ts">
import { goto } from '$app/navigation';
import { page } from '$app/stores';

  import { onMount } from 'svelte'
  import Box from '../Box.svelte'
import Button from '../Button.svelte';

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
    <Button onClick={() => goto($page.path)} className='px-8 py-4 w-full bg-gray-900 text-white'>
      <svg class="stroke-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M2.5 2v6h6M21.5 22v-6h-6"/><path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2"/></svg>Retry</Button>
  </article>
</Box>
