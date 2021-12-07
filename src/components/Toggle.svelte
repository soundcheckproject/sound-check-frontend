<script lang="ts">
  export let value = false
</script>

<div
  on:click={() => (value = !value)}
  class="bg-gray-200 p-1 transition-colors hover:bg-gray-300 rounded-full w-14 h-8  mshadow-sm cursor-pointer"
>
  <div
    class="transition-all transform bg-teal-700 rounded-full h-6 w-6 shadow-sm {value
      ? 'translate-x-full '
      : 'translate-x-0 '}"
  />
</div>
