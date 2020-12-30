/// <reference types="cypress" />

context("MFG Portal login/logout for all permissions", () => {
  const operator = "operator";
  const mfg = "mfg";
  const fe = "fe";

  const operatorUserName = `cory+${operator}@induro.io`;
  const mfgUserName = `cory+${mfg}@induro.io`;
  const otaUserName = `cory+${fe}@induro.io`;
  const userPassword = "Heleen33!";

  beforeEach(() => {
    cy.visit("https://qa.mfg.scentconnect.com/login");
  });

  it("checks the auth process for operator permissions on the manufacturing portal", () => {
    cy.mfgPortalLogin(operatorUserName, userPassword);
    cy.location("pathname").should("eq", "/location/sQEdqDAbPoMiMe07jxQx");
    cy.screenshot();
    cy.wait(2000);
    cy.get('i[title="Log out"]').click();
  });

  it("checks the auth process for manager permissions on the manufacturing portal", () => {
    cy.mfgPortalLogin(mfgUserName, userPassword);
    cy.location("pathname").should("eq", "/location-directory");
    cy.screenshot();
    cy.wait(2000);
    cy.get('i[title="Log out"]').click();
  });

  it("checks the auth process for manager permissions on the manufacturing portal", () => {
    cy.mfgPortalLogin(otaUserName, userPassword);
    cy.location("pathname").should("eq", "/ota-console");
    cy.screenshot();
    cy.wait(5000);
    cy.get('i[title="Log out"]').click();
  });
});
