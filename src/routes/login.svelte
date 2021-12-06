<script lang="ts">
  import { goto } from '$app/navigation'

  import Header from '../components/Header.svelte'
  import Title from '../components/Title.svelte'
  import SubTitle from '../components/SubTitle.svelte'
  import Button from '../components/Button.svelte'
  import Container from '../components/Container.svelte'
  import Footer from '../components/Footer.svelte'

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
    validateErrorTime,
    validateEmpty,
  } from './../utils/useValidation'
  import validationStore from '../stores/validationStore'

  import userStore from '../stores/userStore'
  import { labelStore, roleStore } from '../stores/stores'

  import Input from '../components/Input.svelte'
  import FadeBox from '../components/portal/FadeBox.svelte'

  let user = { email: 'docent@howest.be', password: 'P@ssw0rd' }
  // let user = { email: 'artist.label@soundcheck.be', password: '@rtistLBL1' }
  // let user = { email: 'artist@soundcheck.be', password: '@rtistSC1' }

  let errors: string[] = []
  const checkValidation = (type: string) => {
    if (type == 'email') {
      // errors = validateErrors(
      //   [validateEmailValid(user.email), validateLength(user.email, 12)],
      //   type,
      //   errors,
      //   )
      errors = validateErrors([validateEmpty(user.email)], type, errors)
    }
    if (type == 'password') {
      errors = validateErrors([validateEmpty(user.password)], type, errors)
    }
  }

  const login = () => {
    if ($validationStore.length == 0) {
      loginUser(user.email, user.password)
        .then(async e => {
          await goto('/portal')
        })
        .catch(e => {
          validateErrorTime('connection', 'graphql', errors)
        })
    } else {
      validateErrorTime('general', 'errors', errors)
    }
  }

  authStore.subscribe(async ({ isLoggedIn, firebaseControlled }) => {
    if (isLoggedIn && firebaseControlled && $roleStore && $userStore) {
      await goto('/portal')
    }
  })

  $: {
    validationStore.set(errors)
  }
</script>

<svelte:head>
	<title>{$labelStore.name} - Login</title>
</svelte:head>

<Header type="split" />
<FadeBox>
  <Container>
    <section class="">
      <article>
        <Title theme="dark">Portal</Title>
        <div
          class=" flex lg:space-x-12 justify-between flex-col-reverse lg:flex-row items-center"
        >
          <div class="grid gap-4 py-12 ">
            <SubTitle theme="dark">📝 Create account</SubTitle>
            If you want to submit your music to {$labelStore.name}, then you'll
            need to create an account. It's free!<br /><br />Our team will
            review your track as soon as possible and you'll be able to see if
            your track has been accepted for a release on the label.
            <a href="/register" class="font-semibold hover:underline"
              >Create account!</a
            >
          </div>

          <div
            class="grid gap-4 bg-gray-100 -mx-12 p-12 rounded-md sm:w-full lg:w-96 box-content justify-self-end"
          >
            <SubTitle theme="dark">⌛️ Login with account</SubTitle>
            <InputError errorInput="general" />
            <InputError errorInput="connection" />

            <Input
              bind:value={user.email}
              title="Email address"
              type="email"
              errorInput="email"
              portal=""
              on:input={() => {
                checkValidation('email')
              }}
              placeholder="Email address.."
            />
            <!-- on:change={() => {
              checkValidation('email')
            }} -->
            <Input
              bind:value={user.password}
              title="Password"
              type="password"
              errorInput="password"
              portal=""
              on:input={() => {
                checkValidation('password')
              }}
              on:change={() => {
                checkValidation('password')
              }}
              placeholder="Enter password.."
              autocomplete="current-password"
            />
            <a
              href="/forgotpassword"
              target="_blank"
              class="text-sm underline text-teal-700 cursor-pointer"
              >Forgot password ?</a
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
  </Container></FadeBox
>

<Footer />
