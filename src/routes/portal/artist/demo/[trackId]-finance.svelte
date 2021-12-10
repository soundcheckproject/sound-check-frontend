<script lang="ts">
  import type { GenreType } from '../../../../types/Genre.type'
  import type { ArtworkType, TrackType } from '../../../../types/Track.type'
  import type { ArtistType, UserType } from '../../../../types/User.type'

  import {
    getGenres,
    getArtistsByNickName,
    createTrack,
    getTrackById,
    updateTrack,
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

  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { uploadTrack } from '../../../../utils/useRest'
  import ButtonBox from '../../../../components/ButtonBox.svelte'
  import userStore from '../../../../stores/userStore'
  import FadeBox from '../../../../components/portal/FadeBox.svelte'
  import {
    validateEmailValid,
    validateEmpty,
    validateError,
    validateErrors,
    validateLength,
  } from '../../../../utils/useValidation'
  import validationStore from '../../../../stores/validationStore'
  import InputError from '../../../../components/InputError.svelte'
  import { page } from '$app/stores'
  import { roleStore } from '../../../../stores/stores'

  let track: TrackType
  let newTrack: TrackType

  onMount(async () => {
    if ($page.params.trackId) {
      track = await getTrackById($page.params.trackId)

      newTrack = track
    }
  })
</script>

<svelte:head>
	<title>{`${track && track.title + ' - ' }Track finance`}</title>
</svelte:head>

<div class="grid gap-8">
  {#if newTrack}
    <TrackPlayer track={newTrack} feedback={false} />
    {#if newTrack.isSigned == null || ['label-ar', 'label-manager'].includes($roleStore)}
      <Box>
        <Title>Track finance</Title>

        <SubTitle>💸 Pending payments</SubTitle>
        <div class="grid gap-4">
          <div class="p-8 flex flex-col rounded-sm text-sm bg-gray-100">
            <div class="flex justify-between items-center">
              <div class="font-bold px-4 py-2 bg-gray-200 rounded-full">
                100€
              </div>
              <div class="text-gray-500">20/12/2021</div>
            </div>
            <div class="mt-4">
              Please send an invoice of 100€ to invoice@soundcheck.be with the
              following layout:
              <p class="mt-4">
                <b>Email title:</b>
                INVOICE - [{track.title}]
                <br />
                <b>Content:</b><br />
                Hi!
                <br /><br />
              </p>
              * Please don't forget to put your invoice as a pdf file in the attachments.
            </div>
          </div>
        </div>
      </Box><Box>
        <Title>History</Title>

        <SubTitle>🗞 History</SubTitle>
      </Box>
    {:else}
      <Box>
        <Title>Hola!</Title>
        You cannot edit your track if the track is already signed or denied.</Box
      >
    {/if}
  {/if}
</div>
