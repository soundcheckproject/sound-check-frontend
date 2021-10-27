<script>
	import RoleLayer from '../../../components/RoleLayer.svelte'
</script>

<RoleLayer allowedForRoles={['labelar', 'labelmanager']} popup>
	<slot />
</RoleLayer>
