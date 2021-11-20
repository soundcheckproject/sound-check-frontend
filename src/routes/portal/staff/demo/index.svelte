<script lang="ts">
  import Box from '../../../../components/Box.svelte'
  import Title from '../../../../components/Title.svelte'
  import SubTitle from '../../../../components/SubTitle.svelte'
  import Skeleton from '../../../../components/Skeleton.svelte'
  import DemoRow from '../../../../components/DemoRow.svelte'
  import type { TrackType } from '../../../../types/Track.type'
  import { onMount } from 'svelte'
  import { getAllTracks } from '../../../../utils/useGraphQL'
  import demoTracksStore from '../../../../stores/demoTracksStore'
  import userStore from '../../../../stores/userStore'
  import { getTracksByArtistId } from '../../../../utils/useGraphQL'
  import { slide } from 'svelte/transition'

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

  let tracksLoaded: boolean = false

  onMount(async () => {
    demoTracksStore.set(await getAllTracks())
    demos = sortTracksByType($demoTracksStore)
    tracksLoaded = true
  })
  let filterType: string
  let filteredDemos: DemoListType = {
    all: [],
    pending: [],
    accepted: [],
    denied: [],
  }
  let searchInput = ''
  // TODO: filter doesn't show items when length 0
  const searchTracks = (type: string) => {
    console.log(searchInput, filterType, type)
    console.log(searchInput.length)
    if (searchInput.length > 0) {
      console.log(demos[type])
      filteredDemos[type] = demos[type].filter(
        (track: TrackType) =>
          track.title.toLowerCase().substring(0, searchInput.length) ==
          searchInput.toLowerCase().substring(0, searchInput.length),
      )
    } else {
      filteredDemos[type] = demos[type]
    }

    // if (searchInput.length > 0) {
    //   filteredDemos[type] = $demoTracksStore
    // .filter(track => track.isSigned === null)
    // .filter(
    //   track =>
    //     track.title.toLowerCase().substring(0, searchInput.length) ==
    //     searchInput.toLowerCase().substring(0, searchInput.length),
    // )
    //   // If no tracks are found, search by artistsname
    //   // if (filteredDemos[type].length == 0) {
    //   //   filteredDemos[type] = $demoTracksStore
    //   //     .filter(track => track.isSigned === null)
    //   //     .filter(
    //   //       track =>
    //   //         track.artistTracks[0].user.nickName
    //   //           .toLowerCase()
    //   //           .substring(0, searchInput.length) ==
    //   //         searchInput.toLowerCase().substring(0, searchInput.length),
    //   //     )
    //   // }
    //   // console.log(filteredDemos[type].length > 0 ?? 'hola!')
    // } else {
    //   filteredDemos[type] = $demoTracksStore.filter(
    //     track => track.isSigned === null,
    //   )
    // }
  }

  const sortTracksByType = (trackStore: TrackType[]): DemoListType => {
    return {
      all: trackStore,
      pending: trackStore.filter(track => track.isSigned == null) ?? [],
      accepted: trackStore.filter(track => track.isSigned === true) ?? [],
      denied: trackStore.filter(track => track.isSigned === false) ?? [],
    }
  }

  $: {
    if (tracksLoaded) filteredDemos = sortTracksByType($demoTracksStore)
  }
</script>

<Box>
  <Title>
    <div class="flex justify-between items-center">
      <div>All demos</div>
      <div class="flex space-x-2">
        <select class="portal input w-32" bind:value={filterType}>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="denied">Denied</option>
          <option value="all">All</option>
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

  {#if tracksLoaded && demos.all.length == 0}
    <Skeleton>Loading demos..</Skeleton>
  {:else if filterType == 'all' && searchInput.length > 0}
    <div class="flex justify-between items-center">
      <SubTitle
        >Search in all demos with title starting "{searchInput}"</SubTitle
      >
    </div>
    {#each filteredDemos.all as track}
      <DemoRow {track} />
    {/each}
    {#if filteredDemos.all.length == 0}
      <Skeleton>No demos found..</Skeleton>
    {/if}
  {:else}
    {#if filterType == 'accepted' || filterType == 'all'}
      <div class="flex justify-between items-center">
        <SubTitle>Accepted demos</SubTitle>
      </div>
      {#each filteredDemos.accepted as track}
        <DemoRow {track} />
      {/each}
      {#if filteredDemos.accepted.length == 0}
        <Skeleton>No demos found..</Skeleton>
      {/if}
    {/if}
    {#if filterType == 'denied' || filterType == 'all'}
      <div class="flex justify-between items-center">
        <SubTitle>Denied demos</SubTitle>
      </div>
      {#each filteredDemos.denied as track}
        <DemoRow {track} />
      {/each}
      {#if filteredDemos.denied.length == 0}
        <Skeleton>No demos found..</Skeleton>
      {/if}
    {/if}
    {#if filterType == 'pending' || filterType == 'all'}
      <div class="flex justify-between items-center">
        <SubTitle>Pending demos</SubTitle>
      </div>
      <div class="grid gap-4 ">
        {#each filteredDemos.pending as track}
          <DemoRow {track} />
        {/each}
        {#if filteredDemos.pending.length == 0}
          <Skeleton>No demos found..</Skeleton>
        {/if}
      </div>
    {/if}
  {/if}
  <!-- {#if demos.pending.length <= 0}
        <Skeleton>Loading pending demos..</Skeleton>
      {/if} -->

  <div />
</Box>
