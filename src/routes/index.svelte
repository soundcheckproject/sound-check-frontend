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
  import Skeleton from '../components/Skeleton.svelte'
  import LineSkeleton from '../components/skeleton/LineSkeleton.svelte'
  import TrackSkeleton from '../components/skeleton/TrackSkeleton.svelte'
  import type LabelType from 'src/types/Label.type'
  import { variables } from '../utils/variables'
  import { labelStore } from '../stores/stores'
  let count = 0

  let latestReleases: TrackType[] = []
  let spotlightTrack: TrackType = undefined

  const getLabelData = async () => {
    try {
      const label: LabelType = await query(
        `getLabelById`,
        `query getLabelById($labelId: String!) {
        getLabelById(labelId: $labelId) {
             logo
              founded
              description
              name
              uuid
        }
      }`,
        { labelId: variables.labelId },
      )

      console.log({ label })

      if (label) labelStore.set(label)
    } catch (error) {
      console.error(error)
    }
  }

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

      // if (releases && releases.length > 0) {
      //   spotlightTrack = releases[0]
      // }
      // latestReleases = releases
    } catch (error) {
      console.error('Could not get latest tracks.', error)
    }
  }

  onMount(async () => {
    getReleasesData()
    getLabelData()
  })
</script>

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
            by {#each spotlightTrack.artistTracks as at, i}
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
      <div class="mb-2 flex justify-start items-end space-x-2">
        {#if spotlightTrack}
          {#each spotlightTrack.artistTracks as at}
            <Artist artist={at.user} size="xs">{at.user.nickName}</Artist>
          {/each}
        {/if}
      </div>
      <div class="flex">
        {#if spotlightTrack}
          <Button onClick={() => count++} type="glass" rounded="none"
            >Learn more</Button
          >
        {/if}
      </div>
    </div>
    <div class="max-w-full sm:w-1/3 sm:px-6">
      {#if spotlightTrack}
        <img
          class="rounded-md mshadow-lg max-h-72 max-w-xs xl:max-h-96 xl:max-w-lg w-full object-cover "
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
<Container>
  <div class="py-6">
    <section>
      <article id="releases">
        <Title className="">Latest releases</Title>
        <div class="sm:grid-cols-3 gap-4 flex overflow-x-auto mt-2 ">
          {#if latestReleases.length > 0}
            {#each latestReleases as track}
              <Track {track} />
            {/each}
          {:else}
            {#each Array(3) as i}
              <TrackSkeleton />
            {/each}
          {/if}
        </div>
      </article>
    </section>

    <!-- <section class="even:bg-gray-100 px-6 -mx-6 sm:px-12 sm:-mx-12 rounded-md">
      <article>
        <Title>New artists</Title>
        <div>artists</div>
      </article>
      <article>
        <SubTitle>🔦 Artist spotlight</SubTitle>
        <div
          class="space-y-4 sm:space-y-0 sm:flex justify-between sm:space-x-8 items-center"
        >
          <div class="grid flex-col justify-items-start sm:w-1/2 lg:w-2/3 ">
            <h4 class="text-lg font-semibold">Martin Garrix</h4>
            <p class="text-sm mt-2 max-w-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <div class="hidden sm:inline mt-4 self-end md:mt-10">
              <Artist size="md">Martijntje</Artist>
            </div>
          </div>
          <div class=" sm:w-1/2  lg:w-1/3">
             svelte-ignore a11y-img-redundant-alt 
            <img
              alt="A photo of Martin Garrix"
              src="https://dynamicmedia.livenationinternational.com/Media/n/r/c/ad6a5ff7-fb0a-4e3f-a5fa-fb26381f186f.jpg"
              class="object-contain sm:object-cover h-64 sm:h-64 box-border w-full rounded-sm "
            />
          </div>
        </div>
      </article>
    </section> -->
    <section>
      <article>
        <Title>What is {$labelStore ? $labelStore.name : 'this label'}?</Title>
        {#if $labelStore}
          <SubTitle>🚨 Letsgo!</SubTitle>
          <p class="max-w-lg">
            {$labelStore.description}
          </p>
        {:else}
          <LineSkeleton width='w-1/6' />
          <LineSkeleton width='w-3/6' lines={4} />
        {/if}
      </article>
    </section>
  </div>
</Container>
<div id="artists" />
<div id="info" />
<div id="contact" class="gradientBlueGreen">
  <Container>
    <section class="py-16">
      <Title theme="light" className="mb-4">Contact</Title>
      <div class="md:flex items-center">
        <article
          class="bg-gray-100 px-6 -mx-6 md:-ml-12 md:mr-12 md:p-12 box-content rounded-md md:w-1/2 lg:w-2/5 "
        >
          <form class="grid gap-4 ">
            <label
              >Topic<input
                class="input"
                placeholder="Royalties, demo, promo, .."
              /></label
            >
            <label
              >What's your question?<textarea
                class="input "
                placeholder="For example: I'm interested to know how.."
              /></label
            >

            <label for="file">
              Attachment
              <div class="relative flex items-center justify-end group">
                <div class="input peer text-gray-500">
                  Drag & drop your file!
                </div>
                <!-- 
								
								<input
								id="file"
								type="file"
								value="Drag & drop!"
								class="hidden"
								placeholder="Drag & drop!"
							/> -->
                <svg
                  class="absolute mr-4 mt-2 group-hover:text-blue-800 peer-focus:text-blue-800 transition-colors"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"
                  />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
              </div>
            </label>
            <Button color="bg-teal-700" size="md">Learn more!</Button>
          </form>
        </article>
        <article class="py-12 md:w-1/2 lg:w-3/5 lg:left text-white">
          <SubTitle theme="light">📩 Get in touch with us!</SubTitle>
          <p>
            As a label we like to interact with our fans and future artists. If
            you have any questions or suggestions, don't hesitate to contact us!
          </p>
        </article>
      </div>
    </section>
  </Container>
</div>

<Footer />

<style>
</style>
