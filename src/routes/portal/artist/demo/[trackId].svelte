<script lang="ts">
  import type { TrackType } from '../../../../types/Track.type'

  import { page } from '$app/stores'
  import Box from '../../../../components/Box.svelte'
  import Title from '../../../../components/Title.svelte'
  import SubTitle from '../../../../components/SubTitle.svelte'
  import TrackPlayer from '../../../../components/TrackPlayer.svelte'

  import Artist from '../../../../components/Artist.svelte'
  import Button from '../../../../components/Button.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { getTrackById } from '../../../../utils/useGraphQL'
  import userStore from '../../../../stores/userStore'

  import type FeedbackType from '../../../../types/Feedback.type'

  let track: TrackType = {
    uuid:"612a4d86-f56d-4543-a0d8-793600e68a01",
    title: 'Miss you so feat. Jebroer',
    description: 'Niels his new hit song',
    previewStart: 20,
    previewStop: 35,
    lyrics: 'I hate to admit it',
    artistIds: ['b95656c1-e994-42d3-9e5d-c37f260b2a78'],
    genreId: '6ef2aded-c280-40bf-8e4c-e4b6f38b72d2',
    prefferdReleaseDate: '2022-01-01',
    artwork: {
      designer: 'nielsonderbeke2',
    },
  }

  onMount(async () => {
    if ($page.params.trackId) {
      try {
        console.log($page.params.trackId)
        track = await getTrackById($page.params.trackId)
        console.log(track)
      } catch (e) {
        console.log(e)
      }
    } else {
      console.log('no trackId found')
    }
  })
  
</script>

<div class="grid gap-8">
  <TrackPlayer
    feedback={true}
    track={track}
    title={track.title}
    genre={track.genreId}
    audioSrc=""
    imgSrc=""
  />
  <Box>
    <Title
      ><div class="flex justify-between items-center">
        <div>{track.title ?? 'No title found'}</div>

        <a
          href={$page.path + '-edit'}
          class="bg-gray-200 p-2 rounded-full mshadow-sm hover:bg-gray-300 transition-colors"
        >
          <!-- href={$page.path + `/edit`} -->
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
      </div></Title
    >
    <div class="grid gap-6 lg:grid-cols-2 items-start">
      <div class="grid gap-4">
        <SubTitle>💽 Information</SubTitle>

        <div class="grid ">
          <p class="font-semibold ">Description</p>

          <p class="text-sm">{track.description}</p>
          <p class="mt-4 font-semibold  ">Lyrics</p>

          <p class="text-sm">{track.lyrics}</p>
        </div>
      </div>
      <div class="grid gap-4">
        <SubTitle>👨🏼‍🎨 Artists</SubTitle>
        <div class="flex space-x-2">
          <Artist socials theme="dark">name</Artist>
          <Artist socials theme="dark">name</Artist>
          <Artist socials theme="dark">name</Artist>
        </div>
        <!-- <p class="text-xs">Track submitted on .. by ..</p> -->
      </div>
    </div>
  </Box>
  <Box
    ><Title>Contract</Title>

    <SubTitle>📝 Manage contract</SubTitle>
    <div class="flex space-x-4">
      <Button size="sm" color="bg-teal-700">
        <div class="download">
          <svg
            class="-mt-px"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <div>Upload signed contract</div>
        </div>
      </Button>
      <Button size="sm" color="bg-gray-500">
        <div class="download">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <div>Download unsigned contract</div>
        </div>
      </Button>
      <div class="download opacity-25">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <div>Download signed contract</div>
      </div>
    </div>
  </Box>
</div>

<style lang="postcss">
  .download {
    @apply cursor-pointer flex space-x-2 items-center;
  }
</style>
