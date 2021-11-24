<script lang="ts">
  export let theme: 'white' | 'light' | 'dark' = 'light'
  export let height = 4
  export let loading = false
  export let lines = 1
</script>

<!-- {loading
    ? 'animate-pulse '
    : ''} rounded-md justify-center items-center py-12 {theme == 'white'
    ? 'bg-white'
    : theme == 'light'
    ? 'bg-gray-100'
    : theme == 'dark'
    ? 'bg-gray-700'
    : ''} opacity-{opacity} -->

<div class="grid gap-2">
  {#each Array(lines) as i}
    <p
      class="w-full h-{height} opacity-80 {loading &&
        'animate-pulse'} {theme == 'white'
        ? 'bg-white'
        : theme == 'light'
        ? 'bg-gray-100'
        : theme == 'dark'
        ? 'bg-gray-700'
        : ''}"
    />
  {/each}
</div>
