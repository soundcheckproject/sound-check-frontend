<script>
	import { userAuth } from '../stores/stores';
</script>

{#if $userAuth}
	<!-- Authenticated -->
	<slot />
{:else}
	Not authenticated
{/if}
