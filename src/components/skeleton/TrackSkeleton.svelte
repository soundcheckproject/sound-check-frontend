<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'lg'
    export let theme: 'white' | 'light' | 'dark' = 'light'
    export let loading = true
</script>



  <div
    class=" relative flex justify-center items-center flex-none"
  >
    <div
      class="{
        size == 'sm'
          ? ' h-32 w-32'
          : size == 'md'
          ? ' h-48 w-48'
          : size == 'lg'
          ? ' h-64 w-64'
          : ''
      } {theme ==
      'white'
        ? 'bg-white'
        : theme == 'light'
        ? 'bg-gray-400'
        : theme == 'dark'
        ? 'bg-gray-700'
        : ''} {loading && 'animate-pulse'}  rounded-md mshadow-sm opacity-80 outline-none object-cover"
    />
  </div>

