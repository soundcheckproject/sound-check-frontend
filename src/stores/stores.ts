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

export const pageSelectedStore =
  writable<{ name: string; title: string }>(undefined)

export const roleStore = writable<string>()

export const menuState = writable(false)
