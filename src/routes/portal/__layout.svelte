<script>
	import PortalNavigation from '../../components/portal/PortalNavigation.svelte'
</script>

<div class="c-portal">
	<PortalNavigation />
	<slot />
</div>

<style>
	.c-portal {
		display: grid;
		grid-template-columns: min-content 1fr;
		height: 100vh;
		width: 100vw;
	}
</style>
