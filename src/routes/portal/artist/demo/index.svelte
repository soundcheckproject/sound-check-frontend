<script lang="ts">
  import Title from '../../../../components/Title.svelte'
  import SubTitle from '../../../../components/SubTitle.svelte'

  import Box from '../../../../components/Box.svelte'
  import TrackRow from '../../../../components/TrackRow.svelte'
  import Skeleton from '../../../../components/Skeleton.svelte'

  import type { TrackType } from '../../../../types/Track.type'
  import { getTracksByArtistId } from '../../../../utils/useGraphQL'
  import { onMount } from 'svelte'
  import userStore from '../../../../stores/userStore'
  import userTracksStore from '../../../../stores/userTracksStore'

  let exampleTrack: TrackType = {
    uuid: '123',
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
  let mode: 'all' | 'pending' | 'accepted' | 'denied' = 'all'

  let tracks: { [key: string]: TrackType[] } = {
    all: [],
    pending: [],
    accepted: [],
    denied: [],
  }

  onMount(async () => {
    if ($userTracksStore == null) {
      userTracksStore.set(await getTracksByArtistId($userStore.uuid))
      if ($userTracksStore)
        tracks = {
          all: $userTracksStore,
          pending: $userTracksStore.filter(track => track.isSigned == null),
          accepted: $userTracksStore.filter(track => track.isSigned === true),
          denied: $userTracksStore.filter(track => track.isSigned === false),
        }
    }
  })

  $: {
    console.log(tracks)
  }
</script>

<div class="grid gap-8">
  <Box>
    <Title>
      <div class="flex justify-between items-center">
        <div>All tracks</div>
        <div>
          <select class="portal input" bind:value={mode}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="denied">Denied</option>
          </select>
        </div>
      </div>
    </Title>
    {#if tracks.all.length === 0}
      <Skeleton>No tracks found..</Skeleton>{:else}
      {#if mode == 'pending' || mode == 'all'}
        <div class="flex justify-between items-center">
          <SubTitle>Pending tracks</SubTitle>
        </div>
        <div class="grid gap-4 ">
          {#each tracks.pending as track}
            <TrackRow
              {track}
              status="pending"
              size="lg"
              artworkSource="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.sndcdn.com%2Fartworks-000454520877-chf2n6-t500x500.jpg&f=1&nofb=1"
              ><div>
                Your track "<b>Memories</b>"" hasn't been reviewed yet.
              </div>
            </TrackRow>
          {/each}
          {#if tracks.pending.length <= 0}
            <Skeleton>Loading pending tracks..</Skeleton>
          {/if}
        </div>
      {/if}
      {#if mode == 'accepted' || mode == 'all'}
        <SubTitle>Accepted tracks</SubTitle>
        <div class="grid gap-4 lg:grid-cols-2">
          {#each tracks.accepted as track}
            <TrackRow
              {track}
              status={new Date(track.prefferdReleaseDate) > new Date()
                ? 'released'
                : 'accepted'}
              size="md"
              artworkSource="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.sndcdn.com%2Fartworks-000454520877-chf2n6-t500x500.jpg&f=1&nofb=1"
              >{track.title}</TrackRow
            >
          {/each}
          {#if tracks.accepted.length <= 0}
            <div class="col-span-2">
              <Skeleton>Loading accepted tracks..</Skeleton>
            </div>
          {/if}
        </div>
      {/if}
      {#if mode == 'denied' || mode == 'all'}
        <SubTitle>Denied tracks</SubTitle>
        <div class="grid gap-4 lg:grid-cols-2">
          {#each tracks.denied as track}
            <TrackRow
              status="denied"
              size="sm"
              artworkSource="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.sndcdn.com%2Fartworks-000454520877-chf2n6-t500x500.jpg&f=1&nofb=1"
              >Trackname</TrackRow
            >
          {/each}
          {#if tracks.denied.length <= 0}
            <div class="col-span-2">
              <Skeleton>Loading denied tracks..</Skeleton>
            </div>
          {/if}
        </div>
      {/if}
      <div />
    {/if}
  </Box>
</div>
