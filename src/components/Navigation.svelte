<script lang="ts">
  import { generalStore } from '../stores/stores'
</script>

<nav class="flex py-8 flex-row justify-between items-center">
  <a href="/"> <h1 class="text-xl font-bold">{$generalStore.Name} :)</h1></a>

  <div
    class="hidden font-regular sm:grid text-xs lg:text-sm gap-2 sm:gap-6 lg:gap-10 grid-flow-col transition-all "
  >
    <a href="/">Home</a>
    <a href="#releases">releases</a>
    <a href="/register">artists</a>
    <a href="/info">info</a>
    <a href="/contact">contact</a>
    <div class="relative group">
      <a href="/login">portal </a>
      <div class=" absolute hidden group-hover:block pt-3">
        <div
          class=" grid gap-2 text-xs backdrop-blur-3xl px-5 py-4 rounded-md -ml-4"
        >
          <a href="/login">login</a>
          <a href="/register">register</a>
        </div>
      </div>
    </div>
    <div class="grid sm:hidden">=</div>
  </div>
</nav>

<style>
  a {
    @apply transition-all;
    @apply uppercase;
    @apply text-white;
    @apply text-opacity-75;
  }
  a:hover {
    @apply text-opacity-100
		/* text-shadow: 1px 0 rgba(255, 255, 255, 0.75); */;
  }
</style>
