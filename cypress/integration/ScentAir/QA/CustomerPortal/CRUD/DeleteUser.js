/// <reference types="cypress" />

context("", () => {
  const userName = "cory@induro.io";
  const userPassword = "Heleen33!";

  beforeEach(() => {
    cy.visit("https://qa.scentconnect.com/login");
  });
  
  //login
  cy.customerPortalLogin( userName, userPassword);

  it("", () => {

  })


  //logout
  cy.wait(7000);
  cy.get('i[title="Log out"]').click();
});
