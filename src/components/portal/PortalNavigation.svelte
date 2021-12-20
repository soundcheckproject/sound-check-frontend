<script lang="ts">
  import { fade, fly } from 'svelte/transition'

  import NavLink from './NavLink.svelte'

  import RoleLayer from '../RoleLayer.svelte'
  import { labelStore, menuState } from '../../stores/stores'
  import { logout } from '../../utils/useFirebase'
  import userStore from '../../stores/userStore'
  import { RoleName } from '../../types/Role.type'
</script>

<div class={$menuState ? 'block sm:hidden' : 'hidden'}>
  <div
    class={`absolute right-6 top-6 transition-all delay-200 cursor-pointer bg-gray-700 backdrop-blur-sm z-10 p-2 rounded-full transform ${
      $menuState && 'rotate-180'
    }`}
    on:click={() => menuState.set(!$menuState)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      class="-ml-px"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  </div>
</div>
<aside
  in:fly|local={{ x: -300, duration: 200 }}
  class={`bg-gray-900 px-12 pt-12 pb-8 text-white mshadow-md group c-portal transition-all delay-200  ${
    $menuState
      ? 'w-[calc(100vw-2.5rem)] sm:w-28 px-6 hidden sm:block'
      : 'w-[calc(100vw-2.5rem)] sm:w-72'
  }`}
>
  <div class="flex flex-col justify-between h-full space-y-12 ">
    <div class="flex gap-6 flex-col items-start relative">
      <div
        class={`transition-all delay-200 lg:opacity-0 lg:group-hover:opacity-100 cursor-pointer bg-gray-700 backdrop-blur-sm absolute z-10 p-2 right-0 -mt-6 sm:-mt-1 rounded-full transform ${
          $menuState ? 'rotate-180  -mr-10' : ' -mr-16'
        }`}
        on:click={() => menuState.set(!$menuState)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          class="-ml-px"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </div>
      <h1 class="text-3xl font-bold -mt-2">
        <a
          href="/portal"
          class="transition-opacity opacity-25 h-8 mb-1 flex focus:opacity-50"
        >
          {#if !$menuState}<div
              in:fly|local={{ opacity: 0, duration: 200, delay: 200 }}
              out:fade|local
              class="absolute left-0 right-0 text-center"
            >
              {#if $labelStore}{$labelStore.name}{:else}SoundCheck{/if}
            </div>{:else}<div
              in:fly|local={{ opacity: 0, duration: 200, delay: 200 }}
              out:fade|local
              class="absolute left-0 right-0 text-center"
            >
              {#if $labelStore}{$labelStore.shortName}{:else}SC{/if}
            </div>{/if}
        </a>
      </h1>

      <hr />
      <a
        href="/portal/profile"
        class="transition-colors text-lg flex items-center w-full cursor-pointer outline-none rounded-full focus:bg-gray-700 p-2"
      >
        {#if $userStore.logo}
          <img
            alt="Artist {$userStore.nickName}"
            src={$userStore.logo}
            class="object-cover w-12 h-12 bg-gray-300 rounded-full mshadow-sm "
          />
        {/if}
        {#if !$menuState}
          <p
            in:fly|local={{ x: -50, opacity: 0, duration: 200, delay: 200 }}
            out:fade|local={{ duration: 200, delay: 0 }}
            class="font-semibold w-96 ml-4"
          >
            {$userStore.nickName ?? 'Nickname'}
          </p>
        {/if}
      </a>
      <hr />
      <div class="text-sm grid -py-2 w-full transition-all delay-200">
        <RoleLayer allowedForRoles={[RoleName.LabelArtist, RoleName.User]}>
          <NavLink href="/portal/artist" name="Overview"
            ><svg
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
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </NavLink>

          <NavLink href="/portal/artist/demo" name="Tracks"
            ><svg
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
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </NavLink>
          <NavLink href="/portal/artist/demo/submit" name="Submit track"
            ><svg
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
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </NavLink>
        </RoleLayer>

        <RoleLayer allowedForRoles={[RoleName.LabelAR, RoleName.LabelManager]}>
          <NavLink href="/portal/staff" name="Overview" class="">
            <svg
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
              <line x1="10" y1="6" x2="21" y2="6" />
              <line x1="10" y1="12" x2="21" y2="12" />
              <line x1="10" y1="18" x2="21" y2="18" />
              <polyline points="3 6 4 7 6 5" />
              <polyline points="3 12 4 13 6 11" />
              <polyline points="3 18 4 19 6 17" />
            </svg>
          </NavLink>

          <!-- routes={[
            { path: '/portal/staff/demo', pathName: 'New ' },
            { path: '/portal/staff/demo', pathName: 'Pending ' },
            { path: '/portal/staff/demo', pathName: 'Approved ' },
            { path: '/portal/staff/demo', pathName: 'Denied' },
          ]} -->
          <NavLink href="/portal/staff/demo" name="Demos"
            ><svg
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
              <path d="M3 18v-6a9 9 0 0118 0v6" />
              <path
                d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"
              />
            </svg>
          </NavLink>
          <NavLink href="/portal/staff/users" name="Users" class="">
            <svg
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
                d="M19 22H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2z"
              />
              <line x1="16" y1="2" x2="16" y2="4" />
              <line x1="8" y1="2" x2="8" y2="4" />
              <circle cx="12" cy="11" r="3" />
              <path d="M17 18.5c-1.4-1-3.1-1.5-5-1.5s-3.6.6-5 1.5" />
            </svg>
          </NavLink>

          <NavLink href="/portal/staff/tracks" name="Tracks" class="">
            <svg
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
                d="M20 9v9a2 2 0 01-2 2H6a2 2 0 01-2-2V9m16-5H4a2 2 0 00-2 2v1a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-10 9h4"
              />
            </svg>
          </NavLink>
        </RoleLayer>
      </div>
      <hr />
      <div class="text-sm grid gap-4 w-full transition-all delay-200">
        <NavLink href="/" name="Home">
          <svg
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
            <circle cx="12" cy="12" r="10" />
            <polygon
              points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
            />
          </svg>
        </NavLink>
      </div>
    </div>
    <button
      on:click={logout}
      class="h-18 outline-none	overflow-hidden flex space-x-4 items-center justify-between text-sm p-4 px-6 bg-gray-100 -mx-2 rounded-sm bg-opacity-10 mshadow-md cursor-pointer transition-transform hover:opacity-80 focus-ring"
    >
      {#if !$menuState}
        <p
          in:fly|local={{ x: -50, opacity: 0, duration: 200, delay: 200 }}
          out:fade|local
        >
          Logout
        </p>
      {/if}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        class={`transition-transform ${$menuState ? 'ml-1' : ''} rotate-180`}
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    </button>
  </div>
</aside>

<style lang="postcss">
  hr {
    background: white;
    border: 1px solid white;
    @apply border-gray-400;
    opacity: 0.2;
    width: 100%;
  }

  svg {
    @apply text-teal-300;
  }
  p {
    position: relative;
    display: flex;

    @apply items-center;
    @apply gap-1;
  }
</style>
