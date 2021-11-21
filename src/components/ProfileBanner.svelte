<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  export let logo = $$props.artist.logo
</script>

<div
  class="relative overflow-hidden  backdrop-blur-sm text-gray-50 grid  bg-gray-800 rounded-md"
  in:fade={{ duration: 200, delay: 200 }}
  out:fade={{ duration: 200 }}
>
  {#if logo}
    <div
      class="absolute w-full z-1 h-full filter blur-3xl opacity-75"
      style={`background:url('${logo}') center center no-repeat;background-size:cover`}
    />
  {/if}
  <div class="z-10 grid grid-cols-min-auto p-6 lg:p-12 gap-6 lg:gap-12">
    <div
      class="w-32 h-32 lg:h-64 lg:w-64 mshadow-md bg-opacity-10 bg-gray-200 rounded-md overflow-hidden flex justify-center items-center"
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
            {$$props.artist.nickName}
          </p>
        </div>
        <p class="text-sm lg:text-lg">
          {$$props.artist.firstName}
          {$$props.artist.surName}
        </p>
        <div class="mt-4 text-xs opacity-75 ">
          <!-- // Todo: add bio to database -->
          {#if $$props.artist.bio && $$props.artist.bio.length > 2}
            <p class="flex lg:hidden">
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
            <p class="hidden lg:flex">
              {$$props.artist.bio}
            </p>
          {:else}
            Artist has not biography yet.{/if}
        </div>
      </div>
      <div class="flex justify-between items-center">
        <div
          class="mshadow-md text-sm rounded-full flex h-8 text-center bg-opacity-10 bg-white  px-4 justify-center items-center"
        >
          {$$props.artist.role.name}
        </div>

        <p class="text-sm capitalize opacity-50 text-right">
          {$$props.artist.country}, {$$props.artist.city}
        </p>
      </div>
    </div>
  </div>
</div>
