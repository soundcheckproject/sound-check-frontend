<script lang="ts">
  import { page } from '$app/stores'
  import ProfileBanner from '../../components/ProfileBanner.svelte'
  import Container from '../../components/Container.svelte'
  import Header from '../../components/Header.svelte'
  import { getTracksByArtistId, query } from '../../utils/useGraphQL'
  import type { UserType } from '../../types/User.type'
  import { onMount } from 'svelte'
  import type { TrackType } from '../../types/Track.type'
  import TrackPlayer from '../../components/TrackPlayer.svelte'
  import TrackRow from '../../components/TrackRow.svelte'
  import Title from '../../components/Title.svelte'
  import FadeBox from '../../components/portal/FadeBox.svelte'
  import Footer from '../../components/Footer.svelte'
  import Skeleton from '../../components/Skeleton.svelte'

  let artist: UserType

  let tracks: TrackType[] = []
  // let tracks: TrackType[] = [
  //   {
  //     title: 'Miss you so feat. Jebroer',
  //     description: 'Niels his new hit song',
  //     previewStart: 20,
  //     previewStop: 35,
  //     lyrics: 'I hate to admit it',

  //     genreId: '6ef2aded-c280-40bf-8e4c-e4b6f38b72d2',
  //     prefferdReleaseDate: '2022-01-01',
  //     artwork: {
  //       designer: 'nielsonderbeke2',
  //       resource: 'https://pixy.org/src/20/201310.jpg',
  //     },
  //   },
  //   {
  //     title: 'Miss you so feat. Jebroer',
  //     description: 'Niels his new hit song',
  //     previewStart: 20,
  //     previewStop: 35,
  //     lyrics: 'I hate to admit it',

  //     genreId: '6ef2aded-c280-40bf-8e4c-e4b6f38b72d2',
  //     prefferdReleaseDate: '2022-01-01',
  //     artwork: {
  //       designer: 'nielsonderbeke2',
  //       resource:
  //         'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2018%2F09%2F28%2F951526-art-artwork-fantasy-artistic-original-abstract-abstraction-psychedelic.jpg&f=1&nofb=1',
  //     },
  //   },
  // ]

  const getArtist = async () => {
    const artistData = await query(
      `getUser`,
      `query GetUser($userId: String!) {
        getUser(userId: $userId) {
            uuid
            nickName
            logo
            firstName
            surName
            birthdate
            email
            country
            city
            state
            biography
            role {
              name
            }
     
          }
        }`,
      { userId: $page.params.artistId },
    )

    console.log({ artistData })
    if (artistData) {
      artist = artistData
      const trackData = await query(
        `getTracksReleasedByUserId`,
        `query Query($userId: String!) {
          getTracksReleasedByUserId(userId: $userId) {
            uuid
            title
            description
            lyrics
            isSigned
            genreId
            
            label {
              name
            }
            artwork {
              resource
              designer
            }
          }
        }`,
        { userId: artist.uuid },
      )
      console.log({ trackData })
      if (trackData) {
        // tracks = trackData
      }
    }
  }

  onMount(() => {
    getArtist()
  })
</script>

<Header type="split" />
<main>
  <FadeBox>
    <Container className="py-16 ">
      {#if artist}
        <ProfileBanner container {artist} logo={artist.logo} />
      {/if}
      <div class="grid gap-6">
        <Title class="mt-12">Tracks</Title>
        {#if tracks}
          <div class="grid gap-4 lg:grid-cols-2">
            {#if tracks.length != 0}
              {#each tracks as track}
                <TrackRow
                  actions={false}
                  background
                  artists
                  href="/releases/{track.uuid}"
                  size="lg"
                  {track}
                />
                <!-- <TrackRow actions={false} background artists href="/releases/{track.uuid}" size="lg" {track} /> -->
              {/each}
            {:else}
              <div class="col-span-2">
                <Skeleton loading={true}>Loading tracks..</Skeleton>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </Container>
  </FadeBox>
</main>
<Footer />
