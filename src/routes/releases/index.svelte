<script lang="ts">
  import Container from '../../components/Container.svelte'
  import Header from '../../components/Header.svelte'
  import { query } from '../../utils/useGraphQL'

  import { onMount } from 'svelte'
  import type { TrackType } from '../../types/Track.type'

  import TrackRow from '../../components/TrackRow.svelte'
  import Title from '../../components/Title.svelte'
  import FadeBox from '../../components/portal/FadeBox.svelte'
  import Footer from '../../components/Footer.svelte'
  import Skeleton from '../../components/Skeleton.svelte'
  import { labelStore } from '../../stores/stores'

  let tracks: TrackType[] = []

  const getTracks = async () => {
    const tracksData = await query(
      `getTracksReleased`,
      `query Query {
            getTracksReleased {
                uuid
                title
                description
                lyrics
                isSigned
                prefferdReleaseDate
                artwork {
                    resource
                    designer
                }
         
                artistTracks {
                    user {
                        logo
                        nickName
                        userLinks {
                        link {
                            type
                        }
                        linkAddress
                        }
                    }
                    }

            }
        }`,
    )

    if (tracksData) {
      tracks = tracksData
    }
  }

  onMount(() => {
    getTracks()
  })
</script>

<svelte:head>
  <title>Releases</title>
</svelte:head>

<Header type="split" />
<main>
  <FadeBox>
    <Container>
      <div class="grid gap-6">
        <Title class="mt-12">Tracks</Title>
        {#if tracks}
          <div class="grid gap-4 ">
            {#if tracks.length != 0}
              {#each tracks as track}
                <TrackRow
                  actions={false}
                  status={false}
                  background
                  artists
                  href="/releases/{track.uuid}"
                  size="lg"
                  {track}
                />
                <!-- <TrackRow actions={false} background artists href="/releases/{track.uuid}" size="lg" {track} /> -->
              {/each}
            {:else}
              <Skeleton>No tracks yet</Skeleton>
            {/if}
          </div>
        {/if}
      </div>
    </Container>
  </FadeBox>
</main>
<Footer />
