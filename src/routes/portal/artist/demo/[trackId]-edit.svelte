<script lang="ts">
  import type { GenreType } from '../../../../types/Genre.type'
  import type {
    ArtworkType,
    TrackType,
    TrackUpdateType,
  } from '../../../../types/Track.type'
  import type { ArtistType, UserType } from '../../../../types/User.type'

  import {
    getGenres,
    getArtistsByNickName,
    createTrack,
    getTrackById,
    updateTrack,
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
  import { uploadArtwork, uploadTrack } from '../../../../utils/useRest'
  import ButtonBox from '../../../../components/ButtonBox.svelte'
  import userStore from '../../../../stores/userStore'
  import FadeBox from '../../../../components/portal/FadeBox.svelte'
  import {
    validateEmailValid,
    validateEmpty,
    validateEqualityNumbers,
    validateError,
    validateErrors,
    validateErrorTime,
    validateLength,
    validateStartLower,
  } from '../../../../utils/useValidation'
  import validationStore from '../../../../stores/validationStore'
  import InputError from '../../../../components/InputError.svelte'
  import { page } from '$app/stores'
  import { roleStore } from '../../../../stores/stores'
  import { formatDateToDDMMJJJJ } from '../../../../utils/useFormat'
  import ErrorBanner from '../../../../components/error/ErrorBanner.svelte'
  import Skeleton from '../../../../components/Skeleton.svelte'

  let artistSearch = { nickName: '', hover: false }

  let track: TrackType
  let newTrack: TrackType

  let newAudio = {
    previewStart: 0,
    previewStop: 0,
  }

  let prefferedReleaseDateString: string

  let artistsArray: { uuid?: string; user: UserType; royaltySplit: number }[] =
    []

  let artwork: ArtworkType
  let newArtwork: ArtworkType

  let artworkFile: File, trackFile: File

  let loadingStatus: { [key: string]: boolean } = {
    artwork: false,
    trackfile: false,
    track: false,
  }

  const removeArtist = (uuid: string) => {
    let newArtistsArray = []
    for (const artist of artistsArray) {
      if (artist.user.uuid == uuid) {
        newArtistsArray = [...newArtistsArray, artist]
      }
    }
    artistsArray = newArtistsArray
  }

  let artworkBlob: any = '',
    artworkPreview: any = '',
    trackPreview: any = '',
    artworkClick: HTMLInputElement

  let trackDataClick: HTMLInputElement
  let trackData: any = { info: {}, blob: null }

  let royaltySplitotal: number = 0
  const calcRoyaltySplitotal = () => {
    royaltySplitotal = 0
    for (let artist of artistsArray) {
      royaltySplitotal += artist.royaltySplit
    }
    if (royaltySplitotal > 100) {
      errors = validateError('artist', 'royalty_high', false, errors)
    }
  }

  const previewArtwork = (e: any) => {
    artworkFile = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(artworkFile)
    reader.onload = e => {
      artworkPreview = e.target.result
    }
  }
  const previewTrack = (e: any) => {
    trackFile = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(trackFile)
    reader.onload = e => {
      trackPreview = e.target.result
    }
  }

  let inputFields: string[] = ['title', 'description', 'lyrics', 'genreId']

  let errors: string[] = []
  const checkValidation = (type: string = null) => {
    if (type === 'previewpart') {
      console.log(newTrack.previewStart, newTrack.previewStop)
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
        if (errorType === type)
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

  const postTrack = async () => {
    if (await checkAllInputs()) {
      loadingStatus.track = true
      if ($validationStore.length == 0) {
        const updatedTrack: TrackUpdateType = {
          prefferdReleaseDate: new Date(prefferedReleaseDateString),
          title: newTrack.title,
          description: newTrack.description,
          genreId: newTrack.genreId,
          previewStart: newTrack.previewStart,
          previewStop: newTrack.previewStop,
          artistTracks: [],
        }

        artistsArray.map(at => {
          updatedTrack.artistTracks.push({
            uuid: at.uuid,
            userId: at.user.uuid,
            royaltySplit: at.royaltySplit,
          })
        })

        console.log({ updatedTrack })

        await updateTrack(track.uuid, updatedTrack)
          .catch(e => {
            validateErrorTime('connection', 'graphql', errors)
          })
          .finally(() => {
            loadingStatus.track = false
          })
      } else {
        loadingStatus.track = false
        validateErrorTime('general', 'errors', errors)
      }
    } else {
      validateErrorTime('general', 'errors', errors)
    }
  }

  let genres: GenreType[] = []

  let artists: ArtistType[] = []

  const updateArtwork = async () => {
    loadingStatus.artwork = true
    if (artworkBlob) {
      await uploadArtwork(
        artworkBlob[0],
        artworkBlob[0].name,
        track.artwork.uuid,
      )
        .then(res => {
          console.log(res)
          loadingStatus.artwork = false
        })
        .catch(error => {
          loadingStatus.artwork = false
          validateErrorTime('artwork', 'upload', errors)
        })
    } else {
      loadingStatus.artwork = false
      validateErrorTime('artwork', 'empty', errors)
    }
  }

  const updateTrackFile = async () => {
    loadingStatus.trackfile = true
    if (trackData.blob) {
      await uploadTrack(trackData.blob[0], trackData.blob[0].name, track.uuid)
        .then(async res => {
          const updatedPreview = {
            previewStart: newTrack.previewStart,
            previewStop: newTrack.previewStop,
          }
          await updateTrack(track.uuid, updatedPreview)
            .catch(e => {
              validateErrorTime('connection', 'graphql', errors)
            })
            .finally(() => {
              loadingStatus.track = false
            })

          console.log(res)
        })
        .catch(error => {
          loadingStatus.track = false
          validateErrorTime('track', 'upload', errors)
        })
        .finally(() => {
          loadingStatus.trackfile = false
        })
    } else {
      loadingStatus.track = false
      validateErrorTime('track', 'empty', errors)
    }
  }

  onMount(async () => {
    genres = await getGenres()
    if ($page.params.trackId) {
      try {
        track = await getTrackById($page.params.trackId)

        prefferedReleaseDateString = formatDateToDDMMJJJJ(
          new Date(track.prefferdReleaseDate),
        )
        artistsArray = track.artistTracks
        artwork = track.artwork
        newArtwork = artwork
        newTrack = track
        calcRoyaltySplitotal()
      } catch (error) {
        newTrack = null
      }
    }
  })

  $: {
    validationStore.set(errors)
  }
</script>

<svelte:head>
  <title>{`${track ? track.title : ''} - Track edit`}</title>
</svelte:head>

<FadeBox>
  <div class="grid gap-8">
    {#if newTrack}
      <TrackPlayer
        track={newTrack}
        audio={trackPreview ? trackPreview : null}
        artworkFile={artworkPreview ? artworkPreview : null}
        feedback={false}
      />
      {#if newTrack.isSigned == null || ['label-ar', 'label-manager'].includes($roleStore)}
        <Box>
          <Title>Edit track</Title>

          <InputError errorInput="connection" />
          <InputError errorInput="general" />
          <InputError errorInput="update" />

          <SubTitle>📝 Information about your track</SubTitle>

          <form class="grid lg:grid-cols-2 gap-4">
            <Input
              bind:value={newTrack.title}
              title="Create a title"
              errorInput="title"
              on:input={() => {
                checkValidation('title')
              }}
              placeholder="Full track title.. For example: Mave & Alex Silves - Memories"
            />

            <div class="grid grid-cols-2 gap-4">
              <label class="portal"
                >Pick a genre

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

              <Input
                errorInput="date"
                bind:value={prefferedReleaseDateString}
                type="date"
                title="Preferred release date"
                placeholder="For example: August 8th, 2021"
              />
            </div>
            <Input
              bind:value={newTrack.description}
              errorInput="description"
              on:input={() => {
                checkValidation('description')
              }}
              textarea
              rows="5"
              title="Describe your track"
              placeholder="This track is about.. It was created in .. The main theme of the track is.."
            />

            <Input
              bind:value={newTrack.lyrics}
              errorInput="lyrics"
              on:input={() => {
                checkValidation('lyrics')
              }}
              textarea
              rows="5"
              title="Lyrics of your track"
              placeholder="For example: “I’m in love with the shape of you..“"
            />
            <div class="grid gap-4">
              <div class="label portal">
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
                    />
                    <div class="w-1 rounded-sm h-full bg-gray-200 mx-auto" />
                    <input
                      type="number"
                      class="p-1 bg-white/0 text-center w-16 mx-auto"
                      bind:value={newTrack.previewStop}
                      on:input={() => checkValidation('previewpart')}
                      min="30"
                    />
                  </div>
                </div>
              </div>
              <InputError errorInput="previewpart" />
            </div>
            <div />
            <div class="grid gap-4 lg:col-span-2">
              <SubTitle>👨🏼‍🎨 Artists</SubTitle>
              <div class="grid gap-4 ">
                {#if track.isSigned == null || ['label-ar', 'label-manager'].includes($roleStore)}
                  <div class="grid gap-4">
                    <div class="grid gap-4">
                      {#if artistsArray.length > 0}
                        <InputError errorInput="artist" />
                        <div
                          class="label portal grid  gap-2 -mb-1 items-center grid-cols-1fr-auto"
                          transition:fade|local
                        >
                          <p class="">Artist(s)</p>
                          <p class="font-semibold text-right ">
                            Royalties {royaltySplitotal}%
                          </p>
                        </div>

                        {#if royaltySplitotal != 100}
                          <SubTitle theme="error"
                            >Total royalties should be equal to 100</SubTitle
                          >
                        {/if}
                      {:else}<div
                          class="label portal grid  gap-2 "
                          transition:fade|local
                        >
                          <p class="">Add a collaborator</p>
                        </div>{/if}
                      {#each artistsArray as artist}
                        <div
                          class="grid gap-2 text-sm items-center grid-cols-1fr-auto"
                          transition:fade|local
                        >
                          <Artist artist={artist.user} size="md" pointer={false}
                            >{artist.user.nickName}</Artist
                          >
                          <div
                            class="relative flex items-center justify-end group"
                          >
                            <input
                              type="number"
                              min="0"
                              max="100"
                              class="input portal pr-5 m-0 bg-gray-100 rounded-sm "
                              bind:value={artist.royaltySplit}
                              on:input={() => {
                                calcRoyaltySplitotal()
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
                {:else}
                  <p class="text-sm">
                    Artists and royalties percentages cannot be changed if the
                    track has already been signed.
                  </p>
                {/if}
              </div>
            </div>

            <div class="flex justify-end space-x-2 lg:col-span-2">
              <Button
                color="bg-gray-600"
                onClick={() => {
                  goto($page.path)
                }}>Cancel changes</Button
              >
              <Button
                color="bg-teal-700"
                onClick={postTrack}
                size="sm"
                loading={loadingStatus.track ? 'Updating track..' : null}
                >Update track</Button
              >
            </div>
          </form>
        </Box><Box>
          <div class="grid gap-8 lg:grid-cols-2">
            <!-- <figure /> -->

            <form class="grid gap-4 ">
              <SubTitle>🖼 Artwork</SubTitle>

              <Input
                title="Artwork designer"
                placeholder="For example: Picasso"
                bind:value={newArtwork.designer}
              />
              <InputError errorInput="artwork" />
              <div class="label portal">
                Upload Artwork
                <div
                  class="input portal w-full justify-center items-center cursor-pointer flex space-x-2"
                  on:click={() => artworkClick.click()}
                >
                  {#if artworkBlob && artworkFile}
                    <p class="text-teal-700 font-medium">
                      {artworkFile ? artworkFile.name : ''} has been selected.
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
                    <p>Click to upload or drag your artwork here..</p>
                  {/if}
                  <input
                    required={true}
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    bind:this={artworkClick}
                    bind:files={artworkBlob}
                    on:change={e => previewArtwork(e)}
                    class="hidden"
                    placeholder=""
                  />
                </div>
              </div>
              <div class="flex justify-end">
                <Button
                  color="bg-teal-700"
                  size="sm"
                  loading={loadingStatus.artwork ? 'Updating artwork..' : null}
                  onClick={() => {
                    updateArtwork()
                  }}>Update artwork</Button
                >
              </div>
            </form>

            <div class="grid gap-4 ">
              <SubTitle>💽 Upload track</SubTitle>
              <div
                class="label portal {trackData.blob
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
                      disabled={trackData.blob ? false : true}
                    />
                    <div class="w-1 rounded-sm h-full bg-gray-200 mx-auto" />
                    <input
                      type="number"
                      class="p-1 bg-white/0 text-center w-16 mx-auto"
                      bind:value={newTrack.previewStop}
                      on:input={() => checkValidation('previewpart')}
                      min="30"
                      disabled={trackData.blob ? false : true}
                    />
                  </div>
                  {#if trackData.blob}
                    <InputError errorInput="previewpart" />
                  {/if}
                </div>
              </div>
              <InputError errorInput="track" />
              <div class="label portal">
                Upload track
                <div
                  class="input portal w-full justify-center items-center cursor-pointer flex space-x-2"
                  on:click={() => trackDataClick.click()}
                >
                  {#if trackData.blob && trackFile}
                    <p class="text-teal-700 font-medium">
                      {trackFile ? trackFile.name : ''} has been selected.
                      <!-- Logo has been selected. Press update logo to submit! -->
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
                    <p>Click to upload or drag your track here..</p>
                  {/if}
                  <input
                    required={true}
                    type="file"
                    accept=".wav,.mp3,.flac"
                    bind:this={trackDataClick}
                    bind:files={trackData.blob}
                    on:change={e => previewTrack(e)}
                    class="hidden"
                    placeholder=""
                  />
                </div>
              </div>
              <div class="flex justify-end">
                <Button
                  color="bg-teal-700"
                  size="sm"
                  loading={loadingStatus.trackfile ? 'Updating audio..' : null}
                  onClick={() => {
                    updateTrackFile()
                  }}>Update audio</Button
                >
              </div>
            </div>
          </div>
        </Box>
      {:else}
        <Box>
          <Title>Hola!</Title>
          You cannot edit your track if the track is already signed or denied.</Box
        >
      {/if}
    {:else if newTrack === undefined}
      <Skeleton
        theme="light"
        loading={true}
        height="h-[22rem]"
        className="mb-8"
      />
      <Skeleton theme="light" loading={true} height="h-[18rem]" />
    {:else if newTrack === null}
      <ErrorBanner message="Error while fetching the track data." />
    {/if}
  </div>
</FadeBox>
