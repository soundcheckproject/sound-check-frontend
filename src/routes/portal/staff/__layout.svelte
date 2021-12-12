<script>
  import { RoleName } from '../../../types/Role.type'
  import RoleLayer from '../../../components/RoleLayer.svelte'
</script>

<RoleLayer allowedForRoles={[RoleName.LabelAR, RoleName.LabelManager]} popup>
  <slot />
</RoleLayer>
