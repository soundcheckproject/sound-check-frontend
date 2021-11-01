<script>
  import RoleLayer from '../../../components/RoleLayer.svelte'
</script>

<RoleLayer allowedForRoles={['artist', 'labelar', 'manager']}>
  <slot />
</RoleLayer>
