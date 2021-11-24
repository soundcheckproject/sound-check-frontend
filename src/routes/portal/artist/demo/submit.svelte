<script lang="ts">
  import type { GenreType } from '../../../../types/Genre.type'
  import type { TrackType } from '../../../../types/Track.type'
  import type { ArtistType } from '../../../../types/User.type'

  import {
    getGenres,
    getArtistsByNickName,
    createTrack,
  } from '../../../../utils/useGraphQL'
  //Todo: Royaltie percentage calc

  import Title from '../../../../components/Title.svelte'
  import SubTitle from '../../../../components/SubTitle.svelte'
  import Box from '../../../../components/Box.svelte'
  import Artist from '../../../../components/Artist.svelte'
  import { fade, fly } from 'svelte/transition'
  import FlyBox from '../../../../components/FlyBox.svelte'
  import Button from '../../../../components/Button.svelte'
  import TrackPlayer from '../../../../components/TrackPlayer.svelte'
  import Input from '../../../../components/Input.svelte'

  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { uploadTrack } from '../../../../utils/useRest'
  import ButtonBox from '../../../../components/ButtonBox.svelte'
  import userStore from '../../../../stores/userStore'
  import FadeBox from '../../../../components/portal/FadeBox.svelte'

  let artistSearch = { nickName: '', hover: false }

  let newTrack: TrackType = {
    title: 'Miss you so feat. Jebroer',
    description: 'Niels his new hit song',
    previewStart: 20,
    previewStop: 35,
    lyrics: 'I hate to admit it',
    artistIds: [$userStore.uuid],
    genreId: '6ef2aded-c280-40bf-8e4c-e4b6f38b72d2',
    prefferdReleaseDate: '2022-01-01',
    artwork: {
      designer: 'nielsonderbeke2',
    },
  }
  let user = $userStore
  user.royaltyPercentage = 100
  let artistsArray = [user]

  const removeArtist = (uuid: string) => {
    artistsArray = artistsArray.filter(artist => artist.uuid != uuid)
    newTrack.artistIds = newTrack.artistIds.filter(id => id != uuid)
  }

  let artworkBlob: any = '',
    artworkPreview: any = '',
    trackPreview: any = ''

  let trackDataClick: HTMLInputElement
  let trackData: any = { info: {}, blob: {} }

  let royaltyPercentageTotal: number = 0
  const calcRoyaltyPercentageTotal = () => {
    royaltyPercentageTotal = 0
    for (let artist of artistsArray) {
      royaltyPercentageTotal += artist.royaltyPercentage
    }
  }

  let uploadPageStatus = parseInt(localStorage.getItem('uploadPageStatus')) ?? 1

  const setUploadPageStatus = (i: number) => {
    uploadPageStatus = i
    localStorage.setItem('uploadPageStatus', uploadPageStatus.toString())
  }

  const previewArtwork = (e: any) => {
    let image = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = e => {
      artworkPreview = e.target.result
    }
  }
  const previewTrack = (e: any) => {
    let track = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(track)
    reader.onload = e => {
      trackPreview = e.target.result
    }
  }

  const postTrack = async () => {
    newTrack.prefferdReleaseDate = new Date(newTrack.prefferdReleaseDate)
    console.log(newTrack)

    await createTrack(newTrack)
      .then(async resCreateTrack => {
        console.log(resCreateTrack)
        const uploadName = trackData.blob[0].name
        const fileName =
          newTrack.title
            .replace(/ /g, '')
            .replace(/[^a-zA-Z ]/g, '')
            .toLowerCase() +
          '.' +
          uploadName
            .substring(uploadName.lastIndexOf('.') + 1, uploadName.length)
            .split('.')
            .pop()
        await uploadTrack(trackData.blob[0], fileName, resCreateTrack.uuid)
          .then(res => {
            console.log(res)
            goto('/portal/artist/demo/' + resCreateTrack.uuid)
          })
          .catch(error => console.log(error))
      })
      .catch(error => {
        console.log(error)
      })
  }

  let genres: GenreType[] = []

  let artists: ArtistType[] = []

  const searchArtistByNickName = async () => {
    if (artistSearch.nickName.length > 0) {
      artists = await getArtistsByNickName(artistSearch.nickName)
      artists = artists.filter(artist => artist.uuid !== artistsArray[0].uuid)
    }
  }

  onMount(async () => {
    genres = await getGenres()
  })

  $: {
    // console.log(artistSearch)
    console.log(newTrack)
  }
</script>

<div class="grid gap-8">
  <FadeBox>
    <div class="flex space-x-2">
      <ButtonBox
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
      </ButtonBox>

      {#each [1, 2, 3, 4] as i}
        <ButtonBox
          active={uploadPageStatus == i ? true : false}
          on:click={() => {
            setUploadPageStatus(i)
          }}
        >
          {i}
        </ButtonBox>{/each}
      {#if uploadPageStatus != 4}
        <ButtonBox
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
        </ButtonBox>
      {/if}
    </div>
  </FadeBox>
  <Box>
    <div class="z-10 absolute -top-4 left-12 flex space-x-2" />
    <Title>Submit a new track</Title>

    <form class="" enctype="multipart/form-data">
      {#if uploadPageStatus == 1}
        <FlyBox>
          <SubTitle>📝 Information about your track</SubTitle>

          <div class="grid lg:grid-cols-2 gap-4">
            <!-- <label class="portal"
            >Create a title<input
              bind:value={newTrack.title}
              class="input portal"
              placeholder="Full track title.. For example: Mave & Alex Silves - Memories"
            /></label
          > -->
            <Input
              title="Create a title"
              placeholder="Full track title.. For example: Mave & Alex Silves - Memories"
              bind:value={newTrack.title}
            />

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
                  class="input portal text-red-300"
                  placeholder="For example: Future House, Bass House"
                >
                  <option selected disabled>Pick a genre</option>
                  {#each genres as genre}
                    <option value={genre.uuid}>{genre.name}</option>
                  {/each}</select
                >
              </label>
              <!-- <label class="portal"
              >Preferred release date<input
                bind:value={newTrack.prefferdReleaseDate}
                type="date"
                class="input portal"
                placeholder="For example: August 8th, 2021"
              /></label
            > -->
              <Input
                type="date"
                title="Preferred release date"
                placeholder="For example: August 8th, 2021"
                bind:value={newTrack.prefferdReleaseDate}
              />
            </div>
            <Input
              textarea
              rows="5"
              title="Describe your track"
              placeholder="This track is about.. It was created in .. The main theme of the track is.."
              bind:value={newTrack.description}
            />

            <Input
              textarea
              rows="5"
              title="Lyrics of your track"
              placeholder="For example: “I’m in love with the shape of you..“"
              bind:value={newTrack.lyrics}
            />
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
                    bind:value={artistSearch.nickName}
                    on:input={() => searchArtistByNickName()}
                    on:blur={() => searchArtistByNickName()}
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
                      class=" mt-2 mshadow-md p-4 bg-white rounded-sm grid gap-2"
                    >
                      <p class="text-xs font-semibold ">Select artist</p>
                      {#if artistSearch.nickName.length > 0}
                        <div class="grid gap-2 grid-cols-2 lg:grid-cols-3 mt-1">
                          {#if artists.length == 0}
                            <p class="text-sm animate-pulse	">
                              No artists found..
                            </p>{:else}
                            {#each artists as artist}<Artist
                                {artist}
                                onClick={() => {
                                  artist.royaltyPercentage = 0

                                  artistsArray = [...artistsArray, artist]
                                  newTrack.artistIds = [
                                    ...newTrack.artistIds,
                                    artist.uuid,
                                  ]
                                }}>{artist.nickName}</Artist
                              >
                            {/each}
                          {/if}
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
                    class="label portal grid  gap-2 -mb-1 items-center grid-cols-1fr-auto"
                    transition:fade
                  >
                    <p class="">Artist(s)</p>
                    <p class="font-semibold text-right ">
                      Royalties {royaltyPercentageTotal}%
                    </p>
                  </div>

                  {#if royaltyPercentageTotal != 100 && false}
                    <SubTitle theme="error"
                      >Total royalties should be equal to 100</SubTitle
                    >
                  {/if}
                {:else}<div class="label portal grid  gap-2 " transition:fade>
                    <p class="">Add a collaborator</p>
                  </div>{/if}
                {#each artistsArray as artist}
                  <div
                    class="grid gap-2 text-sm items-center grid-cols-1fr-auto"
                    transition:fade
                  >
                    <Artist
                      {artist}
                      size="md"
                      remove={() => {
                        removeArtist(artist.uuid)
                      }}>{artist.nickName}</Artist
                    >
                    <div class="relative flex items-center justify-end group">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        class="input portal pr-5 m-0 bg-gray-100 rounded-sm "
                        bind:value={artist.royaltyPercentage}
                        on:input={() => {
                          calcRoyaltyPercentageTotal()
                        }}
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
          <div class="grid gap-8 lg:grid-cols-min-auto ">
            <!-- <figure /> -->
            <div
              class="input portal bg-gray-100 rounded-md  h-56 lg:w-52 lg:h-52 flex items-center justify-center cursor-pointer"
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

              <Input
                title="Artwork designer"
                placeholder="For example: Picasso"
                bind:value={newTrack.artwork.designer}
              />
              <div class="label portal">
                Upload Artwork
                <div
                  class="input portal w-full justify-center items-center cursor-pointer flex space-x-2"
                  on:click={() => artworkBlob.click()}
                >
                  <svg
                    class="-mt-px"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <p>Click to upload or drag your artwork here..</p>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    bind:this={artworkBlob}
                    on:change={e => previewArtwork(e)}
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
                on:change={e => previewArtwork(e)}
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
            <TrackPlayer
              track={newTrack}
              artworkSrc={artworkPreview}
              audioFile={trackPreview}
            />
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
                  on:change={e => previewTrack(e)}
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
            <Button color="bg-teal-700" onClick={postTrack} size="md"
              >Submit track</Button
            >
          </div>
        </FlyBox>
      {/if}
    </form>
  </Box>
</div>
