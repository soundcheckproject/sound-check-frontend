<script lang="ts">
  import Title from '../../../../components/Title.svelte'
  import SubTitle from '../../../../components/SubTitle.svelte'
  import Track from '../../../../components/Track.svelte'
  import Box from '../../../../components/Box.svelte'
  import Artist from '../../../../components/Artist.svelte'
  import { fade, fly, slide } from 'svelte/transition'
  import FlyBox from '../../../../components/FlyBox.svelte'
  import Button from '../../../../components/Button.svelte'
  import TrackPlayer from '../../../../components/TrackPlayer.svelte'

  interface Artist {
    title: string
    genre: string
    description: string
    releaseDate: string
  }

  let newTrack: any = {}

  let artistObj = { artistName: 'Martin garrix', royaltyPercentage: 51 }
  let artistsArray = [artistObj, artistObj]

  let artistSearch = { artistName: '', hover: false }

  const removeArtist = (removeArtistIndex: number) => {
    console.log(removeArtistIndex)
    artistsArray.splice(removeArtistIndex + 1, 1)
    console.log(artistsArray)
  }
  let royaltyPercentageTotal: number = 0

  const calcRoyaltyPercentageTotal = () => {
    let royaltyPercentage: number = 0
    for (let artist of artistsArray) {
      royaltyPercentage += +artist.royaltyPercentage
    }
    return royaltyPercentage
  }

  let uploadPageStatus = parseInt(localStorage.getItem('uploadPageStatus')) ?? 1

  const setUploadPageStatus = (i: number) => {
    uploadPageStatus = i
    localStorage.setItem('uploadPageStatus', uploadPageStatus.toString())
  }

  $: {
    calcRoyaltyPercentageTotal()
  }
</script>

<Box>
  <div class="z-10 absolute -top-4 left-12 flex space-x-2">
    <div
      class="cursor-pointer bg-white text-xs h-8 w-8 flex grid-flow-col rounded-md shadow-sm justify-center items-center text-gray-400 "
      on:click={() => {
        uploadPageStatus > 1 ? uploadPageStatus-- : () => {}
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
    </div>
    {#each [1, 2, 3, 4] as i}
      <div
        class={`border-2 border-opacity-0 transition-all  ${
          uploadPageStatus == i
            ? ' border-opacity-100 border-gray-300 font-semibold'
            : ' shadow-sm '
        } cursor-pointer bg-white text-xs h-8 w-8 rounded-md flex justify-center items-center text-gray-400  `}
        on:click={() => {
          setUploadPageStatus(i)
        }}
      >
        {i}
      </div>{/each}
    <div
      class="cursor-pointer bg-white text-xs h-8 pl-4 pr-3 grid gap-1 grid-flow-col rounded-md shadow-sm justify-center items-center text-gray-400 "
      on:click={() => {
        uploadPageStatus < 4 ? uploadPageStatus++ : () => {}
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
    </div>
  </div>
  <Title>Submit a new track</Title>

  <div class="">
    {#if uploadPageStatus == 1}
      <FlyBox>
        <SubTitle>📝 Information about your track</SubTitle>

        <div class="grid lg:grid-cols-2 gap-4">
          <label class="portal"
            >Create a title<input
              bind:value={newTrack.title}
              class="input portal"
              placeholder="Password.."
            /></label
          >
          <div class="grid grid-cols-2 gap-4">
            <label class="portal"
              >Pick a genre
              <select
                bind:value={newTrack.genre}
                class="input portal"
                placeholder="For example: Future House, Bass House"
                ><option>Future House</option><option>Bass House</option><option
                  >Pop House</option
                ></select
              >
            </label>
            <label class="portal"
              >Preferred release date<input
                bind:value={newTrack.releasedate}
                type="date"
                class="input portal"
                placeholder="For example: August 8th, 2021"
              /></label
            >
          </div>
          <label class="portal"
            >Describe your track<textarea
              bind:value={newTrack.description}
              rows="5"
              class="input portal"
              placeholder="This track is about.. It was created in .. The main theme of the track is.."
            /></label
          >
          <label class="portal"
            >Lyrics of your track<textarea
              bind:value={newTrack.lyrics}
              rows="5"
              class="input portal"
              placeholder="For example: “I’m in love with the shape of you..“"
            /></label
          >
        </div>
        <div class="flex justify-end">
          <Button
            color="bg-teal-700"
            size="sm"
            onClick={() => setUploadPageStatus(2)}>Next</Button
          >
        </div>
      </FlyBox>
    {/if}
    {#if uploadPageStatus == 2}
      <FlyBox>
        <SubTitle>👨🏼‍🎨 Artists</SubTitle>
        <div class="grid gap-4">
          <div class="grid lg:grid-cols-2 gap-4">
            <div
              class="relative"
              on:mouseenter={() => (artistSearch.hover = true)}
              on:mouseleave={() => (artistSearch.hover = false)}
            >
              <label class="portal"
                >Search collaborator<input
                  bind:value={artistSearch.artistName}
                  class="input portal"
                  placeholder="Search by name.."
                /></label
              >
              {#if artistSearch.hover}
                <div
                  in:fly={{ y: 25, opacity: 0 }}
                  out:fade={{ duration: 200 }}
                  class="absolute left-0 right-0 w-full z-10 "
                >
                  <div
                    class=" mt-2 mshadow-md p-4  bg-white rounded-sm grid gap-2"
                  >
                    <p class="text-xs font-semibold ">Select artist</p>
                    {#if artistSearch.artistName.length > 0}
                      <div class="grid gap-2 grid-cols-3 mt-1">
                        {#each ['artist', 'artist'] as artist}<Artist
                            onClick={() => {
                              artistsArray = [
                                ...artistsArray,
                                { artistName: 'ghaha', royaltyPercentage: 100 },
                              ]
                            }}>{artist}</Artist
                          >
                        {/each}
                      </div>
                    {:else}
                      <p class="text-sm animate-pulse	">Loading artists..</p>
                    {/if}
                  </div>
                </div>
              {/if}
            </div>
            <div class="grid gap-4">
              {#if artistsArray.length > 0}
                <div
                  class="label portal grid grid-cols-2 gap-2 -mb-1 items-center"
                  style="grid-template-columns:1fr 5rem"
                  transition:fade
                >
                  <p class="">Artist(s)</p>
                  <p class="font-semibold text-right">Royalties</p>
                </div>

                {#if calcRoyaltyPercentageTotal() != 100}
                  <SubTitle theme="error"
                    >Total of royalty % should be equal to 100</SubTitle
                  >
                {/if}
              {/if}
              {#each artistsArray as artist, index}
                <div
                  class="grid grid-cols-2 gap-2 text-sm items-center"
                  style="grid-template-columns:1fr 5rem"
                  transition:fade
                >
                  <Artist
                    size="md"
                    remove={() => {
                      removeArtist(index)
                    }}>{artist.artistName}</Artist
                  >
                  <div class="relative flex items-center justify-end group">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      class="input portal pr-5 m-0 bg-gray-100 rounded-sm "
                      value={artist.royaltyPercentage}
                    />
                    <svg
                      class="absolute mr-3 group-hover:text-blue-800 peer-focus:text-blue-800 transition-colors"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="19" y1="5" x2="5" y2="19" />
                      <circle cx="6.5" cy="6.5" r="2.5" />
                      <circle cx="17.5" cy="17.5" r="2.5" />
                    </svg>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <Button
            color="bg-teal-700"
            size="sm"
            onClick={() => setUploadPageStatus(3)}>Next</Button
          >
        </div>
      </FlyBox>
    {/if}
    {#if uploadPageStatus == 3}
      <FlyBox>
        <div class="flex space-x-8">
          <!-- <figure /> -->
          <div
            class="bg-gray-200 rounded-sm w-64  my-2 flex items-center justify-center"
          >
            <svg
              class="text-teal-700 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <div class="grid gap-4 w-full">
            <SubTitle>🖼 Artwork</SubTitle>
            <label class="portal"
              >Designer of the artwork<input
                bind:value={newTrack.artworkDesigner}
                class="input portal"
                placeholder="For example: August 8th, 2021"
              /></label
            >
            <label class="portal"
              >Upload Artwork<input
                bind:value={newTrack.artwork}
                class="input portal"
                placeholder="Click to upload or drag your artwork here.."
              /></label
            >
          </div>
        </div>
      </FlyBox>
    {/if}
    {#if uploadPageStatus == 4}
      <FlyBox>
        <TrackPlayer
          imgSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.sndcdn.com%2Fartworks-000454520877-chf2n6-t500x500.jpg&f=1&nofb=1"
        />
        <SubTitle>💽 Upload track</SubTitle>

        <div class="grid gap-4 grid-cols-3">
          <label class="portal col-span-2"
            >Upload track<input
              bind:value={newTrack.releasedate}
              class="input portal"
              placeholder="Click to upload or drag your track here.."
            /></label
          >
          <div class="label portal opacity-40">
            Preview part
            <div
              class="input portal grid gap-4 p-2 grid-flow-col grid-cols-3 w-full justify-center items-center"
              style="grid-template-columns: 1fr min-content 1fr"
            >
              <input
                type="number"
                class="p-1 bg-gray-100 text-center w-16"
                value="00"
                disabled={true}
              />
              <div class="w-px rounded-sm h-full bg-gray-200" />
              <input
                type="number"
                class="p-1 bg-gray-100 text-center w-16"
                value="00"
                disabled={false}
              />
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <Button color="bg-teal-700" size="md">Submit track</Button>
        </div>
      </FlyBox>
    {/if}
  </div>
</Box>
