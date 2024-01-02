describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset/`)
    cy.createUser({
      name: 'Apolo Schmickler',
      username: 'apoloSch',
      password: '12345'
    })
  })

  it('Login form is shown', function () {
    cy.get('form')
      .should('contain', 'username')
      .and('contain', 'password')
  })

  describe('Login', function () {
    it('succeed with correct credententials', function () {
      cy.get('#username').type('apoloSch')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()

      cy.contains('apoloSch logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('apoloSch')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()

      cy.get('#message')
        .should('contain', 'Wrong username or password')
        .should('have.css', 'color')
        .and('match', /rgb\((\s*255\s*,\s*0\s*,\s*0\s*)\)/)
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'apoloSch', password: '12345' })
        cy.createBlog({ title: 'most liked', author: 'Ares', url: 'ares.com', likes: 5 })
        cy.createBlog({ title: '2nd most liked', author: 'Ares', url: 'ares.com', likes: 4 })
        cy.createBlog({ title: 'least liked', author: 'Mica', url: 'mica.com', likes: 3 })
      })

      it('A blog can be created', function () {
        cy.contains('new blog').click()
        cy.get('#title').type('Test with Cypress')
        cy.get('#author').type('Cypress Tester')
        cy.get('#url').type('cypress.com')
        cy.get('#create-blog').click()

        cy.contains('Test with Cypress; Cypress Tester')
      })

      it('Can like a blog', function () {
        cy.contains('show').click()
        cy.contains('like').click()
      })

      it('Can delete a blog', function () {
        cy.contains('show').click()
        cy.contains('remove').click()
        cy.contains('most liked deleted')
      })

      it('Cant delete anothers user blog', function () {
        cy.createUser({
          name: 'Ares Weber',
          username: 'aresWeber',
          password: '12345'
        })
        cy.login({ username: 'aresWeber', password:'12345' })
        cy.contains('show').click()
        cy.get('#blogList').should('not.contain', 'remove')
      })

      it('blog are in order with the likes', function () {
        cy.get('.blog').eq(0).should('contain', 'most liked')
        cy.get('.blog').eq(1).should('contain', '2nd most liked')
        cy.get('.blog').eq(2).should('contain', 'least liked')
      })
    })
  })
})