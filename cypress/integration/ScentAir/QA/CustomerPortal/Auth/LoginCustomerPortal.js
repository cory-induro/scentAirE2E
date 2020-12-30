/// <reference types="cypress" />

context("SA Customer Portal Login", () => {
  const userName = "cory@induro.io";
  const userPassword = "Heleen33!";

  beforeEach(() => {
    cy.visit("https://qa.scentconnect.com/login");
  });

  it("checks user sign in for SA customer portal", () => {
    cy.customerPortalLogin(userName, userPassword);
    cy.wait(2000);
    cy.get('i[title="Log out"]').click();
  });
});
