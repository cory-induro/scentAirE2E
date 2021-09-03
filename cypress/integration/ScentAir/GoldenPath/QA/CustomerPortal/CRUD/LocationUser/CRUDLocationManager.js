/// <reference types="cypress" />

context("CRUD an internal manager and check functionality", () => {

    //global veriables 
    const userName = Cypress.env('customerPortalUserName');
    const userPassword = Cypress.env('userPassword');
    const userFirstName = "Cory";
    const userFirstName2 = "Cory2";
    const orgName = "Big Office Induro";
    const orgId = "LP2auDk3c9yxN41NMJ8r";
    const locaitonName = "TestLocation";
    const locationId = "QhPEcuelB6MZNtxl7rUG";

    beforeEach(() => {
        cy.visit(Cypress.env("qaCustomerPortalURL"));
    });

    //create random user name
  const randomUserNames = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  //creates random user email for login
  const randomUserName = randomUserNames();
  const newUserEmail = `${userFirstName}+${randomUserName}@induro.io`;

  it("logs in as internal user, selects an organization, then a location and creates a user", () => {
    //login
    cy.customerPortalLogin( userName, userPassword);

    //check login location redirected to organization directory
    cy.location('pathname').should('eq', '/organization-directory')

    //select org
    cy.contains(orgName).click()
    cy.location('pathname').should('eq', `/organization/${orgId}`)

    //select location 
    cy.contains(locaitonName).click()
    cy.location('pathname').should('eq', `/organization/${orgId}/location/${locationId}`)

    

    cy.get('.toast-success').click();
    //logout
    cy.wait(1000);
    cy.get('i[title="Log out"]').click();
  });

  it("logs in as the newly created location manager and checks functionality", () => {

  })

  it("logs in as internal user, navigates to newly crearted user and updates", () => {

  })

  it("logs in as internal user, navigates to newly created user and deletes user", () => {

  })

})