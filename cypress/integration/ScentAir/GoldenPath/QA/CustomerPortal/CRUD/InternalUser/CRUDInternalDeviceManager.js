/// <reference types="cypress" />

context("create new device manager", () => {
    
    //global variables
    const userName = Cypress.env('customerPortalUserName');
    const userPassword = Cypress.env('userPassword');
    const userFirstName = "Cory";
    const userFirstName2 = "Cory2";
    const orgName = "Big Office Induro";
    const orgId = "LP2auDk3c9yxN41NMJ8r";

    //visit this url each time a new "it" fucntion starts 
    beforeEach(() => {
        cy.visit(Cypress.env("qaCustomerPortalURL"));
    });
    
    //create random user name
    const randomUserNames = () => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789"

        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    //creates random user email for login
    const randomUserName = randomUserNames();
    const newUserEmail = `${userFirstName}+${randomUserName}@induro.io`;

    //creates new user
    it("logs in user, navigates to user tab, creates new internal device manager", () => {
        
        //login
        cy.customerPortalLogin(userName, userPassword);

        //check login location redirect to organization directory
        cy.location('pathname').should('eq', '/organization-directory');

        //check navigation to user directory
        cy.get(":nth-child(2) > .nav-link").click();
        cy.location('pathname').should('eq', '/user-directory');

        //create new user with randomized name and email
        cy.get(".actions > .btn").click()
          .get('input[name="firstName"]').type(userFirstName)
          .get('input[name="lastName"]').type(randomUserName)
          .get('input[name="email"]').type(newUserEmail)
          .get('input[name="password"]').type(userPassword)
          .get('select[name="role"]').select('Device Manager').should('have.value', '1: ENT_DEVICE_MANAGER')
          .get('select[name="locale"]').select('English - English', { force: true }).should('have.value', '0: en-us')
          .get('select[name="temp"]').select('Celsius').should('have.value', '1: C')
          .get('input[id="receive-alerts"]').check().should('be.checked')
          .get('input[id="use-meridian-clock"]').check().should('be.checked')
          .get('button[type="submit"]').click()
          .wait(5000);

        cy.get('.toast-success').click();

        //logout
        cy.wait(1000);
        cy.get('i[title="Log out"]').click();  
    });

    //check user permissions and actions
    it('logs in with new user to check permissions, and checks actions', () => {
        
        //logs in with newly created user info
        cy.customerPortalLogin(newUserEmail, userPassword);

        //check location 
        cy.location('pathname').should('eq', '/organization-directory');

        //select an organization and return to home
        cy.wait(1000)
        cy.contains(orgName).click()
        
        cy.location('pathname').should('eq', `/organization/${orgId}`);
        cy.screenshot();
        cy.get('img[alt="ScentAir"]').click();
        //logout
        cy.wait(1000)
        cy.get('i[title="Log out"]').click();
    })

    //read and update random user created above
    it('logs in with manager permissions, finds new user and updates information', () => {

        //login new created user 
        cy.customerPortalLogin(userName, userPassword);

        //check login locaiton redirected to organization directory
        cy. location('pathname').should('eq', '/organization-directory');

        //Check navigation to user directory
        cy.get(":nth-child(2) > .nav-link").click();
        cy.location('pathname').should('eq', '/user-directory');
        cy.wait(1000);

        //Search for created user and open edit user modal
        cy.get('body').then(($body) => {
            if($body.text().includes(newUserEmail)){
            cy.contains(`${newUserEmail}`).parent('tr').within(() => {
                cy.get('td').eq(6).find('i[class="fas fa-pencil action"]').click()
            })
            cy.get('input[name="firstName"]').clear()
                .get('input[name="firstName"]').type(userFirstName2)
                .get('select[name="temp"]').select('Fahrenheit').should('have.value', '0: F')
                .get('input[id="use-meridian-clock"]').uncheck().should('not.be.checked')
                .get('button[type="submit"]').click()
            }
            else{
            cy.get('.card-foot > sc-paginator > .page-control > .fa-chevron-right').click()
            cy.contains(`${newUserEmail}`).parent('tr').within(() => {
                cy.get('td').eq(6).find('i[class="fas fa-pencil action"]').click()
            })
            cy.get('input[name="firstName"]').clear()
                .get('input[name="firstName"]').type(userFirstName2)
                .get('select[name="temp"]').select('Fahrenheit').should('have.value', '0: F')
                .get('input[id="use-meridian-clock"]').uncheck().should('not.be.checked')
                .get('button[type="submit"]').click()
            }
        })

        cy.get('.toast-success').click();

        //logout
        cy.wait(1000);
        cy.get('i[title="Log out"]').click();

    })

    //finds and deletes previously created user
    it('logs in with updated information, finds the created updated user and deletes them', () => {
        
        //login newly created user
        cy.customerPortalLogin(userName, userPassword)

        cy.location('pathname').should('eq', '/organization-directory')

        //Check navigation to user directory
        cy.get(":nth-child(2) > .nav-link").click()
        cy.location('pathname').should('eq', '/user-directory')
        cy.wait(1000)

        //Search for created user and open delete modal
        cy.get("body").then(($body) => {
        if($body.text().includes(newUserEmail)){
            cy.contains(`${newUserEmail}`).parent('tr').within(() => {
            cy.get('td').eq(6).find('i[class="fas fa-trash action"]').click()
            })
            cy.get('.btn-danger').click()
        }
        else{
            cy.get('.card-foot > sc-paginator > .page-control > .fa-chevron-right').click()
            cy.contains(`${newUserEmail}`).parent('tr').within(() => {
            cy.get('td').eq(6).find('i[class="fas fa-trash action"]').click()
            })
            cy.get('.btn-danger').click()
        }
        })

        cy.get('.toast-success').click();

        //logout
        cy.wait(1000);
        cy.get('i[title="Log out"]').click();
        })

})