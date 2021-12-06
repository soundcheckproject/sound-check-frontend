<script lang="ts">
  import { page } from '$app/stores'
  import { query } from '../../utils/useGraphQL'
  import InputError from '../../components/InputError.svelte'

  let email = ''
  let error = undefined

  const checkEmail = async () => {
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
      console.log({ user })
      error = undefined
    } catch (err) {
      error = 'Email does not exists in our platform.'
      console.log({ err })
    }
  }
</script>

<main class="gradientBlueGreen h-screen w-screen grid place-items-center p-4">
  <article class="w-full max-w-md bg-gray-50 rounded-md p-4 sm:p-10 shadow-xl">
    <h1 class="text-2xl font-bold text-center mb-4">Forgot password</h1>
    <p class="text-sm text-center">
      Enter your email to receive a link to reset your password.
    </p>
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
      on:click={checkEmail}>Submit</button
    >
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
