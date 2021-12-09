/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/svelte'
import TrackPlayer from './TrackPlayer.svelte'

test('Welcome the user', () => {
  const trackObj = {}
  const { getByText } = render(TrackPlayer, {
    props: {
      size: 'xs',
      track: trackObj,
    },
  })


})
