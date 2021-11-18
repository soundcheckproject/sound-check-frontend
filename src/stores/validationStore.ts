import { writable } from 'svelte/store'

export const formErrors = {
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
}
const validationStore = writable<any[]>([])

export default {
  subscribe: validationStore.subscribe,
  set: validationStore.set,
}
