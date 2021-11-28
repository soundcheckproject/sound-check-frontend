<script>
  import Title from '../../../components/Title.svelte'
  import SubTitle from '../../../components/SubTitle.svelte'
  import Track from '../../../components/Track.svelte'
  import Box from '../../../components/Box.svelte'
</script>

<div class="grid gap-8">
  <Box>
    <Title>Portal</Title>
    Welcome to the portal. <br />Here you can find all the information about your
    tracks, submissions and finances.
    <SubTitle>
      <div class="flex justify-between w-full">
        <div>💽 Your tracks</div>
        <div />
      </div>
    </SubTitle>
    <div
      class="sm:grid-cols-3 gap-4 mt-2 flex overflow-x-scroll snap rounded-md"
    >
      <Track add size="sm" />
      {#each Array(10) as i}
        <Track size="sm" />
      {/each}
    </div>
  </Box>
  <div class="grid grid-cols-3 gap-8">
    <Box>
      <a href="/portal/artist/demo">
        <p class="uppercase font-semibold text-accepted">Accepted</p>
        <p class="text-3xl font-medium text-gray-600 mt-1">12 tracks</p>
      </a>
    </Box>
    <Box>
      <a href="/portal/artist/demo">
        <p class="uppercase font-semibold text-pending">Pending</p>
        <p class="text-3xl font-medium text-gray-600 mt-1">12 tracks</p>
      </a>
    </Box>
    <Box>
      <a href="/portal/artist/demo">
        <p class="uppercase font-semibold text-denied">Denied</p>
        <p class="text-3xl font-medium text-gray-600 mt-1">12 tracks</p>
      </a>
    </Box>
  </div>
</div>

<style>
  .snap {
    scroll-snap-type: x mandatory;
  }
</style>
