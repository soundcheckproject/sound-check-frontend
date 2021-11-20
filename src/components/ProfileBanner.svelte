<div
  class="relative overflow-hidden  backdrop-blur-sm text-gray-50 grid  bg-gray-800 rounded-md"
>
  <div
    class="absolute w-full z-1 h-full filter blur-3xl opacity-75"
    style={`background:url('${$$props.artist.logo}') center center no-repeat;background-size:cover`}
  />
  <div class="z-10 grid grid-cols-min-auto p-6 lg:p-12 gap-6 lg:gap-12">
    <div
      class="w-32 h-32 lg:h-64 lg:w-64 mshadow-md bg-gray-200 rounded-md overflow-hidden"
    >
      <img
        class="object-cover h-full w-full object-fit "
        alt="logo"
        src={$$props.artist.logo}
      />
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

        <p
          class="text-sm capitalize opacity-50 text-right"
        >
          {$$props.artist.country}, {$$props.artist.city}
        </p>
      </div>
    </div>
  </div>
</div>
