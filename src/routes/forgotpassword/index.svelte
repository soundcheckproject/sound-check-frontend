<script lang="ts">
  import { page } from '$app/stores'
  import { query } from '../../utils/useGraphQL'
  import InputError from '../../components/InputError.svelte'
  import {
    getAuth,
    sendPasswordResetEmail,
    sendSignInLinkToEmail,
  } from 'firebase/auth'
  import { onMount } from 'svelte'
  import Title from '../../components/Title.svelte'
  import Input from '../../components/Input.svelte'

  import _ from '../../stores/languageStore'
  import Button from '../../components/Button.svelte'

  let email = ''
  let error = undefined
  let checkField = false
  let send = false
  let sending = false
  let sendError = false

  let LottiePlayer = undefined

  onMount(async () => {
    const module = await import('@lottiefiles/svelte-lottie-player')
    LottiePlayer = module.LottiePlayer
  })

  let controlsLayout = [
    'previousFrame',
    'playpause',
    'stop',
    'nextFrame',
    'progress',
    'frame',
    'loop',
    'spacer',
    'background',
    'snapshot',
    'zoom',
    'info',
  ]

  $: {
    console.log(email)
    if (checkField) {
      if (!isValidEmail()) {
        error = 'Please enter a valid email address.'
      } else {
        error = undefined
      }
    }
  }

  const isValidEmail = (): boolean =>
    new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}').test(email)

  const doesEmailExists = async (): Promise<boolean> => {
    try {
      const user = await query(
        `getUserByEmail`,
        `query getUserByEmail($email: String!) {
                  getUserByEmail(email: $email) {
                      uuid
                    }
                  }`,
        { email: email },
      )

      if (user) return true
      return false
    } catch (err) {
      return false
    }
  }

  const sendEmail = async () => {
    const auth = getAuth()
    sendPasswordResetEmail(auth, email)
      .then(() => {
        send = true
        sendError = false
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        sendError = true
        console.error('Could not send email.')
      })
      .finally(() => (sending = false))
  }

  const submitHandler = async () => {
    checkField = true
    if (!isValidEmail()) {
      error = 'Please enter a valid email address.'
    } else if (!(await doesEmailExists())) {
      error = 'This email does not exists on our platform.'
    } else {
      error = undefined
      sending = true
      sendEmail()
      checkField = false
    }
  }
</script>

<main class="gradientBlueGreen h-screen w-screen grid place-items-center p-4">
  <article
    class="w-full max-w-md bg-gray-50 rounded-md p-4 sm:p-10 shadow-xl text-gray-900"
  >
    {#if !send}
      <Title class="text-center">🧠 {$_.forgot.title}</Title>

      <p class="text-sm ">
        {$_.forgot.description[0]}<br /><br />
        {$_.forgot.description[1]}
      </p>
      {#if sendError}
        <p class="text-red-600 font-bold text-center">
          {$_.errors.forgot_error}
        </p>
      {/if}
      <Input
        bind:value={email}
        title={$_.forgot.form.email}
        portal=""
        placeholder="{$_.forgot.form.example} jhon.doe@domain.com"
        type="email"
        name="email"
        id="email"
      />

      {#if error}
        <p class="text-red-600">{error}</p>
      {/if}
      <Button
        loading={sending ? 'Updating track..' : null}
        size="md"
        color="bg-teal-700"
        class="mb-6"
        onClick={() => submitHandler()}
      >
        {$_.forgot.form.submit}
      </Button>
    {:else}
      <div class="flex flex-col items-center">
        {#if LottiePlayer}
          <LottiePlayer
            src="/lottie/check-animation.json"
            autoplay={true}
            loop={true}
            controls={false}
            renderer="svg"
            background="transparent"
            height={150}
            width={150}
            {controlsLayout}
          />
        {/if}
        <h1 class="text-2xl font-bold text-center mb-6">{$_.forgot.send}</h1>
      </div>
    {/if}

    <a
      class="w-[calc(100% + 2rem)] sm:w-[calc(100% + 3rem)] bg-teal-700 text-white text-center p-4 -m-4 sm:-m-10 sm:mt-0 flex justify-center transition-colors hover:bg-opacity-80 mshadow-md items-center  rounded-b-md"
      href="/login"
    >
      <svg
        class="w-5 h-5 stroke-current mr-1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"><path d="M15 18l-6-6 6-6" /></svg
      >
      {$_.forgot.back}</a
    >
  </article>
</main>
