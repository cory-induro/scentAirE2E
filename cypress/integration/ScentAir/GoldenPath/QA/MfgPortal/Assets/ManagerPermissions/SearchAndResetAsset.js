/// <reference types="cypress" />

context("Search, readn and reset an asset", () => {
    const userName = Cypress.env("mfgManagerUserName");
    const userPassword = Cypress.env("userPassword");
    const testDevice = Cypress.env("qaTestDevice1");

    it("logs in the user, navigates to the search-asset page", () => {
        cy.visit(Cypress.env("qaMfgPortalURL"))
        
        cy.mfgPortalLogin(userName, userPassword);
        cy.location("pathname").should("eq", "/location-directory");
        cy.get('[title="Menu"]').click()
          .get('[routerlink="/search-asset"]').click();

        cy.wait(1000);
        cy.location("pathname").should("eq", "/search-asset");
    })

    it("searches assests, confirms asset is correct", () => {
        cy.get('#asset-search').type(testDevice).type('{enter}')
        cy.wait(5000)
        cy.contains('Mac').parent('tr').within(() => {
            cy.get('td').eq(0).should('contain', testDevice)
        })
        cy.wait(2000)

    })

    it("resets device and checks devices has been reset", () => {
        
        cy.get('body').then(($body) => {
            if($body.text().includes('Factory Reset')){
                cy.get('.btn-light').click()
                cy.get('.modal-footer > .btn-danger').click()
                cy.wait(5000)
                cy.get('#asset-search').clear().type(testDevice).type('{enter}')
                cy.screenshot()
            }
            else{
                cy.screenshot();
            }
        })

        cy.get('i[title="Log out"]').click();
    })

})