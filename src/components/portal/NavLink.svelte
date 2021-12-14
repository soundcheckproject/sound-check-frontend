<!-- src/lib/components/NavLink.svelte -->
<script>
  import { page } from '$app/stores'
  import { menuState } from '../../stores/stores'
  import { fade, fly, slide } from 'svelte/transition'

  import SubLink from './SubLink.svelte'

  let isActive = false

  // let hrefSplit = $$props.href.split('/')
  // let hrefSlice = hrefSplit.slice(1, hrefSplit.length)
  // let lastSlice = hrefSlice[hrefSlice.length - 1]

  // let pageActive =
  // 	$$props.href.split('/').includes(hrefSlice[hrefSlice.length - 1]) &&
  // 	$$props.href.split('/').includes(hrefSlice[hrefSlice.length - 2])

  // $: isActive = $page.path === $$props.href
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a
  href={$$props.routes ? '' : $$props.href}
  class={`focus:outline-none rounded-sm focus:bg-gray-700 p-2 ${
    $menuState && 'flex justify-center'
  }`}
  class:active={$page.path === $$props.href}
  on:click={() => {
    isActive = !isActive
  }}
>
  <slot />
  {#if !$menuState}
    <p
      class="ml-4"
      in:fly|local={{ x: -50, opacity: 0, duration: 200, delay: 200 }}
      out:fade|local
    >
      {$$props.name}
    </p>

    {#if $$props.routes}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    {/if}
  {/if}
</a>
{#if $$props.routes && isActive && !$menuState}
  <!-- <div in:fly={{ y: 200, duration: 200 }} out:fade> -->
  <div
    in:slide|local={{ duration: 200, delay: 200 }}
    out:slide|local={{ duration: 200 }}
  >
    <SubLink routes={$$props.routes} />
  </div>
{/if}

<style>
  svg {
    @apply text-teal-300;
  }
  a {
    @apply flex;

    @apply items-center;
    @apply text-white;
    @apply text-opacity-90;
  }
  a p {
    position: relative;

    @apply items-center;
    @apply gap-1;
    @apply transition-opacity;
  }
  svg {
    @apply text-gray-100;
    @apply opacity-50;
    @apply ml-2;
    @apply mt-1;
    @apply -rotate-90;

    @apply transition-all;
  }
  a:hover svg,
  a.active:hover svg {
    @apply rotate-0;
    @apply opacity-100;
  }

  a p:hover {
    opacity: 0.6;
  }

  a p::before {
    content: '';
    position: absolute;
    bottom: -4px;

    height: 2px;

    opacity: 0;
    border-radius: 1px;

    @apply bg-white;
    width: 25%;

    transition: width 0.2s ease-out, opacity 0.2s ease-out;
    will-change: width, opacity;
  }
  a p:hover::before,
  a.active p::before {
    width: 100%;
    opacity: 0.6;
  }
</style>
