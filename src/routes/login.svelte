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
    validateErrors,
    validateErrorTime,
    validateEmpty,
  } from './../utils/useValidation'
  import validationStore from '../stores/validationStore'

  import userStore from '../stores/userStore'
  import { labelStore, roleStore } from '../stores/stores'

  import Input from '../components/Input.svelte'
  import FadeBox from '../components/portal/FadeBox.svelte'
  import _ from '../stores/languageStore'

  let user = { email: '', password: '', remember: false }

  // let user = {
  //   email: 'docent@howest.be',
  //   password: 'P@ssw0rd',
  //   remember: false,
  // }
  //  let user = { email: 'artist.label@soundcheck.be', password: '@rtistLBL1' }
  // let user = { email: 'artist@soundcheck.be', password: '@rtistSC1' }

  let errors: string[] = []
  const checkValidation = (type: string) => {
    if (type == 'email') {
      errors = validateErrors([validateEmpty(user.email)], type, errors)
    }
    if (type == 'password') {
      errors = validateErrors([validateEmpty(user.password)], type, errors)
    }
  }

  const login = () => {
    if ($validationStore.length == 0) {
      loginUser(user.email, user.password, user.remember)
        .then(async e => {
          await goto('/portal')
        })
        .catch(e => {
          validateErrorTime('general', 'login', errors)
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
  <title>Login</title>
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
            <SubTitle theme="dark">📝 {$_.register.title}</SubTitle>
            {$_.register.description[0]}<br /><br />
            {$_.register.description[1]}
            <!-- If you want to submit your music to {$labelStore.name}, then you'll
            need to create an account. It's free!<br /><br />Our team will
            review your track as soon as possible and you'll be able to see if
            your track has been accepted for a release on the label. -->
            <Button
              onClick={() => goto('/register')}
              rounded="none"
              color="bg-teal-700"
              className="justify-self-start">{$_.register.form.submit}</Button
            >
          </div>

          <div
            class="grid gap-4 bg-gray-100 -mx-12 p-12 rounded-md sm:w-full lg:w-96 box-content justify-self-end"
          >
            <SubTitle theme="dark">⌛️ {$_.login.title}</SubTitle>
            <InputError errorInput="general" />
            <InputError errorInput="connection" />

            <Input
              bind:value={user.email}
              title={$_.login.form.email}
              type="email"
              errorInput="email"
              portal=""
              on:input={() => {
                checkValidation('email')
              }}
              placeholder={$_.login.form.email + '..'}
            />
            <!-- on:change={() => {
              checkValidation('email')
            }} -->
            <Input
              bind:value={user.password}
              title={$_.login.form.password}
              type="password"
              errorInput="password"
              portal=""
              on:input={() => {
                checkValidation('password')
              }}
              on:change={() => {
                checkValidation('password')
              }}
              placeholder={$_.login.form.password_placeholder}
              autocomplete="current-password"
            />
            <a
              href="/forgotpassword"
              class="text-xs text-teal-700 cursor-pointer flex items-center  group"
            >
              <div
                class="mr-1 transition-all -ml-1 text-teal-700 group-hover:bg-teal-600 group-hover:text-white group-hover:rounded-full p-1"
              >
                <svg
                  class=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><circle cx="12" cy="12" r="10" /><path
                    d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
                  /><line x1="12" y1="17" x2="12.01" y2="17" /></svg
                >
              </div>
              {$_.login.forgot}
            </a>
            <div class="flex justify-between items-center">
              <label
                class="text-sm grid gap-2 grid-flow-col items-center text-opacity-80"
                ><input type="checkbox" bind:checked={user.remember} />{$_.login
                  .remember}</label
              >

              <Button
                onClick={login}
                rounded="none"
                color="bg-teal-700"
                className="login-btn justify-self-end"
                >{$_.login.form.submit}</Button
              >
            </div>
          </div>
        </div>
      </article>
    </section>
  </Container></FadeBox
>

<Footer />
