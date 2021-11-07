<script>
  import authStore from '../stores/authStore'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { roleStore } from '../stores/stores'
  import { getUserByFirebaseId } from '../utils/useGraphQL'
  import userStore from '../stores/userStore'

  onMount(() => {
    authStore.subscribe(async ({ user, isLoggedIn, firebaseControlled }) => {
      if (!isLoggedIn && firebaseControlled) {
        await goto('/login')
      } else {
        // Get userinfo and put in store
        const userInfo = await getUserByFirebaseId(user?.uid)
        // localStorage.setItem('userInfo', JSON.stringify(userInfo))
        userStore.set(userInfo)

        const roleObject = JSON.parse(user.reloadUserInfo.customAttributes)
        const roleName = roleObject.roles[0]
        roleStore.set(roleName)
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
