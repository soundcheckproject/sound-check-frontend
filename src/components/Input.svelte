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

  let passwordShow = false

  onMount(() => {
    if (ref) {
      ref.type = type
    }
  })
  export let errorInput = ''
  export let portal = 'portal'
  $: if (!value) value = ''
  $: {
    if (type == 'password' && ref)
      passwordShow ? (ref.type = 'text') : (ref.type = 'password')
  }
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
      />
      {#if type == 'password'}
        <svg
          on:click={() => (passwordShow = !passwordShow)}
          class="absolute transition-all bottom-4 right-4  {passwordShow
            ? 'text-teal-700'
            : 'text-gray-700/30'} hover:text-teal-600 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>{/if}
    {:else}
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
