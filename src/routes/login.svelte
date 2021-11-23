<script lang="ts">
  import { goto } from '$app/navigation'

  import Header from '../components/Header.svelte'
  import Title from '../components/Title.svelte'
  import SubTitle from '../components/SubTitle.svelte'
  import Button from '../components/Button.svelte'
  import Container from '../components/Container.svelte'
  import Footer from '../components/Footer.svelte'
  import Error from '../components/Error.svelte'
  import InputError from '../components/InputError.svelte'

  import authStore from '../stores/authStore'
  import { loginUser } from './../utils/useFirebase'
  import {
    validateEmailValid,
    validateLength,
    validateCapital,
    validateLower,
    validateNumbers,
    validateErrors,
    validateError,
  } from './../utils/useValidation'
  import validationStore from '../stores/validationStore'
  import type ErrorType from '../types/Error.type'
  import userStore from '../stores/userStore'
import { roleStore } from '../stores/stores';

  // let user = { email: 'docent@howest.be', password: 'P@ssw0rd' }
  let user = { email: 'artist.label@soundcheck.be', password: '@rtistLBL1' }

  let errors: string[] = []
  const checkValidation = (type: string) => {
    if (type == 'email') {
      errors = validateErrors(
        [validateEmailValid(user.email), validateLength(user.email, 12)],
        type,
        errors,
      )
    }
    if (type == 'password') {
      errors = validateErrors(
        [
          validateLength(user.password, 5),
          // Todo: .Match in usevalidation not working
          validateNumbers(user.password),
          validateCapital(user.password),
          validateLower(user.password),
        ],
        type,
        errors,
      )
    }
  }

  const login = () => {
    if ($validationStore.length == 0) {
      loginUser(user.email, user.password)
        .then(async e => {
          errors = validateError('connection', 'graphql', e, errors)
          await goto('/portal')
        })
        .catch(e => {
          errors = validateError('connection', 'graphql', e, errors)
        })
    }
  }

  authStore.subscribe(async ({ isLoggedIn, firebaseControlled }) => {
    if (isLoggedIn && firebaseControlled && $roleStore) {
      await goto('/portal')
    }
  })

  $: {
    validationStore.set(errors)
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
          <a href="/register" class="font-semibold">Create account!</a>
        </div>
        <div
          class="grid gap-4 bg-gray-100 -mx-12 p-12 rounded-md sm:w-full box-content justify-self-end"
        >
          <SubTitle theme="dark">⌛️ Login with account</SubTitle>

          <InputError errorInput="connection" />
          <InputError errorInput="email" />

          <label
            >Email addres<input
              bind:value={user.email}
              required
              on:input={() => {
                checkValidation('email')
              }}
              on:change={() => {
                checkValidation('email')
              }}
              class="input {$validationStore[0] == 'email_valid'
                ? ' error'
                : ''}"
              placeholder="Email address."
            /></label
          >
          <InputError errorInput="password" />
          <label
            >Password<input
              bind:value={user.password}
              required
              on:input={() => {
                checkValidation('password')
              }}
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
              color="bg-teal-700"
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
