<script lang="ts">
  import Box from '../../../components/Box.svelte'
  import Title from '../../../components/Title.svelte'
  import TrackRow from '../../../components/TrackRow.svelte'
  import SubTitle from '../../../components/SubTitle.svelte'
  import Input from '../../../components/Input.svelte'
  import type { TrackType } from '../../../types/Track.type'
  import { onMount } from 'svelte'
  import { getAllTracks } from '../../../utils/useGraphQL'

  let tracks: TrackType[] = []

  onMount(async () => {
    tracks = await getAllTracks()
  })
</script>


<Box>
  <Title>All tracks</Title>
  <SubTitle>
    <div class="flex justify-between w-full items-center">
      <div>Filters</div>
      <label>
        <input class="input portal" placeholder="Search.." />
      </label>
    </div>
  </SubTitle>

  <div class="grid gap-4 lg:grid-cols-2 ">
    {#each tracks as track}
      <TrackRow />
    {/each}
    <TrackRow
      artworkSource="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.sndcdn.com%2Fartworks-000454520877-chf2n6-t500x500.jpg&f=1&nofb=1"
      >Trackname</TrackRow
    >
    <TrackRow
      artworkSource="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.sndcdn.com%2Fartworks-000454520877-chf2n6-t500x500.jpg&f=1&nofb=1"
      >Trackname</TrackRow
    >
    <TrackRow
      artworkSource="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.sndcdn.com%2Fartworks-000454520877-chf2n6-t500x500.jpg&f=1&nofb=1"
      >Trackname</TrackRow
    >
  </div>
</Box>
