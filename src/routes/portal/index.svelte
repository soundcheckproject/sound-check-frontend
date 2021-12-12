<script lang="ts">
  import userStore from '../../stores/userStore'
  import { RoleName } from '../../types/Role.type'
  import { goto } from '$app/navigation'
  import StaffPage from '../portal/staff/index.svelte'
  import ArtistPage from '../portal/artist/index.svelte'
</script>

{#if $userStore.role.slug === RoleName.LabelManager || $userStore.role.slug === RoleName.LabelAR}
  <!-- {goto('/portal/staff')} -->
  <StaffPage></StaffPage>
{:else}
  <!-- {goto('/portal/artist')} -->
  <ArtistPage></ArtistPage>
{/if}
