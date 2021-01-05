/// <reference types="cypress" />

context("CRUD new manufacturing location", () => {
    const userName = "cory+mfg@induro.io";
    const userPassword = "Heleen33!";
    const timezone1 = "(EST) America/Cancun"
    const timezone2 = "(EST) America/New_York"
  
    //creates a random manager
    const randomLocationNames = () => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
        for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
    }

    const randomLocationName = randomLocationNames();
    const randomLocationName2 = randomLocationNames();

    it("logs in user, checks path name and creates new location", () => {

        cy.visit("https://qa.mfg.scentconnect.com/login");
        
        //login
        cy.mfgPortalLogin(userName, userPassword);
        cy.location("pathname").should("eq", "/location-directory");
        
        //creates new manufacturing location
        cy.get('.btn').click()
          .get('#name').type(randomLocationName)
          .get('#timezone').clear().type(timezone1)
          .get('[role="option"]').click()
          .get('.modal-footer > .btn-primary').click();
        
        cy.get('.toast-success').click();
    })

    it("selects location and updates user information", () => {
        //
        cy.contains(randomLocationName).parent('tr').within(() => {
            cy.get('td').eq(6).find('i[class="fas fa-pencil action"]').click()
        });

        cy.get('#name').clear().type(randomLocationName2)
          .get('#timezone').clear().type(timezone2)
          .get('[role="option"]').click()
          .get('.modal-footer > .btn-primary').click();

        cy.get('.toast-success').click();
    })

    it("selects location and archives it", () => {
        cy.contains(randomLocationName2).parent('tr').within(() => {
            cy.get('td').eq(6).find('i[class="fas fa-inbox-in action"]').click()
        });

        cy.get('.btn-danger').click();

        cy.get('.toast-success').click();

        //logout
        cy.wait(1000);
        cy.get('i[title="Log out"]').click();

    })

})