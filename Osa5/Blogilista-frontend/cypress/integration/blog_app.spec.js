describe('Blog ', function () {
  beforeEach(function () {
    cy.resetServer()
  })
  it('Login form is show', function () {
    cy.get('.login-form')
      .should('contain', 'log in to application')
      .and('contain', 'username')
      .and('contain', 'password')
    cy.get('#login-button').should('contain', 'login')
  })
})