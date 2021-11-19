<script>
  import validationStore from '../stores/validationStore'
  import Error from './Error.svelte'
  export let errorInput = 'text'
  import errorStore from '../stores/errorStore'
</script>

{#if $validationStore.length > 0}
  {#each $validationStore as error}
    {#if error.split('_').includes(errorInput)}
      <Error
        >{$errorStore[errorInput].filter(e => e.errorName == error)[0]
          .message}</Error
      >
      <!-- <Error>{error}</Error> -->
    {/if}
  {/each}
{/if}
