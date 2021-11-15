<script lang="ts">
  import Box from '../../../../components/Box.svelte'
  import Title from '../../../../components/Title.svelte'
  import SubTitle from '../../../../components/SubTitle.svelte'
  import Skeleton from '../../../../components/Skeleton.svelte'
  import { onMount } from 'svelte'
  import { getArtists } from '../../../../utils/useGraphQL'
  import type { UserType, ArtistType } from 'src/types/User.type'
  import { goto } from '$app/navigation'

  let users: ArtistType[] = []

  onMount(async () => {
    users = await getArtists()
  })
</script>

<Box>
  <Title>All users</Title>
  <SubTitle
    ><div class="flex justify-between">
      <div>Search</div>
      <div>search icon</div>
    </div></SubTitle
  >
  <div class="grid gap-4">
    {#if users.length === 0}
      <Skeleton>Loading users</Skeleton>
    {:else}
      {#each users as user}
        <div
          on:click={() => goto(`/portal/staff/users/${user.uuid}`)}
          class="grid gap-6 grid-flow-col items-center"
          style="grid-template-columns: min-content auto auto 100px min-content;"
        >
          <div class="h-24 w-24 bg-gray-100 rounded-md overflow-hidden">
            <img src={user.logo} alt="" class="h-full w-full" />
          </div>
          <div>
            <p class="font-semibold">{user.nickName}</p>
            <div>{user.firstName} {user.surName}</div>
          </div>
          <div>{user.email}</div>
          <div>{user.country}</div>
          <div class="">{user.role.name}</div>
          <div class="justify-self-end">edit</div>
        </div>
      {/each}
    {/if}
  </div>
</Box>
