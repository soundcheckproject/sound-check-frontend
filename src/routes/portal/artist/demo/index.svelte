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


  let tracksLoaded: boolean = false
  let filterType: 'all' | 'pending' | 'accepted' | 'denied' = 'all'

  const sortTracksByType = (trackStore: TrackType[]): DemoListType => {
    return {
      all: trackStore,
      pending: trackStore.filter(track => track.isSigned == null) ?? [],
      accepted: trackStore.filter(track => track.isSigned === true) ?? [],
      denied: trackStore.filter(track => track.isSigned === false) ?? [],
    }
  }

  onMount(() => {
    getTracksByArtistId($userStore.uuid)
      .then(res => {
        userTracksStore.set(res)
        tracks = sortTracksByType(res)
        tracksLoaded = true
      })
      .catch(err => {
        console.log(err)
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

<div class="grid gap-8">
  <Box>
    <Title>
      <div class="flex justify-between items-center">
        <div>All tracks</div>
        <div>
          <select class="portal input" bind:value={filterType}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="denied">Denied</option>
          </select>
        </div>
      </div>
    </Title>
    {#if tracks.all.length === 0}
      <Skeleton>No tracks found..</Skeleton>
    {:else}
      {#if filterType == 'pending' || filterType == 'all'}
        <div class="flex justify-between items-center">
          <SubTitle>Pending tracks</SubTitle>
        </div>
        <div class="grid gap-4 ">
          {#if tracks.pending.length <= 0}
            <Skeleton>Loading pending tracks..</Skeleton>
          {:else}
            {#each tracks.pending as track}
              <TrackRow {track} size="lg" slot={true}
                ><div>
                  Your track "<b>{track.title}</b>" hasn't been reviewed yet.
                </div>
              </TrackRow>
            {/each}
          {/if}
        </div>
      {/if}
      {#if filterType == 'accepted' || filterType == 'all'}
        <SubTitle>Accepted tracks</SubTitle>
        <div class="grid gap-4 ">
          {#if tracks.accepted.length <= 0}
            <div class="">
              <Skeleton>Loading accepted tracks..</Skeleton>
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
          {#if tracks.denied.length <= 0}
            <div class="col-span-2">
              <Skeleton>Loading denied tracks..</Skeleton>
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
</div>
