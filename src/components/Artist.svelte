<script lang="ts">
  import type { ArtistType, UserType } from '../types/User.type'

  import { fade, fly } from 'svelte/transition'

  import LinkIcon from './LinkIcon.svelte'
  import { capitalize } from '../utils/capitalize'

  export let className = ''
  export let artist: ArtistType = undefined
  export let size: 'xs' | 'sm' | 'md' = 'sm'
  export let hover: boolean = false

  export let onClick = () => {}
  export let theme: 'light' | 'dark' | 'glass' = 'light'
  export let socials = false
  export let pointer: boolean = true
</script>

{#if artist}
  <button
    on:click={onClick}
    class="inline focus-ring rounded-full"
    on:mouseenter={() => {
      hover = true
    }}
    on:mouseleave={() => {
      hover = false
    }}
  >
    <div
      class="relative mshadow-xs {theme == 'glass'
        ? 'bg-black/20 backdrop-blur-xl text-white'
        : theme == 'dark'
        ? 'bg-gray-300 bg-opacity-40'
        : 'bg-white'}  rounded-full group {size == 'md'
        ? 'text-md'
        : 'text-sm'} {className} {size == 'md'
        ? 'pr-5'
        : size == 'sm'
        ? 'pr-4'
        : ''} transition-all hover:bg-opacity-75"
    >
      <div class={`${pointer && 'cursor-pointer'} flex items-center group`}>
        {#if artist.logo}
          <img
            alt="Artist {artist.nickName ?? ''}"
            src={artist.logo}
            class="object-cover w-8 h-8 bg-gray-300  rounded-full {size != 'xs'
              ? 'mr-3'
              : ''} {size == 'md' ? ' w-12 h-12' : ''}"
          />
        {:else}
          <div
            class="shrink-0 w-8 h-8 bg-gray-300  rounded-full {size != 'xs'
              ? 'mr-3'
              : ''} {size == 'md' ? ' w-12 h-12' : ''}"
          />
        {/if}
        {#if size != 'xs'}
          <div class="flex justify-between w-full items-center">
            <div><slot /></div>
            {#if $$props.remove}
              <div
                on:click={$$props.remove}
                class=" ml-2 opacity-0 group-hover:opacity-100 transition-all text-gray-700 hover:text-red-500"
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
                  <polyline points="3 6 5 6 21 6" />
                  <path
                    d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                  />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </div>
            {/if}
          </div>
        {/if}
      </div>

      <div
        in:fly|local={{ y: 25, opacity: 0 }}
        out:fade|local={{ duration: 200 }}
        class="text-xs min-w-max grid  z-10 absolute text-gray-700"
      >
        {#if hover && socials}
          {#if artist.userLinks && artist.userLinks.length > 0}
            {#each artist.userLinks as userLink}
              <div
                class="mt-2 flex items-center bg-white rounded-full mshadow-md px-3 py-2 text-xs "
              >
                <LinkIcon className="mr-2" type={userLink.link.type} />
                <a
                  href={userLink.linkAddress}
                  target="_blank"
                  class="hover:underline grid grid-flow-col gap-2 items-center text-gray-700"
                >
                  {capitalize(userLink.link.type)}
                </a>
              </div>
            {/each}
          {:else}
            <div
              class="mt-2 flex items-center bg-white rounded-full mshadow-md px-3 py-2 text-xs "
            >
              <LinkIcon className="mr-2" />
              No links found 😥
            </div>
          {/if}
        {/if}
      </div>
      <!-- <div
          in:fly|local={{ y: 25, opacity: 0 }}
          out:fade|local={{ duration: 200 }}
          class="text-xs min-w-max grid animate__fadeInUp group-hover:animate__fadeInUp z-10 absolute bg-white mshadow-sm text-gray-700  py-3 px-5 rounded-sm -mt-2  gap-1 justify-items-start {theme ==
          'dark'||'glass'
            ? 'bg-black bg-opacity-50 backdrop-blur-lg text-white'
            : 'bg-white'} "
        >
          {#if size == 'xs'}
            <p class="font-bold">{artist.nickName}</p>
            <hr class="w-full border-gray-800 mb-2 mt-1" />{/if}
          {#if artist.userLinks && artist.userLinks.length > 0}
            {#each artist.userLinks as userLink}
              <div class="flex items-start">
                <LinkIcon className="mr-2 -ml-2" type={userLink.link.type} />
                <a
                  href={userLink.linkAddress}
                  target="_blank"
                  class="hover:underline grid grid-flow-col gap-2 items-center "
                >
                  {userLink.link.type}
                </a>
              </div>
            {/each}
          {:else}
            <p>No links found 😥</p>
          {/if}

        </div>
      {/if} -->
    </div>
  </button>
{/if}
