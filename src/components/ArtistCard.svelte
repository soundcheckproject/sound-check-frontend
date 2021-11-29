<script lang="ts">
  import type { UserType } from '../types/User.type'

  export let artist: UserType
</script>

<article class="cursor-pointer relative p-0 w-full h-full">
    <img class="rounded-md shadow-xl w-full h-full object-cover" src="{artist.logo}" alt="">
    <div class="p-4 absolute inset-0 rounded-md bg-gradient-to-b from-transparent via-transparent to-gray-900 bg-opacity-50 flex items-end">
        <p class="text-white font-bold text-lg lg:text-xl ">{artist.nickName}</p>
    </div>
</article>
