<script lang="ts">
  import type { TrackType } from '../../../../types/Track.type'
  import { page } from '$app/stores'

  import { onMount } from 'svelte'

  import { getTrackById, query } from '../../../../utils/useGraphQL'
  import TrackPlayer from '../../../../components/TrackPlayer.svelte'
  import Title from '../../../../components/Title.svelte'
  import SubTitle from '../../../../components/SubTitle.svelte'
  import Box from '../../../../components/Box.svelte'
  import Button from '../../../../components/Button.svelte'

  import Artist from '../../../../components/Artist.svelte'
  import {
    validateErrorTime,
    validateStatusTrack,
  } from '../../../../utils/useValidation'
  import {
    denyTrack,
    pendingTrack,
    signTrack,
  } from '../../../../utils/useTrack'
  import { goto } from '$app/navigation'
  import {
    getContractFromTrackId,
    uploadContract,
  } from '../../../../utils/useRest'
  import { validateError } from '../../../../utils/useValidation'
  import EditButton from '../../../../components/portal/EditButton.svelte'
  import { formatDate } from '../../../../utils/useFormat'
  import FadeBox from '../../../../components/portal/FadeBox.svelte'
  import validationStore from '../../../../stores/validationStore'
  import InputError from '../../../../components/InputError.svelte'
  import ErrorBanner from '../../../../components/error/ErrorBanner.svelte'
  import Skeleton from '../../../../components/Skeleton.svelte'

  let loadingStatus: { [key: string]: boolean } = {
    contractUpload: false,
    contractAvailable: false,
    contractDownload: false,
    denyTrack: false,
    signTrack: false,
  }

  let errors: string[] = []

  let track: TrackType
  let contract: File = undefined

  const downloadContractFile = async (contractFile: string) => {
    loadingStatus.contractDownload = true
    let a = document.createElement('a') //Create <a>
    a.href = contractFile //Image Base64 Goes here
    a.download = `${track.title}-${track.uuid}-contract.pdf` //File name Here
    a.click() //Downloaded file
    loadingStatus.contractDownload = false
  }

  let contractFileBlob: any
  let contractFileUploadClick: HTMLInputElement
  const uploadContractFile = async () => {
    if (contractFileBlob) {
      loadingStatus.contractUpload = true
      await uploadContract(
        contractFileBlob[0],
        `${track.title}-${track.uuid}-contract.pdf`,
        track.uuid,
      )
        .then(async () => {
          loadingStatus.contractUpload = false
          // goto('/track/' + track.uuid)
          console.log('uploaded contract file')
          track = await getTrackById($page.params.trackId)
          contract = undefined
          contractFileBlob = undefined
        })
        .catch(err => {
          loadingStatus.contractUpload = false
          validateErrorTime('contract', 'failed', errors)
        })
    } else {
      loadingStatus.contractUpload = false
      console.log('no contract file')
    }
  }

  const contractAvailable = async () => {
    loadingStatus.contractAvailable = true
    const contractFile = await query(
      `generateContract`,
      `mutation GenerateContract($trackId: String!) {
        generateContract(trackId: $trackId) {
          contractFile
        }
      }`,
      {
        trackId: track.uuid,
      },
    )
      .catch(() => {
        loadingStatus.contractAvailable = false
      })
      .finally(() => (loadingStatus.contractAvailable = false))
    if (contractFile) track.contractFile = contractFile.contractFile
  }

  onMount(async () => {
    try {
      track = await getTrackById($page.params.trackId)
    } catch (error) {
      track = null
    }
  })

  $: {
    validationStore.set(errors)
  }
</script>

<svelte:head>
  <title>{`${track ? track.title : ''} - Track detail`}</title>
</svelte:head>

{#if track}
  <FadeBox
    ><div class="grid gap-8">
      <TrackPlayer feedback={true} {track} />
      <Box>
        <Title
          ><div class="flex justify-between items-center">
            <div>{track.title ?? 'No title found'}</div>
            <div class="flex space-x-2">
              {#if track.isSigned == null || track.isSigned == true}
                <EditButton href={$page.path + '-edit'} />
              {/if}
            </div>
          </div></Title
        >
        <div class="grid gap-6 lg:grid-cols-2 items-start">
          <div class="grid gap-4">
            <SubTitle>💽 Information</SubTitle>

            <div class="grid ">
              <p class="font-semibold ">Releasedate</p>
              <p class="text-sm">
                {new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
                  new Date(track.prefferdReleaseDate),
                )} -
                {formatDate(new Date(track.prefferdReleaseDate))}
              </p>
              <p class="mt-4 font-semibold  ">Description</p>

              <p class="text-sm max-h-48 overflow-y-auto">
                {track.description}
              </p>
              <p class="mt-4 font-semibold ">Lyrics</p>

              <p class="text-sm  max-h-48 overflow-y-auto">
                {track.lyrics ? track.lyrics : 'No lyrics for this track yet.'}
              </p>
            </div>
          </div>
          <div class="grid gap-4">
            <SubTitle>👨🏼‍🎨 Artists</SubTitle>
            {#if track.artistTracks && track.artistTracks.length > 0}
              <div class="flex space-x-2">
                {#each track.artistTracks as artist}
                  <Artist
                    onClick={() =>
                      goto('/portal/staff/users/' + artist.user.uuid)}
                    artist={artist.user}
                    socials
                    theme="dark">{artist.user.nickName}</Artist
                  >
                {/each}
              </div>
            {:else}
              <p class="text-sm">No artists found..</p>
            {/if}
            <!-- <p class="text-xs">Track submitted on .. by ..</p> -->
          </div>
        </div>
      </Box>
      <Box>
        <Title>Contract</Title>

        <SubTitle>📝 Manage contract</SubTitle>
        <InputError errorInput="contract" />
        {#if !track.contractFile}
          <div>
            <p class="mb-2">There isn't a contract yet.</p>
            <Button
              size="sm"
              color="bg-gray-500"
              disabled={track.isSigned == false}
              onClick={() => {
                contractAvailable()
              }}
              loading={loadingStatus.userinfo ? 'Generating contract..' : null}
            >
              <div class="download">
                <svg
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
                  <path
                    d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"
                  />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M9 15l2 2 4-4" />
                </svg>
                <div>Generate contract</div>
              </div>
            </Button>
          </div>
        {:else}
          <!-- {/if} -->
          <div class="max-w-max">
            <div
              class="input portal w-full justify-center items-center cursor-pointer flex mb-4"
              on:click={() => contractFileUploadClick.click()}
            >
              {#if contractFileBlob}
                <p class="text-teal-700 font-medium">
                  {contract ? contract.name : 'Contract'} has been selected.
                </p>
              {:else}
                <svg
                  class="-mt-px mr-2"
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
                <p>Click to upload a new contract...</p>
              {/if}
              <input
                required={true}
                type="file"
                accept=".pdf"
                bind:this={contractFileUploadClick}
                bind:files={contractFileBlob}
                on:change={e => {
                  contract = e.target.files[0]
                }}
                class="hidden"
                placeholder=""
              />
            </div>
            <div class="flex space-x-4">
              <Button
                size="sm"
                color="bg-teal-700"
                onClick={() => {
                  uploadContractFile()
                }}
                disabled={contractFileBlob === undefined}
                loading={loadingStatus.contractUpload
                  ? 'Uploading contract..'
                  : null}
              >
                <div class="download">
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
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <div>Upload new contract</div>
                </div>
              </Button>
              <Button
                size="sm"
                color="bg-gray-700"
                disabled={track.isSigned == false}
                onClick={() => downloadContractFile(track.contractFile)}
                loading={loadingStatus.contractDownload
                  ? 'Downloading contract..'
                  : null}
              >
                <div class="download ">
                  <svg
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
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <div>Download contract</div>
                </div>
              </Button>
            </div>
          </div>
        {/if}

        <SubTitle
          >🚦 Current track status: <p
            class="ml-1 uppercase font-bold text-{validateStatusTrack(
              track.isSigned,
              track.prefferdReleaseDate,
            )}"
          >
            {validateStatusTrack(track.isSigned, track.prefferdReleaseDate)}
          </p>
        </SubTitle>

        <div class="flex space-x-4">
          <Button
            color="bg-accepted"
            class="button"
            disabled={track.isSigned == true}
            loading={loadingStatus.signTrack ? 'Signing track..' : null}
            onClick={() => {
              loadingStatus.signTrack = true
              signTrack(track).then(async res => {
                track = await getTrackById($page.params.trackId)
                loadingStatus.signTrack = false
              })
            }}
            ><svg
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
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <div>Sign track</div></Button
          >
          <Button
            color="bg-denied"
            class="button"
            disabled={track.isSigned == false}
            loading={loadingStatus.denyTrack ? 'Denying track..' : null}
            onClick={async () => {
              loadingStatus.denyTrack = true
              denyTrack(track).then(async () => {
                track = await getTrackById($page.params.trackId)
                loadingStatus.denyTrack = false
              })
            }}
            ><svg
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
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <div>Deny track</div></Button
          >
          <Button
            color="bg-pending"
            class="button"
            disabled={track.isSigned == null}
            loading={loadingStatus.pendingTrack ? 'Pending track..' : null}
            onClick={async () => {
              loadingStatus.pendingTrack = true
              pendingTrack(track).then(async () => {
                track = await getTrackById($page.params.trackId)
                loadingStatus.pendingTrack = false
              })
            }}
            ><svg
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
                d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>Back to pending</div></Button
          >
        </div>
      </Box>
    </div></FadeBox
  >
{:else if track === undefined}
  <Skeleton theme="light" loading={true} height="h-[22rem]" className="mb-8" />
  <Skeleton theme="light" loading={true} height="h-[18rem]" />
{:else if track === null}
  <ErrorBanner message="Error while fetching the track data." />
{/if}

<style lang="postcss">
  .button {
    @apply cursor-pointer opacity-50 transition-opacity;
  }
  .button:hover,
  .button.active {
    @apply opacity-100;
  }
</style>
