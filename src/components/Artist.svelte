<script lang="ts">
  import type { ArtistType, UserType } from '../types/User.type'

  import { fade, fly } from 'svelte/transition'
  import { onMount } from 'svelte'
  import { query } from '../utils/useGraphQL'
  import LinkIcon from './LinkIcon.svelte'

  export let className = ''
  export let artist: ArtistType = undefined
  export let size: 'xs' | 'sm' | 'md' = 'sm'
  let hover: boolean = false

  export let onClick = () => {}
  export let theme: 'light' | 'dark' = 'light'
</script>

{#if artist}
  <div
    on:click={onClick}
    class="inline"
    on:mouseenter={() => (hover = true)}
    on:mouseleave={() => (hover = false)}
  >
    <div
      class="relative mshadow-xs {theme == 'dark'
        ? 'bg-gray-300 bg-opacity-40'
        : 'bg-white'}  rounded-full group {size == 'md'
        ? 'text-md'
        : 'text-sm'} {className} {size == 'md'
        ? 'pr-5'
        : size == 'sm'
        ? 'pr-3'
        : ''}"
    >
      <!-- <img alt="Artist {artist}" class="w-8 h-8 bg-gray-300 mr-2 rounded-full" /> -->
      <!-- // Todo: custom not found logo -->
      <div class="cursor-pointer flex items-center group">
        {#if artist.logo}
          <img
            alt="Artist {artist.nickName ?? ''}"
            src={artist.logo ??
              'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Ferror-icon-vector-illustration-vector-id922024216%3Fk%3D6%26m%3D922024216%26s%3D612x612%26w%3D0%26h%3DocSXgfV-7FlzSDe9LwBFoGTWAcfR6ES09hAl8OTe5Tw%3D&f=1&nofb=1'}
            class="object-cover w-8 h-8 bg-gray-300  rounded-full {size != 'xs'
              ? 'mr-3'
              : ''} {size == 'md' ? ' w-12 h-12' : ''}"
          />
        {:else}
          <div
            class=" w-8 h-8 bg-gray-300  rounded-full {size != 'xs'
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

      {#if hover}
        <div
          in:fly={{ y: 25, opacity: 0 }}
          out:fade={{ duration: 200 }}
          class="min-w-max grid animate__fadeInUp group-hover:animate__fadeInUp z-10 absolute bg-white mshadow-sm text-gray-700 text-sm p-3 rounded-sm -mt-2  gap-1 justify-items-start {theme ==
          'dark'
            ? 'bg-opacity-20 backdrop-blur-lg text-white'
            : 'bg-white'} "
        >
          {#if size == 'xs'}
            <p class="font-bold">{artist.nickName}</p>
            <hr class="w-full border-gray-800 mb-2 mt-1" />{/if}
          {#if artist.userLinks && artist.userLinks.length > 0}
            {#each artist.userLinks as userLink}
              <div class="flex items-center">
                <LinkIcon className="mr-2" type={userLink.link.type} />
                <a
                  href={'https://' + userLink.linkAddress}
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
          <!-- <a
          href="twitter.com"
          class="hover:underline grid grid-flow-col gap-2 items-center "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.28-.03-.56-.08-.83A7.72 7.72 0 0023 3z"
            />
          </svg>Twitter
        </a> -->
        </div>
      {/if}
    </div>
  </div>
{/if}
