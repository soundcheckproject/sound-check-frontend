<script lang="ts">
  import { goto } from '$app/navigation'

  import Header from '../components/Header.svelte'
  import Title from '../components/Title.svelte'
  import SubTitle from '../components/SubTitle.svelte'
  import Button from '../components/Button.svelte'
  import Container from '../components/Container.svelte'
  import Footer from '../components/Footer.svelte'
  import Error from '../components/Error.svelte'

  import authStore from '../stores/authStore'
  import { loginUser } from './../utils/useFirebase'
  import {
    validateEmailLength,
    validateEmailValid,
    validatePasswordLength,
  } from './../utils/useValidation'
  import validationStore, { formErrors } from '../stores/validationStore'

  // let user = { email: 'docent@howest.be', password: 'P@ssw0rd' }
  let user = { email: 'artist.label@soundcheck.be', password: '@rtistLBL1' }

  // interface Error {
  //   [key: string]: { display?: boolean; errorName?: string; message?: string }
  // }

  interface formError {
    // [key: string]: Error[]
  }

  // let formErrors: any = $validationStore
  let errors = []
  const checkValidation = (type: string) => {
    errors = []
    if (type == 'email') {
      validateErrors([
        validateEmailValid(user.email),
        validateEmailLength(user.email),
      ])
    }
    if (type == 'password') {
      validateErrors([validatePasswordLength(user.password)])
    }
    validationStore.set(errors)
  }

  const validateErrors = (validations: any) => {
    for (const validation of validations) {
      validation ? (errors = [...errors, validation]) : null
    }
  }

  const login = () => {
    if ($validationStore.length == 0) {
      try {
        loginUser(user.email, user.password)
      } catch (error) {
        console.log(error)
      }
    }
  }

  authStore.subscribe(async ({ isLoggedIn, firebaseControlled }) => {
    if (isLoggedIn && firebaseControlled) {
      await goto('/portal')
    }
  })

  $: {
    console.log($validationStore)
  }
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

          <!-- {#each Object.keys(formErrors) as errorKey}
           
            {#each Object.keys(formErrors[errorKey]) as error}
             
              {#if formErrors[errorKey][error].display}
                <Error>{formErrors[errorKey][error].message}</Error>
              {/if}
            {/each}
            {#each formErrors[errorKey] as error}
             
            {/each}
          {/each} -->

          {#if $validationStore.length > 0}
            {#each $validationStore as error}
              <SubTitle theme="error"
                >{formErrors.email.filter(e => e.errorName == error)[0]
                  .message}</SubTitle
              >
            {/each}
          {/if}

          <label
            >Email addres<input
              bind:value={user.email}
              required
              on:change={() => {
                checkValidation('email')
              }}
              class="input {$validationStore[0] == 'email_valid'
                ? ' error'
                : ''}"
              placeholder="Email address."
            /></label
          >
          {#if $validationStore.length > 0}
            {#each $validationStore as error}
              <SubTitle theme="error"
                >{formErrors.password.filter(e => e.errorName == error)[0]
                  .message}</SubTitle
              >
            {/each}
          {/if}
          <label
            >Password<input
              bind:value={user.password}
              required
              on:change={() => {
                checkValidation('password')
              }}
              class="input {$validationStore[0] == 'password_length'
                ? ' error'
                : ''}"
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
