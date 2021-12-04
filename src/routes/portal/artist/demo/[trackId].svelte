<script lang="ts">
  import type { TrackType } from '../../../../types/Track.type'

  import { page } from '$app/stores'
  import Box from '../../../../components/Box.svelte'
  import Title from '../../../../components/Title.svelte'
  import SubTitle from '../../../../components/SubTitle.svelte'
  import TrackPlayer from '../../../../components/TrackPlayer.svelte'

  import Artist from '../../../../components/Artist.svelte'
  import Button from '../../../../components/Button.svelte'
  import Skeleton from '../../../../components/Skeleton.svelte'
  import EditButton from '../../../../components/portal/EditButton.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { getTrackById } from '../../../../utils/useGraphQL'
  import userStore from '../../../../stores/userStore'
  import FinanceButton from '../../../../components/portal/FinanceButton.svelte'
  import { formatDate } from '../../../../utils/useFormat'
  import { uploadContract } from '../../../../utils/useRest'

  let loadingStatus: { [key: string]: boolean } = {
    contractUpload: false,
    contractAvailable: false,
    contractDownload: false,
  }

  let track: TrackType
  let contractFileBlob: any
  let contractFileUploadClick: HTMLInputElement

  const downloadContractFile = async (contractFile: string) => {
    loadingStatus.contractDownload = true
    let a = document.createElement('a') //Create <a>
    a.href = contractFile //Image Base64 Goes here
    a.download = track.title + '-contract.pdf' //File name Here
    a.click() //Downloaded file
    loadingStatus.contractDownload = false
  }

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
    <Box>
      <Title
        ><div class="flex justify-between items-center">
          <div>{track.title ?? 'No title found'}</div>
          <div class="flex space-x-2">
            {#if track.isSigned == null}
              <EditButton href={$page.path + '-edit'} />
            {/if}
            {#if track.isSigned == true}
              <FinanceButton href={$page.path + '-finance'} />
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
            <p class="mt-4 font-semibold ">Description</p>

            <p class="text-sm">{track.description}</p>
            <p class="mt-4 font-semibold  ">Lyrics</p>

            <p class="text-sm">{track.lyrics}</p>
          </div>
        </div>
        <div class="grid gap-4">
          <SubTitle>👨🏼‍🎨 Artists</SubTitle>
          {#if track.artistTracks && track.artistTracks.length > 0}
            <div class="flex space-x-2">
              {#each track.artistTracks as artist}
                <Artist artist={artist.user} socials theme="dark"
                  >{artist.user.nickName}</Artist
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
    <Box
      ><Title>Contract</Title>

      <SubTitle>📝 Manage contract</SubTitle>

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

      <!-- <div class="flex space-x-4">
        <Button size="sm" color="bg-teal-700">
          <div class="download">
            <svg
              class="-mt-px"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <div>Upload signed contract</div>
          </div>
        </Button>
        <Button size="sm" color="bg-gray-500">
          <div class="download">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <div>Download unsigned contract</div>
          </div>
        </Button>
        <div class="download opacity-25">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <div>Download signed contract</div>
        </div>
      </div> -->
    </Box>
  {/if}
</div>
