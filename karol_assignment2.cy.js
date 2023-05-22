/// <reference types="cypress" />

describe('User Sign-in, Create a Bank Account, Delete it and Logout', () => {

  before('should sign in', ()=> {
    cy.visit('http://localhost:3000/signin')
    cy.get('#username').clear().type('Katharina_Bernier')
    cy.get('#password').clear().type('s3cret')
    cy.get('button[data-test="signin-submit"]').click()
    cy.get('h6[data-test="sidenav-username"]').should('have.text','@Katharina_Bernier')
  })

  it('should create and delete a bank account', () => {

    cy.get('a[data-test="sidenav-bankaccounts"]').click()
    cy.get('a[data-test="bankaccount-new"]').click()
    cy.get('#bankaccount-bankName-input').clear().type('Test Bank Account')
    cy.get('#bankaccount-routingNumber-input').clear().type('123456789')
    cy.get('#bankaccount-accountNumber-input').clear().type('987654321')
    cy.get('button[data-test="bankaccount-submit"]').click()
    cy.get('div.MuiGrid-root p').contains('Test Bank Account').should('be.visible')
    
    cy.get('div.MuiGrid-root p').contains('Test Bank Account').parents('[data-test*="bankaccount-list-item-"]').within(() => {
      cy.get('[data-test="bankaccount-delete"]').click()
    })

    cy.get('div.MuiGrid-root p').contains('Test Bank Account ' + '(Deleted)').should('be.visible')

  });

  after('should log out', ()=>{
    cy.get('div[data-test="sidenav-signout"]').click()
    cy.get('h1.MuiTypography-h5').should('have.text','Sign in')
  })

}); 