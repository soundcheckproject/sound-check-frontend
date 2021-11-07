<script lang="ts">
  import { getAuth } from 'firebase/auth'

  import { onMount } from 'svelte'

  import { goto } from '$app/navigation'

  onMount(async () => {
    // logout()

    await getAuth().signOut()
    goto('/login')
  })
</script>

Logging out.
