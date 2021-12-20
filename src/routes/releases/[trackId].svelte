<script lang="ts">
  import TrackPlayer from '../../components/TrackPlayer.svelte'
  import { onMount } from 'svelte'
  import { query } from '../../utils/useGraphQL'
  import { page } from '$app/stores'
  import type { TrackType } from '../../types/Track.type'
  import FadeBox from '../../components/portal/FadeBox.svelte'
  import Box from '../../components/Box.svelte'
  import Container from '../../components/Container.svelte'
  import Footer from '../../components/Footer.svelte'
  import Header from '../../components/Header.svelte'
  import { formatDate } from '../../utils/useFormat'
  import SubTitle from '../../components/SubTitle.svelte'
  import Artist from '../../components/Artist.svelte'
  import Skeleton from '../../components/Skeleton.svelte'
  import ErrorBanner from '../../components/error/ErrorBanner.svelte'

  let track: TrackType

  let lyricsFormatted: string[]

  onMount(async () => {
    try {
      if ($page.params.trackId)
        track = await query(
          'getReleasedTrackById',
          `query GetReleasedTrackById($trackId: String!) {
          getReleasedTrackById(trackId: $trackId) {
                uuid
                title
                description
                lyrics
                isSigned
                prefferdReleaseDate
                artistTracks{
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
                genre {
                name

                }
                encodedFile
                artwork {
                    designer
                    resource
                }

            }
        }`,
          { trackId: $page.params.trackId },
        )

      lyricsFormatted = track.lyrics.split('.')
    } catch (error) {
      track = null
    }
  })
</script>

<svelte:head>
  <title>{`${track ? track.title : ''} - Track detail`}</title>
</svelte:head>

<Header type="split" />
<Container>
  <FadeBox>
    <section>
      <article class="grid gap-6">
        {#if track}
          <TrackPlayer feedback={false} {track} status={false} />
          <Box>
            <div class="grid gap-6 lg:grid-cols-2 items-start">
              <div class="grid gap-4">
                <SubTitle>💽 Information</SubTitle>

                <div class="grid ">
                  <p class="font-semibold ">Releasedate</p>
                  <p class="text-sm">
                    {new Intl.DateTimeFormat('en-US', {
                      weekday: 'long',
                    }).format(new Date(track.prefferdReleaseDate))} -
                    {formatDate(new Date(track.prefferdReleaseDate))}
                  </p>
                  <p class="mt-4 font-semibold ">Description</p>

                  <p class="text-sm">
                    {track.description ?? "Track doesn't have a description"}
                  </p>
                  <p class="mt-4 font-semibold  ">Lyrics</p>

                  <p class="text-sm">
                    {#if track.lyrics}
                      {#each lyricsFormatted as line}
                        {line}<br />
                      {/each}
                    {:else}Track doesn't have any lyrics{/if}
                  </p>
                </div>
              </div>
              <div class="grid gap-4">
                <SubTitle>👨🏼‍🎨 Artists</SubTitle>
                {#if track.artistTracks && track.artistTracks.length > 0}
                  <div class="flex space-x-2">
                    {#each track.artistTracks as artist}
                      <Artist artist={artist.user} socials theme="dark"
                        >{artist.user.nickName}</Artist
                      >
                    {/each}
                  </div>
                {:else}
                  <p class="text-sm">No artists found..</p>
                {/if}
              </div>
            </div>
          </Box>
        {:else if track === undefined}
          <Skeleton
            theme="light"
            loading={true}
            height="h-[24rem]"
            className="mb-8"
          />
          <Skeleton theme="light" loading={true} height="h-[18rem]" />
        {:else if track === null}
          <ErrorBanner message="Error while fetching the track data." />
        {/if}
      </article>
    </section>
  </FadeBox>
</Container>
<Footer />
