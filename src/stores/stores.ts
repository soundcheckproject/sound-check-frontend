import variables from '../utils/variables'
import { writable } from 'svelte/store'

const label = {
  uuid: variables.labelId,
  name: variables.name,
  shortName: variables.shortName,
  description: variables.description,
  founded: variables.founded,
  logo: variables.logo,
}

export const labelStore = writable(label)
// export const userRole = writable(2)
// export const userAuth = writable(true)

export const roleStore = writable<string>()
// generalStore.set({ Name: 'yo' });

export const menuState = writable(false)
