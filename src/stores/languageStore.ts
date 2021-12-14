import { browser } from '$app/env'

import { readable, writable } from 'svelte/store'

import translationsJSON from '../assets/translations.json'

const translations: any = translationsJSON

interface PageType {
  [key: string]: {
    [key: string]: string
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
  (browser && localStorage.getItem('lang')) || 'en' || 'en'
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

// const languageProp = language.subscribe(value => {
//   return value
// })
// const languageProp = 'nl'

// console.log(language)

// export const tranStore = writable<TranslationsType>(translations)
// export const langStore = writable<LanguageType>(
//   translations[langFromLocalStorage],
// )
// export const trans = writable<PageType>(
//   translations[langFromLocalStorage].pages,
// )
