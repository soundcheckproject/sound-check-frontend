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

  import { onMount } from 'svelte'
  import { getTrackById } from '../../../../utils/useGraphQL'

  import { formatDate } from '../../../../utils/useFormat'
  import { uploadContract } from '../../../../utils/useRest'
  import ErrorBanner from '../../../../components/error/ErrorBanner.svelte'
  import { pageSelectedStore } from '../../../../stores/stores'

  let loadingStatus: { [key: string]: boolean } = {
    contractUpload: false,
    contractAvailable: false,
    contractDownload: false,
  }

  let track: TrackType = undefined
  let contractFileBlob: any = undefined
  let contractFileUploadClick: HTMLInputElement = undefined
  let contract: File = undefined

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
          // ! todo popup at error
        })
    } else {
      loadingStatus.contractUpload = false
      console.log('no contract file')
    }
  }

  onMount(async () => {
    try {
      track = await getTrackById($page.params.trackId)
      if (track) pageSelectedStore.set({ name: 'demo', title: track.title })
    } catch (error) {
      track = null
    }
  })
</script>

<svelte:head>
  <title>{`${track ? track.title : ''} - Track detail`}</title>
</svelte:head>

{#if track}
  <div class="grid gap-8">
    <TrackPlayer feedback={true} {track} />
    <Box>
      <Title
        ><div class="flex justify-between items-center">
          <div>{track.title ?? 'No title found'}</div>
          <div class="flex space-x-2">
            {#if track.isSigned == null}
              <EditButton href={$page.path + '-edit'} />
            {/if}
            <!-- {#if track.isSigned == true}
              <FinanceButton href={$page.path + '-finance'} />
            {/if} -->
          </div>
        </div></Title
      >
      <div class="grid gap-6 lg:grid-cols-2 items-start">
        <div class="grid gap-4">
          <SubTitle>💽 Information</SubTitle>

          <div class="grid">
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
            <p class="text-sm">
              {track.lyrics ? track.lyrics : 'No lyrics for this track yet.'}
            </p>
          </div>
        </div>
        <div class="grid gap-4">
          <SubTitle>👨🏼‍🎨 Artists</SubTitle>
          {#if track.artistTracks && track.artistTracks.length > 0}
            <div class="flex space-x-2">
              {#each track.artistTracks as artist}
                <a href={`/artists/${artist.user.uuid}`}>
                  <Artist artist={artist.user} socials theme="dark"
                    >{artist.user.nickName}</Artist
                  ></a
                >
              {/each}
            </div>
          {:else}
            <p class="text-sm">No artists found..</p>
          {/if}
        </div>
      </div>
    </Box>
    {#if track.contractFile}
      <Box
        ><Title>Contract</Title>
        <SubTitle>📝 Manage contract</SubTitle>

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
      </Box>
    {/if}
  </div>
{:else if track === undefined}
  <Skeleton theme="light" loading={true} height="h-[22rem]" className="mb-8" />
  <Skeleton theme="light" loading={true} height="h-[18rem]" />
{:else if track === null}
  <ErrorBanner message="Error while fetching the track data." />
{/if}
