<script lang="ts">
  import userStore from '../../stores/userStore'
  import { RoleName } from '../../types/Role.type'
  import { goto } from '$app/navigation'

  console.log($userStore)
</script>

{#if $userStore.role.slug === RoleName.LabelManager || $userStore.role.slug === RoleName.LabelAR}
  {goto('/portal/staff')}
{:else}
  {goto('/portal/artist')}
{/if}
