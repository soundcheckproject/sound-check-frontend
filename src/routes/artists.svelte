<script lang="ts">
  import { query } from '../utils/useGraphQL'
  import { onMount } from 'svelte'
  import Artist from '../components/Artist.svelte'
  import Container from '../components/Container.svelte'
  import Header from '../components/Header.svelte'
  import type { UserType } from '../types/User.type'
  import { each, prevent_default } from 'svelte/internal'
  import ArtistCard from '../components/ArtistCard.svelte'
  import ArtistCardSkeleton from '../components/skeleton/ArtistCardSkeleton.svelte'
  import Footer from '../components/Footer.svelte'

  let searchNickname: string = ''
  let artists: UserType[] = []
  let artistsDisplay: UserType[] = undefined

  const getLabelArtists = async () => {
    const data = await query(
      `getLabelArtists`,
      `query getLabelArtists {
          getLabelArtists {
            uuid
            nickName
            firstName
            surName
            logo
            }
        }`,
    )

    if (data) {
      artists = data
      artistsDisplay = artists
    }
  }

  const getLabelArtistsOnName = async (nickName: string) => {
    if (nickName.length > 0) {
      artistsDisplay = artists.filter((a: UserType) => {
        return a.nickName.toLocaleLowerCase().includes(nickName.toLowerCase())
      })
    } else {
      artistsDisplay = artists
    }
  }

  onMount(() => {
    getLabelArtists()
  })
</script>

<Header type="split" />
<main>
  <div class="bg-gray-100 shadow-sm">
    <Container className="py-4">
      <form on:submit={prevent_default} class="relative">
        <input
          bind:value={searchNickname}
          on:input={() => getLabelArtistsOnName(searchNickname)}
          type="text"
          class="p-2 pl-9 rounded-sm border-2 border-gray-200 outline-none transition-colors bg-gray-50 max-w-min hover:border-teal-700 active:border-teal-700 focus:border-teal-700 m-0"
          placeholder="Artist name"
        />
          <svg
            class="w-5 h-5 absolute top-3 left-2 bottom-3 text-gray-900  stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><circle cx="11" cy="11" r="8" /><line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
            /></svg
          >
      </form>
    </Container>
  </div>
  <div>
    <Container>
      <section class="grid grid-cols-repeat-min-12rem gap-6">
        {#if artistsDisplay !== undefined}
          {#each artistsDisplay as artist}
            <ArtistCard {artist} />
          {/each}
        {:else}
          {#each Array(4) as i}
            <ArtistCardSkeleton />
          {/each}
        {/if}
      </section>
    </Container>
  </div>
</main>
<Footer />
