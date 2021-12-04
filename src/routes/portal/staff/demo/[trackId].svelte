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
  import Toggle from '../../../../components/Toggle.svelte'
  import Error from '../../../../components/Error.svelte'
  import Artist from '../../../../components/Artist.svelte'
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

  let loadingStatus: { [key: string]: boolean } = {
    contractUpload: false,
    contractAvailable: false,
    contractDownload: false,
  }

  let track: TrackType

  const downloadContractFile = async (contractFile: string) => {
    loadingStatus.contractDownload = true
    let a = document.createElement('a') //Create <a>
    a.href = contractFile //Image Base64 Goes here
    a.download = track.title + '-contract.pdf' //File name Here
    a.click() //Downloaded file
    loadingStatus.contractDownload = false
  }
  let contractFileBlob: any
  let contractFileUploadClick: HTMLInputElement
  const uploadContractFile = async () => {
    if (contractFileBlob) {
      loadingStatus.contractUpload = true
      await uploadContract(contractFileBlob[0], 'contract.pdf', track.uuid)
        .then(async () => {
          loadingStatus.contractUpload = false
          // goto('/track/' + track.uuid)
          console.log('uploaded contract file')
          track = await getTrackById($page.params.trackId)
        })
        .catch(err => {
          loadingStatus.contractUpload = false
          console.log({ err })
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
      .then(res => {
        loadingStatus.contractAvailable = false
        console.log(res)
      })
      .catch(() => {
        loadingStatus.contractAvailable = false
      })
  }

  onMount(async () => {
    track = await getTrackById($page.params.trackId)
  })
  $: {
    if (contractFileBlob) {
      uploadContractFile()
    }
  }
</script>

<div class="grid gap-8">
  {#if track}
    <TrackPlayer feedback={true} {track} />
    <Box
      ><Title>Contract</Title>
      <SubTitle>👨🏼‍🎨 Artists</SubTitle>
      {#if track.artistTracks && track.artistTracks.length > 0}
        <div class="flex space-x-2">
          {#each track.artistTracks as artist}
            <Artist
              onClick={() => goto('/portal/staff/users/' + artist.user.uuid)}
              artist={artist.user}
              theme="dark">{artist.user.nickName}</Artist
            >
          {/each}
        </div>
      {:else}
        <p class="text-sm">No artists found..</p>
      {/if}
      <SubTitle>📝 Manage contract</SubTitle>

      {#if !track.contractFile}
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
            <div>Make contract available</div>
          </div>
        </Button>
        {:else}
      <!-- {/if} -->
      <div class="flex space-x-4">
        <Button
          size="sm"
          color="bg-teal-700"
          onClick={() => {
            contractFileUploadClick.click()
          }}
          disabled={track.isSigned == false}
          loading={loadingStatus.contractUpload ? 'Uploading contract..' : null}
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
        <input
          type="file"
          accept=".pdf"
          bind:this={contractFileUploadClick}
          bind:files={contractFileBlob}
          class="hidden"
          placeholder=""
        />

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
      {/if}
      <hr />
      <!-- Todo: check if track has been released or not
      <Error>Track has already been released..</Error> -->
      Track status: {track.isSigned == true
        ? 'Accepted'
        : track.isSigned == false
        ? 'Denied'
        : 'Pending'}
      <div class="flex space-x-4">
        <Button
          color="bg-accepted"
          class="button"
          disabled={track.isSigned == true}
          onClick={() => {
            signTrack(track)
            goto($page.path)
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
          onClick={() => {
            denyTrack(track)
            goto($page.path)
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
        <!-- //todo: make track pending -->
        <Button
          color="bg-pending"
          class="button"
          disabled={track.isSigned == null}
          onClick={() => {
            pendingTrack(track)
            goto($page.path)
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
  {/if}
</div>

<style lang="postcss">
  .button {
    @apply cursor-pointer opacity-50 transition-opacity;
  }
  .button:hover,
  .button.active {
    @apply opacity-100;
  }
</style>
