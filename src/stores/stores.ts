import { writable } from 'svelte/store';
export const generalStore = writable({
	Name: 'SoundCheck'
});
export const userRole = writable(2);
export const userAuth = writable(true);

// generalStore.set({ Name: 'yo' });
