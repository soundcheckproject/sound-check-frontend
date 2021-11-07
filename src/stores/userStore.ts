import type { UserType } from '../types/User.type'
import { writable } from 'svelte/store'

const userStore = writable<UserType>({ nickName: '', logo: '' })

export default {
  subscribe: userStore.subscribe,
  set: userStore.set,
}
