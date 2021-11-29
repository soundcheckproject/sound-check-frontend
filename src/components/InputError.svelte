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
          in:fade={{ duration: 200, delay: 200 }}
          out:fade={{ duration: 200 }}
        >
          <Error onClose={() => deleteError(error)}
            >{$errorStore[errorInput].filter(e => e.errorName == error)[0]
              .message}</Error
          >
        </div>
        <!-- <Error>{error}</Error> -->
      {/if}
    {/if}
  {/each}
{/if}
