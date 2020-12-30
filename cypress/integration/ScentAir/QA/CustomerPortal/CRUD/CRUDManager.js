/// <reference types="cypress" />

context("create new user", () => {
  const userName = "cory@induro.io";
  const userPassword = "Heleen33!";
  const userFirstName = "Cory";
  const userFirstName2 = "Cory2"

  beforeEach(() => {
    cy.visit("https://qa.scentconnect.com/login");
  });

  //create random user name
  const randomUserNames = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  const randomUserName = randomUserNames();
  const newUserEmail = `${userFirstName}+${randomUserName}@induro.io`

  //create user
  it("logs in user, navigates to users tab, creates new device manager", () => {
    
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
      .get('input[name="firstName"]').type(userFirstName)
      .get('input[name="lastName"]').type(randomUserName)
      .get('input[name="email"]').type(newUserEmail)
      .get('input[name="password"]').type(userPassword)
      .get('select[name="role"]').select('Admin').should('have.value', '0: ENT_ADMIN')
      .get('select[name="locale"]').select('English - English', { force: true }).should('have.value', '0: en-us')
      .get('select[name="temp"]').select('Celsius').should('have.value', '1: C')
      .get('input[id="receive-alerts"]').check().should('be.checked')
      .get('input[id="use-meridian-clock"]').check().should('be.checked')
      .get('button[type="submit"]').click()

    //logout
    cy.wait(8000);
    cy.get('i[title="Log out"]').click();
  });

  //Read and update random user created above.
  it('logs in as new user to check permission, and update information', () => {

    //login newly created user
    cy.customerPortalLogin(newUserEmail, userPassword)

    //check login location redirected to organization directory
    cy.location('pathname').should('eq', '/organization-directory')

    //Check navigation to user directory
    cy.get(":nth-child(2) > .nav-link").click()
    cy.location('pathname').should('eq', '/user-directory')
    cy.wait(1000)

    //Search for created user and open edit user modal
    cy.contains(`${newUserEmail}`).parent('tr').within(() => {
      cy.get('td').eq(6).find('i[class="fas fa-pencil action"]').click()
    })

    //Update user information in modal and save
    cy.get('input[name="firstName"]').clear()
      .get('input[name="firstName"]').type(userFirstName2)
      .get('select[name="temp"]').select('Fahrenheit').should('have.value', '0: F')
      .get('input[id="use-meridian-clock"]').uncheck().should('not.be.checked')
      .get('button[type="submit"]').click()

    cy.wait(8000)
    cy.get('i[title="Log out"]').click();
  });

  it("logs in with updated information, finds the created updated user and deletes them", () => {
    
    //login newly created user
    cy.customerPortalLogin(newUserEmail, userPassword)

    cy.location('pathname').should('eq', '/organization-directory')

    //Check navigation to user directory
    cy.get(":nth-child(2) > .nav-link").click()
    cy.location('pathname').should('eq', '/user-directory')
    cy.wait(1000)

    //Search for created user and open delete modal
    cy.contains(`${newUserEmail}`).parent('tr').within(() => {
      cy.get('td').eq(6).find('i[class="fas fa-trash action"]').click()
    })

    //confirm delete
    cy.get('.btn-danger').click()

    //logout
    cy.wait(5000);
    cy.get('i[title="Log out"]').click();
  })
});

