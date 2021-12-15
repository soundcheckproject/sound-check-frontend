import { browser } from '$app/env'

import { writable } from 'svelte/store'

import languages from '../assets/lang/languages.json'

let translations: LanguageType

interface PageType {
  [key: string]: {
    [key: string]: string | string[] | any
  }
}

interface LanguageType {
  language?: string
  code?: string
  flag?: string
  pages?: PageType
}
interface TranslationsType {
  [key: string]: LanguageType
}

const langFromLocalStorage =
  (browser && (localStorage.getItem('lang') || 'en')) || 'en'

export const langStore = writable(langFromLocalStorage)
export const translationsStore = writable<TranslationsType>(languages)
export const languageStore = writable<LanguageType>(
  languages[langFromLocalStorage],
)
translations = await import(`../assets/lang/${langFromLocalStorage}.json`)
const pageStore = writable<PageType>(translations.pages)

export default {
  subscribe: pageStore.subscribe,
  set: pageStore.set,
}

langStore.subscribe(async value => {
  if (browser) {
    localStorage.lang = value
    translations = await import(`../assets/lang/${value}.json`)
    languageStore.set(translations)
    pageStore.set(translations.pages)
  }
})
