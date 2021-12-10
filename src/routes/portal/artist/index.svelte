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

<svelte:head>
	<title>Portal overview</title>
</svelte:head>

<div class="grid gap-8">
  <Box>
    <Title>Portal overview</Title>
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
  <div class="flex gap-4 items-center">
    {#if totalTracks.accepted}
      <a href="/portal/artist/demo">
        <Box size="sm" class="bg-accepted">
          <p class="uppercase text-sm lg:text-md font-semibold text-white">
            Accepted ({totalTracks.pending})
          </p>
        </Box>
      </a>
    {/if}
    {#if totalTracks.pending}
      <a href="/portal/artist/demo">
        <Box size="sm" class="bg-pending">
          <p class="uppercase text-sm lg:text-md font-semibold text-white">
            Pending ({totalTracks.pending})
          </p>
        </Box>
      </a>
    {/if}
    {#if totalTracks.denied}
      <a href="/portal/artist/demo">
        <Box size="sm" class="bg-denied">
          <p class="uppercase text-sm lg:text-md font-semibold text-white">
            Denied ({totalTracks.pending})
          </p>
        </Box>
      </a>
    {/if}
  </div>
</div>    

<style>
  .snap {
    scroll-snap-type: x mandatory;
  }
</style>
