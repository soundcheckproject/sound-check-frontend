import { writable } from 'svelte/store'
export const labelStore = writable(undefined)
export const userRole = writable(2)
export const userAuth = writable(true)

export const roleStore = writable<string>()
// generalStore.set({ Name: 'yo' });

export const menuState = writable(false)
