<script lang="ts">
  import { initializeApp } from 'firebase/app'

  import { getAuth, User } from 'firebase/auth'
  import { onMount } from 'svelte'

  import 'animate.css'

  import authStore from '../stores/authStore'

  onMount(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyCYK72nVcZjG9lYgoFP1LLSvT2A1GEIaVE',
      authDomain: 'sound-check-cccba.firebaseapp.com',
      projectId: 'sound-check-cccba',
      storageBucket: 'sound-check-cccba.appspot.com',
      messagingSenderId: '357132427436',
      appId: '1:357132427436:web:eca118cfb03620924dbf09',
      measurementId: 'G-QLH9WHRQJE',
    }
    initializeApp(firebaseConfig)

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

<div class="font-roboto c-app">
  <slot />
</div>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
  @import url('../assets/fonts/gotham/style.css');

  @import url('../assets/style/style.css');

  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .c-app {
    /* background: red; */
    @apply bg-gray-50;
    display: grid;
    height: 100vh;
    grid-template-rows: auto 1fr auto;
    overflow-x: hidden;
  }
</style>
