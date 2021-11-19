<script>
  import validationStore from '../stores/validationStore'
  import Error from './Error.svelte'
  export let errorInput = 'text'
</script>

{#if $validationStore.length > 0}
  {#each $validationStore as error}
    {#if error.split('_').includes(errorInput)}
      <!-- <SubTitle theme="error"
                >{formErrors.email.filter(e => e.errorName == error)[0]
                  .message}</SubTitle
              > -->
      <Error>{error}</Error>
    {/if}
  {/each}
{/if}
