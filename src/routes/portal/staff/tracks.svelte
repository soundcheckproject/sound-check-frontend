<script>
  import Box from '../../../components/Box.svelte'
  import Title from '../../../components/Title.svelte'
  import Row from '../../../components/Row.svelte'
</script>

<Box>
  <Title>All tracks</Title>
  <div class="flex justify-between items-center">
    <div>Filters</div>
    <label>
      <input class="input portal" placeholder="Search.." />
    </label>
  </div>
  <div class="grid gap-4 lg:grid-cols-2 ">
    <Row
      artworkSource="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.sndcdn.com%2Fartworks-000454520877-chf2n6-t500x500.jpg&f=1&nofb=1"
      >Trackname</Row
    >
    <Row
      artworkSource="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.sndcdn.com%2Fartworks-000454520877-chf2n6-t500x500.jpg&f=1&nofb=1"
      >Trackname</Row
    >
    <Row
      artworkSource="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.sndcdn.com%2Fartworks-000454520877-chf2n6-t500x500.jpg&f=1&nofb=1"
      >Trackname</Row
    >
  </div>
  <div />
</Box>
