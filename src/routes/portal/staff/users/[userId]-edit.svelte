<script>
  import { page } from '$app/stores'
  console.log($page.path)
  import ProfilePage from '../../profile/index.svelte'
  import Error from '../../../../components/Error.svelte'
  import FadeBox from '../../../../components/portal/FadeBox.svelte'
</script>

<!-- <p>Current param: {$page.params.userId} edit</p> -->
<FadeBox>
  <div class="grid gap-8">
    <Error class="space-x-2 flex items-center" filled>
      You're editting this user as an admin. Make sure you make the right
      choises!
    </Error>

    <ProfilePage />
  </div></FadeBox
>
