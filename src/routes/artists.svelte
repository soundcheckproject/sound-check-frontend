<script lang="ts">
  import { query } from '../utils/useGraphQL'
  import { onMount } from 'svelte'
  import Artist from '../components/Artist.svelte'
  import Container from '../components/Container.svelte'
  import Header from '../components/Header.svelte'
  import type { UserType } from '../types/User.type'
  import { each } from 'svelte/internal'
import ArtistCard from '../components/ArtistCard.svelte'
import ArtistCardSkeleton from '../components/skeleton/ArtistCardSkeleton.svelte'

  let artists: UserType[] = []

  const getLabelArtists = async () => {
    const data = await query(
      `getLabelArtists`,
      `query getLabelArtists {
          getLabelArtists {
            uuid
            nickName
            logo
            }
        }`,
    )

    if (data) artists = data
  }

  onMount(() => {
      getLabelArtists()
  })
</script>

<Header type="split" />
<div class="bg-gray-300">
  <Container>
    <input type="text" name="name" id="name" />
    <select name="filter" id="filter" />
  </Container>
</div>
<div>
  <Container>
    <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {#if artists.length > 0}
        {#each artists as artist}
          <ArtistCard artist={artist}></ArtistCard>
        {/each}
        {:else}
        {#each Array(12) as i}
        <ArtistCardSkeleton/>
            
        {/each}
      {/if}
    </section>
  </Container>
</div>
