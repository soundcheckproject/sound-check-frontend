<script lang="ts">
  import validationStore from '../stores/validationStore'
  import Error from './Error.svelte'
  export let errorInput = 'text'
  import errorStore from '../stores/errorStore'
  import { fade } from 'svelte/transition'

  const deleteError = (errorName: string) => {
    validationStore.set($validationStore.filter((e: string) => e !== errorName))
  }
</script>

{#if $validationStore && $validationStore.length > 0}
  {#each $validationStore as error}
    {#if error.split('_').includes(errorInput)}
      {#if $errorStore[errorInput]}
        <div
          in:fade|local={{ duration: 200, delay: 200 }}
          out:fade|local={{ duration: 200 }}
          class="-mt-2"
        >
          <Error
            onClose={error == errorInput + '_available'
              ? null
              : () => deleteError(error)}
            >{$errorStore[errorInput].filter(e => e.errorName == error)[0]
              .message}</Error
          >
        </div>
      {/if}
    {/if}
  {/each}
{/if}
