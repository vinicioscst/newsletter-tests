/// <reference types="cypress" />

describe('login page', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  context('validation', () => {
    it('should verify if form has empty field(s) before submitting 1/3', () => {
      cy.get('div .error--text').should('not.exist')
      cy.get('[data-test=login-form-button]').click()
      cy.get('div .error--text').should('exist')
      cy.get('[data-test=login-form-button]').should('be.disabled')
    })

    it('should verify if form has empty field(s) before submitting 2/3', () => {
      cy.get('[data-test=login-form-email]').type('meuemail@ht.com')
      cy.get('div .error--text').should('not.exist')
      cy.get('[data-test=login-form-button]').click()
      cy.get('div .error--text').should('exist')
      cy.get('[data-test=login-form-button]').should('be.disabled')
    })

    it('should verify if form has empty field(s) before submitting 3/3', () => {
      cy.get('[data-test=login-form-password]').type('minhasenha')
      cy.get('div .error--text').should('not.exist')
      cy.get('[data-test=login-form-button]').click()
      cy.get('div .error--text').should('exist')
      cy.get('[data-test=login-form-button]').should('be.disabled')
    })

    it('should verify if form has invalid value', () => {
      cy.get('[data-test=login-form-email]').type('meuemail@com')
      cy.get('div .error--text').should('exist')
      cy.get('[data-test=login-form-button]').should('be.disabled')
    })
  })

  context('login', () => {
    it('shoudl show invalid credentials message when inserting invalid data', () => {
      cy.login('meuemail@ht.com', 'minhasenha')

      cy.wait(3000)
      cy.get('.Vue-Toastification__toast--error')
        .should('exist')
        .and('be.visible')
    })

    it('should go to dashboard when inserting correct data', () => {
      const email = Cypress.env('LOGIN_EMAIL')
      const password = Cypress.env('LOGIN_PASSWORD')

      cy.login(email, password)

      cy.wait(3000)
      cy.get('.Vue-Toastification__toast--success')
        .should('exist')
        .and('be.visible')
    })

    it('should store cookies when log in', () => {
      const email = Cypress.env('LOGIN_EMAIL')
      const password = Cypress.env('LOGIN_PASSWORD')

      cy.login(email, password)

      cy.wait(3000)
      cy.getCookies()
        .should('have.length.at.least', 2)
        .then((cookies) => {
          expect(cookies[0]).to.have.property('name', 'NEWSLETTER-TKN')
          expect(cookies[1]).to.have.property('name', 'NEWSLETTER-USERID')
        })
    })
  })
})
