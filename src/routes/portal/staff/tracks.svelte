<script lang="ts">
  import Box from '../../../components/Box.svelte'
  import Title from '../../../components/Title.svelte'
  import TrackRow from '../../../components/TrackRow.svelte'
  import Skeleton from '../../../components/Skeleton.svelte'
  import SubTitle from '../../../components/SubTitle.svelte'
  import Input from '../../../components/Input.svelte'
  import type { TrackType } from '../../../types/Track.type'
  import { onMount } from 'svelte'
  import { getAllTracks } from '../../../utils/useGraphQL'
  import FadeBox from '../../../components/portal/FadeBox.svelte'
  import ErrorBanner from '../../../components/error/ErrorBanner.svelte'

  let tracks: TrackType[] = []
  let filteredTracks: TrackType[] = []
  let searchInput: string = ''

  let tracksLoaded: boolean = false

  const searchTracks = (tracks: TrackType[], input: string) => {
    if (input.length > 0) {
      const filteredInput = input.toLowerCase().substring(0, input.length)

      return tracks.filter(
        track =>
          track.title.toLowerCase().substring(0, input.length) == filteredInput,
        // TODO: filter on artist nickname from tracks
        (track: { artistTracks: { user: { nickName: string } }[] }) =>
          track.artistTracks[0] ??
          track.artistTracks[0].user.nickName
            .toLowerCase()
            .substring(0, input.length) == filteredInput,

        // console.log(
        //   track.artistTracks[0].user.nickName
        //     .toLowerCase()
        //     .substring(0, input.length) == filteredInput,
        // )
      )
    } else return tracks
  }

  onMount(async () => {
    try {
      tracks = await getAllTracks()
      tracksLoaded = true
    } catch (error) {
      tracksLoaded = null
    }
  })
  $: {
    filteredTracks = tracks
  }
</script>

<svelte:head>
  <title>Tracks</title>
</svelte:head>

<FadeBox>
  {#if tracksLoaded === null}
    <ErrorBanner message="Something went wrong while fetching your tracks." />
  {:else}
    <Box>
      <Title
        ><div class="grid sm:grid-cols-2 items-center">
          <h1>All tracks</h1>
          <label>
            <input
              bind:value={searchInput}
              on:input={() =>
                (filteredTracks = searchTracks(tracks, searchInput))}
              class="input portal"
              placeholder="Search.."
            />
          </label>
        </div></Title
      >
      {#if tracks.length == 0}
        <Skeleton>Loading tracks..</Skeleton>
      {:else if filteredTracks.length == 0 && tracksLoaded}
        <Skeleton>No tracks found..</Skeleton>
      {:else}
        <div class="grid gap-x-4 lg:grid-cols-2 ">
          {#each filteredTracks as track}
            <TrackRow portal="staff" {track}>{track.title}</TrackRow>
          {/each}
        </div>
      {/if}
    </Box>
  {/if}
</FadeBox>
