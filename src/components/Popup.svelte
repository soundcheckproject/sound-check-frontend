<script>
  import Box from '../components/Box.svelte'
  import Button from '../components/Button.svelte'
  import Title from '../components/Title.svelte'
  import SubTitle from '../components/SubTitle.svelte'
  import { fade } from 'svelte/transition'

  export let hidden = false
</script>

{#if hidden}
  <div
    transition:fade={{ duration: 100 }}
    class="inset-0 fixed w-screen h-screen z-10 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center px-8"
  >
    <div class="fixed z-100 inset-0" on:click={() => (hidden = false)} />
    <Box class="z-1000 w-full ">
      <!-- <div class="absolute b-0">X</div> -->
      <Title>{$$props.title ?? 'Popup'}</Title>
      <SubTitle>{$$props.subTitle ?? 'Popup subtitle'}</SubTitle>
      <p>{$$props.description ?? 'Popup description'}</p>
      <Button
        color="bg-red-900"
        onClick={$$props.onClick ? $$props.onClick : () => (hidden = false)}
        >{$$props.button ?? 'Close'}</Button
      >
    </Box>
  </div>
{/if}
