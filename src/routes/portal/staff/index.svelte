<script lang="ts">
  import Box from '../../../components/Box.svelte'
  import Title from '../../../components/Title.svelte'
  import SubTitle from '../../../components/SubTitle.svelte'
  import FadeBox from '../../../components/portal/FadeBox.svelte'

  interface TodoType {
    id: string
    text: string
    done: boolean
  }
</script>

<svelte:head>
  <title>Portal overview</title>
</svelte:head>

<!-- <Demos /> -->
<FadeBox>
  <Box>
    <Title>Staff overview</Title>
    <div class="grid gap-6 lg:grid-cols-2 items-start">
      <div class="grid gap-4 ">
        <SubTitle>How to review demo's</SubTitle>
        <div class="grid gap-4 text-gray-700">
          <p class="font-medium">Quality check ✅</p>
          <ul class="text-sm">
            <li>- Track has a genre</li>
            <li>- Track has an original vocal</li>
            <li>- Vocalist has made harmonies</li>
          </ul>
          <p class="font-medium">Give feedback on the track 🗣</p>
          <p class="text-sm">
            Nobody is perfect, everyone can make little mistakes when submitting
            their track. Check if the rendered track doesn't have any clicks or
            pops. <br />Ask the artist for a new version of necessary!
          </p>
        </div>
      </div>
    </div>
  </Box>
</FadeBox>
