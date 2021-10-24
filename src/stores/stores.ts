import { writable } from 'svelte/store'
export const generalStore = writable({
	Name: 'SoundCheck'
})
export const userRole = writable(2)
export const userAuth = writable(true)

interface formError {
	errorName?: string
	message: string
}

// generalStore.set({ Name: 'yo' });
