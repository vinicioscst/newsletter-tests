/// <reference types="cypress" />

describe('home page', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('BASE_URL')}`)
  })

  context('responsiveness', () => {
    it('renders login button on desktop', () => {
      cy.get('[data-test=header-login-button]').should('be.visible')
      cy.get('[data-test=header-login-button-mobile]').should('not.be.visible')
    })

    it('renders login button on mobile', () => {
      cy.viewport(499, 595)
      cy.get('[data-test=header-login-button-mobile]').should('be.visible')
      cy.get('[data-test=header-login-button]').should('not.be.visible')
    })
  })

  context('articles', () => {
    it('renders articles cards', () => {
      it('renders articles cards', () => {
        cy.get('body').then(($el) => {
          if ($el.find('[data-test=articles-card]').length > 0) {
            cy.get('[data-test=articles-card]').should('be.visible')
          } else {
            cy.get('[data-test=no-articles]').should('exist').and('be.visible')
          }
        })
      })
    })

    it('renders articles topics', () => {
      cy.get('body').then(($el) => {
        if ($el.find('[data-test=topics-card]').length > 0) {
          cy.get('[data-test=topics-card]').should('be.visible')
        } else {
          cy.get('[data-test=topics-list]').should('not.exist')
        }
      })
    })

    it('renders article modal on click', () => {
      cy.get('body').then(($el) => {
        if ($el.find('[data-test=card-button]').is('visible')) {
          cy.get('[data-test=article-preview-modal]').should('not.exist')
          cy.get('[data-test=card-button]').first().click()
          cy.get('[data-test=article-preview-modal]').should('be.visible')
        }
      })
    })
  })

  context('search, filter and ordening', () => {
    it('search 1/3 - shows all articles when searching without text', () => {
      cy.get('[data-test=articles-search-button]').click()
      cy.wait(3000)
      cy.get('body').then(($el) => {
        if ($el.find('[data-test=articles-card]').length > 0) {
          cy.get('[data-test=articles-card]').should('be.visible')
        } else {
          cy.get('[data-test=no-articles]').should('exist').and('be.visible')
        }
      })
    })
    it('search 2/3 - shows no article message when searching for inexistent article or topic', () => {
      cy.get('[data-test=articles-search-input').type('CypressCypressCypress')
      cy.get('[data-test=articles-search-button]').click()
      cy.wait(3000)
      cy.get('[data-test=no-articles]').should('exist').and('be.visible')
    })
    it('search 3/3 - shows correct article(s) when searching for it', () => {
      cy.get('body').then(($el) => {
        if ($el.find('[data-test=articles-card]').length > 0) {
          const query = Cypress.env('ARTICLE_TITLE')

          cy.get('[data-test=articles-search-input').type(query)
          cy.get('[data-test=articles-search-button]').click()
          cy.wait(3000)

          cy.get('[data-test=articles-list]').contains(query)
        } else {
          cy.get('[data-test=no-articles]').should('exist').and('be.visible')
        }
      })
    })
    it('order 1/2 - shows articles from A-Z and Z-A', () => {
      cy.get('body').then(($el) => {
        if ($el.find('[data-test=articles-card]').length > 0) {
          // A-Z
          cy.get('[data-test=orderBy]').click()
          cy.get('#list-item-216-2').click()
          cy.wait(2000)
          cy.get('[data-test=articles-card]').then((cards) => {
            const titles = cards
              .map((i, card) => Cypress.$(card).find('h3').text())
              .get()

            const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b))
            expect(titles).to.deep.equal(sortedTitles)
          })

          // Z-A
          cy.get('[data-test=orderBy]').click()
          cy.get('#list-item-216-3').click()
          cy.wait(2000)
          cy.get('[data-test=articles-card]').then((cards) => {
            const titles = cards
              .map((i, card) => Cypress.$(card).find('.title').text())
              .get()

            const sortedTitles = [...titles].sort((a, b) => b.localeCompare(a))
            expect(titles).to.deep.equal(sortedTitles)
          })
        }
      })
    })
    it('order 2/2 - shows articles from newest and oldest', () => {
      cy.get('body').then(($el) => {
        if ($el.find('[data-test=articles-card]').length > 0) {
          // Newest
          cy.get('[data-test=orderBy]').click()
          cy.get('#list-item-216-0').click()
          cy.wait(2000)
          cy.get('[data-test=articles-card]').then((cards) => {
            const dates = cards
              .map((i, card) => {
                const text = Cypress.$(card)
                  .find('[data-test=article-date]')
                  .text()
                const daysAgo = text.match(/\d+/)[0]
                return parseInt(daysAgo)
              })
              .get()
            const sortedDates = [...dates].sort((a, b) => a - b)
            expect(dates).to.deep.equal(sortedDates)
          })

          // Oldest
          cy.get('[data-test=orderBy]').click()
          cy.get('#list-item-216-1').click()
          cy.wait(2000)
          cy.get('[data-test=articles-card]').then((cards) => {
            const dates = cards
              .map((i, card) => {
                const text = Cypress.$(card)
                  .find('[data-test=article-date]')
                  .text()
                const daysAgo = text.match(/\d+/)[0]
                return parseInt(daysAgo)
              })
              .get()
            const sortedDates = [...dates].sort((a, b) => b - a)
            expect(dates).to.deep.equal(sortedDates)
          })
        }
      })
    })
    it('filter - show correct amount of articles', () => {
      cy.get('body').then(($el) => {
        if ($el.find('[data-test=articles-card]').length >= 4) {
          cy.get('[data-test=perPage]').click()
          cy.get('#list-item-216-0').click()
          cy.wait(2000)
          cy.get('[data-test=articles-card]').should('have.length', 4)
        }

        if ($el.find('[data-test=articles-card]').length >= 8) {
          cy.get('[data-test=perPage]').click()
          cy.get('#list-item-216-1').click()
          cy.wait(2000)
          cy.get('[data-test=articles-card]').should('have.length', 8)
        }

        if ($el.find('[data-test=articles-card]').length == 12) {
          cy.get('[data-test=perPage]').click()
          cy.get('#list-item-216-2').click()
          cy.wait(2000)
          cy.get('[data-test=articles-card]').should('have.length', 12)
        }
      })
    })
  })

  context('navigation', () => {
    it('goes to login page when clicking button on desktop', () => {
      cy.get('[data-test=header-login-button]').should('be.visible')
      cy.get('[data-test=header-login-button]').click()
      cy.location('pathname').should('include', 'login')
    })

    it('goes to login page when clicking button on mobile', () => {
      cy.viewport(499, 595)
      cy.get('[data-test=header-login-button-mobile]').should('be.visible')
      cy.get('[data-test=header-login-button-mobile]').click()
      cy.location('pathname').should('include', 'login')
    })
  })
})
