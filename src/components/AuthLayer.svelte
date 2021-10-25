<script>
	import authStore from '../stores/authStore'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'

	onMount(() => {
		authStore.subscribe(async ({ isLoggedIn, firebaseControlled }) => {
			if (!isLoggedIn && firebaseControlled) {
				await goto('/login')
			}
		})
	})
</script>

{#if $authStore.isLoggedIn}
	<!-- Authenticated -->
	<slot />
{:else}
	Not authenticated
{/if}
