<script lang="ts">
  import { initializeApp } from 'firebase/app'

  import { getAuth, User } from 'firebase/auth'

  import { onMount } from 'svelte'

  import authStore from '../stores/authStore'
  import Popup from '../components/Popup.svelte'
  import { goto } from '$app/navigation'

  import _, {
    languageStore,
    translationsStore,
    langStore,
  } from '../stores/languageStore'

  const firebaseConfig = {
    apiKey: 'AIzaSyCYK72nVcZjG9lYgoFP1LLSvT2A1GEIaVE',
    authDomain: 'sound-check-cccba.firebaseapp.com',
    projectId: 'sound-check-cccba',
    storageBucket: 'sound-check-cccba.appspot.com',
    messagingSenderId: '357132427436',
    appId: '1:357132427436:web:eca118cfb03620924dbf09',
    measurementId: 'G-QLH9WHRQJE',
  }
  const app = initializeApp(firebaseConfig)

  let graphQLconnection = true
  //todo: check if graphql can make connection

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
  <div class="absolute top-8 left-12 grid gap-2 group">
    <div
      class="py-2 px-3 text-white bg-white/10 rounded-md text-xs flex space-x-2"
    >
      <div>{$languageStore.flag}</div>
      <div>{$languageStore.language}</div>
      <div>
        <svg
          class="opacity-75 -rotate-90 group-hover:rotate-0 transition-transform"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
    <div
      class="gap-2 hidden group-hover:grid opacity-0 group-hover:opacity-100 transition-all"
    >
      {#each Object.keys($translationsStore) as key}
        <div
          class="transition-all py-2 px-3 text-white bg-white/10 rounded-md text-xs flex space-x-2 cursor-pointer hover:bg-white/20 "
          on:click={() => {
            langStore.set(key)
          }}
        >
          <div>{$translationsStore[key].flag}</div>
          <div>{$translationsStore[key].language}</div>
        </div>
      {/each}
    </div>
    <!-- Test data -->
    <!-- {$languageStore.language}
    {$languageStore.flag} -->
    <!-- {$_.header.artists}
    {$_.home.title}
    {$_.home.description}
    {$_.home.learnmore} -->
  </div>
</div>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
  @import url('../assets/fonts/gotham/style.css');

  @import url('../assets/style/style.css');

  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
