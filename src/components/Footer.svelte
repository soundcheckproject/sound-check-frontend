<script>
  import Container from '../components/Container.svelte'
</script>

<footer class="w-screen py-12 bg-gray-700 text-gray-100 ">
  <Container>
    <div class="flex justify-between">
      <div>
        <h4 class="text-lg">SoundCheck</h4>
        <ul class="text-sm text-gray-400">
          <li>SC © 2021-{new Date().getFullYear()}</li>
          <li>Made by Niels & Maxime</li>
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
            </svg> <a href="mailto:info@soundcheck.be" target="_blank">info@soundcheck.be</a>
          </li>
        </ul>
      </div>
      <ul class="text-sm text-gray-400 text-right">
        <li>Home</li>
        <li>Releases</li>
        <li>Artists</li>
        <li>Info</li>
        <li>Portal</li>
      </ul>
    </div>
  </Container>
</footer>
