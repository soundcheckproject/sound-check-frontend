<script lang="ts">
  import type { UserType } from './../types/User.type'
  import { goto } from '$app/navigation'

  import Header from '../components/Header.svelte'
  import Title from '../components/Title.svelte'
  import SubTitle from '../components/SubTitle.svelte'
  import Button from '../components/Button.svelte'
  import Container from '../components/Container.svelte'
  import Footer from '../components/Footer.svelte'

  import authStore from '../stores/authStore'
  import { loginUser, registerUser } from '../utils/useFirebase'
  import Input from '../components/Input.svelte'
  import {
    isNickNameAvailable,
    validateError,
    validateErrors,
    validateLength,
    validateMatch,
    validateOld,
  } from '../utils/useValidation'
  import validationStore from '../stores/validationStore'
  import userStore from '../stores/userStore'
  import { roleStore } from '../stores/stores'
  import InputError from '../components/InputError.svelte'
  import { getAuth } from '@firebase/auth'

  let userRegister: UserType = {
    email: 'testEmail' + Math.floor(Math.random() * 9999 + 1) + '@gmail.com',
    password: 'veryStr0ng_',
    nickName: 'testAccount' + Math.floor(Math.random() * 9999 + 1),
    firstName: 'Maxime',
    surName: 'Vermeeren',
    country: 'België',
    state: 'Oost-Vlaanderen',
    city: 'Oudenaarde',
    birthdate: '2000-01-01',
  }
  let passwordCheck: string = ''
  let errors: string[] = []
  // Todo: validation
  const checkValidation = (type: string) => {
    if (type == 'nickname') {
      // isNickNameAvailable(userRegister.nickName).then(result => {
      //   errors = validateError('nickname', 'available', result, errors)
      // })
    }
    if (type == 'password') {
      // errors = validateErrors(
      //   [
      //     // validateMatch(userPassword.new, userPassword.old),
      //     // todo: make work
      //     // validateLength(userRegister.password, 8),
      //     // validateMatch(userRegister.password, passwordCheck),
      //     // Todo: .Match in usevalidation not working
      //     // validateNumbers(user.password),
      //     // validateCapital(user.password),
      //     // validateLower(user.password),
      //   ],
      //   type,
      //   errors,
      // )
    }
  }

  const register = () => {
    if ($validationStore.length == 0) {
      registerUser(userRegister)
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
    if (isLoggedIn && firebaseControlled && $roleStore && $userStore) {
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
      <Title theme="dark">Register account</Title>

      <div class="flex space-x-12 flex-col sm:flex-row" style="">
        <div
          class="grid gap-4 auto-rows-min bg-gray-100 p-12 rounded-md box-content justify-self-end "
        >
          <InputError errorInput="connection" />
          <SubTitle theme="dark">📝 Create account</SubTitle>
          <label
            >Email adress<input
              bind:value={userRegister.email}
              class="input"
              placeholder="Email adress.."
            /></label
          >
          <!-- <label
            >Password<input
              bind:value={userRegister.password}
              class="input"
              type="password"
              placeholder="Password.."
            /></label
          > -->
          <Input
            errorInput={'password'}
            title="Password"
            bind:value={userRegister.password}
            portal=""
            on:input={() => checkValidation('password')}
            placeholder="Strong password.."
          />
          <label
            >Password again<input
              bind:value={passwordCheck}
              class="input"
              type="password"
              placeholder="Password again.."
            /></label
          >

          <label
            >Birthdate<input
              bind:value={userRegister.birthdate}
              class="input"
              placeholder="Birthdate.."
              type="date"
            /></label
          >
        </div>
        <div class="grid gap-4 py-12">
          <SubTitle theme="dark">🏡 Additional info</SubTitle>
          <!-- <label
            >What's your artistname?<input
              bind:value={userRegister.nickName}
              class="input"
              placeholder="Artist name.."
            /></label
          > -->
          <Input
            errorInput={'nickname'}
            title="What's your artistname?"
            bind:value={userRegister.nickName}
            portal=""
            on:input={() => checkValidation('nickname')}
            placeholder="Choose a nickname.."
          />
          <div class="grid md:grid-cols-2 gap-4">
            <label
              >First name<input
                bind:value={userRegister.firstName}
                class="input"
                placeholder="First name.."
              /></label
            >
            <label
              >Last name<input
                bind:value={userRegister.surName}
                class="input"
                placeholder="Last name.."
              /></label
            >
          </div>
          <div class="grid md:grid-cols-3 gap-4">
            <label
              >Country<input
                bind:value={userRegister.country}
                class="input"
                placeholder="Country.."
              /></label
            >
            <label
              >State<input
                bind:value={userRegister.state}
                class="input"
                placeholder="State.."
              /></label
            >
            <label
              >City<input
                bind:value={userRegister.city}
                class="input"
                placeholder="City.."
              /></label
            >
          </div>
          <Button
            onClick={register}
            rounded="none"
            color="bg-teal-700"
            className="justify-self-end">Create account!</Button
          >
        </div>
      </div>
    </article>
  </section>
</Container>

<Footer />
