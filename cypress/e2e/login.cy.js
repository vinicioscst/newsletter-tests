/// <reference types="cypress" />

describe('login page', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('BASE_URL')}/login`)
  })

  context('validation', () => {
    it('verifies if form has empty field(s) before submitting 1/3', () => {
      cy.get('div .error--text').should('not.exist')
      cy.get('[data-test=login-form-button]').click()
      cy.get('div .error--text').should('exist')
      cy.get('[data-test=login-form-button]').should('be.disabled')
    })

    it('verifies if form has empty field(s) before submitting 2/3', () => {
      cy.get('[data-test=login-form-email]').type('meuemail@ht.com')
      cy.get('div .error--text').should('not.exist')
      cy.get('[data-test=login-form-button]').click()
      cy.get('div .error--text').should('exist')
      cy.get('[data-test=login-form-button]').should('be.disabled')
    })

    it('verifies if form has empty field(s) before submitting 3/3', () => {
      cy.get('[data-test=login-form-password]').type('minhasenha')
      cy.get('div .error--text').should('not.exist')
      cy.get('[data-test=login-form-button]').click()
      cy.get('div .error--text').should('exist')
      cy.get('[data-test=login-form-button]').should('be.disabled')
    })

    it('verifies if form has invalid value', () => {
      cy.get('[data-test=login-form-email]').type('meuemail@com')
      cy.get('div .error--text').should('exist')
      cy.get('[data-test=login-form-button]').should('be.disabled')
    })
  })

  context('login', () => {
    it('gives invalid credentials message when inserting invalid data', () => {
      cy.intercept('POST', `${Cypress.env('API_BASEURL')}/api/login`).as(
        'loginRequest'
      )

      cy.login('meuemail@ht.com', 'minhasenha')

      cy.wait('@loginRequest').then((interception) => {
        expect(interception.response.statusCode).to.equal(401)
        cy.get('.Vue-Toastification__toast--error')
          .should('exist')
          .and('be.visible')
      })
    })

    it('goes to dashboard when inserting correct data', () => {
      cy.intercept('POST', `${Cypress.env('API_BASEURL')}/api/login`).as(
        'loginRequest'
      )

      const email = Cypress.env('LOGIN_EMAIL')
      const password = Cypress.env('LOGIN_PASSWORD')

      cy.login(email, password)

      cy.wait('@loginRequest').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
        cy.get('.Vue-Toastification__toast--success')
          .should('exist')
          .and('be.visible')
      })
    })

    it('store cookies when log in', () => {
      cy.intercept('POST', `${Cypress.env('API_BASEURL')}/api/login`).as(
        'loginRequest'
      )

      const email = Cypress.env('LOGIN_EMAIL')
      const password = Cypress.env('LOGIN_PASSWORD')

      cy.login(email, password)

      cy.wait('@loginRequest')
      cy.getCookies()
        .should('have.length.at.least', 2)
        .then((cookies) => {
          expect(cookies[0]).to.have.property('name', 'NEWSLETTER-TKN')
          expect(cookies[1]).to.have.property('name', 'NEWSLETTER-USERID')
        })
    })
  })
})
