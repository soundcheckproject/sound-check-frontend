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

  onMount(() => {
    if (ref) {
      ref.type = type
    }
  })

  $: if (!value) value = ''
</script>

<div class="grid gap-4">
  {#if $$props.errorInput}
    <InputError errorInput={$$props.errorInput} />
  {/if}
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="portal capitalize"
    >{$$props.title ?? 'Title'}
    {#if !$$props.textarea}<input
        bind:value
        on:input
        bind:this={ref}
        class={`input portal ` + $$props.class}
        placeholder={$$props.placeholder ?? 'Type here..'}
        {autocomplete}
      />{:else}
      <textarea
        rows={$$props.rows}
        bind:value
        on:input
        class={`input portal ` + $$props.class}
        placeholder={$$props.placeholder ?? 'Type here..'}
      />
    {/if}</label
  >
</div>
