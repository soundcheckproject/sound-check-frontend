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
  ],
  nickname: [
    {
      display: false,
      errorName: 'nickname_available',
      message: 'Nickname is not available',
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
})

export default {
  subscribe: errorStore.subscribe,
}
