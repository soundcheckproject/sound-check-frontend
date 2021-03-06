<script lang="ts">
  import type { GenreType } from '../../../../types/Genre.type'
  import type { TrackInputType } from '../../../../types/Track.type'
  import type { ArtistType } from '../../../../types/User.type'

  import {
    getGenres,
    getArtistsByNickName,
    createTrack,
  } from '../../../../utils/useGraphQL'

  import Title from '../../../../components/Title.svelte'
  import SubTitle from '../../../../components/SubTitle.svelte'
  import Box from '../../../../components/Box.svelte'
  import Artist from '../../../../components/Artist.svelte'
  import { fade, fly } from 'svelte/transition'
  import FlyBox from '../../../../components/FlyBox.svelte'
  import Button from '../../../../components/Button.svelte'
  import TrackPlayer from '../../../../components/TrackPlayer.svelte'
  import Input from '../../../../components/Input.svelte'
  import Error from '../../../../components/Error.svelte'

  import { onDestroy, onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { uploadArtwork, uploadTrack } from '../../../../utils/useRest'
  import ButtonBox from '../../../../components/ButtonBox.svelte'
  import userStore from '../../../../stores/userStore'
  import FadeBox from '../../../../components/portal/FadeBox.svelte'
  import {
    validateEmpty,
    validateEqualityNumbers,
    validateErrors,
    validateErrorTime,
    validateStartLower,
  } from '../../../../utils/useValidation'
  import validationStore from '../../../../stores/validationStore'
  import InputError from '../../../../components/InputError.svelte'
  import { formatDateToDDMMJJJJ } from '../../../../utils/useFormat'
  import variables from '../../../../utils/variables'
  import log, { LogType } from '../../../../utils/logger'

  const inputFields: string[] = ['title', 'genreId']

  let artistSearch = { nickName: '', hover: false }

  let prefferedReleaseDateString: string = formatDateToDDMMJJJJ(new Date())

  let newTrack: TrackInputType = {
    title: '',
    description: '',
    previewStart: 0,
    previewStop: 10,
    lyrics: '',
    artistTracks: [],
    genreId: 'Pick a genre',
    labelId: variables.labelId as string,
    prefferdReleaseDate: undefined,
    artwork: {
      designer: '',
    },
  }
  let user = $userStore
  user.royaltyPercentage = 100
  let artistsArray = [user]

  const removeArtist = (uuid: string) => {
    artistsArray = artistsArray.filter(artist => artist.uuid != uuid)
    newTrack.artistTracks = newTrack.artistTracks.filter(x => x.userId != uuid)
  }

  let loadingStatus: { [key: string]: boolean } = {
    submit: false,
  }

  let artworkBlob: any = '',
    artworkBase64String: any = '',
    trackBase64String: any = '',
    artworkClick: HTMLInputElement,
    trackDataClick: HTMLInputElement,
    trackBlob: any,
    royaltyPercentageTotal: number = 100,
    track: File,
    artwork: File

  const calcRoyaltyPercentageTotal = () => {
    royaltyPercentageTotal = 0
    for (let artist of artistsArray) {
      royaltyPercentageTotal += artist.royaltyPercentage
    }
  }

  const setUploadPageStatus = (i: number) => {
    uploadPageStatus = i
    localStorage.setItem('uploadPageStatus', uploadPageStatus.toString())
  }

  // ! initial
  let uploadPageStatus = 1

  const previewArtwork = (e: any) => {
    artwork = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(artwork)
    reader.onload = e => {
      artworkBase64String = e.target.result
    }
  }
  const previewTrack = (e: any) => {
    track = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(track)

    reader.onload = e => {
      trackBase64String = e.target.result
    }
  }

  const postTrack = async (): Promise<string> => {
    loadingStatus.submit = true
    newTrack.prefferdReleaseDate = new Date(prefferedReleaseDateString)

    artistsArray.map(a => {
      newTrack.artistTracks.push({
        userId: a.uuid,
        royaltySplit: a.royaltyPercentage,
      })
    })

    if ($validationStore.length === 0) {
      // Create track in database
      try {
        const { uuid } = await createTrack(newTrack)
        return uuid
      } catch (error) {
        // console.error('Could not post track data to gql api', error)
      }
    }
  }

  let errors: string[] = []
  const checkValidation = (type: string) => {
    if (type === 'previewpart') {
      errors = validateErrors(
        [
          validateStartLower(newTrack.previewStart, newTrack.previewStop),
          validateEqualityNumbers(newTrack.previewStart, newTrack.previewStop),
        ],
        type,
        errors,
      )
    } else {
      for (const errorType of inputFields) {
        if (errorType == type)
          errors = validateErrors([validateEmpty(newTrack[type])], type, errors)
      }
    }
  }

  const checkAllInputs = async () => {
    return new Promise(resolve => {
      inputFields.map((field: string) => {
        checkValidation(field)
      })
      resolve(true)
    })
  }

  const handleSubmit = async () => {
    if (await checkAllInputs()) {
      if ($validationStore.length === 0)
        try {
          const trackId: string = await postTrack()

          if (trackBlob) await uploadTrack(trackBlob[0], track.name, trackId)
          if (artworkBlob)
            await uploadArtwork(artworkBlob[0], artwork.name, trackId)
          goto(`/portal/artist/demo/${trackId}`)
        } catch (error) {
          log(
            LogType.ERROR,
            'handleSubmitTrack',
            'Something went wrong while processing submit of track',
            true,
          )
          validateErrorTime('general', 'submit', errors)
        } finally {
          loadingStatus.submit = false
        }
      else {
        validateErrorTime('general', 'errors', errors)
      }
    }
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
    const pageStatus: string | undefined =
      localStorage.getItem('uploadPageStatus')
    if (localStorage.getItem('uploadPageStatus')) {
      setUploadPageStatus(parseInt(pageStatus))
    } else {
      setUploadPageStatus(1)
    }

    genres = await getGenres()
    if (genres) {
      newTrack.genreId = genres[0].uuid
    }
  })

  onDestroy(() => {
    setUploadPageStatus(1)
  })

  $: {
    validationStore.set(errors)
  }
</script>

<svelte:head>
  <title>Submit new track</title>
</svelte:head>

<div class="grid gap-8">
  <FadeBox>
    <div class="flex space-x-2">
      {#if uploadPageStatus > 1}
        <ButtonBox
          on:click={() => {
            uploadPageStatus > 1 && setUploadPageStatus(uploadPageStatus - 1)
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
      {/if}
      {#each [1, 2, 3, 4] as i}
        <ButtonBox
          active={uploadPageStatus == i ? true : false}
          on:click={() => {
            setUploadPageStatus(i)
          }}
        >
          {i}
        </ButtonBox>{/each}
      {#if uploadPageStatus < 4}
        <ButtonBox
          on:click={() => {
            uploadPageStatus < 4 && setUploadPageStatus(uploadPageStatus + 1)
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
    <InputError errorInput="general" />
    <!-- <form class="" enctype="multipart/form-data"> -->
    {#if uploadPageStatus === 1}
      <FlyBox>
        <InputError errorInput="connection" />
        <SubTitle>📝 Information about your track</SubTitle>
        <div class="grid lg:grid-cols-2 gap-4">
          <Input
            required
            bind:value={newTrack.title}
            title="Create a title"
            errorInput="title"
            on:input={() => {
              checkValidation('title')
            }}
            placeholder="Full track title.. e.g. Mave & Alex Silves - Memories"
          />

          <div class="grid md:grid-cols-2 gap-4">
            <label class="portal"
              >Pick a genre *
              <select
                bind:value={newTrack.genreId}
                class="input portal text-red-300"
                placeholder="e.g. Future House, Bass House"
              >
                <option disabled selected>Pick a genre</option>
                {#each genres as genre}
                  <option value={genre.uuid}>{genre.name}</option>
                {/each}</select
              >
            </label>
            <Input
              errorInput="date"
              bind:value={prefferedReleaseDateString}
              type="date"
              title="Preferred release date"
            />
          </div>
          <Input
            errorInput="description"
            bind:value={newTrack.description}
            on:input={() => {
              checkValidation('description')
            }}
            textarea
            rows="5"
            title="Describe your track"
            placeholder="e.g. “This track is about...“"
          />

          <Input
            errorInput="lyrics"
            bind:value={newTrack.lyrics}
            on:input={() => {
              checkValidation('lyrics')
            }}
            textarea
            rows="5"
            title="Lyrics of your track"
            placeholder="e.g. “I’m in love with the shape of you...“"
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
                  placeholder="Search by nickname..."
                /></label
              >
              {#if artistSearch.hover}
                <div
                  in:fly|local={{ y: 25, opacity: 0 }}
                  out:fade|local={{ duration: 200 }}
                  class="absolute left-0 right-0 w-full z-10 "
                >
                  <div
                    class=" mt-2 mshadow-md p-4 bg-white rounded-sm grid gap-2"
                  >
                    <p class="text-xs font-semibold ">Select artist</p>
                    {#if artistSearch.nickName.length > 0}
                      <div class="grid gap-2 grid-cols-2 lg:grid-cols-3 mt-1">
                        {#if artists.length == 0}
                          <p class="text-sm animate-pulse	lg:col-span-3">
                            No artists found..
                          </p>{:else}
                          {#each artists as artist}<Artist
                              {artist}
                              onClick={() => {
                                artist.royaltyPercentage = 0
                                artistsArray = [...artistsArray, artist]
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
                  transition:fade|local
                >
                  <p class="">Artist(s)</p>
                  <p class="font-semibold text-right ">
                    Royalties {royaltyPercentageTotal}%
                  </p>
                </div>
              {:else}<div class="label portal grid  gap-2 " transition:fade>
                  <p class="">Add a collaborator</p>
                </div>{/if}
              {#each artistsArray as artist, i}
                <div
                  class="grid gap-2 text-sm items-center grid-cols-1fr-auto"
                  transition:fade|local
                >
                  {#if i === 0}
                    <Artist {artist} size="md">{artist.nickName}</Artist>
                  {:else}
                    <Artist
                      {artist}
                      size="md"
                      remove={() => {
                        removeArtist(artist.uuid)
                      }}>{artist.nickName}</Artist
                    >
                  {/if}

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
              {#if royaltyPercentageTotal != 100}
                <Error>Total royalties should be equal to 100</Error>
              {/if}
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
        <div class="grid gap-8 sm:grid-cols-min-auto ">
          <!-- <figure /> -->
          <div
            class="bg-gray-100 rounded-md m-auto w-64 h-64 sm:w-52 sm:h-52 flex items-center justify-center cursor-pointer {artworkBase64String.length >
            0
              ? 'mshadow-sm '
              : ''}"
            style={artworkBase64String.length > 0
              ? `background:url('${artworkBase64String}') center center;background-size:cover`
              : ''}
            on:click={() => artworkClick.click()}
          >
            {#if artworkBase64String.length <= 0}
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
              placeholder="e.g. Picasso"
              bind:value={newTrack.artwork.designer}
            />
            <div class="label portal">
              Upload Artwork
              <button
                class="input portal w-full justify-center items-center cursor-pointer flex space-x-2 focus-ring"
                on:click={() => artworkClick.click()}
              >
                {#if artworkBlob}
                  <p class="text-teal-700 font-medium">
                    {artwork ? artwork.name : ''} has been selected.
                  </p>
                {:else}
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
                  <p>Click to upload your artwork here...</p>
                {/if}
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  bind:this={artworkClick}
                  bind:files={artworkBlob}
                  on:change={e => previewArtwork(e)}
                  class="hidden"
                  placeholder=""
                />
              </button>
            </div>
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
        {#if trackBase64String}
          <TrackPlayer
            track={newTrack}
            artworkFile={artworkBase64String}
            audio={trackBase64String}
          />
        {/if}
        <SubTitle>💽 Upload track</SubTitle>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="label portal">
            Upload track
            <button
              class="input portal w-full justify-center items-center cursor-pointer flex space-x-2 h-[3.25rem] focus-ring"
              on:click={() => trackDataClick.click()}
            >
              {#if trackBlob}
                <p class="text-teal-700 font-medium">
                  {track ? track.name : ''} has been selected.
                </p>
              {:else}
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
                <p>Click to upload your track here...</p>
              {/if}
              <input
                required
                type="file"
                accept=".wav,.mp3,.flac"
                bind:this={trackDataClick}
                bind:files={trackBlob}
                on:change={e => previewTrack(e)}
                class="hidden"
                placeholder=""
              />
            </button>
          </div>
          <div
            class="label portal {trackBase64String
              ? 'opacity-100'
              : 'opacity-40'}"
          >
            Preview part *
            <div class="grid gap-4 ">
              <div
                class="input portal grid grid-cols-3 justify-around items-center"
                style="grid-template-colums:1fr min-content 1fr"
              >
                <input
                  type="number"
                  class="p-1 bg-white/0 text-center w-16 mx-auto"
                  bind:value={newTrack.previewStart}
                  on:input={() => checkValidation('previewpart')}
                  min="0"
                  disabled={trackBase64String ? false : true}
                />
                <div class="w-1 rounded-sm h-full bg-gray-200 mx-auto" />
                <input
                  type="number"
                  class="p-1 bg-white/0 text-center w-16 mx-auto"
                  bind:value={newTrack.previewStop}
                  on:input={() => checkValidation('previewpart')}
                  min="30"
                  disabled={trackBase64String ? false : true}
                />
              </div>
              <InputError errorInput="previewpart" />
            </div>
          </div>
        </div>
        <p class="text-sm text-gray-400">
          * Preview part is the part that will be heard first by the label team.
        </p>
        <div class="flex justify-end">
          <Button
            loading={loadingStatus.submit ? 'Submitting track...' : null}
            color="bg-teal-700"
            onClick={handleSubmit}
            size="md">Submit track</Button
          >
        </div>
      </FlyBox>
    {/if}
    <!-- </form> -->
  </Box>
</div>
