<script lang="ts">
  import { initializeApp } from 'firebase/app'

  import { getAuth, User } from 'firebase/auth'
  import { query } from '../utils/useGraphQL'
  import { onMount } from 'svelte'

  import authStore from '../stores/authStore'
  import Popup from '../components/Popup.svelte'
  import { goto } from '$app/navigation'
import Footer from '../components/Footer.svelte';

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

  let graphQLconnection=true
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

    // graphQLconnection = await query(
    //   'getLabelById',
    // `query GetLabelById($labelId: String!) {
    //     getLabelById(labelId: $labelId) {
    //       name
    //       description
    //       founded
    //       email
    //       country
    //       state
    //       logo
    //       city
    //     }
    //   }`,
    //   { labelId: import.meta.env.VITE_LABEL_ID },
    // )
    // try {
    // graphQLconnection = await fetch(import.meta.env.VITE_BACKEND_URL).catch(
    //   err => console.log(err),
    // )
    // console.log(graphQLconnection.status)

    // var xhttp = new XMLHttpRequest()
    // try {
    //   xhttp.onreadystatechange = function () {
    //     console.log(xhttp.response)
    //     if (xhttp.readyState == 4 && xhttp.status == 0) {
    //       // alert('Unknown Error Occured. Server response not received.')
    //       graphQLconnection = false
    //     }
    //   }
    //   xhttp.open('POST', import.meta.env.VITE_BACKEND_URL, true)
    //   xhttp.setRequestHeader('Content-Type', 'application/json')
    //   xhttp.send(
    //     JSON.stringify({
    //       body: JSON.stringify({
    //         query: `query GetLabelById($labelId: String!) {
    //                   getLabelById(labelId: $labelId) {
    //                     name
    //                     description
    //                     founded
    //                     email
    //                     country
    //                     state
    //                     logo
    //                     city
    //                   }
    //                 }`,
    //         variables:  JSON.stringify({ labelId: `${import.meta.env.VITE_LABEL_ID}` }),
    //       }),
    //     }),
    //   )
    //   xhttp.send()
    // } catch (e) {
    //   console.log('catch', e)
    // }
  })
</script>

<div class="font-roboto c-app relative ">
  
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

  .c-app {
    /* background: red; */
    @apply bg-gray-50 bg-opacity-75;
    display: grid;
    height: 100vh;
    grid-template-rows: auto 1fr auto;
    overflow-x: hidden;
  }
</style>
