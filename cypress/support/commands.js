// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
  cy.get('[data-test=login-form-email]').type(email)
  cy.get('[data-test=login-form-password]').type(password)
  cy.get('[data-test=login-form-button]').click()
})

Cypress.Commands.add('editUser', (name, email) => {
  cy.get('[data-test=edit-name-input]').clear().type(name)
  cy.get('[data-test=edit-email-input]').clear().type(email)
  cy.get('[data-test=edit-user-button]').click()
})
