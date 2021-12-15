<script lang="ts">
  import { query } from '../../utils/useGraphQL'
  import { onMount } from 'svelte'
  import Artist from '../../components/Artist.svelte'
  import Container from '../../components/Container.svelte'
  import Header from '../../components/Header.svelte'
  import type { UserType } from '../../types/User.type'
  import { each, prevent_default } from 'svelte/internal'
  import ArtistCard from '../../components/ArtistCard.svelte'
  import ArtistCardSkeleton from '../../components/skeleton/ArtistCardSkeleton.svelte'
  import Footer from '../../components/Footer.svelte'
  import FadeBox from '../../components/portal/FadeBox.svelte'
  import Title from '../../components/Title.svelte'

  import _ from '../../stores/languageStore'

  let searchNickname: string = ''
  let artists: UserType[] = []
  let artistsDisplay: UserType[] = []
  let artistsPage: number
  let artistsPerPage: number = 10

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
    console.log(data)
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

<svelte:head>
  <title>{$_.header.artists}</title>
</svelte:head>

<Header type="split" />
<main class="py-8 ">
  <FadeBox>
    <!-- <div class="bg-gray-100 shadow-sm">
      <Container className="py-4">
        <form on:submit={prevent_default} class="relative">
          <label class="relative w-48 flex items-center">
            <input
              bind:value={searchNickname}
              on:input={() => getLabelArtistsOnName(searchNickname)}
              type="text"
              class="input"
              placeholder="Artist name"
            />
            <svg
              class="w-5 h-5 absolute top-3 right-2  text-gray-900  stroke-current"
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
          </label>
        </form>
      </Container>
    </div> -->
    <div>
      <Container>
        <Title>
          <div class="flex items-center justify-between">
            <div>{$_.header.artists}</div>
            <form on:submit={prevent_default} class="relative">
              <label class="relative w-48 flex items-center">
                <input
                  bind:value={searchNickname}
                  on:input={() => getLabelArtistsOnName(searchNickname)}
                  type="text"
                  class="input"
                  placeholder="Artist name"
                />
                <svg
                  class="w-4 h-4 absolute mt-2 right-4  text-teal-700  stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><circle cx="11" cy="11" r="8" /><line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                  /></svg
                >
              </label>
            </form>
          </div>
        </Title>
        <section class="grid gap-6">
          <div class="grid grid-cols-repeat-min-12rem gap-6">
            {#if artistsDisplay}
              {#each artistsDisplay as artist, i}
                {#if i < artistsPerPage}
                  <ArtistCard {artist} />
                {/if}
              {/each}
            {:else}
              {#each Array(4) as i}
                <ArtistCardSkeleton />
              {/each}
            {/if}
          </div>
          <!-- //todo make thing work\ -->
          <!-- <div class="flex space-x-2">
            <ButtonBox
              on:click={() => {
                ;() => {}
              }}
            >
              <svg
                class="rotate-180 "
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </ButtonBox>
            {#each Array(artistsDisplay.length) as i, index}
              <ButtonBox on:click={() => artistsPage == index}
                >{index + 1}</ButtonBox
              >
            {/each}
            <ButtonBox>
              <input
                bind:value={artistsPage}
                on:input={() => {
                  console.log(parseInt(artistsPage.toString()))
                }}
                class="-m-1 p-1 w-8 focus:w-8 hover:w-8 transition-all text-center flex items-center justify-center"
                placeholder=".."
              />
            </ButtonBox>
            <ButtonBox
              on:click={() => {
                ;() => {}
              }}
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </ButtonBox>
          </div> -->
        </section>
      </Container>
    </div>
  </FadeBox>
</main>
<Footer />
