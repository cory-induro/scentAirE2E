/// <reference types="cypress" />

// const { get } = require("cypress/types/lodash");

context("OTA process, checks all search options, selects a device, downgrades it, upgrades that same device and checks has been upgraded", () => {
  
  //Login credentials
  const otaUserName = "cory+fe@induro.io";
  const userPassword = "Heleen33!";
  
  //firmware versions
  const downgrade = '24';
  const upgrade = '32'

  beforeEach(() => {
    cy.visit("https://qa.mfg.scentconnect.com/login");
  });

  //check search options and 
  it("logs in user and navigates to assets page", () => {
    cy.mfgPortalLogin(otaUserName, userPassword);
    cy.location("pathname").should("eq", "/ota-console");
    cy.get("#assets").click();

    //search via organization and location
    cy.get('select[id="org-filter"]').select("Big Office Induro").should("have.value", "LP2auDk3c9yxN41NMJ8r")
      .get('select[id="loc-filter"]').select("blorp").should("have.value", "bxBqTW8QgoLJ8IxzgYrm") 
      .get('[type="submit"]').click()
      .wait(7000)
      .screenshot('viewport')
      .get('[type="reset"]').click()

    //search via hardware type  
    cy.get('select[id="type-filter"]').select("ScentDirect").should("have.value", "SCENT_DIRECT")
      .get('[type="submit"]').click()
      .wait(7000)
      .screenshot('viewport')
      .get('[type="reset"]').click()

    //search via firmware version
    cy.get(".col-9 > .d-flex > :nth-child(1)").type("0.0." + upgrade)
      .get(".d-flex > :nth-child(3)").type("0.0." + upgrade)
      .get('[type="submit"]').click()
      .wait(7000)
      .screenshot('viewport')

    //start firmware downgrade
    cy.get(":nth-child(2) > .checkbox-cell > input").check().should('be.checked')
      .get(".align-items-end > .btn").click()
      .get('select[id="firmwareVersion"]').select('0.0.' + downgrade).should('have.value', 'scent.connect.2_0.0.' + downgrade + '.bin')
      .get('.modal-footer > .btn-primary').click()
      .wait(80000)
    
    //search for downgraded device and upgrade to highest firmware. If firmware upgrades have occured you must
    //update the variable at the top of the page for this program to update to the latest firmware version
    //otherwise it will always upgrade to the current stated variable.
    cy.get("#assets").click()
      .get('[type="reset"]').click()
      .get(".col-9 > .d-flex > :nth-child(1)").type("0.0." + downgrade)
      .get(".d-flex > :nth-child(3)").type("0.0." + downgrade)
      .get('[type="submit"]').click()
      .wait(7000)
      .get(".checkbox-cell > input").check().should('be.checked')
      .get(".align-items-end > .btn").click()
      .get('select[id="firmwareVersion"]').select("0.0." + upgrade).should('have.value', 'scent.connect.2_0.0.' + upgrade + '.bin')
      .get('.modal-footer > .btn-primary').click()
      .wait(80000)

    //search for device again to ensure upgrade was completed
    cy.get('#assets').click()
      .get('[type="reset"]').click()
      .get(".col-9 > .d-flex > :nth-child(1)").type("0.0." + upgrade)
      .get(".d-flex > :nth-child(3)").type("0.0." + upgrade)
      .get('[type="submit"]').click()
      .wait(7000)
      .screenshot('viewport')

    //logout  
    cy.get('i[title="Log out"]').click();
  })
  
});