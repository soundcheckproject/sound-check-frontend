<script>
	import RoleLayer from '../../../components/RoleLayer.svelte'
</script>

<RoleLayer allowedForRoles={['artist']}>
	<slot />
</RoleLayer>
