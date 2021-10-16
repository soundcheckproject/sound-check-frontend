import { writable } from 'svelte/store';
export const generalStore = writable({
	Name: 'hi'
});
export const userRole = writable(2);
export const userAuth = writable(true);
