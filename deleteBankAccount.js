export class deleteBankAccount {
    url = 'http://localhost:3000/signin'

    elements = {
        getBnkAcctMenu: () => cy.get('a[data-test="sidenav-bankaccounts"]'),
        getBnkAcctName: (bankAccountName) => cy.get('div.MuiGrid-root p').contains(bankAccountName)
        .parents('[data-test*="bankaccount-list-item-"]'),
        getDeleteBtn: () => cy.get('[data-test="bankaccount-delete"]'),
        getDelBankAccountName: () => cy.get('div.MuiGrid-root p')
    }

    delete(bankAccountName) {
        this.elements.getBnkAcctMenu().click();
        this.elements.getBnkAcctName(bankAccountName).within(() => {
            this.elements.getDeleteBtn().click();
            this.elements.getDelBankAccountName().contains(`${bankAccountName} (Deleted)`)
        })
    }
}

export const DeleteBankAccount = new deleteBankAccount();
