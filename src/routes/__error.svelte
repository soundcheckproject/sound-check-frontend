<script lang="ts">

  import Header from '../components/Header.svelte'
  import { page } from '$app/stores'
</script>


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
  </article>
</Header>
