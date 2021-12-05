<script lang="ts">
  import { page } from '$app/stores'
  import ProfileBanner from '../../components/ProfileBanner.svelte'
  import Container from '../../components/Container.svelte'
  import Header from '../../components/Header.svelte'
  import { getTracksByArtistId, query } from '../../utils/useGraphQL'
  import type { UserLink, UserType } from '../../types/User.type'
  import { onMount } from 'svelte'
  import type { TrackType } from '../../types/Track.type'
  import TrackPlayer from '../../components/TrackPlayer.svelte'
  import TrackRow from '../../components/TrackRow.svelte'
  import Title from '../../components/Title.svelte'
  import FadeBox from '../../components/portal/FadeBox.svelte'
  import Footer from '../../components/Footer.svelte'
  import Skeleton from '../../components/Skeleton.svelte'
  import SubTitle from '../../components/SubTitle.svelte'
  import LinkIcon from '../../components/LinkIcon.svelte'

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
            userLinks {
              link {
                type
              }
              linkAddress
            }
     
          }
        }`,
      { userId: $page.params.artistId },
    )

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
      <div
        class="grid gap-16 lg:grid-cols-2"
        style="grid-template-columns:auto 1fr"
      >
        <div class="grid gap-6 items-start">
          <SubTitle class="mt-12">Social media</SubTitle>
          <!-- {#if artist && artist.userLinks}
            {#each artist.userLinks as userLink}
              jow
            {/each}
          {/if} -->
          {#if artist && artist.userLinks && artist.userLinks.length > 0}
            {#each artist.userLinks as userLink}
              <div class="flex items-center">
                <LinkIcon className="mr-2" type={userLink.link.type} />
                <a
                  href={'https://' + userLink.linkAddress}
                  target="_blank"
                  class="hover:underline grid grid-flow-col gap-2 items-center "
                >
                  {userLink.link.type}
                </a>
              </div>
            {/each}
          {:else}
            <p class="text-sm ">No links found 😥</p>
          {/if}
        </div>
        <div class="grid gap-6 items-start">
          <SubTitle class="mt-12">Tracks</SubTitle>
          {#if tracks}
            <div class="grid gap-4 ">
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
      </div>
    </Container>
  </FadeBox>
</main>
<Footer />
