<script lang="ts">
  import type { TrackType } from '../../../../../types/Track.type'

  import { page } from '$app/stores'
  import Box from '../../../../../components/Box.svelte'
  import Title from '../../../../../components/Title.svelte'
  import SubTitle from '../../../../../components/SubTitle.svelte'
  import TrackPlayer from '../../../../../components/TrackPlayer.svelte'

  import Artist from '../../../../../components/Artist.svelte'
  import Button from '../../../../../components/Button.svelte'
  import { goto } from '$app/navigation'
  import ButtonBox from '../../../../../components/ButtonBox.svelte'
  import Input from '../../../../../components/Input.svelte'

  let track: TrackType = {
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

  let mode: 'edit' | 'overview' = 'overview'
</script>

<div class="grid gap-8">
  <div class="flex space-x-4">
    <ButtonBox
      active={mode == 'overview' ? true : false}
      on:click={() => {
        mode = 'overview'
      }}
    >
      Overview
    </ButtonBox>
    <ButtonBox
      active={mode == 'edit' ? true : false}
      class="gap-2"
      on:click={() => {
        mode = 'edit'
      }}
    >
      Edit track

      <svg
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
    </ButtonBox>
  </div>
  {#if mode === 'overview'}
    <TrackPlayer audioSrc="" imgSrc="" />
    <Box>
      <Title
        ><div class="flex justify-between items-center">
          <div>Track title {$page.params.trackId}</div>
          <!-- svelte-ignore a11y-missing-attribute -->
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
      <div class="grid gap-4 lg:grid-flow-col">
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
  {/if}
  {#if mode === 'edit'}
    <Box>
      <Input />
    </Box>
  {/if}
</div>

<style lang="postcss">
  .download {
    @apply cursor-pointer flex space-x-2 items-center;
  }
</style>
