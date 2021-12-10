<script lang="ts">
  import { getAuth } from 'firebase/auth'

  import { onMount } from 'svelte'

  import { goto } from '$app/navigation'

  onMount(async () => {
    // logout()
    localStorage.removeItem('user')

    await getAuth().signOut()
    goto('/login')
  })
</script>

 <svelte:head>
  <title>Logout</title>
</svelte:head>

Logging out.
