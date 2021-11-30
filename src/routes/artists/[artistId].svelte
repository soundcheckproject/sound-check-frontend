<script lang='ts'>
  import { page } from '$app/stores'
  import ProfileBanner from '../../components/ProfileBanner.svelte'
  import Container from '../../components/Container.svelte'
  import Header from '../../components/Header.svelte'
  import { query } from '../../utils/useGraphQL'
  import type {UserType} from '../../types/User.type'
import { onMount } from 'svelte';

  let artist: UserType = undefined;

  const getArtist = async () => {
    const data = await query(
      `getUser`,
      `query GetUser($userId: String!) {
        getUser(userId: $userId) {
             uuid
            nickName
            logo
            firstName
            surName
            birthdate
            email
            country
            city
            state
            biography
            role {
            name
            }
        }
        }`, {userId: $page.params.artistId}
    )

    console.log({data})
    if (data) {
      artist = data
    }
  }

  onMount(()=>{
      getArtist()
  })
</script>

<Header type="split" />
  <Container className="py-16">
    {#if artist}
    <ProfileBanner
      artist={artist}
      logo={artist.logo}
    />
    {/if}
  </Container>
