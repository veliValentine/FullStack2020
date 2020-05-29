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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test-username', password: 'test' })
    })

    it('a blog can be created', function () {
      cy.contains('new blog').click()

      cy.get('#title').type('test-title')
      cy.get('#author').type('test-author')
      cy.get('#url').type('test-url')
      cy.get('#blog-button').click()

      cy.contains('new blog')

      cy.get('.hiddenBlog')
        .should('contain', 'view')
        .and('contain', 'test-title')
        .and('contain', 'test-author')

      cy.get('.success')
        .should('contain', 'a new blog test-title by test-author')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    describe('When there is a blog', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'test-title',
          author: 'test-author',
          url: 'test-url'
        })
      })

      it('blog can show/hide information', function () {
        cy.get('.hiddenBlog')
          .should('contain', 'view')
          .and('contain', 'test-title')
          .and('contain', 'test-author')
        cy.get('.blofInfo').should('not.be.visible')

        cy.contains('view').click()

        cy.get('.blogInfo')
          .should('contain', 'hide')
          .and('contain', 'test-title')
          .and('contain', 'test-author')
          .and('contain', 'likes 0')
          .and('contain', 'test-name')
        cy.get('hiddenBlog').should('not.be.visible')
      })

      it('can be liked', function () {
        cy.contains('view').click()
        cy.contains('likes 0')

        cy.contains('like').click()
        cy.contains('likes 1')

        cy.get('.success')
          .should('contain', 'liked test-title by test-author')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
      })

      it('a blog can be deleted by right user', function () {
        cy.contains('view').click()
        cy.get('#remove-button').click().should('not.exist')
        cy.get('.hiddenBlog').should('not.have.class')
      })

      it('a blog can not be removed by wrong user', function () {
        cy.contains('logout').click()
        const user = {
          name: 'test-name2',
          username: 'test-username2',
          password: 'test2'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.login({ username: user.username, password: user.password })
        cy.contains('test-name2 logged in')

        cy.get('#view-button').click()
        cy.get('#remove-button').should('not.exist')
      })
    })
  })
})