/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/svelte'
import Test from './test.svelte'

test('Welcome the user', () => {
  const { getByText } = render(Test, { props: { name: 'John' } })

  expect(getByText('Welcome to SvelteKit John')).toBeInTheDocument()
})
