import { writable } from 'svelte/store'
export const generalStore = writable({
	Name: 'SoundCheck'
})
export const userRole = writable(2)
export const userAuth = writable(true)

export const roleStore = writable('member')
// generalStore.set({ Name: 'yo' });

export const menuState = writable(false)
