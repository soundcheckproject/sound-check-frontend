<script lang="ts">
  import _ from '../stores/languageStore'

  import Container from './Container.svelte'
  import Navigation from './Navigation.svelte'

  export let type: 'split' | 'full' = 'full'
</script>

<div
  class="w-screen {type == 'full'
    ? ' h-full sm:h-screen'
    : ''}  gradientBlueGreen text-white"
>
  <Container className="sm:w-full">
    <div
      class="grid w-full {type == 'full'
        ? ' h-screen'
        : ''} items-center appHeaderGrid "
    >
      <Navigation class="z-10" />
      <slot />
    </div>
  </Container>
</div>
