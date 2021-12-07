import { readable } from 'svelte/store'

const errorStore = readable<{
  [key: string]: { [key: string]: string | boolean }[]
}>({
  connection: [
    {
      display: false,
      errorName: 'connection_graphql',
      message: 'Connection with database is not working.',
    },
  ],

  email: [
    {
      display: false,
      errorName: 'email_length',
      message: 'Email is not long enough',
    },
    {
      display: false,
      errorName: 'email_valid',
      message: 'Email is not valid',
    },
  ],
  password: [
    {
      display: false,
      errorName: 'password_length',
      message: 'Password is not long enough',
    },
    {
      display: false,
      errorName: 'password_valid',
      message: 'Password is not valid',
    },
    {
      display: false,
      errorName: 'password_strength',
      message: 'Password is not strong enough',
    },
    {
      display: false,
      errorName: 'password_match',
      message: 'Password does not match',
    },
    {
      display: false,
      errorName: 'password_old',
      message: 'Password cannot be the same',
    },
    {
      display: false,
      errorName: 'password_number',
      message: 'Password should contain at least 1 number',
    },
    {
      display: false,
      errorName: 'password_capital',
      message: 'Password should contain at least 1 lowercase letter',
    },
    {
      display: false,
      errorName: 'password_lower',
      message: 'Password should contain at least 1 uppercase letter',
    },
  ],
  nickname: [
    {
      display: false,
      errorName: 'nickname_available',
      message: 'Nickname is not available',
    },
    {
      display: false,
      errorName: 'nickname_empty',
      message: 'Please fill in a nickname',
    },
  ],
  firstName: [
    {
      display: false,
      errorName: 'firstName_empty',
      message: 'Please fill in a first name',
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
      message: 'Please fill in a last name',
    },
  ],

  state: [
    {
      display: false,
      errorName: 'state_empty',
      message: 'Please fill in a state',
    },
  ],
  biography: [
    {
      display: false,
      errorName: 'biography_empty',
      message: 'Please fill in a biography',
    },
  ],
  birthdate: [
    {
      display: false,
      errorName: 'birthdate_empty',
      message: 'Please fill in a birthdate',
    },
  ],
  country: [
    {
      display: false,
      errorName: 'country_empty',
      message: 'Please fill in a country',
    },
  ],
  city: [
    {
      display: false,
      errorName: 'city_empty',
      message: 'Please fill in a city',
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
})

export default {
  subscribe: errorStore.subscribe,
}
