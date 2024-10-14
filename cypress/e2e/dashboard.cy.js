/// <reference types="cypress" />

describe('dashboard page', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('BASE_URL')}/login`)
    const email = Cypress.env('LOGIN_EMAIL')
    const password = Cypress.env('LOGIN_PASSWORD')

    cy.login(email, password)

    cy.wait(2000)
    cy.get('.Vue-Toastification__toast--success').click()
  })

  context('data', () => {
    it('renders articles and topics data', () => {
      cy.get('[data-test=articles-info]')
        .invoke('text')
        .then((value) => {
          const totalArticles = parseFloat(value)
          expect(totalArticles).to.be.gte(0)
        })

      cy.get('[data-test=topics-info]')
        .invoke('text')
        .then((value) => {
          const totalArticles = parseFloat(value)
          expect(totalArticles).to.be.gte(0)
        })
    })

    it('renders user name on dashboard', () => {
      cy.get('[data-test=dashboard-username]').should('not.be.empty')
    })
  })

  context.only('articles', () => {
    it('should create articles', () => {
      cy.intercept('POST', `${Cypress.env('API_BASEURL')}/api/articles`).as(
        'createArticles'
      )
      cy.get('[data-test=create-article-button]').click()
      cy.wait('@createArticles')
      cy.get('.Vue-Toastification__toast--success')
        .should('exist')
        .and('be.visible')
    })
    it('should preview articles', () => {
      cy.get('button.mdi-eye').first().click()
      cy.get('[data-test=article-preview-modal]').should('be.visible')
    })
    it('should edit article', () => {
      cy.get('button.mdi-pencil').first().click()

      cy.get('[data-test=article-edit-modal]').should('be.visible')
      cy.get('[data-test=article-title-edit-input').clear().type(' Editado')
      cy.get('[data-test=article-edit-button').scrollIntoView().click()
      cy.wait(2000)

      cy.get('td.text-start div').contains('Editado')
      cy.get('.Vue-Toastification__toast--success')
        .should('exist')
        .and('be.visible')
    })
    it('should delete article', () => {
      cy.get('button.mdi-delete').first().click()
      cy.get('[data-test=article-delete-modal]').should('be.visible')
      cy.get('[data-test=article-delete-button]').click()
      cy.wait(2000)
      cy.get('.Vue-Toastification__toast--success')
        .should('exist')
        .and('be.visible')
    })
    it('should show articles on table', () => {
      cy.get('[data-test="articles-table"]').should('exist')
      cy.get('[data-test="articles-table"] tbody tr').should(
        'have.length.at.least',
        11
      )
      cy.get('[data-test="articles-table"] tbody tr').each(($row) => {
        cy.wrap($row).find('td').eq(0).should('not.be.empty')
      })
    })
    it('should show article on table', () => {
      cy.get('[data-test="articles-table"]').should('exist')
      cy.get('[data-test="articles-table"] tbody tr').should(
        'have.length.at.least',
        11
      )
      cy.get('[data-test="articles-table"] tbody tr').each(($row) => {
        cy.wrap($row).find('td').eq(0).should('not.be.empty')
      })
    })
  })

  context('navigation', () => {
    it('should go to settings page', () => {
      cy.get('[data-test=settings-button]').click()
      cy.get('[data-test=menu-settings-button]').click()
      cy.location('pathname').should('include', 'settings')
    })

    it('should go to login page when logging out', () => {
      cy.get('[data-test=settings-button]').click()
      cy.get('[data-test=menu-logout-button]').click()
      cy.wait(2000)
      cy.location('pathname').should('include', 'login')
      cy.getCookies().should('be.empty')
    })
  })

  context('settings', () => {
    beforeEach(() => {
      cy.get('[data-test=settings-button]').click()
      cy.get('[data-test=menu-settings-button]').click()
    })

    it('should render preview user info', () => {
      cy.wait(1000)
      cy.get('[data-test=edit-name-input]').should(
        'contain.value',
        Cypress.env('USER_NAME')
      )
      cy.get('[data-test=edit-email-input]').should(
        'contain.value',
        Cypress.env('LOGIN_EMAIL')
      )
    })

    it('should edit user correctly', () => {
      cy.wait(1000)
      cy.editUser('Teste Edição', 'editado@mail.com')
      cy.get('.Vue-Toastification__toast--success')
        .should('exist')
        .and('be.visible')
        .click()

      const userName = Cypress.env('USER_NAME')
      const userEmail = Cypress.env('LOGIN_EMAIL')
      cy.editUser(userName, userEmail)
      cy.wait(2000)
      cy.get('.Vue-Toastification__toast--success')
        .should('exist')
        .and('be.visible')
    })

    it('should not allow user editing with invalid type', () => {
      cy.get('[data-test=edit-email-input]').clear().type('Teste Email')
      cy.get('[data-test=edit-email-input]').clear().type('Teste Email')
      cy.get('.v-messages__message').should(
        'contain.text',
        'Insira um email válido'
      )
      cy.get('[data-test=edit-user-button]').should('be.disabled')
    })
  })
})
