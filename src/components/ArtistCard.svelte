<script lang="ts">
  import { fade, fly } from 'svelte/transition'

  import type { UserType } from '../types/User.type'

  export let artist: UserType
</script>

<a
  href="/artists/{artist.uuid}"
  in:fly={{ y: 25, opacity: 0, duration: 200, delay: 200 }}
  out:fade={{ duration: 200 }}
  class="cursor-pointer relative p-0 w-full h-full mshadow-sm hover:shadow-2xl hover:scale-105 focus:scale-105 focus:shadow-2xl transition-all ease-out outline-none"
>
<div class="w-full pb-[100%]">
  <img
    class="rounded-md w-full h-full object-cover absolute inset-0"
    src={artist.logo}
    alt=""
  />

</div>
  <div
    class="p-4 absolute inset-0 rounded-md bg-gradient-to-b from-transparent via-transparent to-gray-900 bg-opacity-50 flex items-end"
  >
    <p class="text-white font-bold text-lg lg:text-xl ">{artist.nickName}</p>
  </div>
</a>
