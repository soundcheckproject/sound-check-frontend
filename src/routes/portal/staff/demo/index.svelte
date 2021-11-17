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

  let mode: 'all' | 'pending' | 'accepted' | 'denied' = 'all'
  let demos: { [key: string]: TrackType[] } = {
    all: [],
    pending: [],
    accepted: [],
    denied: [],
  }

  let tracksLoaded: boolean = false

  onMount(async () => {
    if ($demoTracksStore == null) {
      demoTracksStore.set(await getAllTracks())
      tracksLoaded = true
    }
  })
  let filteredDemos: any
  let searchInput = ''
  // TODO: filter doesn't show items when length 0
  const filterInput = () => {
    if (searchInput.length == 0) {
      filteredDemos = demos
      console.log(demos)
    } else {
      filteredDemos.accepted =
        $demoTracksStore
          .filter(track => track.isSigned === true)
          .filter(
            track =>
              track.title.toLowerCase().substring(0, searchInput.length) ==
              searchInput.toLowerCase().substring(0, searchInput.length),
          ) ?? []
    }
  }

  $: {
    if (tracksLoaded) {
      demos = {
        all: $demoTracksStore,
        pending: $demoTracksStore.filter(track => track.isSigned == null) ?? [],
        accepted:
          $demoTracksStore.filter(track => track.isSigned === true) ?? [],
        denied:
          $demoTracksStore.filter(track => track.isSigned === false) ?? [],
      }
    }
    filteredDemos = demos
  }
</script>

<Box>
  <Title>
    <div class="flex justify-between items-center">
      <div>All demos</div>
      <div>
        <label>
          <input
            bind:value={searchInput}
            on:input={filterInput}
            class="input portal"
            placeholder="Search.."
          />
        </label>
      </div>
    </div>
  </Title>

  {#if mode == 'pending' || mode == 'all'}
    <div class="flex justify-between items-center">
      <SubTitle>Pending demos</SubTitle>
    </div>
    <div class="grid gap-4 ">
      {#each filteredDemos.pending as track}
        <DemoRow {track} />
      {/each}
      <div class="flex justify-between items-center">
        <SubTitle>Accepted demos</SubTitle>
      </div>
      {#each filteredDemos.accepted as track}
        <DemoRow {track} />
      {/each}
      <div class="flex justify-between items-center">
        <SubTitle>Denied demos</SubTitle>
      </div>
      {#each filteredDemos.denied as track}
        <DemoRow {track} />
      {/each}
      <!-- {#if demos.pending.length <= 0}
        <Skeleton>Loading pending demos..</Skeleton>
      {/if} -->
    </div>
  {/if}
  <div />
</Box>
