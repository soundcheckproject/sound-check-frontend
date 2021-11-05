<script lang="ts">
  import type { GenreType } from '../../../../types/Genre.type'
  import {
    getGenres,
    getArtistsByNickName,
    createTrack,
  } from '../../../../utils/useGraphQL'
  //Todo: Royaltie percentage calc

  import Title from '../../../../components/Title.svelte'
  import SubTitle from '../../../../components/SubTitle.svelte'
  import Track from '../../../../components/Track.svelte'
  import Box from '../../../../components/Box.svelte'
  import TrackRow from '../../../../components/TrackRow.svelte'
  import { fade, fly, slide } from 'svelte/transition'
  import FlyBox from '../../../../components/FlyBox.svelte'
  import Button from '../../../../components/Button.svelte'
  import TrackPlayer from '../../../../components/TrackPlayer.svelte'
  import Input from '../../../../components/Input.svelte'
  import type { TrackType } from '../../../../types/Track.type'

  let tracksFromStatus = 'all'

  let track: TrackType = {
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
</script>

<Box>
  <Title>All tracks</Title>
  {#if tracksFromStatus == 'pending' || tracksFromStatus == 'all'}
    <div class="flex justify-between items-center">
      <SubTitle>Pending tracks</SubTitle>
    </div>
    <div class="grid gap-4 ">
      {#each Array(1) as i}
        <TrackRow
          {track}
          status="pending"
          size="lg"
          artworkSource="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.sndcdn.com%2Fartworks-000454520877-chf2n6-t500x500.jpg&f=1&nofb=1"
          ><div>Your track "<b>Memories</b>"" hasn't been reviewed yet.</div>
        </TrackRow>
      {/each}
    </div>
  {/if}
  {#if tracksFromStatus == 'accepted' || tracksFromStatus == 'all'}
    <SubTitle>Accepted tracks</SubTitle>
    <div class="grid gap-4 lg:grid-cols-2">
      {#each Array(2) as i}
        <TrackRow
          {track}
          status="accepted"
          size="md"
          artworkSource="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.sndcdn.com%2Fartworks-000454520877-chf2n6-t500x500.jpg&f=1&nofb=1"
          >{track.title}</TrackRow
        >
      {/each}
      {#each Array(2) as i}
        <TrackRow
          {track}
          status="released"
          size="md"
          artworkSource="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.sndcdn.com%2Fartworks-000454520877-chf2n6-t500x500.jpg&f=1&nofb=1"
          >Trackname</TrackRow
        >
      {/each}
    </div>
  {/if}
  {#if tracksFromStatus == 'denied' || tracksFromStatus == 'all'}
    <SubTitle>Denied tracks</SubTitle>
    <div class="grid gap-4 lg:grid-cols-2">
      {#each Array(4) as i}
        <TrackRow
          status="denied"
          size="sm"
          artworkSource="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.sndcdn.com%2Fartworks-000454520877-chf2n6-t500x500.jpg&f=1&nofb=1"
          >Trackname</TrackRow
        >
      {/each}
    </div>
  {/if}
  <div />
</Box>
