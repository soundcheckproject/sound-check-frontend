<script lang="ts">
	import { roleStore } from '../stores/stores'
	export let allowedForRoles: string[] = ['member']
	export let popup: boolean = false

	// requiredRoles.some((role: string) => authUser.roles.includes(role))
</script>

{#if allowedForRoles.includes($roleStore)}
	<!-- Allowed for access -->
	<slot />
{:else if popup}
	No access
{/if}
