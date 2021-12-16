<script lang="ts">
  import { getAuth } from 'firebase/auth'

  import { onMount } from 'svelte'

  import { goto } from '$app/navigation'
import userStore from '../stores/userStore';

  onMount(async () => {
    // logout()
    localStorage.removeItem('user')

    await getAuth().signOut()
    userStore.set(undefined)
    goto('/login')
  })
</script>

 <svelte:head>
  <title>Logout</title>
</svelte:head>

Logging out.
