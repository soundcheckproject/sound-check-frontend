<script lang="ts">
  import { generalStore } from '../stores/stores'

  let toggleMenu: Boolean = false


</script>

<nav class="flex py-8 flex-row justify-between items-center">
  <a href="/"> <h1 class="text-xl font-bold">{$generalStore.Name}</h1></a>
  <div
    class="hidden font-regular sm:grid text-xs lg:text-sm gap-2 sm:gap-6 lg:gap-10 grid-flow-col transition-all "
  >
    <a href="/">Home</a>
    <a href="#releases">releases</a>
    <a href="/artists">artists</a>
    <a href="/info">info</a>
    <a href="/contact">contact</a>
    <div class="relative group">
      <a href="/login">portal </a>
      <div class=" absolute hidden group-hover:block pt-3 ">
        <div
          class="bg-gray-100 bg-opacity-25 grid gap-2 text-xs backdrop-blur-3xl px-5 py-4 rounded-md -ml-4"
        >
          <a href="/login">login</a>
          <a href="/register">register</a>
        </div>
      </div>
    </div>
    <div class="grid sm:hidden">=</div>
  </div>

  <div
    class="transition-all sm:hidden cursor-pointer p-2 bg-gray-700 backdrop-blur-sm rounded-full"
    on:click={() => (toggleMenu = true)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      class=""
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      ><line x1="3" y1="12" x2="21" y2="12" /><line
        x1="3"
        y1="6"
        x2="21"
        y2="6"
      /><line x1="3" y1="18" x2="21" y2="18" /></svg
    >
  </div>

  <aside
    class="{toggleMenu
      ? '-translate-x-screen-w'
      : 'translate-x-screen-w'} ease-out duration-200 fixed w-screen h-screen z-50 inset-0 bg-gray-900 grid place-items-center"
  >
     <div
    class=" absolute top-8 right-6 cursor-pointer p-2 bg-gray-700 backdrop-blur-sm rounded-full"
    on:click={() => (toggleMenu = false)}
  >
    <svg xmlns="http://www.w3.org/2000/svg"   width="16"
      height="16"
      class=""
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  </div>
    <ul class="grid gap-8 text-center font-bold" on:click={() => (toggleMenu = false)}>
      <a href="/">Home</a>
      <a href="#releases">releases</a>
      <a href="/artists">artists</a>
      <a href="/info">info</a>
      <a href="/contact">contact</a>
      <a href="/login">portal</a>
    </ul>
  </aside>
</nav>

<style>
  a {
    @apply transition-all uppercase text-white text-opacity-75;
  }
  a:hover {
    @apply text-opacity-100
		/* text-shadow: 1px 0 rgba(255, 255, 255, 0.75); */;
  }
</style>
