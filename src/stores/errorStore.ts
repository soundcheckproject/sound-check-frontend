import { readable } from 'svelte/store'

const errorStore = readable<{
  [key: string]: { [key: string]: string | boolean }[]
}>({
  email: [
    {
      display: false,
      errorName: 'email_length',
      message: 'Email is not long enough',
    },
    {
      display: false,
      errorName: 'email_valid',
      message: 'Email is not valid',
    },
  ],
  password: [
    {
      display: false,
      errorName: 'password_length',
      message: 'Password is not long enough',
    },
    {
      display: false,
      errorName: 'password_valid',
      message: 'Password is not valid',
    },
    {
      display: false,
      errorName: 'password_strength',
      message: 'Password is not strong enough',
    },
  ],
  nickname: [
    {
      display: false,
      errorName: 'nickname_available',
      message: 'Nickname is not available',
    },
  ],
})

export default {
  subscribe: errorStore.subscribe,
}
