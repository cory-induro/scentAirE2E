/// <reference types="cypress" />

context("create new kiosk view", () => {
    const userName = "cory@induro.io";
    const userPassword = "Heleen33!";
    const userFirstName = "Cory";
    const userFirstName2 = "Cory2";

  
    beforeEach(() => {
      cy.visit("https://qa.mfg.scentconnect.com/login");
    });

    //creates a random manager
    const randomUserNames = () => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
        for (var i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
      }
    
      const randomUserName = randomUserNames();
      const newUserEmail = `${userFirstName}+${randomUserName}@induro.io`
  
    it("logs in user, navigates to user directory, creates new operator", () => {
    

    })
  
  });
  