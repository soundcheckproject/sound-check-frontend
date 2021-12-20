<script lang="ts">
  import { initializeApp } from 'firebase/app'

  import { getAuth, User } from 'firebase/auth'

  import { onMount } from 'svelte'

  import authStore from '../stores/authStore'
  import Popup from '../components/Popup.svelte'
  import { goto } from '$app/navigation'

  import _ from '../stores/languageStore'
  import variables from '../utils/variables'

  const firebaseConfig = {
    apiKey: variables.apiKey,
    authDomain: variables.authDomain,
    projectId: variables.projectId,
    storageBucket: variables.storageBucket,
    messagingSenderId: variables.messagingSenderId,
    appId: variables.appId,
    measurementId: variables.measurementId,
  }

  //@ts-ignore
  const app = initializeApp(firebaseConfig)

  let graphQLconnection = true

  onMount(async () => {
    getAuth().onAuthStateChanged(async (user: User | any) => {
      // Get auth info and put in store
      const authInfo = {
        isLoggedIn: user !== null,
        user,
        firebaseControlled: true,
      }
      authStore.set(authInfo)
    })
  })
</script>

<div
  class="font-gotham relative bg-gray-50 bg-opacity-75 grid h-screen overflow-x-hidden"
  style="grid-template-rows: auto 1fr auto;"
>
  {#if graphQLconnection}
    <slot />
  {:else}
    <div class="bg-red-700">
      <Popup
        hidden={true}
        title="Error"
        subTitle="Connection lost"
        description="Website can't make connection to the database"
        onClick={() => goto('/')}
        button="Try again"
      />
    </div>
  {/if}
</div>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
  @import url('../assets/fonts/gotham/style.css');

  @import url('../assets/style/style.css');

  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
