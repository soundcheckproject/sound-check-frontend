<script lang="ts">
  import type { UserType } from '../types/User.type'

  import FadeBox from './portal/FadeBox.svelte'
  export let rounded: '' | 'rounded-md' | 'rounded-sm' = 'rounded-md'
  export let container = false
  export let artist: UserType
  export let logo: string = artist.logo ?? ''

  let showBiography = false
</script>

<FadeBox>
  <div
    class="relative overflow-hidden backdrop-blur-sm text-gray-50 grid bg-gray-800 {rounded}"
  >
    {#if logo}
      <div
        class="absolute w-full z-1 h-full filter blur-3xl opacity-75"
        style={`background:url('${logo}') center center no-repeat;background-size:cover`}
      />
    {/if}

    <div class="z-10 grid grid-cols-min-auto p-6 lg:p-12 gap-6 lg:gap-12">
      <div
        class="w-24 h-24 sm:w-32 sm:h-32 lg:h-64 lg:w-64 mshadow-md bg-opacity-10 bg-gray-200 rounded-md overflow-hidden flex justify-center items-center"
      >
        {#if logo}
          <img
            class="object-cover h-full w-full object-fit "
            alt="logo"
            src={logo}
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
        class="grid items-end grid-row-auto gap-6 "
        style="grid-template-rows: min-content 1fr"
      >
        <div class="">
          <div class="flex w-full justify-between">
            <p class="text-lg lg:text-4xl font-semibold ">
              {artist.nickName}
            </p>
          </div>
          <p class="text-sm lg:text-lg">
            {artist.firstName}
            {artist.surName}
          </p>
          <div class="mt-4 text-xs opacity-75 ">
            {#if artist.biography && artist.biography.length > 2}
              <p
                class="flex lg:hidden"
                on:click={() => showBiography = true}
              >
                Click to read bio <svg
                  class="ml-2"
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
                  <polyline points="13 17 18 12 13 7" />
                  <polyline points="6 17 11 12 6 7" />
                </svg>
              </p>
              <p class="{showBiography ? '' : 'hidden'} lg:flex">
                {artist.biography}
              </p>
            {:else}
              Artist has no biography yet.{/if}
          </div>
        </div>
        <div class="flex justify-between items-center">
          {#if artist.role}
            <div
              class="mshadow-md text-sm rounded-full flex text-center bg-opacity-10 bg-white px-4 py-2 justify-center items-center"
            >
              {artist.role.name}
            </div>
          {/if}

          <p class="hidden sm:block text-sm capitalize opacity-50 text-right">
            {artist.country}, {artist.city}
          </p>
        </div>
      </div>
    </div>
  </div>
</FadeBox>
