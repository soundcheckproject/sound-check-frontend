<script lang="ts">
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

  onMount(() => {
    if (ref) {
      ref.type = type
    }
  })

  $: if (!value) value = ''
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="portal"
  >{$$props.title ?? 'Title'}
  {#if !$$props.textarea}<input
      bind:value
      on:input
      bind:this={ref}
      class={`input portal ` + $$props.class}
      placeholder={$$props.placeholder ?? 'Type here..'}
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
