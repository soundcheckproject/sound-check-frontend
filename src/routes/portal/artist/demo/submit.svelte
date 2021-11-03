<script lang="ts">
  import type { GenreType } from '../../../../types/Genre.type'
  import { getGenres, getGenres } from '../../../../utils/useGraphQL'
  //Todo: Royaltie percentage calc

  import Title from '../../../../components/Title.svelte'
  import SubTitle from '../../../../components/SubTitle.svelte'
  import Track from '../../../../components/Track.svelte'
  import Box from '../../../../components/Box.svelte'
  import Artist from '../../../../components/Artist.svelte'
  import { fade, fly, slide } from 'svelte/transition'
  import FlyBox from '../../../../components/FlyBox.svelte'
  import Button from '../../../../components/Button.svelte'
  import TrackPlayer from '../../../../components/TrackPlayer.svelte'

  import type { TrackType } from '../../../../types/Track.type'
  import { onMount } from 'svelte'

  interface ArtistType {
    artistName: string
    royaltyPercentage: number
  }

  let artistObj: ArtistType = {
    artistName: 'Martin garrix',
    royaltyPercentage: 51,
  }
  let artistsArray = [artistObj, artistObj]

  let artistSearch = { artistName: '', hover: false }

  let newTrack: TrackType = {
    title: '',
    description: '',
    lyrics: '',
    genreId: '',
    prefferdReleaseDate: '',
    artistIds: [''],
    previewStart: 0,
    previewStop: 30,
    artworkDesigner: '',
  }

  let artworkBlob: any = '',
    trackBlob: any = '',
    artworkPreview: any = '',
    trackPreview: any = ''

  let trackDataClick
  let trackData: any = { info: {}, blob: {} }

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

  const previewImage = (e: any) => {
    let image = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = e => {
      artworkPreview = e.target.result
    }
  }
  const uploadTrack = (e: any) => {
    let track = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(track)
    reader.onload = e => {
      trackPreview = e.target.result
      console.log(trackPreview)
    }
    // trackData.info = reader
    // trackPreview = reader.result.toString()
  }

  const postTrack = () => {
    const dataTrack = new FormData()
  }

  let genres: GenreType[] = []

  let getGenresGraphql = () => {
    getGenres().then(res => {
      console.log(res)
      return res
    })
  }
  console.log(getGenresGraphql())

  //   let genres: GenreType[] = [
  //     { uuid: 'kmkfza', name: 'faze', description: 'zejm' },
  //   ]
  $: {
    // royaltyPercentageTotal = calcRoyaltyPercentageTotal()
    // console.log(newTrack)
    // console.log(artworkBlob)
    // console.log(trackBlob)
    // console.log(artworkPreview)
    // console.log(trackData)
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

    {#each [1, 2, 3, 4] as index, i}
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
    {#if uploadPageStatus != 4}
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
    {/if}
  </div>
  <Title>Submit a new track</Title>

  <form on:submit={postTrack} class="">
    {#if uploadPageStatus == 1}
      <FlyBox>
        <SubTitle>📝 Information about your track</SubTitle>

        <div class="grid lg:grid-cols-2 gap-4">
          <label class="portal"
            >Create a title<input
              bind:value={newTrack.title}
              class="input portal"
              placeholder="Full track title.. For example: Mave & Alex Silves - Memories"
            /></label
          >
          <div class="grid grid-cols-2 gap-4">
            <label class="portal"
              >Pick a genre
              <!-- <select
                bind:value={newTrack.genreId}
                class="input portal"
                placeholder="For example: Future House, Bass House"
              >
                {#each ['Future House', 'Bass House', 'Pop House', 'Dubstep'] as genre, index}
                  <option value={genre}>{genre}</option>
                {/each}</select
              > -->
              <select
                bind:value={newTrack.genreId}
                class="input portal"
                placeholder="For example: Future House, Bass House"
              >
                {#each genres as genre, index}
                  <option value={genre.uuid}>{genre.name}</option>
                {/each}</select
              >
            </label>
            <label class="portal"
              >Preferred release date<input
                bind:value={newTrack.prefferdReleaseDate}
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
                  <p class="font-semibold text-right ">
                    Royalties {calcRoyaltyPercentageTotal()}
                  </p>
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
        <div class="grid gap-8 " style="grid-template-columns:min-content auto">
          <!-- <figure /> -->
          <div
            class="input portal bg-gray-100 rounded-md w-52 h-52 flex items-center justify-center cursor-pointer"
            style={artworkPreview.length > 0
              ? `background:url('${artworkPreview}') center center;background-size:cover`
              : ''}
            on:click={() => artworkBlob.click()}
          >
            {#if artworkPreview.length <= 0}
              <svg
                class="text-teal-700 opacity-90"
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
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            {/if}
          </div>
          <div class="grid gap-4 ">
            <SubTitle>🖼 Artwork</SubTitle>
            <label class="portal"
              >Designer of the artwork<input
                bind:value={newTrack.artworkDesigner}
                class="input portal"
                placeholder="For example: August 8th, 2021"
              /></label
            >
            <div class="label portal">
              Upload Artwork
              <div
                class="input portal w-full justify-center items-center cursor-pointer"
                on:click={() => artworkBlob.click()}
              >
                Click to upload or drag your artwork here..
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  bind:this={artworkBlob}
                  on:change={e => previewImage(e)}
                  class="hidden"
                  placeholder=""
                />
              </div>
            </div>
            <!-- <label class="portal"
              >Upload Artwork<input
                type="file"
                accept=".jpg, .jpeg, .png"
                bind:this={artworkBlob}
                on:change={e => previewImage(e)}
                class="input portal"
                placeholder="Click to upload or drag your artwork here.."
              />
            </label> -->
          </div>
        </div>
        <div class="flex justify-end">
          <Button
            color="bg-teal-700"
            size="sm"
            onClick={() => setUploadPageStatus(4)}>Next</Button
          >
        </div>
      </FlyBox>
    {/if}
    {#if uploadPageStatus == 4}
      <FlyBox>
        {#if trackPreview}
          <TrackPlayer imgSrc={artworkPreview} audioSrc={trackPreview} />
        {/if}
        <SubTitle>💽 Upload track</SubTitle>

        <div class="grid gap-4 grid-cols-2">
          <div class="label portal">
            Upload track
            <div
              class="input portal w-full justify-center items-center cursor-pointer"
              on:click={() => trackDataClick.click()}
            >
              <!-- {trackBlob ?? trackBlob[0].name ?? ''} -->
              Click to upload or drag your track here..
              <input
                type="file"
                bind:this={trackDataClick}
                bind:files={trackData.blob}
                on:change={e => uploadTrack(e)}
                class="hidden"
                placeholder=""
              />
            </div>
          </div>
          <div class="label portal opacity-40">
            Preview part
            <div
              class="input portal grid gap-4 p-2 grid-flow-col grid-cols-3 w-full justify-center items-center"
              style="grid-template-columns: 1fr min-content 1fr"
            >
              <!-- <input
                type=number
                class="p-1 bg-gray-100 text-center w-16"
                value="00"
				bind:value={newTrack.previewStart}
                disabled={true}
              /> -->
              <input
                type="number"
                class="p-1 bg-gray-100 text-center w-16"
                bind:value={newTrack.previewStart}
                min="0"
                disabled={true}
              />
              <div class="w-px rounded-sm h-full bg-gray-200" />
              <input
                type="number"
                class="p-1 bg-gray-100 text-center w-16"
                bind:value={newTrack.previewStop}
                min="30"
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
  </form>
</Box>
