import { writable } from 'svelte/store'
import type firebase from 'firebase/app'

const authStore = writable<{
	isLoggedIn: boolean
	user?: any
	firebaseControlled: boolean
	role?: string
}>({
	isLoggedIn: false,
	firebaseControlled: false,
	role: 'artist'
})

export default {
	subscribe: authStore.subscribe,
	set: authStore.set
}
