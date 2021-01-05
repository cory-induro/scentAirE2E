/// <reference types="cypress" />

context("MFG Portal login/logout for all permissions", () => {
  
  //permission types
  const kiosk = "kiosk";
  const operator = "operator";
  const manager = "mfg";
  const firmwareEngineer = "fe";

  //Auth Information
  const kioskUserName = `cory+${kiosk}@induro.io`;
  const operatorUserName = `cory+${operator}@induro.io`;
  const mfgUserName = `cory+${manager}@induro.io`;
  const otaUserName = `cory+${firmwareEngineer}@induro.io`;
  const userPassword = "Heleen33!";

  //Visit site before each test run
  beforeEach(() => {
    cy.visit("https://qa.mfg.scentconnect.com/login");
  });

  //Kiosk auth check
  it("checks the auth process for operator permissions on the manufacturing portal", () => {
    cy.mfgPortalLogin(kioskUserName, userPassword);
    cy.location("pathname").should("eq", "/location/sQEdqDAbPoMiMe07jxQx/kiosk");
    cy.wait(2000);
    cy.screenshot();
    cy.get('i[title="Log out"]').click();
  });

  //Operator auth check
  it("checks the auth process for operator permissions on the manufacturing portal", () => {
    cy.mfgPortalLogin(operatorUserName, userPassword);
    cy.location("pathname").should("eq", "/location/sQEdqDAbPoMiMe07jxQx");
    cy.wait(2000);
    cy.screenshot();
    cy.get('i[title="Log out"]').click();
  });

  //Manager auth check
  it("checks the auth process for manager permissions on the manufacturing portal", () => {
    cy.mfgPortalLogin(mfgUserName, userPassword);
    cy.location("pathname").should("eq", "/location-directory");
    cy.wait(2000);
    cy.screenshot();
    cy.get('i[title="Log out"]').click();
  });

  //OTA auth check
  it("checks the auth process for manager permissions on the manufacturing portal", () => {
    cy.mfgPortalLogin(otaUserName, userPassword);
    cy.location("pathname").should("eq", "/ota-console");
    cy.wait(5000);
    cy.screenshot();
    cy.get('i[title="Log out"]').click();
  });
});
