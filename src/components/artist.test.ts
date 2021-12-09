/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/svelte'
import Artist from './Artist.svelte'

test('Welcome the user', () => {
  const artistObj = {
    nickName: 'mave',
    uuid: 'b95656c1-e994-42d3-9e5d-c37f260b2a78',
    firstName: 'eef',
    surName: 'eVermeeren',
    email: 'artist@soundcheck.be',
    country: 'Belgium',
    logo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.atlanticrecords.com%2Fsites%2Fg%2Ffiles%2Fg2000003466%2Ff%2Fstyles%2Fartistheaderimgstyle_1440_669_%2Fpublic%2F202003%2FSymba%25201900x700.jpg%3Fitok%3DEtHAt5qE&f=1&nofb=1',
    userLinks: [
      {
        linkAddress: 'soundcloud.com/mavesound',
        link: {
          type: 'soundcloud',
        },
      },
      {
        linkAddress: 'instagram.com/edwardoo',
        link: {
          type: 'instagram',
        },
      },
    ],
  }
  const { getByText } = render(Artist, {
    props: {
      size: 'xs',
      artist: artistObj,
    },
  })

//   expect(getByText('mave')).toBeInTheDocument()

  const displayedImage = document.querySelector('img') as HTMLImageElement
  expect(displayedImage.src).toContain(artistObj.logo)
  expect(displayedImage.alt).toContain(`Artist ${artistObj.nickName}`)
})
