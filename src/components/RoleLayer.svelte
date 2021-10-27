<script lang="ts">
	import { roleStore } from '../stores/stores'
	export let allowedForRoles: string[] = ['member']
	export let popup: boolean = false
</script>

{#if allowedForRoles.includes($roleStore)}
	<!-- Allowed for access -->
	<slot />
{:else if popup}
	No access
{/if}
