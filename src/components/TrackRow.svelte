<script lang="ts">
  import { fade } from 'svelte/transition'

  export let artworkSource = ''
  export let size: 'sm' | 'md' | 'lg' = 'sm'
  export let status: 'accepted' | 'pending' | 'denied' | 'released' = 'denied'

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

<a
  href={'/portal/artist/demo/' + track.uuid}
  class={`relative flex space-x-3 ${
    size == 'sm' ? 'h-12' : size == 'md' ? 'h-20' : size == 'lg' ? 'h-28' : ''
  } `}
>
  <img class="rounded-sm" src={artworkSource} alt="artwork" />
  <div
    class={`${
      size == 'sm'
        ? 'px-4'
        : size == 'md'
        ? 'px-6'
        : size == 'lg'
        ? 'px-10'
        : ''
    } items-center justify-between flex w-full rounded-sm text-sm bg-gray-100`}
  >
    <slot />
    <div class="grid grid-flow-col gap-3 items-center">
      <div class="hidden sm:flex text-xs text-gray-400">
        {track.prefferdReleaseDate??""}
      </div>
      <a href={'/portal/artist/demo/' + track.uuid + '/edit'}>
        <svg
          class="text-gray-700"
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
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </a>
    </div>
    <div
      on:mouseenter={() => (hoverStatus = true)}
      on:mouseleave={() => (hoverStatus = false)}
      class="absolute top-0 right-0"
    >
      {#if hoverStatus}
        <div
          transition:fade={{ duration: 200 }}
          class={`absolute -top-1 -right-1 p-2 ${
            status == 'denied'
              ? 'bg-red-500 '
              : status == 'pending'
              ? 'bg-orange-500 '
              : status == 'accepted'
              ? 'bg-purple-500 '
              : status == 'released'
              ? 'bg-green-500 '
              : ''
          } rounded-full capitalize mshadow-md  p-2 px-4 font-semibold text-white text-xs`}
        >
          {status}
        </div>
      {:else}
        <div
          transition:fade={{ duration: 200 }}
          class={`absolute -top-1 -right-1 p-2 ${
            status == 'denied'
              ? 'bg-red-500 '
              : status == 'pending'
              ? 'bg-orange-500 '
              : status == 'accepted'
              ? 'bg-purple-500 '
              : status == 'released'
              ? 'bg-green-500 '
              : ''
          } rounded-full group capitalize mshadow-md`}
        />
      {/if}
    </div>
  </div>
</a>
