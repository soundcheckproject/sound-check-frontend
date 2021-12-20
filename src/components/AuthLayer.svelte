<script lang="ts">
  import authStore from '../stores/authStore'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { roleStore } from '../stores/stores'
  import userStore from '../stores/userStore'
  import { storeRole, storeUserInfoInLocalStorage } from '../utils/useFirebase'
  import Popup from './Popup.svelte'

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
            // console.log(user.accessToken)
          })
      }
    })
  })
</script>

{#if $authStore.isLoggedIn && $userStore && $roleStore}
  <!-- Authenticated -->
  <slot />
{:else}
  <!-- Not authenticated -->
  <Popup
    title="Authentication"
    subTitle="⛔️ No access"
    description="You don't have access to this page. You need to be logged in."
    hidden={false}
  />
{/if}
