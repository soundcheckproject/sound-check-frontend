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

  let loadingStatus: { [key: string]: boolean } = {
    contractUpload: false,
  }

  let track: TrackType
  //   let track: TrackType = {ƒ
  //     uuid: '612a4d86-f56d-4543-a0d8-793600e68a01',
  //     title: 'Miss you so feat. Jebroer',
  //     description: 'Niels his new hit song',
  //     previewStart: 20,
  //     previewStop: 35,
  //     lyrics: 'I hate to admit it',
  //     artistIds: ['b95656c1-e994-42d3-9e5d-c37f260b2a78'],
  //     genreId: '6ef2aded-c280-40bf-8e4c-e4b6f38b72d2',
  //     genre: { name: '' },
  //     prefferdReleaseDate: '2022-01-01',
  //     contractFile: '',
  //     artwork: {
  //       designer: 'nielsonderbeke2',
  //     },
  //   }
  //   let contractAvailable = false

  const downloadContractFile = async () => {
    var a = document.createElement('a') //Create <a>
    a.href = track.contractFile //Image Base64 Goes here
    a.download = track.title + '-contract' //File name Here
    a.click() //Downloaded file
  }
  let contractFileBlob: any
  let contractFileUploadClick: HTMLInputElement
  const uploadContractFile = async () => {
    if (contractFileBlob) {
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

  let reloadTrack: boolean = false
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

      <SubTitle>📝 Manage contract</SubTitle>
      <!-- <div class="justify-between flex items-center">
        Make contract available
        <Toggle bind:value={contractAvailable} />
      </div> -->
      <!-- {#if contractFileBlob}
        <p on:click={() => goto('/')}>View uploaded contract <u>here</u>..</p>
      {/if} -->

      {#if !track.contractFile}
        <Button
          size="sm"
          color="bg-gray-500"
          disabled={track.isSigned == false}
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
        <div class="flex space-x-4">
          <Button
            size="sm"
            color="bg-teal-700"
            onClick={() => {
              contractFileUploadClick.click()
              loadingStatus.contractUpload = true
            }}
            disabled={track.isSigned == false}
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
            onClick={() => downloadContractFile()}
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
              <div>Download signed contract</div>
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
