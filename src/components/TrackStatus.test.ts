/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte'
import TrackStatus from './TrackStatus.svelte'

describe('TrackStatus component', () => {
  const statusArray: string[] = ['pending', 'released', 'accepted', 'denied']
  for (const status of statusArray) {
    test('Test if status is in document', () => {
      const { queryByText } = render(TrackStatus, {
        props: {
          status: status,
          hoverStatus: true,
        },
      })
      expect(queryByText(status)).toBeInTheDocument()
    })
  }
  for (const status of statusArray) {
    test('Test if status is not document', () => {
      const { queryByText } = render(TrackStatus, {
        props: {
          status: status,
          hoverStatus: false,
        },
      })
      expect(queryByText(status)).toBeNull()
    })
  }
})
