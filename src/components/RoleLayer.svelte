<script lang="ts">
  import { roleStore } from '../stores/stores'
  export let allowedForRoles: string[] = ['user']
  export let popup: boolean = false
  import Popup from '../components/Popup.svelte'

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
