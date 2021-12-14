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
  import { registerUser } from '../utils/useFirebase'
  import Input from '../components/Input.svelte'
  import {
    isNickNameAvailable,
    validateCapital,
    validateEmailValid,
    validateEmpty,
    validateError,
    validateErrors,
    validateErrorTime,
    validateLength,
    validateLower,
    validateMatch,
    validateNumbers,
  } from '../utils/useValidation'
  import validationStore from '../stores/validationStore'
  import userStore from '../stores/userStore'
  import { labelStore, roleStore } from '../stores/stores'
  import InputError from '../components/InputError.svelte'
  import { formatDateToDDMMJJJJ } from '../utils/useFormat'

  let birthDateString = formatDateToDDMMJJJJ(new Date())

  let userRegister: UserType = {
    email: '',
    password: '',
    nickName: '',
    firstName: '',
    surName: '',
    country: '',
    state: '',
    city: '',
    birthdate: '',
    biography: '',
  }

  let inputFields: string[] = [
    'email',
    'password',
    'nickname',
    'firstName',
    'surName',
    'country',
    'state',
    'city',
  ]

  let passwordCheck: string = ''
  let errors: string[] = []

  const checkValidation = (type: string = null) => {
    if (type == 'nickname') {
      isNickNameAvailable(userRegister.nickName).then(result => {
        errors = validateError('nickname', 'available', result, errors)
      })
      errors = validateErrors(
        [validateEmpty(userRegister.nickName)],
        type,
        errors,
      )
    } else if (type == 'email') {
      errors = validateErrors(
        [
          validateLength(userRegister.email, 12),
          validateEmailValid(userRegister.email),
        ],
        type,
        errors,
      )
    } else if (type == 'password') {
      errors = validateErrors(
        [
          validateLength(userRegister.password, 8),

          validateMatch(userRegister.password, passwordCheck),

          validateNumbers(userRegister.password),
          validateCapital(userRegister.password),
          validateLower(userRegister.password),
        ],
        type,
        errors,
      )
    } else {
      for (const errorType of inputFields) {
        if (errorType == type)
          errors = validateErrors(
            [validateEmpty(userRegister[type])],
            type,
            errors,
          )
      }
    }
  }
  let loadingStatus: { [key: string]: boolean } = {
    register: false,
  }

  const checkAllInputs = async () => {
    return new Promise(resolve => {
      inputFields.map((field: string) => {
        checkValidation(field)
      })
      resolve(true)
    })
  }

  const register = async () => {
    if (await checkAllInputs()) {
      loadingStatus.register = true

      // ! format it back to date type
      userRegister.birthdate = new Date(birthDateString)

      if ($validationStore.length == 0) {
        registerUser(userRegister)
          .then(async e => {
            await goto('/login')
            loadingStatus.register = false
          })
          .catch(() => {
            loadingStatus.register = false
            validateErrorTime('connection', 'graphql', errors)
          })
      } else {
        loadingStatus.register = false
        validateErrorTime('general', 'errors', errors)
      }
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

  $: {
    console.log(userRegister.nickName)
  }
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<Header type="split" />
<Container>
  <section>
    <article>
      <Title theme="dark">Register account</Title>

      <InputError errorInput="general" />
      <InputError errorInput="connection" />
      <div class="flex space-x-12 flex-col sm:flex-row " style="">
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
            required
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
            required
          />
          <Input
            title="Password validate"
            bind:value={passwordCheck}
            portal=""
            on:input={() => checkValidation('password')}
            placeholder="Password again.."
            type="password"
            required
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
            bind:value={birthDateString}
            portal=""
            placeholder="Birthdate.."
            type="date"
            required
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
        <div class="grid gap-4 py-12  w-full">
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
            title="What's your artistname / nickname?"
            bind:value={userRegister.nickName}
            portal=""
            on:input={() => checkValidation('nickname')}
            placeholder="Choose a nickname.."
            required
          />
          <div class="grid md:grid-cols-2 gap-4">
            <Input
              errorInput={'firstName'}
              title="First name"
              bind:value={userRegister.firstName}
              portal=""
              on:input={() => checkValidation('firstName')}
              placeholder="First name.."
              required
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
              required
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
              required
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
              required
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
              required
            />
          </div>
          <Input
            errorInput={'biography'}
            title="Biography"
            bind:value={userRegister.biography}
            portal=""
            on:input={() => checkValidation('biography')}
            textarea
            placeholder="About you.."
          />

          <p class="text-gray-400 text-sm">
            ❗ If you register an account, then you give the label the
            permission to use your data on this platform.
          </p>
          <Button
            onClick={register}
            rounded="none"
            color="bg-teal-700"
            loading={loadingStatus.register ? 'Creading account..' : null}
            className="justify-self-end">Create account!</Button
          >
        </div>
      </div>
    </article>
  </section>
</Container>

<Footer />
