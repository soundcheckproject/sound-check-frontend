<script lang="ts">
  import Title from '../../../components/Title.svelte'
  import SubTitle from '../../../components/SubTitle.svelte'
  import Track from '../../../components/Track.svelte'
  import Box from '../../../components/Box.svelte'
  import { onMount } from 'svelte'
  import userStore from '../../../stores/userStore'
  import { query } from '../../../utils/useGraphQL'
  import type { TrackType } from '../../../types/Track.type'

  let totalTracks: { accepted: number; denied: number; pending: number } = {
    accepted: null,
    denied: null,
    pending: null,
  }

  let tracks: TrackType[] = []

  onMount(async () => {
    try {
      const userTracks: TrackType[] = await query(
        `getTracksByArtist`,
        `query Query($artistId: String!) {
          getTracksByArtist(artistId: $artistId) {
            uuid
            title
            artistTracks {
              user {
                nickName
                }
            }
            artwork{
              resource
            }
            isSigned
          }
        }`,
        { artistId: $userStore.uuid },
      )

      userTracks.forEach((track: { isSigned: boolean | null }) => {
        if (track.isSigned == true) {
          totalTracks.accepted++
        }
        if (track.isSigned == false) {
          totalTracks.denied++
        }
        if (track.isSigned == null) {
          totalTracks.pending++
        }
      })
      tracks = userTracks
    } catch (error) {
      console.error('Could not get tracks', error)
    }
  })
</script>

<div class="grid gap-8">
  <Box>
    <Title>Portal</Title>
    Welcome to the portal. <br />Here you can find all the information about
    your tracks, submissions and finances.
    <SubTitle>
      <div class="flex justify-between w-full">
        <div>💽 Your tracks</div>
        <div />
      </div>
    </SubTitle>
    <div class="sm:grid-cols-3 gap-4 mt-2 flex overflow-x-auto snap rounded-md">
      <Track add size="sm" />
      {#each tracks as t}
        <Track track={t} size="sm" />
      {/each}
    </div>
  </Box>
  <div class="grid md:grid-cols-3 gap-8">
    {#if totalTracks.accepted}
      <Box class="flex items-center justify-center lg:justify-start">
        <a href="/portal/artist/demo">
          <p class="uppercase text-sm lg:text-lg font-semibold text-accepted">
            Accepted
          </p>
          <p class="text-xl lg:text-3xl font-medium text-gray-600 mt-1">
            {totalTracks.accepted} track{#if totalTracks.accepted > 1}s{/if}
          </p>
        </a>
      </Box>
    {/if}
    {#if totalTracks.pending}
      <Box class="flex items-center justify-center lg:justify-start">
        <a href="/portal/artist/demo">
          <p class="uppercase text-sm lg:text-lg font-semibold text-pending">
            Pending
          </p>
          <p class="text-xl lg:text-3xl font-medium text-gray-600 mt-1">
            {totalTracks.pending} track{#if totalTracks.pending > 1}s{/if}
          </p>
        </a>
      </Box>
    {/if}
    {#if totalTracks.denied}
      <Box class="flex items-center justify-center lg:justify-start">
        <a href="/portal/artist/demo">
          <p class="uppercase text-sm lg:text-lg font-semibold text-denied">
            Denied
          </p>
          <p class="text-xl lg:text-3xl font-medium text-gray-600 mt-1">
            {totalTracks.denied} track{#if totalTracks.denied > 1}s{/if}
          </p>
        </a>
      </Box>
    {/if}
  </div>
</div>

<style>
  .snap {
    scroll-snap-type: x mandatory;
  }
</style>
