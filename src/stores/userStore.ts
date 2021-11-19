import type { UserType, ArtistType } from '../types/User.type'
import { writable } from 'svelte/store'

const userStore = writable<UserType | ArtistType>({ nickName: '', logo: '' })

export default {
  subscribe: userStore.subscribe,
  set: userStore.set,
}
