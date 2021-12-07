/* eslint-disable */
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'

import { render, screen, fireEvent } from '@testing-library/svelte'

import LoginPage from '../src/routes/login.svelte'

describe('Sign up page', () => {
  describe('Layout', () => {
    it('has Sign up header', () => {
      render(LoginPage)
      const loginTitle = screen.getByText(container, 'Hello World') // full string match
      // const header = screen.getByRole('heading', { name: 'Login with account' })
      expect(loginTitle).toBeInTheDocument();
    })
  })
})

