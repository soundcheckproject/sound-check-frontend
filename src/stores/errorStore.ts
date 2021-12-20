import { readable } from 'svelte/store'

import _, { langStore } from '../stores/languageStore'

let errors: { [key: string]: string }
_.subscribe(v => {
  langStore.subscribe(() => {
    errors = v.errors
  })
})

const errorStore = readable<{
  [key: string]: { [key: string]: string | boolean }[]
}>({
  connection: [
    {
      display: false,
      errorName: 'connection_graphql',
      // message: 'Connection with database is not working.',

      message: errors.connection_graphql,
    },
  ],
  email: [
    {
      display: false,
      errorName: 'email_length',
      message: errors.email,
    },
    {
      display: false,
      errorName: 'email_valid',
      message: errors.email_valid,
    },
    {
      display: false,
      errorName: 'email_empty',
      message: errors.email_required,
    },
  ],
  password: [
    {
      display: false,
      errorName: 'password_length',
      message: errors.password,
    },
    {
      display: false,
      errorName: 'password_valid',
      message: errors.password_valid,
    },
    {
      display: false,
      errorName: 'password_strength',
      message: errors.password_strong,
    },
    {
      display: false,
      errorName: 'password_match',
      message: errors.password_match,
    },
    {
      display: false,
      errorName: 'password_old',
      message: errors.password_old,
    },
    {
      display: false,
      errorName: 'password_number',
      message: errors.password_number,
    },
    {
      display: false,
      errorName: 'password_capital',
      message: errors.password_capital,
    },
    {
      display: false,
      errorName: 'password_lower',
      message: errors.password_lower,
    },
    {
      display: false,
      errorName: 'password_empty',
      message: errors.password_empty,
    },
  ],
  nickname: [
    {
      display: false,
      errorName: 'nickname_available',
      message: errors.nickname_available,
    },
    {
      display: false,
      errorName: 'nickname_empty',
      message: errors.nickname_empty,
    },
  ],
  firstName: [
    {
      display: false,
      errorName: 'firstName_empty',
      message: errors.firstname_empty,
    },
  ],
  logo: [
    {
      display: false,
      errorName: 'logo_empty',
      message: 'Cannot update logo if logo is empty',
    },
  ],
  surName: [
    {
      display: false,
      errorName: 'surName_empty',
      message: errors.surname_empty,
    },
  ],

  state: [
    {
      display: false,
      errorName: 'state_empty',
      message: errors.state_empty,
    },
  ],
  biography: [
    {
      display: false,
      errorName: 'biography_empty',
      message: errors.biography_empty,
    },
  ],
  birthdate: [
    {
      display: false,
      errorName: 'birthdate_empty',
      message: errors.birthdate_empty,
    },
  ],
  country: [
    {
      display: false,
      errorName: 'country_empty',
      message: errors.country_empty,
    },
  ],
  city: [
    {
      display: false,
      errorName: 'city_empty',
      message: errors.city_empty,
    },
  ],
  title: [
    {
      display: false,
      errorName: 'title_empty',
      message: 'Please fill in a title',
    },
  ],
  description: [
    {
      display: false,
      errorName: 'description_empty',
      message: 'Please fill in a description',
    },
  ],
  date: [
    {
      display: false,
      errorName: 'date_empty',
      message: 'Please pick a possible releasedate',
    },
  ],
  lyrics: [
    {
      display: false,
      errorName: 'lyrics_empty',
      message: 'Please fill in some lyrics',
    },
  ],
  general: [
    {
      display: false,
      errorName: 'general_errors',
      message: 'Please fix all errors first and try again',
    },
    {
      display: false,
      errorName: 'general_change',
      message: 'Nothing has changed, please only submit changes',
    },
    {
      display: false,
      errorName: 'general_submit',
      message: 'Something went wrong while submitting your track',
    },
    {
      display: false,
      errorName: 'general_login',

      message: errors.general_login,
    },
    {
      display: false,
      errorName: 'general_register',
      message: errors.general_register,
    },
  ],
  update: [
    {
      display: false,
      errorName: 'update_403',
      message: "You don't have the permission to do this action",
    },
    {
      display: false,
      errorName: 'update_linkexcist',
      message: 'You already added a social media channel with this name',
    },
    {
      display: false,
      errorName: 'update_linktype',
      message: 'Please pick a channel to add to the list',
    },
    {
      display: false,
      errorName: 'update_linkempty',
      message: 'Please add an address link to the channel',
    },
  ],
  artist: [
    {
      display: false,
      errorName: 'artist_royalty_high',
      message: 'Royalty total should be equal to 100%',
    },
  ],
  artwork: [
    {
      display: false,
      errorName: 'artwork_upload',
      message: 'Error while uploading artwork',
    },
    {
      display: false,
      errorName: 'artwork_empty',
      message: 'Please upload a track first',
    },
  ],
  track: [
    {
      display: false,
      errorName: 'track_empty',
      message: 'Please upload a track first',
    },
    {
      display: false,
      errorName: 'track_upload',
      message: 'Error while uploading artwork',
    },
  ],
  previewpart: [
    {
      display: false,
      errorName: 'previewpart_startlower',
      message: 'Start must be lower then stop',
    },
    {
      display: false,
      errorName: 'previewpart_equalitynumbers',
      message: "Start and stop can't be equal",
    },
  ],
})

export default {
  subscribe: errorStore.subscribe,
}
