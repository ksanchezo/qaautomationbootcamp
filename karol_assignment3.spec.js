/// <reference types="cypress" />
import { NewBankAccount } from "../../page-objects/pages/newBankAccount"
import { DeleteBankAccount } from "../../page-objects/pages/deleteBankAccount";
import { UserAuthentication } from "../../page-objects/pages/userAuthentication";

describe('User Sign-in, Create a Bank Account, Delete it and Logout', () => {
  let url = 'http://localhost:3000/signin'
  let username = 'Katharina_Bernier'
  let password = 's3cret'
  let UUID = Math.ceil(Math.random() * 100)
  let bankAccountName = `Test Bank Account ${UUID}`
  let routingNumber = Math.floor(900000000 * Math.random()) + 100000000
  let accountNumber = Math.floor(900000000 * Math.random()) + 100000000

  beforeEach('should sign in', ()=> {
    UserAuthentication.navigate(url)
    UserAuthentication.signIn(username, password)
    UserAuthentication.elements.getLoggedUserName().should('have.text','@Katharina_Bernier')
  })

  it('should create a bank account', () => {
    NewBankAccount.createNew(bankAccountName, routingNumber, accountNumber)
    NewBankAccount.elements.getBankAccountName().should('be.visible')

  });

  it('should delete a bank account', () => {
    DeleteBankAccount.delete(bankAccountName)
    DeleteBankAccount.elements.getDelBankAccountName().should('be.visible')
  });

  afterEach('should log out', ()=>{
    UserAuthentication.navigate(url)
    UserAuthentication.logOut()
    UserAuthentication.elements.getLoginPage().should('have.text','Sign in')
  })
}); 
