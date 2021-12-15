/* eslint-disable no-undef */
/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('portal', () => {
  const testUser_User = {
    email: 'niels2011@live.be',
    password: 'strongpassword1',
  }

  beforeEach(() => {
    cy.visit('/login')
}
)

it('should login a user with role User', () => {
  cy.get('input[type=email').type(testUser_User.email)
  cy.get('input[type=password]').type(testUser_User.password)
  cy.get('.login-btn').click()
  cy.url().should('include', '/portal')
  cy.contains('Welcome to the portal.')
})

it('should show error message', () => {
    const fakeTrackId = 'qhfsqsfqs46546'
    cy.get('input[type=email').type(testUser_User.email)
    cy.get('input[type=password]').type(testUser_User.password)
    cy.get('.login-btn').click()
    cy.url().should('include', '/portal')
    cy.visit(`/portal/artist/demo/${fakeTrackId}`)
    cy.contains('Error while fetching')
  })
})
