<script lang="ts">
  import Box from '../../../../components/Box.svelte'
  import FadeBox from '../../../../components/portal/FadeBox.svelte'
  import Title from '../../../../components/Title.svelte'
  import SubTitle from '../../../../components/SubTitle.svelte'
  import Skeleton from '../../../../components/Skeleton.svelte'
  import DemoRow from '../../../../components/DemoRow.svelte'
  import type { TrackType } from '../../../../types/Track.type'
  import { onMount } from 'svelte'
  import { getAllTracks } from '../../../../utils/useGraphQL'
  import demoTracksStore from '../../../../stores/demoTracksStore'
  import ErrorBanner from '../../../../components/error/ErrorBanner.svelte'

  interface DemoListType {
    all: TrackType[]
    pending: TrackType[]
    accepted: TrackType[]
    denied: TrackType[]
  }
  let demos: DemoListType = {
    all: [],
    pending: [],
    accepted: [],
    denied: [],
  }

  let demosLoaded: boolean = false

  let filterType: string
  let filteredDemos: DemoListType = {
    all: [],
    pending: [],
    accepted: [],
    denied: [],
  }
  let searchInput: string = ''

  const searchTracks = (type: string) => {
    if (searchInput.length > 0) {
      filteredDemos[type] = demos[type].filter(
        (track: TrackType) =>
          track.title.toLowerCase().substring(0, searchInput.length) ==
          searchInput.toLowerCase().substring(0, searchInput.length),
      )
    } else {
      filteredDemos[type] = demos[type]
    }
  }

  const sortTracksByType = (trackStore: TrackType[]): DemoListType => {
    return {
      all: trackStore,
      pending: trackStore.filter(track => track.isSigned === null) ?? [],
      accepted: trackStore.filter(track => track.isSigned === true) ?? [],
      denied: trackStore.filter(track => track.isSigned === false) ?? [],
    }
  }

  onMount(() => {
    getAllTracks()
      .then(res => {
        demoTracksStore.set(res)
        demos = sortTracksByType(res)
        demosLoaded = true
      })
      .catch(() => {
        demosLoaded = null
      })
  })

  $: {
    if (demosLoaded) filteredDemos = sortTracksByType($demoTracksStore)
  }
</script>

<svelte:head>
  <title>Demos</title>
</svelte:head>

<FadeBox>
  {#if demosLoaded === null}
    <ErrorBanner message="Something went wrong while fetching your tracks." />
  {:else}
    <Box>
      <Title>
        <div class="grid sm:grid-cols-2 items-center">
          <h1>Demos</h1>
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
      {#if demos.all.length === 0}
        <SubTitle>Demos</SubTitle>
        <Skeleton loading={true}>Loading demos..</Skeleton>
      {:else if filterType == 'all' && searchInput.length > 0}
        <div class="flex justify-between items-center">
          <SubTitle
            >Search in all demos with title starting "{searchInput}"</SubTitle
          >
        </div>
        {#each filteredDemos.all as track}
          <DemoRow {track} />
        {/each}
        {#if filteredDemos.all.length === 0}
          <Skeleton>No demos found..</Skeleton>
        {/if}
      {:else}
        {#if filterType == 'accepted' || filterType == 'all'}
          <SubTitle>Accepted demos</SubTitle>
          <div class="grid gap-8 ">
            {#if filteredDemos.accepted.length <= 0 && demosLoaded}
              <div class="col-span-2">
                <Skeleton>There are no accepted tracks.</Skeleton>
              </div>
            {:else if filteredDemos.accepted.length <= 0}
              <Skeleton loading>Loading accepted tracks..</Skeleton>
            {:else}
              {#each filteredDemos.accepted as track}
                <DemoRow {track} />
              {/each}
            {/if}
          </div>
        {/if}
        {#if filterType == 'denied' || filterType == 'all'}
          <SubTitle>Denied demos</SubTitle>
          <div class="grid gap-8 ">
            {#if filteredDemos.denied.length <= 0 && demosLoaded}
              <div class="col-span-2">
                <Skeleton>There are no denied tracks.</Skeleton>
              </div>
            {:else if filteredDemos.denied.length <= 0}
              <Skeleton loading>Loading denied tracks..</Skeleton>
            {:else}
              {#each filteredDemos.denied as track}
                <DemoRow {track} />
              {/each}
            {/if}
          </div>
        {/if}
        {#if filterType == 'pending' || filterType == 'all'}
          <SubTitle>Pending demos</SubTitle>
          <div class="grid gap-8 ">
            {#if filteredDemos.pending.length <= 0 && demosLoaded}
              <div class="col-span-2">
                <Skeleton>There are no pending tracks.</Skeleton>
              </div>
            {:else if filteredDemos.pending.length <= 0}
              <Skeleton loading>Loading pending tracks..</Skeleton>
            {:else}
              {#each filteredDemos.pending as track}
                <DemoRow {track} />
              {/each}
            {/if}
          </div>
        {/if}
      {/if}

      <div />
    </Box>
  {/if}
</FadeBox>
