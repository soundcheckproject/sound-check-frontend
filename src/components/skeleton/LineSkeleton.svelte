<script lang="ts">
  export let theme: 'white' | 'light' | 'dark' = 'light'
  export let height = 4
  export let width: 'w-1/6' | 'w-2/6' | 'w-3/6' | 'w-4/6' | 'w-5/6' | 'w-full' = 'w-full'
  export let loading = true
  export let lines = 1
</script>

<div class="grid gap-2">
  {#each Array(lines) as i}
    <p
      class="{width} h-{height} opacity-80 rounded-md {loading && 'animate-pulse'} {theme ==
      'white'
        ? 'bg-white'
        : theme == 'light'
        ? 'bg-gray-400'
        : theme == 'dark'
        ? 'bg-gray-700'
        : ''}"
    />
  {/each}
</div>
