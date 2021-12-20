/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte'
import Track from './Track.svelte'

describe('Track component', () => {
  const trackObj = {
    uuid: '123-321-123-321',
    title: 'Memories',
    artwork: {
      resource: '',
    },
    artistTracks: [
      {
        user: {
          nickName: 'Mave',
        },
      },
      {
        user: {
          nickName: 'Jave',
        },
      },
    ],
  }
  const { getByText } = render(Track, {
    props: {
      track: trackObj,
      hover: true,
      size: 'sm',
    },
  })
  test('Test if track works', () => {
    const displayedImage = document.querySelector('img') as HTMLImageElement
    expect(displayedImage.src).toContain(trackObj.artwork.resource)
    expect(displayedImage.alt).toContain(`Trackname`)

    expect(getByText(trackObj.title)).toBeInTheDocument()
    expect(
      getByText(
        trackObj.artistTracks[0].user.nickName +
          ' & ' +
          trackObj.artistTracks[1].user.nickName,
      ),
    ).toBeInTheDocument()
  })
})
