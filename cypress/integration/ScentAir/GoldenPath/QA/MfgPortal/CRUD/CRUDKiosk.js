/// <reference types="cypress" />

context("CRUD new kiosk user", () => {
    const userName = "cory+mfg@induro.io";
    const userPassword = "Heleen33!";
    const userFirstName = "Cory";
    const userFirstName2 = "Cory2";
    const locationId = "sQEdqDAbPoMiMe07jxQx"

  
    beforeEach(() => {
      cy.visit("https://qa.mfg.scentconnect.com/login");
    });

    //creates a random kiosk user
    const randomUserNames = () => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
        for (var i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
      }
    
    const randomUserName = randomUserNames();
    const newUserEmail = `${userFirstName}+${randomUserName}@induro.io`;

    it("logs in user, navigates to user directory, creates new kiosk user", () => {
        
        //login
        cy.mfgPortalLogin(userName, userPassword);
        cy.location("pathname").should("eq", "/location-directory");
        cy.get('[title="Menu"]').click()
          .get('[routerlink="/user-directory"]').click();

        //create new kiosk user 
        cy.get('.btn').click()
          .get('#firstName').type(userFirstName)
          .get('#lastName').type(randomUserName)
          .get('#email').type(newUserEmail)
          .get('#password').type(userPassword)
          .get('select[name="role"]').select('Kiosk').should('have.value', '1: KIOSK')
          .get('select[name="loc"]').select('Induro Retro').should('have.value', `2: mfgLocations/${locationId}`)
          .get('.modal-footer > .btn-primary').click();

        //clear toast notification
        cy.get('.toast-success').click();

        //logout
        cy.wait(1000);
        cy.get('i[title="Log out"]').click();
    })

    it("logs in with the newly created kiosk user, to ensure user was created correctly", () => {
        cy.mfgPortalLogin(newUserEmail, userPassword);
        cy.wait(2000)
        cy.location('pathname').should('eq', `/location/${locationId}/kiosk`);
        cy.screenshot();
        cy.get('i[title="Log out"]').click();
    })

    it("logs in, searches for newly created kiosk user, and updates them", () => {
        cy.mfgPortalLogin(userName, userPassword);
        cy.location('pathname').should('eq', '/location-directory');
        cy.get('[title="Menu"]').click()
          .get('[routerlink="/user-directory"]').click();

        //Search for new user
        cy.get('#page-search').type(`${userFirstName} ${randomUserName}`);
        cy.screenshot();

        //finds and edits user
        cy.get('#page-search').clear();

        cy.contains(`${newUserEmail}`).parent('tr').within(() => {
            cy.get('td').eq(5).find('i[class="fas fa-pencil action"]').click()
        });

        cy.get('#firstName').clear().type(userFirstName2)
        .get(".modal-footer > .btn-primary").click();
      
        //clears toast message
        cy.get('.toast-success').click();

        //logout
        cy.wait(1000);
        cy.get('i[title="Log out"]').click();
    })

    it("finds the updated kiosk user and deletes them", () => {
        //login
        cy.mfgPortalLogin(userName, userPassword);
        cy.location("pathname").should("eq", "/location-directory");
        cy.get('[title="Menu"]').click()
          .get('[routerlink="/user-directory"]').click();

        //Search for updated user
        cy.get('#page-search').type(userFirstName2);
        cy.screenshot();
        cy.get('#page-search').clear();

        //finds updated user in the tabel view and olens delete modal
        cy.contains(`${newUserEmail}`).parent('tr').within(() => {
            cy.get('td').eq(5).find('i[class="fas fa-trash action"]').click()
        });

        //confirms delete
        cy.get('.btn-danger').click();

        //confirms user has been deleted 
        cy.get('#page-search').type(userFirstName2);
        cy.screenshot();
        cy.get('#page-search').clear();

        cy.get('.toast-success').click();

        //logout
        cy.wait(1000);
        cy.get('i[title="Log out"]').click();
    })
}) 