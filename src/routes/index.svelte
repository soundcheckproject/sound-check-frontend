<script lang="ts">
  import Container from '../components/Container.svelte'
  import Button from '../components/Button.svelte'
  import Header from '../components/Header.svelte'
  import Footer from '../components/Footer.svelte'
  import Title from '../components/Title.svelte'
  import SubTitle from '../components/SubTitle.svelte'
  import Artist from '../components/Artist.svelte'
  import Track from '../components/Track.svelte'
  import { onMount } from 'svelte'
  import type { TrackType } from 'src/types/Track.type'
  import { query } from '../utils/useGraphQL'
  import LineSkeleton from '../components/skeleton/LineSkeleton.svelte'
  import TrackSkeleton from '../components/skeleton/TrackSkeleton.svelte'
  import { labelStore } from '../stores/stores'
  import { goto } from '$app/navigation'
  import FadeBox from '../components/portal/FadeBox.svelte'
  import { page } from '$app/stores'

  import _ from '../stores/languageStore'

  let latestReleases: TrackType[] = []
  let spotlightTrack: TrackType = undefined

  const getReleasesData = async () => {
    try {
      const releases: TrackType[] = await query(
        `getTracksReleased`,
        `query getTracksReleased {
          getTracksReleased {
            uuid
            title
            description
            artistTracks {
              user {
              nickName
              uuid
              firstName
              surName
              email
              country
              logo
              userLinks{
                linkAddress
                  link{
                    type
                  }
                }
              }
            }
            artwork {
                resource
            }
          }
        }`,
      )

      if (releases && releases.length > 0) {
        spotlightTrack = releases[0]
      }
      latestReleases = releases
    } catch (error) {
      console.error('Could not get latest tracks.', error)
    }
  }

  const options = {
    show: 50,
    threshold: 100,
    style: 'opacity: 1;',
  }

  let refs = ['info', 'contact']

  onMount(async () => {
    const location = window.location.href
    const [url, subnav] = location.split('#')
    if (subnav) {
      refs[subnav].scrollIntoView()
    }

    getReleasesData()
  })
</script>

<svelte:head>
  <title>{$labelStore.name} - Home</title>
</svelte:head>

<Header>

  <article
    class=" {spotlightTrack
      ? 'w-72 sm:w-full max-w-xs sm:max-w-full mx-auto sm:mx-0 mb-24 flex gap-6 sm:gap-2 flex-col-reverse sm:flex-row-reverse lg:flex-row lg:space-x-12 lg:items-center space-between'
      : 'w-72 sm:w-full max-w-xs mx-auto sm:max-w-full sm:mx-0 mb-24 flex gap-6 sm:gap-2 flex-col-reverse sm:flex-row-reverse lg:flex-row lg:space-x-12 lg:items-center space-between'}"
  >
    <div class="sm:w-2/3 grid gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2">
          {#if spotlightTrack}
            {spotlightTrack.title}
          {:else}
            <LineSkeleton loading={true} height={6} width="w-5/6" />
          {/if}
        </h1>
        <h3 class="text-white text-opacity-50 text-sm sm:text-md">
          {#if spotlightTrack}
            {$_.home.by} {#each spotlightTrack.artistTracks as at, i}
              {i > 0 ? `, ${at.user.nickName}` : at.user.nickName}
            {/each}
          {:else}
            <LineSkeleton loading={true} height={3} width="w-2/6" />
          {/if}
        </h3>
      </div>
      <p class="hidden sm:inline lg:text-md max-w-lg ">
        {#if spotlightTrack}
          {spotlightTrack.description}
        {:else}
          <LineSkeleton loading={true} lines={4} width="w-4/6" />
        {/if}
      </p>
      <div class="mb-2 flex justify-start items-end">
        {#if spotlightTrack}
          {#each spotlightTrack.artistTracks as at, i}
            {#if i > 0}
              <Artist className="ml-4" artist={at.user} size="xs"
                >{at.user.nickName}</Artist
              >
            {:else}
              <Artist theme="dark" artist={at.user} size="xs"
                >{at.user.nickName}</Artist
              >
            {/if}
          {/each}
        {/if}
      </div>
      <div class="flex">
        {#if spotlightTrack}
          <Button
            onClick={() => goto('/releases/' + spotlightTrack.uuid)}
            type="glass"
            rounded="none">{$_.home.learnmore}</Button
          >
        {/if}
      </div>
    </div>
    <div class="max-w-full sm:w-1/3 sm:px-4">
      {#if spotlightTrack}
        <img
          on:click={() => goto('/releases/' + spotlightTrack.uuid)}
          class="cursor-pointer rounded-md mshadow-lg max-h-96 max-w-md xl:max-h-96 xl:max-w-lg w-full object-cover "
          src={spotlightTrack.artwork.resource}
          alt="Artwork"
        />
      {:else}
        <div
          class="rounded-md mshadow-lg h-56 lg:h-72 w-full max-w-xs bg-gray-400 opacity-80 animate-pulse grid place-items-center"
        />
      {/if}
    </div>
  </article>
</Header>
<FadeBox>
  <div class="py-16">
    <Container>
      <section>
        <article id="releases">
          <Title className="">{$_.home.latest}</Title>
          <div class="sm:grid-cols-3 gap-4 flex overflow-x-auto mt-2 p-2 ">
            {#if latestReleases && latestReleases.length > 0}
              {#each latestReleases as track}
                <Track
                  on:click={() => {
                    goto('/releases/' + track.uuid)
                  }}
                  {track}
                />
              {/each}
            {:else}
              {#each Array(3) as i}
                <TrackSkeleton loading={false} />
              {/each}
            {/if}
            {#if latestReleases && latestReleases.length < 4}
              {#each Array(3) as i}
                <TrackSkeleton loading={false} />
              {/each}
            {/if}
          </div>
        </article>
      </section>
    </Container>
  </div>
  <div bind:this={refs['info']} id="info" class="gradientBlueGreen py-4">
    <Container>
      <section class="p-16">
        <article
          class="flex justify-between flex-col md:flex-row items-center gap-8 p-0"
        >
          <div class="w-full grid gap-4">
            <Title theme="light"
              >{$_.home.what} {$labelStore ? $labelStore.name : 'this label'}?</Title
            >
            {#if $labelStore}
              <SubTitle theme="light">🚨 Letsgo!</SubTitle>
              <p class="max-w-lg text-white text-sm font-base">
                {$labelStore.description}
              </p>
            {:else}
              <LineSkeleton width="w-4/6" lines={6} />
            {/if}
          </div>
          {#if $labelStore}
            <img
              class="w-full h-full rounded-md mshadow-lg min-w-xs min-h-xs max-h-md md:max-w-md"
              src={$labelStore.logo.toString()}
              alt="Logo of label {$labelStore.name}"
            />
          {:else}
            <div
              class="w-full h-full rounded-md bg-gray-400 opacity-80 animate-pulse mshadow-lg min-w-xs min-h-xs max-h-md md:max-w-md"
            />
          {/if}
        </article>
      </section></Container
    >
  </div>
  <div bind:this={refs['contact']} id="contact" class="py-16">
    <Container>
      <section class="grid gap-6">
        <Title>{$_.header.contact}</Title>
        <div class="md:flex items-center">
          <article
            class="bg-gray-100 text-gray-900 px-6 md:mr-12 md:p-12 box-content rounded-md md:w-1/2 lg:w-2/5 "
          >
            <form class="grid gap-4 ">
              <label
                >{$_.contact.form.topic}<input
                  class="input"
                  placeholder={$_.contact.form.topic_placeholder}
                /></label
              >
              <label
                >{$_.contact.form.question}<textarea
                  class="input "
                  placeholder={$_.contact.form.question_placeholder}
                /></label
              >

      
              <Button color="bg-teal-700" size="md">{$_.contact.form.submit}</Button>
            </form>
          </article>
          <article class="py-12 md:w-1/2 lg:w-3/5 lg:left ">
            <SubTitle>📩 {$_.contact.touch}</SubTitle>
            <p>
              {$_.contact.description[0]}<br>
              {$_.contact.description[1]}
            
            </p>
            <p>
              <b class="grid grid-flow-col  items-center justify-start gap-1">
                <svg
                  class="-mt-px"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon
                    points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
                  />
                </svg> {$_.contact.company}</b
              >
              Ethereal<br />
              Deinzestraat 175, 9700 Oudenaarde<br />
              BTW: BE02.231.123
            </p>
            <p>
              <b class="grid grid-flow-col items-center justify-start gap-1">
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
                  <path
                    d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
                  />
                </svg>{$_.contact.press}</b
              >
              {$_.contact.stylingkit}
            </p>
            <div />
          </article>
        </div>
      </section>
    </Container>
  </div>
</FadeBox>
<Footer />

<style>
</style>
