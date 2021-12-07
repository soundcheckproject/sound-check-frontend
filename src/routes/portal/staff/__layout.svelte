<script>
  import RoleLayer from '../../../components/RoleLayer.svelte'
</script>

<RoleLayer allowedForRoles={['label-ar', 'label-manager']} popup>
  <slot />
</RoleLayer>
