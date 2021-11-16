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
  $: {
    console.log(users)
  }
</script>

<Box>
  <Title>All users</Title>
  <SubTitle>
    <div class="flex justify-between w-full items-center">
      <div>Filters</div>
      <div class="flex space-x-2">
        <select class="portal input w-32">
          <option value="all">All</option>
          <option value="user">User</option>
          <option value="label-artist">Label Artist</option>
          <option value="label-ar">Label A&R</option>
          <option value="label-manager">Label manager</option>
        </select>

        <label>
          <input class="input portal" placeholder="Search.." />
        </label>
      </div>
    </div>
  </SubTitle>
  <div class="grid gap-4">
    {#if users.length === 0}
      <Skeleton>Loading users..</Skeleton>
    {:else}
      {#each users as user}
        <div
          on:click={() => goto(`/portal/staff/users/${user.uuid}`)}
          class="flex space-x-4 "
        >
          <img
            src={user.logo}
            alt={user.nickName}
            class="h-24 w-24 bg-gray-100  rounded-md  object-cover "
          />

          <div
            class="bg-gray-100 border-2 border-gray-100 hover:border-gray-300 transition-colors w-full grid gap-6 grid-flow-col items-center px-8 rounded-md cursor-pointer grid-template-columns-150-fr lg:grid-template-columns-150-auto-fr"
          >
            <div>
              <p class="font-semibold">{user.nickName}</p>
              <div class="text-sm">{user.firstName} {user.surName}</div>
            </div>
            <div
              class="hidden lg:grid grid-flow-col items-center justify-start gap-4 text-gray-400"
            >
              <div class="text-sm">{user.email}</div>
              <div class="text-xs">🇧🇪</div>
            </div>

            <div class="justify-self-end grid grid-flow-col gap-4 items-center">
              <div
                class="hidden lg:flex text-sm px-4 py-2 bg-gray-200 text-gray-800 rounded-full"
              >
                {user.role.name}
              </div>
              <a href={`/portal/staff/users/${user.uuid}-edit`}>
                <svg
                  class="text-gray-700"
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
                  <path
                    d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                  />
                  <path
                    d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</Box>
