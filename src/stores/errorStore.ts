import { writable } from 'svelte/store'

const errorStore = writable<{
  login: Object
  register: Object
}>({
  login: {},
  register: {},
})

export default {
  subscribe: errorStore.subscribe,
  set: errorStore.set,
}
