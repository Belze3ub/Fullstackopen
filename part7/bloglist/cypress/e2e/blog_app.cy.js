describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      username: 'SmithJohn',
      name: 'John Smith',
      password: 'SmithJohn',
    };
    const secondUser = {
      username: 'SmithJohn2',
      name: 'John Smith 2',
      password: 'SmithJohn2',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, secondUser);
    cy.visit('');
  });

  it('Login form is shown by default', () => {
    cy.get('#username');
    cy.get('#password');
    cy.get('#loginBtn');
  });

  it('Login fails with wrong username or password', () => {
    cy.get('#username').type('SmithJohn');
    cy.get('#password').type('wrongPassword');
    cy.get('#loginBtn').click();
    cy.get('.message-bad')
      .should('contain', 'Wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
    cy.get('html').should(
      'not.contain',
      'Correctly logged in. Hello SmithJohn'
    );
  });

  it('Logged in with correct credentials', () => {
    cy.get('#username').type('SmithJohn');
    cy.get('#password').type('SmithJohn');
    cy.get('#loginBtn').click();
    cy.get('.message-ok')
      .should('contain', 'Correctly logged in. Hello SmithJohn')
      .and('have.css', 'color', 'rgb(0, 128, 0)');
  });

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'SmithJohn', password: 'SmithJohn' });
    });
    it('User can create new blog', () => {
      cy.contains('new blog').click();
      cy.get('#title').type('test');
      cy.get('#author').type('test');
      cy.get('#url').type('test');
      cy.get('#createBtn').click();
      cy.contains('A new blog test by test added.');
      cy.get('.blog').contains('test test');
    });

    describe('Blog exists', () => {
      beforeEach(() => {
        cy.login({ username: 'SmithJohn', password: 'SmithJohn' });
        cy.createBlog({ title: 'test', author: 'test', url: 'test' });
      });
      it('User can like blog', () => {
        cy.contains('test test').contains('view').click();
        cy.contains('likes 0');
        cy.contains('like').click();
        cy.contains('likes 1');
      });
      it('User can delete blog', () => {
        cy.contains('test test').contains('view').click();
        cy.contains('remove').click();
        cy.should('not.contain', '.blog');
      });
    });

    describe('2 blogs exists created by 2 different users', () => {
      beforeEach(() => {
        cy.login({ username: 'SmithJohn', password: 'SmithJohn' });
        cy.createBlog({ title: 'test', author: 'test', url: 'test' });
        cy.login({ username: 'SmithJohn2', password: 'SmithJohn2' });
        cy.createBlog({ title: 'test2', author: 'test2', url: 'test2' });
      });
      it('User cannot delete blog created by other users', () => {
        cy.contains('test test').contains('view').click();
        cy.should('not.contain', 'remove');
      });
      it('Blogs are ordered with most likes first', () => {
        cy.contains('test2 test2').contains('view').click();
        cy.contains('like').click();
        cy.wait(1000)
        cy.get('.blog').eq(0).should('contain', 'test2 test2');
        cy.get('.blog').eq(1).should('contain', 'test test');
      });
    });
  });
});
