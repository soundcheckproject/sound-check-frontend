<script lang="ts">
  import _, {
    languageStore,
    langStore,
    translationsStore,
  } from '../stores/languageStore'

  import Container from './Container.svelte'
  import Navigation from './Navigation.svelte'

  export let type: 'split' | 'full' = 'full'
</script>

<div
  class="w-screen {type == 'full'
    ? ' h-full sm:h-screen'
    : ''}  gradientBlueGreen text-white"
>
  <Container className="sm:w-full">
    <div
      class="grid w-full {type == 'full'
        ? ' h-screen'
        : ''} items-center appHeaderGrid "
    >
      <Navigation />
      <slot />
    </div>
  </Container>
  <div class="absolute top-8 right-12 grid  gap-2 justify-end group">
    <div
      class="py-2 px-3 text-white bg-white/10 rounded-md text-xs flex space-x-2 uppercase justify-between "
    >
      <div>{$languageStore.flag}</div>
      <div>{$languageStore.code}</div>
      <div >
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
      class="gap-2 hidden group-hover:grid opacity-0 group-hover:opacity-100 transition-all"
    >
      {#each Object.keys($translationsStore) as key}
        <div
          class="mshadow-md transition-all backdrop-blur-lg py-2 px-3 text-white bg-black/20 rounded-md text-xs flex space-x-2 cursor-pointer hover:bg-black/30 "
          on:click={() => {
            langStore.set(key)
          }}
        >
          <div>{$translationsStore[key].flag}</div>
          <div>{$translationsStore[key].language}</div>
        </div>
      {/each}
    </div>
    <!-- Test data -->
    <!-- {$languageStore.language}
    {$languageStore.flag} -->
    <!-- {$_.header.artists}
    {$_.home.title}
    {$_.home.description}
    {$_.home.learnmore} -->
  </div>
</div>
