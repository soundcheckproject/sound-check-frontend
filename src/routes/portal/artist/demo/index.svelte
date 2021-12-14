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
import ErrorBanner from '../../../../components/error/ErrorBanner.svelte'

  interface DemoListType {
    all: TrackType[]
    pending: TrackType[]
    accepted: TrackType[]
    denied: TrackType[]
  }

  let tracks: DemoListType = {
    all: [],
    pending: [],
    accepted: [],
    denied: [],
  }
  let filteredTracks: DemoListType = {
    all: [],
    pending: [],
    accepted: [],
    denied: [],
  }
  let searchInput: string = ''

  let tracksLoaded: boolean = false
  let filterType: 'all' | 'pending' | 'accepted' | 'denied' = 'all'

  const sortTracksByType = (trackStore: TrackType[]): DemoListType => {
    return {
      all: trackStore,
      pending: trackStore.filter(track => track.isSigned === null) ?? [],
      accepted: trackStore.filter(track => track.isSigned === true) ?? [],
      denied: trackStore.filter(track => track.isSigned === false) ?? [],
    }
  }

  const searchTracks = (type: string) => {
    if (searchInput.length > 0) {
      filteredTracks[type] = tracks[type].filter(
        (track: TrackType) =>
          track.title.toLowerCase().substring(0, searchInput.length) ==
          searchInput.toLowerCase().substring(0, searchInput.length),
      )
    } else {
      filteredTracks[type] = tracks[type]
    }
  }

  onMount(() => {
    getTracksByArtistId($userStore.uuid)
      .then(res => {
        userTracksStore.set(res)
        tracksLoaded = true
      })
      .catch(() => {
        tracksLoaded = null
      })
    // if ($userTracksStore == null) {
    //   userTracksStore.set(await getTracksByArtistId($userStore.uuid))
    //   console.log($userTracksStore)
    //   if ($userTracksStore)
    //     tracks = {
    //       all: $userTracksStore,
    //       pending: $userTracksStore.filter(track => track.isSigned == null),
    //       accepted: $userTracksStore.filter(track => track.isSigned === true),
    //       denied: $userTracksStore.filter(track => track.isSigned === false),
    //     }
    // }
  })

  $: {
    // console.log(tracks)
    if (tracksLoaded) tracks = sortTracksByType($userTracksStore)
  }
</script>

<svelte:head>
  <title>{$userStore.nickName} - All tracks</title>
</svelte:head>

<div class="grid gap-8">
  {#if tracksLoaded === null}
  <ErrorBanner message='Something went wrong while fetching your tracks.'></ErrorBanner>
  {:else}
  <Box>
    <Title>
      <div class="grid sm:grid-cols-2 items-center">
        <h1>Tracks</h1>
        <div class="flex space-x-2 sm:ml-auto">
          <select class="portal input w-32" bind:value={filterType}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="denied">Denied</option>
          </select>
          <label>
            <input
              bind:value={searchInput}
              on:input={() => searchTracks(filterType)}
              class="input portal"
              placeholder="Search.."
            />
          </label>
        </div>
      </div>
    </Title>
    {#if tracks.all.length === 0}
      <SubTitle>Tracks</SubTitle>
      <Skeleton>No tracks found..</Skeleton>
    {:else if filterType == 'all' && searchInput.length > 0}
      <div class="flex justify-between items-center">
        <SubTitle
          >Search in all demos with title starting "{searchInput}"</SubTitle
        >
      </div>
      {#each filteredTracks.all as track}
        <TrackRow {track} size="md" />
      {/each}
      {#if filteredTracks.all.length == 0}
        <Skeleton>No demos found..</Skeleton>
      {/if}
    {:else}
      {#if filterType == 'pending' || filterType == 'all'}
        <div class="flex justify-between items-center">
          <SubTitle>Pending tracks</SubTitle>
        </div>
        <div class="grid gap-4">
          {#if tracks.pending.length <= 0 && tracksLoaded}
             <div class="col-span-2">
              <Skeleton>There are no pending tracks.</Skeleton>
            </div>
          {:else if tracks.pending.length <= 0}
            <Skeleton loading>Loading pending tracks..</Skeleton>
          {:else}
            {#each tracks.pending as track}
              <TrackRow {track} size="md" />
            {/each}
          {/if}
        </div>
      {/if}
      {#if filterType == 'accepted' || filterType == 'all'}
        <SubTitle>Accepted tracks</SubTitle>
        <div class="grid gap-4 ">
          {#if tracks.accepted.length <= 0 && tracksLoaded}
             <div class="col-span-2">
              <Skeleton>There are no accepted tracks.</Skeleton>
            </div>
          {:else if tracks.accepted.length <= 0}
            <div class="">
              <Skeleton loading>Loading accepted tracks..</Skeleton>
            </div>
          {:else}
            {#each tracks.accepted as track}
              <TrackRow {track} size="md" />
            {/each}
          {/if}
        </div>
      {/if}
      {#if filterType == 'denied' || filterType == 'all'}
        <SubTitle>Denied tracks</SubTitle>
        <div class="grid gap-4 lg:grid-cols-2">
          {#if tracks.denied.length <= 0 && tracksLoaded}
            <div class="col-span-2">
              <Skeleton>There are no denied tracks.</Skeleton>
            </div>
          {:else if tracks.denied.length <= 0}
            <div class="col-span-2">
              <Skeleton loading>Loading denied tracks..</Skeleton>
            </div>
          {:else}
            {#each tracks.denied as track}
              <TrackRow {track} size="sm" />
            {/each}
          {/if}
        </div>
      {/if}
      <div />
    {/if}
  </Box>
  {/if}
</div>
