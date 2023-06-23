import { UserAuthentication } from "../../page-objects/pages/userAuthentication";
import { BankAccount } from "../../page-objects/pages/bankAccount";
const apiTransactions = `${Cypress.env("apiUrl")}/bankAccounts`;

describe('Create a Bank Account', () => {
    let bankAccountsCreated = [];
    let username = 'Katharina_Bernier';
    let password = 's3cret';
    let UUID = '';
    let bankAccountName = '';
    let routingNumber = '';
    let accountNumber = '';
    let apiBody;
    let result;
    let bankAccountsGot;

    beforeEach('should sign in', ()=> {
        UserAuthentication.navigate('/');
        UserAuthentication.signIn(username, password);
        UserAuthentication.elements.getLoggedUserName().should('have.text',`@${username}`);
    })

    it('should create a bank account', () => {
        UserAuthentication.navigate('/bankaccounts');
        for (let i=0; i < 5; i++){
            UUID = Math.ceil(Math.random() * 100);
            bankAccountName = `Test Bank Account ${UUID}`;
            routingNumber = Math.floor(900000000 * Math.random()) + 100000000;
            accountNumber = Math.floor(900000000 * Math.random()) + 100000000;
            cy.request("POST", `${apiTransactions}`, {
                bankName: bankAccountName,
                accountNumber: `"${accountNumber}"`,
                routingNumber: `"${routingNumber}"`
            }).then ((response) => {
                bankAccountsCreated.push(response.body.account.bankName);
                expect(response.status).to.eq(200);
                cy.reload();
                BankAccount.elements.getBankAccountName(bankAccountsCreated[i]);
            })
        }
    });
    it('should get the bank accounts', () => {
        cy.request("GET", `${apiTransactions}`, {
        }).then ((response) => {
            apiBody = response.body;
            result = Object.entries(apiBody);
            bankAccountsGot = result[0][1];
            expect(response.status).to.eq(200);
            console.log(BankAccount.compareBnkAccounts(bankAccountsGot, bankAccountsCreated));
        })
        cy.reload();
    });
    it('should delete the five bank accounts', () => {
        UserAuthentication.navigate('/bankaccounts');
        for (let i=0; i < 5; i++){
            cy.request("DELETE", `${apiTransactions}/${bankAccountsGot[i+1].id}`, {
            }).then ((response) => {
                expect(response.status).to.eq(200);
                cy.reload();
                BankAccount.confirmBankAccountsDeleted(bankAccountsCreated[i]);
            })
        }
    });

    afterEach('should log out', ()=>{
        UserAuthentication.navigate('/');
        UserAuthentication.logOut();
        UserAuthentication.elements.getLoginPage().should('have.text','Sign in');
    })
})