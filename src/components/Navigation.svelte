<script lang="ts">
  import { labelStore } from '../stores/stores'
  import NavigationLink from './NavigationLink.svelte'

  import _, {
    langStore,
    languageStore,
    translationsStore,
  } from '../stores/languageStore'
  import { goto } from '$app/navigation'

  let toggleMenu: Boolean = false
  let showMobileLangMenu: Boolean = false
</script>

<nav class="flex py-8 flex-row justify-between items-center">
  {#if $labelStore}
    <a href="/" id="home" class="outline-none focus:scale-105">
      <h1 class="text-xl font-bold">{$labelStore.name}</h1></a
    >
  {:else}
    <h1 class="text-xl font-bold">SoundCheck</h1>
  {/if}
  <div
    class="hidden font-regular sm:grid text-xs lg:text-sm gap-2 sm:gap-6 lg:gap-8 grid-flow-col transition-all items-center"
  >
    <NavigationLink href="/">{$_.header.home}</NavigationLink>
    <NavigationLink href="/releases">{$_.header.releases}</NavigationLink>
    <NavigationLink href="/artists">{$_.header.artists}</NavigationLink>
    <NavigationLink href="/#info">{$_.header.info}</NavigationLink>
    <NavigationLink href="/#contact">{$_.header.contact}</NavigationLink>
    <button
      on:click={() => goto('/login')}
      class="relative group outline-none focus:scale-150"
    >
      <NavigationLink href="/login">Portal</NavigationLink>
      <div class="absolute hidden group-focus:block group-hover:block pt-3">
        <div
          class="text-white bg-gray-500 hover:bg-gray-700 grid gap-2 text-xs px-5 py-4 rounded-md -ml-4"
        >
          <NavigationLink href="/login">login</NavigationLink>
          <NavigationLink href="/register">register</NavigationLink>
          <!-- <a href="/login">login</a>
          <a href="/register">register</a> -->
        </div>
      </div>
    </button>
    <button class="focus-ring group relative">
      <div
        class="py-2 px-3 text-white bg-white/10 rounded-md text-xs flex space-x-2 uppercase justify-between"
      >
        <div>{$languageStore.flag}</div>
        <div>{$languageStore.code}</div>
        <div>
          <svg
            class="opacity-75 -rotate-90 group-hover:rotate-0 transition-transform"
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
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      <div
        class="gap-2 hidden pt-2 absolute hover:grid group-hover:grid opacity-0 group-hover:opacity-100 transition-all"
      >
        {#each Object.keys($translationsStore) as key}
          <div
            class="mshadow-md transition-all py-2 px-3 text-white bg-gray-500 rounded-md text-xs flex space-x-2 cursor-pointer hover:bg-gray-700"
            on:click={() => {
              langStore.set(key)
            }}
          >
            <div>{$translationsStore[key].flag}</div>
            <div>{$translationsStore[key].language}</div>
          </div>
        {/each}
      </div>
    </button>
    <!-- Test data -->
    <!-- {$languageStore.language}
    {$languageStore.flag} -->
    <!-- {$_.header.artists}
    {$_.home.title}
    {$_.home.description}
    {$_.home.learnmore} -->

    <div class="grid sm:hidden">=</div>
  </div>

  <div
    class="transition-all sm:hidden cursor-pointer p-2 text-white bg-gray-200 bg-opacity-20 backdrop-blur-sm rounded-full"
    on:click={() => (toggleMenu = true)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      class=""
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      ><line x1="3" y1="12" x2="21" y2="12" /><line
        x1="3"
        y1="6"
        x2="21"
        y2="6"
      /><line x1="3" y1="18" x2="21" y2="18" /></svg
    >
  </div>

  <aside
    class="{toggleMenu
      ? '-translate-x-screen-w'
      : 'translate-x-screen-w'} ease-out duration-200 fixed w-screen h-screen z-50 inset-0 bg-gray-900 grid place-items-center gap-12"
  >
    <div
      class="absolute top-8 right-6 cursor-pointer p-2 bg-gray-200 backdrop-blur-sm rounded-full"
      on:click={() => (toggleMenu = false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        class="text-gray-900"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        ><line x1="18" y1="6" x2="6" y2="18" /><line
          x1="6"
          y1="6"
          x2="18"
          y2="18"
        /></svg
      >
    </div>
    <ul
      class="grid gap-8 text-center font-bold self-end"
      on:click={() => (toggleMenu = false)}
    >
      <NavigationLink tabindex="-1" href="/">{$_.header.home}</NavigationLink>
      <NavigationLink tabindex="-1" href="/releases"
        >{$_.header.releases}</NavigationLink
      >
      <NavigationLink tabindex="-1" href="/artists"
        >{$_.header.artists}</NavigationLink
      >
      <NavigationLink tabindex="-1" href="/#info"
        >{$_.header.info}</NavigationLink
      >
      <NavigationLink tabindex="-1" href="/#contact"
        >{$_.header.contact}</NavigationLink
      >
      <NavigationLink tabindex="-1" href="/login">Portal</NavigationLink>
    </ul>
    <button
      on:click={() => {
        showMobileLangMenu = !showMobileLangMenu
      }}
      tabindex="-1"
      class="focus-ring relative self-start"
    >
      <div
        class="py-2 px-3 text-white bg-white/10 rounded-md text-xs flex space-x-2 uppercase justify-between"
      >
        <div>{$languageStore.flag}</div>
        <div>{$languageStore.code}</div>
        <div>
          <svg
            class="opacity-75 -rotate-90 {showMobileLangMenu &&
              'rotate-0'} transition-transform"
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
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      <div
        class="gap-2 pt-2 absolute  {showMobileLangMenu
          ? 'grid opacity-100'
          : 'hidden opacity-0'} group-hover:opacity-100 transition-all"
      >
        {#each Object.keys($translationsStore) as key}
          <div
            class="mshadow-md transition-all py-2 px-3 text-white bg-gray-500 rounded-md text-xs flex space-x-2 cursor-pointer hover:bg-gray-700"
            on:click={() => {
              langStore.set(key)
            }}
          >
            <div>{$translationsStore[key].flag}</div>
            <div>{$translationsStore[key].language}</div>
          </div>
        {/each}
      </div>
    </button>
  </aside>
</nav>

<!-- <style lang="postcss">
  a {
    @apply transition-all uppercase text-white text-opacity-75;
  }
  a:hover {
    @apply text-opacity-100
		/* text-shadow: 1px 0 rgba(255, 255, 255, 0.75); */;
  }
</style> -->
