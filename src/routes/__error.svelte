<script lang="ts">
  import Popup from '../components/Popup.svelte'
  import Header from '../components/Header.svelte'
  import { page } from '$app/stores'
</script>

<!-- <Popup
hidden
  title="Error"
  subTitle="Page not found"
  description="The page that you tried to visit was not found."
/> -->
<Header>
  <article class="flex justify-center items-center">
    <div class="-mt-24 text-center">
      <p class="text-4xl font-bold p-8">Error</p>
      <p class="opacity-75">
        The page "{$page.path.substring(1, $page.path.length)}" that you are
        trying to visit was not found
        <br />Please try to visit a another page.
      </p>
    </div>

    <!-- <Button type="glass" rounded="default" size="md">Learn more{count}</Button> -->
  </article>
</Header>
