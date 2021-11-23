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
        console.log(user)
        // storeUserInfoInLocalStorage()
        const userFirebase = await getUserViaFirebase()
        console.log(userFirebase)
        // const roleObject =
        //   JSON.parse(getAuth().currentUser['reloadUserInfo'].customAttributes)
        // let roleName: string
        // if (roleObject) {
        //   roleName = roleObject.roles[0]
        //   if (roleName) {
        //     roleStore.set(roleName)
        //     getUserInfoFromLocalStorage()
        //   }
        // }
        // const roleObject = JSON.parse(user.reloadUserInfo.customAttributes)
        // const roleName = roleObject.roles[0]

        // roleStore.set(roleName)

        // getUserInfoFromLocalStorage()
        console.log($roleStore)
      }
    })
  })
</script>

{#if $authStore.isLoggedIn && $roleStore && $userStore}
  <!-- Authenticated -->
  <slot />
{:else}
  <!-- Not authenticated -->
  <Popup>Not authenticated</Popup>
{/if}
