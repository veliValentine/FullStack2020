describe('Blog ', function () {
  beforeEach(function () {
    cy.resetServer()

    const user = {
      name: 'test-name',
      username: 'test-username',
      password: 'test'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
  })
  it('Login form is show', function () {
    cy.get('.login-form')
      .should('contain', 'log in to application')
      .and('contain', 'username')
      .and('contain', 'password')
    cy.get('#login-button').should('contain', 'login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('log in to application')
      cy.get('#username').type('test-username')
      cy.get('#current-password').type('test')
      cy.get('#login-button').click()

      cy.contains('blogs')
      cy.contains('test-name logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('log in to application')
      cy.get('#username').type('test-username')
      cy.get('#current-password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('log in to application')

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})