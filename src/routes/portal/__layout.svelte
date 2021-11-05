<script lang="ts">
  import PortalNavigation from '../../components/portal/PortalNavigation.svelte'
  import { page } from '$app/stores'
  import { fade, fly } from 'svelte/transition'
  import AuthLayer from '../../components/AuthLayer.svelte'
  import { goto } from '$app/navigation'

  let pageBread = []

  $: {
    pageBread = $page.path.split('/')
    pageBread.splice(0, 2)
  }
</script>

<AuthLayer>
  <div class="c-portal">
    <PortalNavigation />
    <div class="p-8  bg-gray-100 h-screen w-full overflow-y-scroll">
      <p
        class="text-gray-800 mb-8 flex space-x-2 uppercase text-sm items-center"
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
          <!-- <a
            class="hover:underline"
            in:fly={{ x: -50, duration: 200 }}
            out:fade={{ duration: 200 }}
            href=""
            on:click={() =>
              goto(`/portal/${pageBread.slice(0, index + 1).join('/')}`)}
            >{bread}
          </a> -->
          <a
            class="hover:underline"
            in:fly={{ x: -50, duration: 200 }}
            out:fade={{ duration: 200 }}
            href={`/portal/${pageBread.slice(0, index + 1).join('/')}`}
            >{bread}
          </a>
        {/each}
      </p>
      <div class=""><slot /></div>
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
