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
  import { capitalize } from '../../utils/capitalize'
  import ErrorBanner from '../../components/error/ErrorBanner.svelte'

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

  const getArtistTracks = async (userId: string) => {
    try {
      tracks = await query(
        `getTracksReleasedByUserId`,
        `query Query($userId: String!) {
          getTracksReleasedByUserId(userId: $userId) {
            uuid
            title
            description
            lyrics
            isSigned
            genreId
            prefferdReleaseDate
            artistTracks
            {
              user{
                nickName
                logo
                userLinks{
                  link{
                    type
                  }
                  linkAddress
                }
              }
            }
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
    } catch (error) {
      tracks = []
    }
  }

  const getArtist = async () => {
    try {
      artist = await query(
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
      getArtistTracks(artist.uuid)
    } catch (error) {
      artist = null
    }
  }

  onMount(() => {
    getArtist()
  })
</script>

<svelte:head>
  <title>{`${artist && artist.nickName + ' - '}Artist detail`}</title>
</svelte:head>

<Header type="split" />
<main>
  <FadeBox>
    <Container className="py-16 grid gap-12">
      {#if artist}
        <ProfileBanner container {artist} logo={artist.logo} />

        <div
          class="grid gap-8 lg:grid-cols-2 "
          style="grid-template-columns:auto 1fr"
        >
          <div class="flex flex-col  ">
            <SubTitle>Socials</SubTitle>

            <div class="text-sm   mt-6 grid gap-2">
              {#if artist && artist.userLinks && artist.userLinks.length > 0}
                {#each artist.userLinks as userLink}
                  <div
                    class="flex items-center bg-white rounded-full mshadow-xs px-3 py-2 text-xs "
                  >
                    <LinkIcon className="mr-2" type={userLink.link.type} />
                    <a
                      href={userLink.linkAddress}
                      target="_blank"
                      class="hover:underline grid grid-flow-col gap-2 items-center text-gray-700"
                    >
                      {capitalize(userLink.link.type)}
                    </a>
                  </div>
                {/each}
              {:else}
                <p class="text-sm ">No links found 😥</p>
              {/if}
            </div>
          </div>
          <div class="grid gap-6 items-start">
            <SubTitle>Tracks</SubTitle>
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
                      status={false}
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
      {:else if artist === undefined}
        <Skeleton
          theme="light"
          loading={true}
          height="h-[22rem]"
        />
        <Skeleton theme="light" loading={true} height="h-[18rem]" />
      {:else if artist === null}
        <ErrorBanner message="Error while fetching the user data." />
      {/if}
    </Container>
  </FadeBox>
</main>
<Footer />
