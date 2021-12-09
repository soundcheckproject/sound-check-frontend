// /**
//  * @jest-environment jsdom
//  */
// import { screen, render, fireEvent, getByText } from '@testing-library/svelte'
// import SubmitPage from './submit.svelte'

// test('Submit track to database', () => {
//   describe('Test input fields', () => {
//     const { getByText,getAllByLabelText } = render(SubmitPage)
//     const objNewTrack = {}
//     const TextMatch = 'trackname'
//     const inputLabels: string[] = []

//     inputLabels.push(
//       getAllByLabelText(TextMatch)[0].getAttribute('name'),
//     )
//     // screen.getByLabelText(

//     //     text: TextMatch,
//     //     options?: {
//     //         selector?: string = '*',
//     //         exact?: boolean = true,
//     //         normalizer?: NormalizerFn,
//     //     }): HTMLElement
//   })
//   //    const { getByText } = render(Artist, {
//   //      props: {
//   //        size: 'xs',
//   //        artist: artistObj,
//   //      },
//   //    })

//   //   expect(getByText('mave')).toBeInTheDocument()

//   //    const displayedImage = document.querySelector('img') as HTMLImageElement
//   //    expect(displayedImage.src).toContain(artistObj.logo)
//   //    expect(displayedImage.alt).toContain(`Artist ${artistObj.nickName}`)
// })
// test('changes button text on click', async () => {
//   const button = screen.getByText('Submit track')
//   await fireEvent.click(button)
// })
