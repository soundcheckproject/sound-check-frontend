<script lang="ts">
  import SubTitle from './SubTitle.svelte'

  import { onDestroy, onMount } from 'svelte'
  import type FeedbackType from '../types/Feedback.type'
  import {
    addFeedbackToTrack,
    getTrackFeedbacksByTrackId,
    query,
  } from '../utils/useGraphQL'
  import Button from './Button.svelte'
  import userStore from '../stores/userStore'
  import { sortByDate } from '../utils/useSorting'
  import { fade, slide } from 'svelte/transition'
  import TrackStatus from './TrackStatus.svelte'
  import { validateStatusTrack } from '../utils/useValidation'
  import type {
    TrackInfoType,
    TrackInputType,
    TrackType,
  } from '../types/Track.type'
  import { getTrackFileFromTrackId } from '../utils/useRest'
  import { formatDateTime, formatTimeForPlayer } from '../utils/useFormat'

  // export let theme: 'light' | 'dark' = 'dark'
  export let feedback: boolean = false
  export let rounded: '' | 'rounded-md' | 'rounded-sm' = 'rounded-md'

  let showFeedback: boolean =
    JSON.parse(localStorage.getItem('showFeedback')) ?? true

  export let audio: HTMLAudioElement | string = undefined

  let trackInfo: TrackInfoType = {
      duration: '0:00',
      currentTime: '0:00',
      playing: true,
      playerBar: null,
      muted: false,
    },
    wavesurfer: any,
    feedbackInput = '',
    isMuted: Boolean = false

  const changeTrackTime = (timeStampSong: number) => {
    // audio.currentTime = timeStampSong
    wavesurfer.stop()
    wavesurfer.skip(timeStampSong)
    wavesurfer.play()
  }

  const addComment = async () => {
    if (feedbackInput.length > 0) {
      const feedbackData: FeedbackType = {
        userId: $userStore.uuid,
        trackId: track.uuid,
        description: feedbackInput,
        timeStampSong: audio
          ? parseInt(wavesurfer.getCurrentTime().toFixed(0))
          : 0,
        date: new Date().toString(),
      }

      try {
        await addFeedbackToTrack(feedbackData)
        feedbackData.user = $userStore
        feedbacks = [...feedbacks, feedbackData]
        feedbackInput = ''
      } catch (e) {
        console.log(e)
      }
    }
  }

  let feedbacks: FeedbackType[] = []

  export let artworkFile = null
  export let track: TrackType

  let trackPlayable = false

  onMount(async () => {
    if (feedback) {
      feedbacks = await getTrackFeedbacksByTrackId(track.uuid)
    }

    // ! Problems with ssr if import on top level
    const ws: any = await import('wavesurfer.js')
    const WaveSurfer = ws.default

    wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'white',
      progressColor: '#9ca3af',
      cursorColor: '#5eead4CC',
      cursorWidth: 2,
      barWidth: 3,
      barHeight: 1,
      barGap: 3,
      barRadius: 2,
      responsive: true,
      height: 80,
    })

    if (!audio) {
      if ('encodedFile' in track && track.encodedFile) {
        audio = track.encodedFile
      } else if (track.uuid) {
        const data = await getTrackFileFromTrackId(track.uuid)
        audio = data.encodedFile
      }
    }
  })

  onDestroy(() => {
    wavesurfer.destroy()
  })

  $: {
    if (audio) {
      if (wavesurfer) {
        wavesurfer.load(audio)
        wavesurfer.on('ready', () => {
          trackPlayable = true

          const trackDuration = parseInt(wavesurfer.getDuration().toFixed(0))
          trackInfo.duration = formatTimeForPlayer(trackDuration)

          wavesurfer.on('audioprocess', () => {
            const trackCurrentTime = parseInt(
              wavesurfer.getCurrentTime().toFixed(0),
            )
            trackInfo.currentTime = formatTimeForPlayer(trackCurrentTime)
            trackInfo.playerBar.style.width =
              (100 * trackCurrentTime) / trackDuration + '%'
          })
        })
      }
    }
  }

  $: {
    localStorage.setItem('showFeedback', JSON.stringify(showFeedback))
  }
</script>

{#if track}
  <div class="relative">
    <div
      class="overflow-hidden relative grid bg-gray-800 {rounded} backdrop-blur-sm text-gray-100"
    >
      <div
        class="absolute w-full z-1 h-full filter blur-3xl opacity-75"
        style={`background:url('${
          track.artwork ? track.artwork.resource : ''
        }') center center no-repeat;background-size:cover`}
      />

      <div
        class="absolute w-full z-1 h-full filter blur-3xl opacity-75"
        style={`background:url('${
          artworkFile
            ? artworkFile
            : track.artwork
            ? track.artwork.resource
            : ''
        }') center center no-repeat;background-size:cover`}
      />

      <div class="z-10 grid gap-8  p-8 sm:grid-cols-auto-1fr w-full">
        <div
          class="overflow-hidden w-48 h-48 lg:h-64 lg:w-64 m-auto bg-gray-100 bg-opacity-10 rounded-md mshadow-md flex justify-center items-center"
        >
          {#if artworkFile || (track.artwork && track.artwork.resource)}
            <img
              alt="img"
              src={`${artworkFile ? artworkFile : track.artwork.resource}`}
              class="object-cover h-full w-full "
            />
          {:else}
            <svg
              class="text-white opacity-90"
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
            </svg>{/if}
        </div>
        <div
          class=" grid gap-4 items-start"
          style="grid-template-rows:auto repeat(2,min-content) "
        >
          <div class="flex justify-between items-center ">
            <SubTitle theme="light">{track.title ?? 'No title'}</SubTitle>
            {#if track.genre}
              <div class="text-sm">#{track.genre.name ?? 'No genre'}</div>
            {/if}
          </div>

          <div class="grid gap-2 mt-4 cursor-pointer">
            <div on:click={() => wavesurfer.play()} id="waveform" />

            {#if trackPlayable}
              <div class="flex  text-gray-200 ">
                <div class="text-xs mr-2">00:00</div>
                <div class="flex mx-2 items-center opacity-25 w-full">
                  <div
                    class="bg-gray-100 transition-all h-1 rounded-sm "
                    bind:this={trackInfo.playerBar}
                  />
                  <div
                    class="-ml-2 bg-gray-100 h-3 w-3 relative rounded-full"
                    style=""
                  >
                    <div class="absolute text-xs top-4 ml-1.5 -translate-x-1/2	">
                      {trackInfo.currentTime}
                    </div>
                  </div>
                </div>
                <div class="text-xs ml-auto">{trackInfo.duration}</div>
              </div>
            {:else}
              <p class="text-sm">
                Audio is loading.. or could not be found on this server.
              </p>
            {/if}
          </div>
          <div
            class="mt-2 grid grid-flow-col  items-center justify-between gap-2 self-end py-4 px-5 bg-opacity-10 rounded-md bg-gray-50"
          >
            <div class="grid gap-2 grid-flow-col items-center">
              <button
                class="focus:text-green-300 outline-none"
                on:click={() => wavesurfer.skip(-5)}
                ><svg
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
                  <polygon points="19 20 9 12 19 4 19 20" />
                  <line x1="5" y1="19" x2="5" y2="5" />
                </svg>
              </button>
              <button
                class="focus:text-green-300 outline-none"
                on:click={() => {
                  wavesurfer.pause()
                  trackInfo.playing = false
                }}
              >
                <svg
                  class:active={!trackInfo.playing}
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
                  <circle cx="12" cy="12" r="10" />
                  <line x1="10" y1="15" x2="10" y2="9" />
                  <line x1="14" y1="15" x2="14" y2="9" />
                </svg></button
              >
              <button
                class="focus:text-green-300 outline-none"
                on:click={() => {
                  wavesurfer.playPause()
                  trackInfo.playing = true
                }}
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class:active={trackInfo.playing}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg></button
              >
              <button
                on:click={() => wavesurfer.skip(5)}
                class="focus:text-green-300 outline-none"
                ><svg
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
                  <polygon points="5 4 15 12 5 20 5 4" />
                  <line x1="19" y1="5" x2="19" y2="19" />
                </svg></button
              >
              <button />
            </div>
            <button
             class="focus:text-green-300 outline-none"
              on:click={() => {
                if (wavesurfer) {
                  isMuted = !isMuted
                  wavesurfer.setMute(isMuted)
                }
              }}
            >
              {#if wavesurfer}
                {#if !isMuted}
                  <svg
                    class:active={!isMuted}
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
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path
                      d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"
                    />
                  </svg>
                {:else}
                  <svg
                    class:active={isMuted}
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
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                {/if}{/if}
            </button>
          </div>
        </div>
      </div>
      {#if audio && feedback && (track.isSigned == null || track.isSigned == true)}
        <div
          transition:slide|local={{ delay: 400, duration: 200 }}
          class="z-10 p-8 grid gap-6 bg-black bg-opacity-20"
        >
          <SubTitle theme="light"
            ><div class="flex w-full justify-between ">
              <div>Feedback</div>
              <div
                class="flex space-x-2"
                on:click={() => (showFeedback = !showFeedback)}
              >
                <p class="text-sm font-base">
                  {#if showFeedback}Close{:else}Open{/if}
                </p>

                <svg
                  class:active={showFeedback}
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
                  <polyline points="4 14 10 14 10 20" />
                  <polyline points="20 10 14 10 14 4" />
                  <line x1="14" y1="10" x2="21" y2="3" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </div>
            </div></SubTitle
          >
          {#if showFeedback}
            <div
              transition:slide|local
              class="grid gap-4 max-h-96 overflow-y-scroll -mx-8"
            >
              <div
                class="bg-opacity-10 rounded-md bg-gray-50 text-sm py-2 px-2 flex mx-8"
              >
                <input
                  bind:value={trackInfo.currentTime}
                  type="text"
                  class="bg-opacity-0 bg-white w-10 outline-none opacity-40 mx-3"
                />
                <input
                  type="text"
                  bind:value={feedbackInput}
                  class="bg-opacity-0 bg-white outline-none w-full mr-2  placeholder-white placeholder-opacity-50 text-white text-opacity-75"
                  placeholder="Write a comment.."
                />
                <Button onClick={() => addComment()} type="glass">Post</Button>
              </div>
              {#if feedbacks.length == 0}
                <div
                  class="bg-opacity-10 rounded-md bg-gray-50  mx-8 text-sm p-5 flex items-center"
                >
                  This track doesn't have any comments yet.
                </div>
              {:else}
                {#each sortByDate(feedbacks, true) as feedback}
                  <div class="bg-opacity-10 rounded-md bg-gray-50 text-sm mx-8">
                    <div
                      class="text-sm py-3 flex items-center w-full relative "
                    >
                      <img
                        alt="Logo of {feedback.user.nickName}"
                        src={feedback.user.logo}
                        class="object-cover h-8 w-8 rounded-full -ml-4 mshadow-md"
                      />
                      <p class="font-medium pl-2 pr-1">
                        {feedback.user.nickName}
                      </p>
                      <p class="opacity-50">
                        wrote on {formatDateTime(new Date(feedback.date))}
                      </p>
                      <!-- Todo: make weird cursor pointer smooth -->
                      <!-- ! Feature -->
                      <!-- on:click={() => changeTrackTime(feedback.timeStampSong)} -->
                      <div class="group cursor-pointer">
                        <div
                          class="backdrop-blur-xl opacity-100 transition-opacity px-3 py-1 text-xs rounded-full bg-opacity-10 bg-white absolute right-4 top-4 flex  "
                        >
                          {formatTimeForPlayer(feedback.timeStampSong)}
                        </div>
                        <!-- <div
                          class="backdrop-blur-xl opacity-0 transition-opacity group-hover:opacity-100 absolute right-4  rounded-full bg-opacity-10 bg-white p-2 justify-center top-4 items-center"
                        >
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
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="10 8 16 12 10 16 10 8" />
                          </svg>
                        </div> -->
                      </div>
                    </div>
                    <p class="pl-6 pb-4 opacity-80 -mt-2">
                      {feedback.description}
                    </p>
                  </div>
                {/each}
              {/if}
            </div>
          {/if}
        </div>
      {/if}
      <!-- </div> -->
    </div>
    <TrackStatus
      status={validateStatusTrack(track.isSigned, track.prefferdReleaseDate)}
    />
  </div>
{/if}

<style lang="postcss">
  svg {
    @apply cursor-pointer opacity-50 transition-opacity;
  }
  svg:hover,
  svg.active {
    @apply opacity-100;
  }
</style>
