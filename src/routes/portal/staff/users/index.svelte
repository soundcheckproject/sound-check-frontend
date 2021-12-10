<script lang="ts">
  import Box from '../../../../components/Box.svelte'
  import Title from '../../../../components/Title.svelte'
  import SubTitle from '../../../../components/SubTitle.svelte'
  import Skeleton from '../../../../components/Skeleton.svelte'
  import { onMount } from 'svelte'
  import { getArtists, query } from '../../../../utils/useGraphQL'
  import type { UserType, ArtistType } from 'src/types/User.type'
  import { goto } from '$app/navigation'

  let users: ArtistType[] = []
  let filterValue: string,
    searchValue: string = ''

  let filteredUsers: UserType[] = []

  const filterUsers = () => {
    if (filterValue == 'all') filteredUsers = users
    else
      filteredUsers = users.filter(user =>
        user.role.slug.toLowerCase().includes(filterValue.toLowerCase()),
      )
  }
  // Todo: combine filter & search
  const searchUsers = () => {
    if (searchValue.length > 0)
      filteredUsers = users.filter(
        user =>
          user.nickName.toLowerCase().substring(0, searchValue.length) ==
            searchValue.toLowerCase().substring(0, searchValue.length) ||
          user.email.toLowerCase().substring(0, searchValue.length) ==
            searchValue.toLowerCase().substring(0, searchValue.length),
      )
    else filterUsers()
  }
  onMount(async () => {
    users = await query(
      'getUsers',
      `query GetUsers {
        getUsers {
          uuid
          nickName
          firstName
          surName
          birthdate
          email
          country
          logo
          role{
            slug
            name
          }
        }
      }`,
    )
  })
  $: {
    // console.log(searchValue)
    filteredUsers = users
  }
</script>

<svelte:head>
	<title>Users</title>
</svelte:head>

<Box>
  <Title>
    <div class="grid sm:grid-cols-2 items-center">
      <h1>Users</h1>
      <div class="flex space-x-2 sm:ml-auto">
        <select
          class="portal input w-32"
          bind:value={filterValue}
          on:change={() => filterUsers()}
        >
          <option value="all">All</option>
          <option value="user">User</option>
          <option value="label-artist">Label Artist</option>
          <option value="label-ar">Label A&R</option>
          <option value="label-manager">Label manager</option>
        </select>

        <label>
          <input
            bind:value={searchValue}
            on:input={() => searchUsers()}
            class="input portal"
            placeholder="Search.."
          />
        </label>
      </div>
    </div>
  </Title>
  <div class="grid gap-4">
    {#if users.length === 0}
      <Skeleton loading={true}>Loading users..</Skeleton>
    {:else}
      {#each filteredUsers as user}
        <a
          href={`/portal/staff/users/${user.uuid}`}
          class="grid grid-cols-auto-1fr justify-start gap-4"
        >
          <div
            class="h-24 w-24 bg-gray-100 rounded-md flex justify-center items-center"
          >
            {#if user.logo}
              <img
                src={user.logo}
                alt={user.nickName}
                class="bg-gray-100 h-full w-full rounded-md  object-cover "
              />
            {:else}
              <svg
                class="text-gray-400 opacity-90"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>{/if}
          </div>
          <div
            class=" bg-gray-100 border-gray-100 hover:border-gray-300 transition-colors w-full grid sm:gap-6 grid-cols-1 sm:grid-cols-2 items-center p-4 rounded-md cursor-pointer lg:grid-cols-150-auto-fr"
          >
            <div>
              <p class="font-semibold">{user.nickName}</p>
              <p class="text-sm">{user.firstName} {user.surName}</p>
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
              <a class="hidden sm:block" href={`/portal/staff/users/${user.uuid}-edit`}>
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
        </a>
      {/each}
    {/if}
  </div>
</Box>
