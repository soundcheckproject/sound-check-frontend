<script>
  import { fade } from 'svelte/transition'

  let hoverStatus = false
  export let status = 'pending'
  //todo: make status color global
</script>

<div
  on:mouseenter={() => (hoverStatus = true)}
  on:mouseleave={() => (hoverStatus = false)}
  class="absolute top-0 right-0"
>
  {#if hoverStatus}
    <div
      transition:fade|local={{ duration: 200 }}
      class="absolute -top-1 -right-1 p-2 {status == 'denied'
        ? 'bg-red-500 '
        : status == 'pending'
        ? 'bg-orange-500 '
        : status == 'accepted'
        ? 'bg-purple-500 '
        : status == 'released'
        ? 'bg-green-500 '
        : ''} rounded-full capitalize mshadow-md  p-2 px-4 font-semibold text-white text-xs"
    >
      {status}
    </div>
  {:else}
    <div
      transition:fade|local={{ duration: 200 }}
      class="absolute -top-1 -right-1 p-2 {status == 'denied'
        ? 'bg-red-500 '
        : status == 'pending'
        ? 'bg-orange-500 '
        : status == 'accepted'
        ? 'bg-purple-500 '
        : status == 'released'
        ? 'bg-green-500 '
        : ''} rounded-full group capitalize mshadow-md"
    />
  {/if}
</div>
