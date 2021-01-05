/// <reference types="cypress" />

context("SA Customer Portal Login", () => {
  
  //permission types

    //location specific
    const locationManager = "locationManager";
    const locationOperator = "locationOperator";
    const locationViewer = "locationViewer";

    //organization specific
    const orgManager = "orgManager";
    const orgOperator = "orgOperator";
    const orgViewer = "orgViewer";

    //internal user
    const internalManager = "internalManager";
    const internalOperator = "internalOperator";
  
  //Auth Information
    //main login
    const userPassword = "Heleen33!";

    //location login
    const locationViewerUserName = `cory+${locationViewer}@induro.io`;
    const locationOperatorUserName = `cory+${locationOperator}@induro.io`;
    const locationManagerUserName = `cory+${locationManager}@induro.io`;

    //org login
    const orgViewerUserName = `cory+${orgViewer}@induro.io`;
    const orgOperatorUserName = `cory+${orgOperator}@induro.io`;
    const orgManagerUserName = `cory+${orgManager}@induro.io`;

    //internal user
    const internalOperatorUserName = `cory+${internalOperator}@induro.io`;
    const internalManagerUserName = `cory+${internalManager}@induro.io`;

  beforeEach(() => {
    cy.visit("https://qa.scentconnect.com/login");
  });

  //Checks location permissions
  it("checks user sign in for SA location view in the customer portal", () => {
    cy.customerPortalLogin(locationViewerUserName, userPassword).wait(2000)
    cy.screenshot();
    cy.get('i[title="Log out"]').click();

    cy.customerPortalLogin(locationOperatorUserName, userPassword).wait(2000)
    cy.screenshot;
    cy.get('i[title="Log out"]').click();

    cy.customerPortalLogin(locationManagerUserName, userPassword).wait(2000)
    cy.screenshot;
    cy.get('i[title="Log out"]').click();
  });

  //Checks organization permissions
  it("checks user sign in for SA organization view in the customer portal", () => {
    cy.customerPortalLogin(orgViewerUserName, userPassword).wait(2000)
    cy.screenshot();
    cy.get('i[title="Log out"]').click();

    cy.customerPortalLogin(orgOperatorUserName, userPassword).wait(2000)
    cy.screenshot;
    cy.get('i[title="Log out"]').click();

    cy.customerPortalLogin(orgManagerUserName, userPassword).wait(2000)
    cy.screenshot;
    cy.get('i[title="Log out"]').click();
  })

  //checks internal admin permissions
  it("checks user sign in for SA internal admin view in the customer portal", () => {

    cy.customerPortalLogin(internalManagerUserName, userPassword).wait(2000)
    cy.screenshot;
    cy.get('i[title="Log out"]').click();

    cy.customerPortalLogin(internalOperatorUserName, userPassword).wait(2000)
    cy.screenshot;
    cy.get('i[title="Log out"]').click();
  })

});
