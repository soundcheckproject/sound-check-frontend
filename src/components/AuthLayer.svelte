<script lang="ts">
  import authStore from '../stores/authStore'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { roleStore } from '../stores/stores'
  import { getUserViaFirebase } from '../utils/useGraphQL'
  import userStore from '../stores/userStore'
  import type { UserType } from '../types/User.type'
  import { getUserInfoFromLocalStorage, storeUserInfoInLocalStorage } from '../utils/useFirebase'

  onMount(() => {
    authStore.subscribe(async ({ user, isLoggedIn, firebaseControlled }) => {
      if (!isLoggedIn && firebaseControlled) {
        // Reset user in localstorage

        storeUserInfoInLocalStorage(true)
        await goto('/login')
      } else {
        console.log(user.accessToken)
        const roleObject = JSON.parse(user.reloadUserInfo.customAttributes)
        const roleName = roleObject.roles[0]

        roleStore.set(roleName)

        getUserInfoFromLocalStorage()
      }
    })
  })
</script>

{#if $authStore.isLoggedIn && $userStore}
  <!-- Authenticated -->
  <slot />
{:else}
  <!-- Not authenticated -->
{/if}
