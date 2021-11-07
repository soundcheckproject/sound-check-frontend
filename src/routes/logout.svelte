<script lang="ts">
  import { getAuth } from 'firebase/auth'
  import authStore from '../stores/authStore'

  import { onMount } from 'svelte'

  import { logout } from '../utils/useFirebase'
  import { goto } from '$app/navigation'

  onMount(async () => {
    // logout()

    await getAuth().signOut()
    goto('/login')
  })
</script>

Logging out.
