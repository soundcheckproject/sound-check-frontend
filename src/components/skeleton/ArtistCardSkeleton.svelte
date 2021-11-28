<script lang="ts">
  export let theme: 'white' | 'light' | 'dark' = 'light'
  export let loading = true
</script>

<article
  class="cursor-pointer relative p-0 w-full h-40  rounded-md {theme == 'white'
    ? 'bg-white text-white'
    : theme == 'light'
    ? 'bg-gray-400 text-gray-400'
    : theme == 'dark'
    ? 'bg-gray-700 text-gray-700'
    : ''} {loading && 'animate-pulse'}"
>content</article>
