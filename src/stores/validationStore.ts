import { writable } from 'svelte/store'

const validationStore = writable<string[]>([])

export default {
  subscribe: validationStore.subscribe,
  set: validationStore.set,
}
