<script lang="ts">
  import { validateStatusTrack } from '../utils/useValidation'

  import { fade } from 'svelte/transition'
  import TrackStatus from './TrackStatus.svelte'

  export let artworkSource = ''
  export let size: 'sm' | 'md' | 'lg' = 'sm'

  export let portal: 'staff' | 'artist' = 'artist'
  let track = $$props.track ?? {
    genreId: '6ef2aded-c280-40bf-8e4c-e4b6f38b72d2',
    prefferdReleaseDate: 'No release date found',
    artwork: {
      designer: 'nielsonderbeke2',
      resource: '',
    },
  }

  let hoverStatus = false
  $:{ console.log(track.isSigned)}
 
</script>

<a
  href="/portal/{portal}/demo/{track.uuid}"
  class={`relative flex space-x-3 ${
    size == 'sm' ? 'h-12' : size == 'md' ? 'h-20' : size == 'lg' ? 'h-28' : ''
  } `}
>
  <img class="rounded-sm" src={track.artwork.resource ?? ''} alt="artwork" />
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
    <p>{$$props.track.title}</p>
    <div class="grid grid-flow-col gap-3 items-center">
      <div class="hidden sm:flex text-xs text-gray-400">
        {track.prefferdReleaseDate ?? ''}
      </div>
      <a href="/portal/{portal}/demo/{track.uuid}-edit">
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
    <TrackStatus
      status={validateStatusTrack(track.isSigned, track.prefferdReleaseDate)}
    />
  </div>
</a>
