<script lang="ts">
  import { goto } from '$app/navigation'

  import Header from '../components/Header.svelte'
  import Title from '../components/Title.svelte'
  import SubTitle from '../components/SubTitle.svelte'
  import Button from '../components/Button.svelte'
  import Container from '../components/Container.svelte'
  import Footer from '../components/Footer.svelte'

  import authStore from '../stores/authStore'
  import { loginUser } from './../utils/useFirebase'

  // let user = { email: 'docent@howest.be', password: 'P@ssw0rd' }
  let user = { email: 'artist.label@soundcheck.be', password: '@rtistLBL1' }

  interface formError {
    [key: string]: { display?: boolean; errorName: string; message: string }[]
  }

  let formErrors: formError = {}
  const login = () => {
    formErrors = { email: [], password: [] }

    // isNotEmptyValidation(user, 'email')
    // isNotEmptyValidation(user, 'password')
    // isNotStrongEnoughValidation(user, 'password')

    loginUser(user.email, user.password)
  }

  authStore.subscribe(async ({ isLoggedIn, firebaseControlled }) => {
    if (isLoggedIn && firebaseControlled) {
      await goto('/portal')
    }
  })
</script>

<Header type="split" />
<Container>
  <section class="">
    <article>
      <Title theme="dark">Portal</Title>
      <div
        class=" flex lg:space-x-12 justify-between flex-col-reverse lg:flex-row items-center"
      >
        <div class="grid gap-4 py-12 ">
          <SubTitle theme="dark">📝 Create account</SubTitle>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          <b>Create account!</b>
        </div>
        <div
          class="grid gap-4 bg-gray-100 -mx-12 p-12 rounded-md sm:w-full box-content justify-self-end"
        >
          <SubTitle theme="dark">⌛️ Login with account</SubTitle>

          {#each Object.keys(formErrors) as errorKey}
            {#each formErrors[errorKey] as error}
              {#if error.display}
                <SubTitle theme="error">{error.message}</SubTitle>
              {/if}
            {/each}
          {/each}

          <label
            >Email addres<input
              bind:value={user.email}
              required
              class="input"
              placeholder="Email address."
            /></label
          >
          <label
            >Password<input
              bind:value={user.password}
              required
              class="input "
              placeholder="Password.."
              autocomplete="current-password"
            /></label
          >
          <div class="flex justify-between items-center">
            <label
              class="text-sm grid gap-2 grid-flow-col items-center text-opacity-80"
              ><input type="checkbox" />Remember me</label
            >

            <Button
              onClick={login}
              rounded="none"
              color="bg-blue-900"
              className="justify-self-end">Login</Button
            >
          </div>
        </div>

        <!-- <a
					href="/register"
					class="text-sm text-white text-opacity-50 hover:text-opacity-95 transition-colors"
				>
					Click <u>here</u> to signup
				</a> -->
      </div>
    </article>
  </section>
</Container>

<Footer />
