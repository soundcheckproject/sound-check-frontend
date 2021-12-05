<script lang="ts">
  import Container from './Container.svelte'
  import Navigation from './Navigation.svelte'
import FadeBox from './portal/FadeBox.svelte';

  export let type: 'split' | 'full' = 'full'
</script>
<!-- <FadeBox> -->
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
      <Navigation />
      <slot />
    </div>
  </Container>
</div>
<!-- </FadeBox> -->