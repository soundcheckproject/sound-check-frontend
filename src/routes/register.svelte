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
    validateEmailValid,
    validateEmpty,
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
    if (type == 'email') {
      errors = validateErrors(
        [
          validateLength(userRegister.email, 12),
          validateEmailValid(userRegister.email),
        ],
        type,
        errors,
      )
    }
    if (type == 'password') {
      errors = validateErrors(
        [
          validateLength(userRegister.password, 8),
          // todo: make work
          validateMatch(userRegister.password, passwordCheck),
          // Todo: .Match in usevalidation not working
          // validateNumbers(user.password),
          // validateCapital(user.password),
          // validateLower(user.password),
        ],
        type,
        errors,
      )
    }
    for (const errorType of [
      'nickname',
      'birthdate',
      'firstName',
      'surName',
      'country',
      'state',
      'city',
      // 'prefferdReleaseDate',
    ]) {
      if (errorType == type)
        errors = validateErrors(
          [validateEmpty(userRegister[type])],
          type,
          errors,
        )
    }
  }

  $: {
    validationStore.set(errors)
  }

  const register = () => {
    if ($validationStore.length == 0) {
      registerUser(userRegister)
        .then(async e => {
          errors = validateError('connection', 'graphql', e, errors)
          errors = validateError('general', 'errors', e, errors)

          await goto('/portal')
        })
        .catch(e => {
          errors = validateError('connection', 'graphql', e, errors)
        })
    } else {
      errors = validateError('general', 'errors', false, errors)
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
  <section>
    <article>
      <Title theme="dark">Register account</Title>

      <InputError errorInput="general" />
      <InputError errorInput="connection" />
      <div class="flex space-x-12 flex-col sm:flex-row bg-red-200" style="">
        <div
          class="grid gap-4 auto-rows-min bg-gray-100 p-12 rounded-md box-content justify-self-end "
        >
          <SubTitle theme="dark">📝 Create account</SubTitle>

          <Input
            bind:value={userRegister.email}
            title="Email address"
            type="email"
            errorInput="email"
            portal=""
            on:input={() => {
              checkValidation('email')
            }}
            placeholder="Email address.."
          />
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
            type="password"
          />
          <Input
            title="Password validate"
            bind:value={passwordCheck}
            portal=""
            on:input={() => checkValidation('password')}
            placeholder="Password again.."
            type="password"
          />

          <!-- <label
            >Password again<input
              bind:value={passwordCheck}
              on:input={() => checkValidation('password')}
              class="input"
              type="password"
              placeholder="Password again.."
            /></label
          > -->
          <Input
            errorInput={'birthdate'}
            title="Birthdate"
            bind:value={userRegister.birthdate}
            portal=""
            on:input={() => checkValidation('birthdate')}
            placeholder="Birthdate.."
            type="date"
          />
          <!-- <label
            >Birthdate<input
              bind:value={userRegister.birthdate}
              class="input"
              placeholder="Birthdate.."
              type="date"
            /></label
          > -->
        </div>
        <div class="grid gap-4 py-12 bg-red-300 w-full">
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
            <Input
              errorInput={'firstName'}
              title="First name"
              bind:value={userRegister.firstName}
              portal=""
              on:input={() => checkValidation('firstName')}
              placeholder="First name.."
            />
            <!-- <label
              >First name<input
                bind:value={userRegister.firstName}
                class="input"
                placeholder="First name.."
              /></label
            > -->
            <Input
              errorInput={'surName'}
              title="Last name"
              bind:value={userRegister.surName}
              portal=""
              on:input={() => checkValidation('surName')}
              placeholder="Last name.."
            />
          </div>
          <div class="grid md:grid-cols-3 gap-4">
            <Input
              errorInput={'country'}
              title="Country"
              bind:value={userRegister.country}
              portal=""
              on:input={() => checkValidation('country')}
              placeholder="Country.."
            />
            <!-- <label
              >Country<input
                bind:value={userRegister.country}
                class="input"
                placeholder="Country.."
              /></label
            > -->
            <Input
              errorInput={'state'}
              title="State"
              bind:value={userRegister.state}
              portal=""
              on:input={() => checkValidation('state')}
              placeholder="State.."
            />
            <!-- <label
              >State<input
                bind:value={userRegister.state}
                class="input"
                placeholder="State.."
              /></label
            > -->
            <Input
              errorInput={'city'}
              title="City"
              bind:value={userRegister.city}
              portal=""
              on:input={() => checkValidation('city')}
              placeholder="City.."
            />
          </div>
          <p class="text-gray-400 text-sm">
            * If you register an account, then you give the label the permission
            to use your data on this platform.
          </p>

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
