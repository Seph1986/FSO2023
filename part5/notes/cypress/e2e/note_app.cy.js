describe('Note app', function () {
  beforeEach(function () {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Apolo Schmickler',
      username: 'apoloSch',
      password: '12345'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')
  })

  it('login fails with wrong password', function () {
    cy.contains('login').click()
    cy.get('#username').type('apoloSch')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Apolo Schmickler logged in')
  })

  it('user can log in', function () {
    cy.contains('login').click()
    cy.get('#username').type('apoloSch')
    cy.get('#password').type('12345')
    cy.get('#login-button').click()

    cy.contains('Apolo Schmickler logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'apoloSch', password: '12345' })
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })
})