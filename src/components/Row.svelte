<script lang="ts">
  export let artworkSource = ''
</script>

<div class="relative flex space-x-3 h-12 ">
  <img class="rounded-sm" src={artworkSource} alt="artwork" />
  <div
    class="px-4 items-center justify-between flex w-full rounded-sm text-sm bg-gray-100"
  >
    <slot />
    <div class="grid grid-flow-col gap-3 items-center">
      <div class="hidden sm:flex text-xs text-gray-400">15th of octover</div>
      <div>
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
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </div>
    </div>
    <div class="absolute -top-1 -right-1 p-2  bg-red-500 rounded-full" />
  </div>
</div>
