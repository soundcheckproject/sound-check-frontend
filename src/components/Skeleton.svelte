<script lang="ts">
  export let theme: 'white' | 'light' | 'dark' = 'light'
  export let opacity = 100
</script>

<div
  class="grid gap-2  animate-pulse rounded-md justify-center items-center py-12 {theme == 'white'
    ? 'bg-white'
    : theme == 'light'
    ? 'bg-gray-100'
    : theme == 'dark'
    ? 'bg-gray-700'
    : ''} opacity-{opacity} "
>
  <div><slot /></div>
  <!-- <div> </div> -->
</div>
