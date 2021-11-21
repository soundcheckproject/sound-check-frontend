<script lang="ts">
  import authStore from '../stores/authStore'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { roleStore } from '../stores/stores'
  import { getUserViaFirebase } from '../utils/useGraphQL'
  import userStore from '../stores/userStore'
  import type { UserType } from '../types/User.type'

  onMount(() => {
    authStore.subscribe(async ({ user, isLoggedIn, firebaseControlled }) => {
      if (!isLoggedIn && firebaseControlled) {
        // Reset user in localstorage
        localStorage.setItem('user', '')
        await goto('/login')
      } else {
        // console.log(user.accessToken)
        const roleObject = JSON.parse(user.reloadUserInfo.customAttributes)
        const roleName = roleObject.roles[0]
        roleStore.set(roleName)

        const userInfo: UserType = JSON.parse(localStorage.getItem('user'))
        userStore.set(userInfo)

      }
    })
  })
</script>

{#if $authStore.isLoggedIn}
  <!-- Authenticated -->
  <slot />
{:else}
  <!-- Checking for authentication -->
{/if}
