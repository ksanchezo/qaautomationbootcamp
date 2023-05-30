export class newBankAccount {
    url = 'http://localhost:3000/signin'

    elements = {
        getBnkAcctMenu: () => cy.get('a[data-test="sidenav-bankaccounts"]'),
        getNewBnkAcctBtn: () => cy.get('a[data-test="bankaccount-new"]'),
        getBnkAcctNameTxt: () => cy.get('#bankaccount-bankName-input'),
        getRoutingNumberTxt: () => cy.get('#bankaccount-routingNumber-input'),
        getAccountNumberTxt: () => cy.get('#bankaccount-accountNumber-input'),
        getSubmitBtn: () => cy.get('button[data-test="bankaccount-submit"]'),
        getBankAccountName: () => cy.get('div.MuiGrid-root p')
    }

    createNew(bankAccountName, routingNumber, accountNumber) {
        this.elements.getBnkAcctMenu().click();
        this.elements.getNewBnkAcctBtn().click();
        this.elements.getBnkAcctNameTxt().clear().type(bankAccountName);
        this.elements.getRoutingNumberTxt().clear().type(routingNumber);
        this.elements.getAccountNumberTxt().clear().type(accountNumber);
        this.elements.getSubmitBtn().click();
        this.elements.getBankAccountName().contains(bankAccountName)
    }
}

export const NewBankAccount = new newBankAccount();
