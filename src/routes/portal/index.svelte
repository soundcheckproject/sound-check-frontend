<script lang="ts">
  import userStore from '../../stores/userStore'
  import { RoleName } from '../../types/Role.type'

  import StaffPage from '../portal/staff/index.svelte'
  import ArtistPage from '../portal/artist/index.svelte'
</script>

{#if $userStore.role.slug === RoleName.LabelManager || $userStore.role.slug === RoleName.LabelAR}
  <StaffPage />
{:else}
  <ArtistPage />
{/if}
