export class userAuthentication {
    elements = {
        getUsernameTxt: () => cy.get('#username'),
        getPasswordTxt: () => cy.get('#password'),
        getSignInBtn: () => cy.get('button[data-test="signin-submit"]'),
        getLoggedUserName: () => cy.get('h6[data-test="sidenav-username"]'),
        getSignOutBtn: () => cy.get('div[data-test="sidenav-signout"]'),
        getLoginPage: () => cy.get('h1.MuiTypography-h5')
    }

    navigate(url) {
        cy.visit(url)
    }

    signIn(username, password) {
        this.elements.getUsernameTxt().clear().type(username)
        this.elements.getPasswordTxt().clear().type(password)
        this.elements.getSignInBtn().click()
    }

    logOut(){
        this.elements.getSignOutBtn().click()
    }
}

export const UserAuthentication = new userAuthentication();
