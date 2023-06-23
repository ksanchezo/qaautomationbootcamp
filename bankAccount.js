export class bankAccount {
    elements = {
        getBankAccountName: (bankAccountName) => cy.get('div.MuiGrid-root p').contains(bankAccountName)
    }

    confirmBankAccountsDeleted(bankAccountName) {
        this.elements.getBankAccountName(bankAccountName).contains(`${bankAccountName} (Deleted)`);
    }

    compareBnkAccounts = (bnkAccountsGot, bnkAccountsCreated) => {
        for (var i = 1; i < bnkAccountsGot.length; i++) {
            var match = false; 
            for (var j = 0; j < bnkAccountsCreated.length; j++) {
                if (bnkAccountsGot[i].bankName == bnkAccountsCreated[j]) {
                    match = true;
                    break;
                }
            }
            return match;
        }
    }; 
}

export const BankAccount = new bankAccount();
