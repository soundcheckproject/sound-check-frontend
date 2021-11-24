<script lang="ts">
  import authStore from '../stores/authStore'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { roleStore } from '../stores/stores'
  import { getUserViaFirebase } from '../utils/useGraphQL'
  import userStore from '../stores/userStore'
  import type { UserType } from '../types/User.type'
  import {
    getUserInfoFromLocalStorage,
    storeRole,
    storeUserInfoInLocalStorage,
  } from '../utils/useFirebase'
  import Popup from './Popup.svelte'
  import { getAuth } from '@firebase/auth'

  onMount(() => {
    authStore.subscribe(async ({ user, isLoggedIn, firebaseControlled }) => {
      if (!isLoggedIn && firebaseControlled) {
        // Reset user in localstorage

        storeUserInfoInLocalStorage(true)
        await goto('/login')
      } else {
        if (user)
          storeUserInfoInLocalStorage().then(() => {
            storeRole(user)

          })
          // console.log(user.accessToken)
      }
    })
  })
</script>

{#if $authStore.isLoggedIn && $userStore && $roleStore}
  <!-- Authenticated -->
  <slot />
{:else}
  <!-- Not authenticated -->
  <Popup>Not authenticated</Popup>
{/if}
