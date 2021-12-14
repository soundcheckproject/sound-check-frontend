import { browser } from '$app/env'

import { writable } from 'svelte/store'

import translationsJSON from '../assets/translations.json'

const translations: any = translationsJSON

// interface FormType {
//   [key: string]: { [key: string]: string }
// }

// interface PageType {
//   [key: string]: {
//     [key: string]:
//       | string
//       | string[]
//       | { [key: string]: { [key: string]: string } }
//   }
// }
interface PageType {
  [key: string]: {
    [key: string]:
      | string
      | string[]
      | any
  }
}

interface LanguageType {
  language: string
  code: string
  flag: string
  pages: PageType
}
interface TranslationsType {
  [key: string]: LanguageType
}

const langFromLocalStorage =
  (browser && (localStorage.getItem('lang') || 'en')) || 'en'
export const langStore = writable(langFromLocalStorage)
export const translationsStore = writable<TranslationsType>(translations)
export const languageStore = writable<LanguageType>(
  translations[langFromLocalStorage],
)

const pageStore = writable<PageType>(translations[langFromLocalStorage].pages)
export default {
  subscribe: pageStore.subscribe,
  set: pageStore.set,
}

langStore.subscribe(value => {
  if (browser) {
    localStorage.lang = value
    languageStore.set(translations[value])
    pageStore.set(translations[value].pages)
  }
})
