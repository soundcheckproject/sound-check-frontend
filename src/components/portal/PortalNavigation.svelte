<script lang="ts">
  import { fade, fly } from 'svelte/transition'

  import NavLink from './NavLink.svelte'

  import { goto } from '$app/navigation'

  import RoleLayer from '../RoleLayer.svelte'
  import { menuState } from '../../stores/stores'
  import { logout } from '../../utils/useFirebase'
  import userStore from '../../stores/userStore'
</script>

<aside
  in:fly={{ x: -300, duration: 200 }}
  class={`bg-gray-900 px-12 pt-12 pb-8 text-white mshadow-md group c-portal transition-all delay-200 ${
    $menuState ? ' w-24 px-6' : 'w-72'
  }`}
>
  <div class="flex flex-col justify-between h-full space-y-12 ">
    <div class="flex gap-6 flex-col items-start relative">
      <div
        class={`transition-all delay-200 opacity-0 group-hover:opacity-100 cursor-pointer bg-gray-700 backdrop-blur-sm absolute  z-10 p-2 right-0 -mt-1 rounded-full transform ${
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
      <h1 class="text-3xl font-bold -mt-2 relative flex items-center ">
        <div class="opacity-25">
          {#if !$menuState}SoundCheck{:else}SC{/if}
        </div>
      </h1>

      <hr />
      <a
        href="/portal/profile"
        class="text-lg flex space-x-4 items-center h-12 cursor-pointer"
      >
        <img
          alt="Artist"
          src="https://partyflock.nl/images/artist/61243_1080x1080_585775/Martin-Garrix.webp"
          class=" w-12 h-12 bg-gray-300  rounded-full mshadow-sm "
        />
        {#if !$menuState}
          <p
            in:fly={{ x: -50, opacity: 0, duration: 200, delay: 200 }}
            out:fade={{ duration: 200, delay: 0 }}
            class="font-semibold w-96"
          >
            {$userStore.nickName ?? 'Nickname'}
          </p>
        {/if}
        <!-- <p class="font-semibold break-all">{$authStore.user.providerData[0]?.email}</p> -->
      </a>
      <hr />
      <div
        class={`text-sm grid gap-4 w-full transition-all delay-200 ${
          $menuState ? ' ml-4' : ''
        }`}
      >
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

        <NavLink
          href=""
          name="Music"
          routes={[
            { path: '/portal/artist/demo/submit', pathName: 'Submit' },
            { path: '/portal/artist/demo', pathName: 'All tracks' },
            { path: '/portal/artist/demo', pathName: 'Pending' },
            { path: '/portal/artist/demo', pathName: 'Approved' },
            { path: '/portal/artist/demo', pathName: 'Denied' },
          ]}
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

        <RoleLayer allowedForRoles={['artist', 'label-ar', 'label-manager']}>
          <NavLink href="" name="Royalties" class="">
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
              <path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4" />
              <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
              <path d="M16 12a2 2 0 00-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
            </svg>
          </NavLink>
        </RoleLayer>
        <NavLink href="" name="Notifications" class="">
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
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </NavLink>
        <RoleLayer allowedForRoles={['artist', 'label-ar', 'label-manager']}>
          <NavLink href="/portal/staff/users" name="Artists" class="">
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
          <NavLink
            href=""
            name="Demos"
            routes={[
              { path: '/portal/staff/demo', pathName: 'New ' },
              { path: '/portal/staff/demo', pathName: 'Pending ' },
              { path: '/portal/staff/demo', pathName: 'Approved ' },
              { path: '/portal/staff/demo', pathName: 'Denied' },
            ]}
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

          <!-- <SubLink /> -->
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
      <!-- <hr /> -->
    </div>
    <div
      on:click={logout}
      class="outline-none	overflow-hidden flex space-x-4 items-center justify-between text-sm p-4 px-6 bg-gray-100 -mx-4  rounded-sm bg-opacity-10 mshadow-md cursor-pointer transition-transform"
    >
      {#if !$menuState}
        <p in:fly={{ x: -50, opacity: 0, duration: 200, delay: 200 }} out:fade>
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
    </div>
  </div>
</aside>

<style>
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
