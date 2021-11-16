<script lang="ts">
  import { roleStore } from '../stores/stores'
  export let allowedForRoles: string[] = ['member']
  export let popup: boolean = false
  import Popup from '../components/Popup.svelte'

  // requiredRoles.some((role: string) => authUser.roles.includes(role))
</script>

{#if allowedForRoles.includes($roleStore)}
  <!-- Allowed for access -->
  <slot />
{:else if popup}
  <Popup
    title="Role"
    subTitle="⛔️ No access"
    description="You don't have access to this page. You need a higher role."
    hidden={false}
  />
{/if}
