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

  import _ from '../stores/languageStore'

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

</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<Header type="split" />
<Container>
  <section>
    <article>
      <Title theme="dark">{$_.register.title}</Title>

      <InputError errorInput="general" />
      <InputError errorInput="connection" />
      <div class="flex space-x-12 flex-col sm:flex-row " style="">
        <div
          class="grid gap-4 auto-rows-min bg-gray-100 p-12 rounded-md box-content justify-self-end "
        >
          <SubTitle theme="dark">📝 {$_.register.register}</SubTitle>

          <Input
            bind:value={userRegister.email}
            title={$_.register.form.email}
            type="email"
            errorInput="email"
            portal=""
            on:input={() => {
              checkValidation('email')
            }}
            placeholder={$_.register.form.email + '..'}
            required
          />

          <Input
            errorInput={'password'}
            title={$_.register.form.password}
            bind:value={userRegister.password}
            portal=""
            on:input={() => checkValidation('password')}
            placeholder={$_.register.form.password_strong + '..'}
            type="password"
            required
          />
          <Input
            title={$_.register.form.password_confirm}
            bind:value={passwordCheck}
            portal=""
            on:input={() => checkValidation('password')}
            placeholder={$_.register.form.password_confirm_placeholder + '..'}
            type="password"
            required
          />

          <Input
            errorInput={'birthdate'}
            title={$_.register.form.birthdate}
            bind:value={birthDateString}
            portal=""
            placeholder={$_.register.form.birthdate + '..'}
            type="date"
            required
          />
        </div>
        <div class="grid gap-4 py-12  w-full">
          <SubTitle theme="dark">🏡 {$_.register.additional}</SubTitle>

          <Input
            errorInput={'nickname'}
            title={$_.register.form.nickname}
            bind:value={userRegister.nickName}
            portal=""
            on:input={() => checkValidation('nickname')}
            placeholder={$_.register.form.nickname_placeholder + '..'}
            required
          />
          <div class="grid md:grid-cols-2 gap-4">
            <Input
              errorInput={'firstName'}
              title={$_.register.form.firstname}
              bind:value={userRegister.firstName}
              portal=""
              on:input={() => checkValidation('firstName')}
              placeholder={$_.register.form.firstname + '..'}
              required
            />

            <Input
              errorInput={'surName'}
              title={$_.register.form.surname}
              bind:value={userRegister.surName}
              portal=""
              on:input={() => checkValidation('surName')}
              placeholder={$_.register.form.surname + '..'}
              required
            />
          </div>
          <div class="grid md:grid-cols-3 gap-4">
            <Input
              errorInput={'country'}
              title={$_.register.form.country}
              bind:value={userRegister.country}
              portal=""
              on:input={() => checkValidation('country')}
              placeholder={$_.register.form.country + '..'}
              required
            />

            <Input
              errorInput={'state'}
              title={$_.register.form.state}
              bind:value={userRegister.state}
              portal=""
              on:input={() => checkValidation('state')}
              placeholder={$_.register.form.state + '..'}
              required
            />

            <Input
              errorInput={'city'}
              title={$_.register.form.city}
              bind:value={userRegister.city}
              portal=""
              on:input={() => checkValidation('city')}
              placeholder={$_.register.form.city + '..'}
              required
            />
          </div>
          <Input
            errorInput={'biography'}
            title={$_.register.form.biography}
            bind:value={userRegister.biography}
            portal=""
            on:input={() => checkValidation('biography')}
            textarea
            placeholder={$_.register.form.biography_placeholder}
          />

          <p class="text-gray-400 text-sm">
            ❗ {$_.register.privacy}
          </p>
          <Button
            onClick={register}
            rounded="none"
            color="bg-teal-700"
            loading={loadingStatus.register
              ? $_.register.form.submit + '..'
              : null}
            className="justify-self-end">{$_.register.form.submit}</Button
          >
        </div>
      </div>
    </article>
  </section>
</Container>

<Footer />
