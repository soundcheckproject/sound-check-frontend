<script>
  import { labelStore } from '../stores/stores'

  import Container from '../components/Container.svelte'

  import _ from '../stores/languageStore'
</script>

<footer class="w-screen py-12 bg-gray-800 text-gray-100 ">
  <Container>
    <div class="flex justify-between">
      <div>
        <h4 class="text-lg">{$labelStore && $labelStore.name}</h4>
        <ul class="text-sm text-gray-400">
          <li>© 2021-{new Date().getFullYear()}</li>
          <li>
            {$_.footer.madeby} <a
              class="underline"
              target="_blank"
              href="https://www.linkedin.com/in/niels-onderbeke-b562a5208/"
              >Niels</a
            >
            &
            <a
              class="underline"
              target="_blank"
              href="https://www.linkedin.com/in/maxime-vermeeren-0814091a9/"
              >Maxime</a
            >
          </li>
          <li class="mt-4 opacity-40 class flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <a href="mailto:info@soundcheck.be" target="_blank"
              >info@soundcheck.be</a
            >
          </li>
        </ul>
      </div>
      <ul class="text-xs gap-2 text-gray-400 text-right grid uppercase">
        <a class="focus:scale-105 outline-none" href="/home">{$_.header.home}</a>
        <a class="focus:scale-105 outline-none" href="/releases">{$_.header.releases}</a>
        <a class="focus:scale-105 outline-none" href="/artists">{$_.header.artists}</a>
        <a class="focus:scale-105 outline-none" href="/#info">{$_.header.info}</a>
        <a class="focus:scale-105 outline-none" href="/#contact">{$_.header.contact}</a>
        <a class="focus:scale-105 outline-none" href="/login">{$_.header.portal}</a>
      </ul>
    </div>
  </Container>
</footer>

<style lang="postcss">
  a:hover {
    @apply underline;
  }
</style>
