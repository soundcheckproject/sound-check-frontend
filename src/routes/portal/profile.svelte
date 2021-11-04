<script lang="ts">
  import ProfileBanner from '../../components/ProfileBanner.svelte'
  import Box from '../../components/Box.svelte'
  import Title from '../../components/Title.svelte'
  import SubTitle from '../../components/SubTitle.svelte'
  import Input from '../../components/Input.svelte'
  import Button from '../../components/Button.svelte'
  import {isNickNameAvailable} from '../../utils/useValidation'

  import type { UserType } from '../../types/User.type'
  
  let artist: UserType = {
    nickName: "Maxme",
    logo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.billboard.com%2Ffiles%2Fmedia%2Fmartin-garrix-ema-2016-billboard-1548-compressed.jpg&f=1&nofb=1',
    firstName: 'ya',
    surName: 'ya',
    country: 'belgium',
    city: 'oudenaarde',
    bio: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est',
  }

  let newArtist: UserType = artist

  const updateUser =()=>{
      console.log(artist)
  }

  const checkIfNickNameIsAvailable = () =>{
      if(isNickNameAvailable(artist, newArtist.nickName)){
          console.log("nice!")
      }else{
          console.log("niet beschikbaar")
      }

  }
  
</script>

<div class="grid gap-8">
  <ProfileBanner artist={newArtist} />
  <Box
    ><Title>Edit account</Title>
    <SubTitle>Address information {newArtist.nickName}</SubTitle>
    <Input
      title="Nickname"
      bind:value={newArtist.nickName}
      on:input={()=>checkIfNickNameIsAvailable()}
      placeholder="Choose a nickname"
    />
    <Button
      color="bg-gray-500"
      onClick={() => {
        updateUser()
      }}>Klik</Button
    >
  </Box>
</div>
