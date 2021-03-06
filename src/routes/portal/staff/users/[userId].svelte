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
  import FadeBox from '../../../../components/portal/FadeBox.svelte'
  import ErrorBanner from '../../../../components/error/ErrorBanner.svelte'
  import userStore from '../../../../stores/userStore'
  import { pageSelectedStore } from '../../../../stores/stores'

  let artist: UserType = undefined
  let artistTracks: TrackType[] = []

  pageSelectedStore.set(undefined)

  onMount(async () => {
    try {
      artist = await getArtistByUserId($page.params.userId)
      if (artist)
        pageSelectedStore.set({ name: 'users', title: artist.nickName })
      if (
        artist &&
        (artist.role.slug === RoleName.User ||
          artist.role.slug === RoleName.LabelArtist)
      )
        artistTracks = await getTracksByArtistId(artist.uuid)
    } catch (error) {
      artist = null
    }
  })
</script>

<svelte:head>
  <title>{`${artist ? artist.nickName : ''} - Profile`}</title>
</svelte:head>

<FadeBox>
  {#if artist}
    <div class="grid gap-8">
      <ProfileBanner {artist} />
      <Box
        ><Title>
          <div class="flex justify-between items-center">
            <div>Information</div>
            {#if $userStore.role.slug === RoleName.LabelManager}
              <EditButton href={$page.path + '-edit'} />
            {/if}
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
              <TrackRow portal="staff" {track}>{track.title}</TrackRow>
            {/each}
          </div>
        {/if}
      </Box>
    </div>
  {:else if artist === undefined}
    <Skeleton
      theme="light"
      loading={true}
      height="h-[22rem]"
      className="mb-8"
    />
    <Skeleton theme="light" loading={true} height="h-[18rem]" />
  {:else if artist === null}
    <ErrorBanner message="Error while fetching the user data." />
  {/if}
</FadeBox>
