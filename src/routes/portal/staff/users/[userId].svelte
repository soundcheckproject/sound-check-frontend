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
  import EditButton from '../../../../components/portal/EditButton.svelte'
  import { RoleName } from '../../../../types/Role.type'
import FadeBox from '../../../../components/portal/FadeBox.svelte';

  let artist: UserType = undefined
  let artistTracks: TrackType[] = []

  onMount(async () => {
    artist = await getArtistByUserId($page.params.userId)
    console.log({ artist })
    if (
      artist &&
      (artist.role.slug === RoleName.User ||
        artist.role.slug === RoleName.LabelArtist)
    )
      artistTracks = await getTracksByArtistId(artist.uuid)
  })
  $: {
    console.log(artistTracks)
  }
</script>

{#if artist}
 <FadeBox>
    <div class="grid gap-8">
    <ProfileBanner {artist} />
    <Box
      ><Title>
        <div class="flex justify-between items-center">
          <div>Information</div>

          <EditButton href={$page.path + '-edit'} />
        </div>
      </Title>
      <div class="grid gap-4 lg:grid-cols-3">
        <p>
          <b>Full name</b><br />{artist.firstName}
          {artist.surName}
        </p>
        <p>
          <b>Birthdate</b><br />{new Date(
            artist.birthdate,
          ).toLocaleDateString()}
        </p>

        <p>
          <b>Email</b><br />{artist.email}
        </p>
        <p>
          <b>Address</b><br />{artist.country ?? ''}, {artist.state ?? ''}<br
          />{artist.address ?? ''}
          {artist.city ?? ''}
        </p>
        <p>...</p>
      </div>
    </Box>
    <Box
      ><Title>Tracks</Title><SubTitle>All Tracks</SubTitle>
      {#if artistTracks.length == 0}
        <Skeleton>No tracks found..</Skeleton>
      {:else}
        <div class="grid gap-4 lg:grid-cols-2">
          {#each artistTracks as track}
            <TrackRow {track}>{track.title}</TrackRow>
          {/each}
        </div>
      {/if}
    </Box>
  </div>
 </FadeBox>
{/if}
