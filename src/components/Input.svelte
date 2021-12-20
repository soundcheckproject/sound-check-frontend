<script lang="ts">
  import InputError from './InputError.svelte'
  import { onMount } from 'svelte'

  export let value = ''
  export let type:
    | 'email'
    | 'text'
    | 'password'
    | 'number'
    | 'date'
    | 'upload' = 'text'
  let ref: HTMLInputElement
  export let autocomplete = 'off'
  export let required = false
  export let title: string = ''

  onMount(() => {
    if (ref) {
      ref.type = type
    }
  })
  export let errorInput = ''
  export let portal = 'portal'
  $: if (!value) value = ''

  let borderColor = ''
</script>

<!-- //todo: add  red border to input validation -->
<div class="grid gap-4">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="portal"
    >{title ? (required ? `${title} *` : title) : 'Title'}
    {#if !$$props.textarea}<input
        bind:value
        on:input
        on:change
        bind:this={ref}
        class="input {portal} {borderColor} {$$props.class}"
        placeholder={$$props.placeholder ?? 'Type here..'}
        {autocomplete}
        {required}
      />{:else}
      <textarea
        rows={$$props.rows}
        bind:value
        on:input
        on:change
        class="input {portal} {$$props.class}"
        placeholder={$$props.placeholder ?? 'Type here..'}
        {required}
      />
    {/if}</label
  >
  {#if errorInput}
    <InputError {errorInput} />
  {/if}
</div>
