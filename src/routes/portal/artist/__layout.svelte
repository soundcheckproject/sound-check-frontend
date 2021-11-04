<script>
  import RoleLayer from '../../../components/RoleLayer.svelte'
</script>

<RoleLayer
  allowedForRoles={[
    'user',
    'artist',
    'label-artist',
    'label-ar',
    'label-manager',
  ]}
>
  <slot />
</RoleLayer>
