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
      <h1 class="text-2xl font-bold text-center mb-4">Forgot password</h1>
      <p class="text-sm text-center">
        Enter your email to receive a link to reset your password.
      </p>
      {#if sendError}
        <p class="text-red-600 font-bold text-center">Could not send reset link to this email.</p>
      {/if}
      <input
        bind:value={email}
        class="input"
        placeholder="e.g. jhon.doe@domain.com"
        type="email"
        name="email"
        id="email"
      />
      {#if error}
        <p class="text-red-600">{error}</p>
      {/if}
      <button
        class="bg-teal-700 p-2 rounded-sm text-white font-bold mb-6 transition-colors hover:bg-opacity-80 mshadow-md"
        type="submit"
        on:click={submitHandler}
        >{#if sending}
          <div class="flex space-x-2 justify-center items-center">
            <svg
              class="animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
            <p>Sending...</p>
          </div>
        {:else}Submit{/if}</button
      >
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
        <h1 class="text-2xl font-bold text-center mb-6">Email send.</h1>
      </div>
    {/if}

    <a
      class="w-[calc(100% + 2rem)] sm:w-[calc(100% + 3rem)] bg-teal-700 text-white text-center p-4 -m-4 sm:-m-10 sm:mt-0 flex justify-center transition-colors hover:bg-opacity-80 mshadow-md  rounded-b-md"
      href="/login"
    >
      <svg
        class="w-6 h-6 stroke-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"><path d="M15 18l-6-6 6-6" /></svg
      > Return to login</a
    >
  </article>
</main>
