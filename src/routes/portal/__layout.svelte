<script lang="ts">
  import PortalNavigation from '../../components/portal/PortalNavigation.svelte'
  import { page } from '$app/stores'
  import { fade, fly } from 'svelte/transition'
  import AuthLayer from '../../components/AuthLayer.svelte'
  import {
    pageSelectedStore,
    trackSelectedStore,
    userSelectedStore,
  } from '../../stores/stores'

  let pageBread = []

  $: {
    pageBread = $page.path.split('/')
    pageBread.splice(0, 2)
  }
  let nav: any
  const scrollUp = () => {
    nav.scrollTop = 0
    // Todo: smooth scroll to top
    // window.scrollTo({top: 0, behavior: 'smooth'});
  }
</script>

<AuthLayer>
  <div class="c-portal" transition:fade|local={{ duration: 200 }}>
    <PortalNavigation />
    <main
      class="p-8  bg-gray-100 h-screen w-full overflow-y-scroll"
      bind:this={nav}
    >
      <div class="mx-auto max-w-[62rem]">
        <p
          class="-ml-3 text-gray-800 mb-8 grid grid-flow-col-dense justify-start gap-2 uppercase text-sm items-center"
        >
          {#each pageBread as bread, index}
            {#if index != 0}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                class="opacity-25"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            {/if}

            {#if pageBread[index - 1] == 'demo' || pageBread[index - 1] == 'users'}
              {#if $pageSelectedStore}
                <a
                  class="transition-all hover:underline py-2 px-3 focus:bg-gray-700 focus:outline-none focus:text-white focus:no-underline	 rounded-full"
                  href={`/portal/${pageBread.slice(0, index + 1).join('/')}`}
                  >{$pageSelectedStore.title}</a
                >
                {#if $page.path.indexOf('edit') != -1}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    class="opacity-25 mr-3"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <div
                    class="px-2 rounded-md py-px text-[.7rem] bg-black/10"
                    in:fly|local={{ x: -50, duration: 200 }}
                    out:fade|local={{ duration: 200 }}
                  >
                    Edit
                  </div>
                {/if}
              {/if}
            {:else}
              <a
                class="transition-all hover:underline py-2 px-3 focus:bg-gray-700 focus:outline-none focus:text-white focus:no-underline	 rounded-full"
                in:fly|local={{ x: -50, duration: 200 }}
                out:fade|local={{ duration: 200 }}
                href={`/portal/${pageBread.slice(0, index + 1).join('/')}`}
              >
                {bread}</a
              >
            {/if}
          {/each}
        </p>
        <section class="p-0 m-0"><slot /></section>
      </div>
    </main>

    <div
      on:click={() => scrollUp()}
      class="backdrop-blur-2xl absolute right-12 bottom-12 rounded-full bg-opacity-25 bg-gray-500 p-4 text-white cursor-pointer hover:bg-opacity-75 transition-all"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </div>
  </div>
</AuthLayer>

<style>
  .c-portal {
    display: grid;
    grid-template-columns: min-content 1fr;
    height: 100vh;
    width: 100vw;
  }
</style>
