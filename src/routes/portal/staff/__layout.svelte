<script>
  import RoleLayer from '../../../components/RoleLayer.svelte'
</script>

<RoleLayer allowedForRoles={['labelar', 'manager']} popup>
  <slot />
</RoleLayer>
