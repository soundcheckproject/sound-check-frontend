<script>
	import { userRole } from '../stores/stores';
	export let allowedFromRole = 0;
</script>

{#if $userRole >= allowedFromRole}
	<!-- Authenticated -->
	<slot />
{:else}
	No permission
{/if}
