<script>
  import Title from '../../../components/Title.svelte'
  import SubTitle from '../../../components/SubTitle.svelte'
  import Track from '../../../components/Track.svelte'
  import Box from '../../../components/Box.svelte'
</script>

<Box>
  <Title>Artist portal</Title>
  <SubTitle>
    <div class="flex justify-between w-full">
      <div>💽 Your tracks</div>
      <div></div>
    </div>
  </SubTitle>
  <div class="sm:grid-cols-3 gap-4 mt-2 flex overflow-x-scroll snap rounded-md">
    <Track add size="sm" />
    {#each Array(10) as i}
      <Track size="sm" />
    {/each}
  </div>

</Box>

<style>
  .snap {
    scroll-snap-type: x mandatory;
  }
</style>
