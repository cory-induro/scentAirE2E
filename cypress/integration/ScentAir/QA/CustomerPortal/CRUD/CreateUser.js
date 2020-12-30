/// <reference types="cypress" />

context("create new user", () => {
  const userName = "cory@induro.io";
  const userPassword = "Heleen33!";

  beforeEach(() => {
    cy.visit("https://qa.scentconnect.com/login");
  });

//create user
  it("logs in user, navigates to users tab, creates new device manager", () => {
    
    //create random user names
    const randomUserNames = () => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
        for (var i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
      }
    //login
    cy.customerPortalLogin( userName, userPassword);

    //check login location redirected to organization directory
    cy.location('pathname').should('eq', '/organization-directory')

    //Check navigation to user directory
    cy.get(":nth-child(2) > .nav-link").click()
    cy.location('pathname').should('eq', '/user-directory')

    //Check modal close on X
    cy.get(".actions > .btn").click()
      .get('button[aria-label="Close"]').click()

    //Check modal close outside modal
    cy.get(".actions > .btn").click()
      .get('.modal-open').click('bottomRight')

    //Check modal close on Cancel button
    cy.get(".actions > .btn").click()
      .get(".btn-light > span").click()

    //Create new user with randomized name, and email.
    cy.get(".actions > .btn").click()
      .get('input[name="firstName"]').type(randomUserNames())
      .get('input[name="lastName"]').type(randomUserNames())
      .get('input[name="email"]').type("cory+" + randomUserNames() + "@induro.io")
      .get('input[name="password"]').type(userPassword)
      .get('select[name="role"]').select('Admin').should('have.value', '0: ENT_ADMIN')
      .get('select[name="locale"]').select('Spanish - Español', { force: true }).should('have.value', '1: es-419')
      .get('select[name="temp"]').select('Celsius').should('have.value', '1: C')
      .get('input[id="receive-alerts"]').check().should('be.checked')
      .get('input[id="use-meridian-clock"]').check().should('be.checked')
      .get('button[type="submit"]').click()

    //logout
    cy.wait(7000);
    cy.get('i[title="Log out"]').click();
  });
});

