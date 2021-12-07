import { writable } from 'svelte/store'

const authStore = writable<{
  isLoggedIn: boolean
  user?: any
  firebaseControlled: boolean
  role?: string
}>({
  isLoggedIn: false,
  firebaseControlled: false,
  role: 'artist',
})

export default {
  subscribe: authStore.subscribe,
  set: authStore.set,
}
