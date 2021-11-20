<script lang="ts">
  import { page } from '$app/stores'
  import { onMount } from 'svelte'
  import type { UserType } from '../../../../types/User.type'
  import ProfileBanner from '../../../../components/ProfileBanner.svelte'
  import Box from '../../../../components/Box.svelte'
  import Title from '../../../../components/Title.svelte'
  import SubTitle from '../../../../components/SubTitle.svelte'
  import Skeleton from '../../../../components/Skeleton.svelte'
  import {
    getArtistByUserId,
    getTracksByArtistId,
  } from '../../../../utils/useGraphQL'
  import type { TrackType } from '../../../../types/Track.type'
  import TrackRow from '../../../../components/TrackRow.svelte'

  let artist: UserType
  let artistTracks: TrackType[] = []
  onMount(async () => {
    artist = await getArtistByUserId($page.params.userId)
    artistTracks = await getTracksByArtistId(artist.uuid)
  })
  $: {
    console.log(artistTracks)
  }
</script>

<div class="grid gap-8">
  {#if artist}
    <ProfileBanner {artist} />
    <Box
      ><Title>Information</Title>
      <div class="grid gap-4 lg:grid-cols-2">
        <div class="grid gap-4">
          <p>
            <b>Full name</b><br />{artist.firstName}
            {artist.surName}
          </p>
          <p>
            <b>Birthdate</b><br />{new Date(
              artist.birthdate,
            ).toLocaleDateString()}
          </p>
        </div>
        <div class="grid gap-4">
          <p>
            <b>Email</b><br />{artist.email}
          </p>
          <p>
            <b>Address</b><br />{artist.country}, {artist.state}<br
            />{artist.address}
            {artist.city}
          </p>
        </div>
      </div>
    </Box>
    <Box
      ><Title>Tracks</Title><SubTitle>All Tracks</SubTitle>
      {#if artistTracks.length == 0}
        <Skeleton >No tracks found..</Skeleton>
      {:else}
        <div class="grid gap-4 lg:grid-cols-2">
          {#each artistTracks as track}
            <TrackRow {track}>{track.title}</TrackRow>
          {/each}
        </div>
      {/if}
    </Box>
  {/if}
</div>
