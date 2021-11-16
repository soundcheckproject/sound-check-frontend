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

  onMount(async () => {
    if ($demoTracksStore == null) {
      demoTracksStore.set(await getTracksByArtistId($userStore.uuid))
      demos = {
        all: $demoTracksStore,
        pending: $demoTracksStore.filter(track => track.isSigned == null) ?? [],
        accepted:
          $demoTracksStore.filter(track => track.isSigned === true) ?? [],
        denied:
          $demoTracksStore.filter(track => track.isSigned === false) ?? [],
      }
    }
  })

  $: {
    console.log(demos)
  }
</script>

<Box>
  <Title>
    <div class="flex justify-between items-center">
      <div>All demos</div>
      <div>
        <label>
          <input class="input portal" placeholder="Search.." />
        </label>
      </div>
    </div>
  </Title>
  <DemoRow></DemoRow>
  <DemoRow></DemoRow>
  {#if mode == 'pending' || mode == 'all'}
    <div class="flex justify-between items-center">
      <SubTitle>Pending demos</SubTitle>
    </div>
    <div class="grid gap-4 ">
      {#each demos.pending as track}
        <DemoRow
          {track}
          status="pending"
          size="lg"
          artworkSource="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.sndcdn.com%2Fartworks-000454520877-chf2n6-t500x500.jpg&f=1&nofb=1"
          ><div>Your track "<b>Memories</b>"" hasn't been reviewed yet.</div>
        </DemoRow>
      {/each}
      {#if demos.pending.length <= 0}
        <Skeleton>Loading pending demos..</Skeleton>
      {/if}
    </div>
  {/if}
  <div />
</Box>
