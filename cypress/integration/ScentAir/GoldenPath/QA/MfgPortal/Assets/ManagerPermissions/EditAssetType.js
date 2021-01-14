/// <reference types="cypress" />

context("Edit Asset Type and reset", () => {
    const userName = Cypress.env("mfgManagerUserName");
    const userPassword = Cypress.env("userPassword");

    it("logs in the user, navigates to the edit-asset-type page", () => {
        cy.visit(Cypress.env('qaMfgPortalURL'))
        
        cy.mfgPortalLogin(userName, userPassword);
        cy.location("pathname").should("eq", "/location-directory");
        cy.get('[title="Menu"]').click()
          .get('[routerlink="/edit-asset-type"]').click();

        cy.wait(1000);
        cy.location("pathname").should("eq", "/edit-asset-type");
    })

    it("checks all asset types and records default state", () => {
        
        //screenshot of ScentDirect default
        // cy.screenshot('ScentDirect default')
        
        //screenshot of ScentAir Breeze default
        cy.get('select').select('ScentAir BREEZE').should('have.value', '0: SCENTAIR_BREEZE')
          .wait(1000)
        // cy.screenshot('ScentAir Breeze default')

        //screnshot of ScentAir Whisper default
        cy.get('select').select('ScentAir Whisper').should('have.value', '1: SCENTAIR_WHISPER')
          .wait(1000)
        // cy.screenshot('ScentAir Whisper default')

        //screenshot of ScentDirect with Battery default
        cy.get('select').select('ScentDirect with battery').should('have.value', '3: SCENT_DIRECT_BATTERY')
          .wait(1000)
        // cy.screenshot('ScentAir Breeze default')

        //navigate back to ScentDirect
        cy.get('select').select('ScentDirect').should('have.value', '2: SCENT_DIRECT')

    })

    it("changes all fields for all asset types, updates, cycles through assets, screenshots updates and resets to defalut state", () => {

        //update and check fan speeds for Scent Direct
        //Edit Fan Speed
        cy.get('#fanSpeed1Default').clear().type('215')
          .get('#fanSpeed1Target').clear().type('500')

        cy.get('#fanSpeed10Default').clear().type('1050')
          .get('#fanSpeed10Target').clear().type('1300')

        //Edit Pump Speed
        cy.get("#pumpSpeed1Default").clear().type('45')
          .get("#pumpSpeed1MinTarget").clear().type('2.8')
          .get("#pumpSpeed1MaxTarget").clear().type('3.0')

        cy.get("#pumpSpeed2Default").clear().type('60')
          .get("#pumpSpeed2MinTarget").clear().type('3.4')
          .get("#pumpSpeed2MaxTarget").clear().type('3.8')

        cy.get("#pumpSpeed3Default").clear().type('210')
          .get("#pumpSpeed3MinTarget").clear().type('4.7')
          .get("#pumpSpeed3MaxTarget").clear().type('5.1')
        
        //Edit Offline Event 

        //Edit Occurance
        cy.get('[formcontrolname="startTime1"] > fieldset > .ngb-tp > .ngb-tp-hour > .ngb-tp-input').clear().type('09')
          .get('[formcontrolname="startTime1"] > fieldset > .ngb-tp > .ngb-tp-minute > .ngb-tp-input').clear().type('30')
          .get('[formcontrolname="stopTime1"] > fieldset > .ngb-tp > .ngb-tp-hour > .ngb-tp-input').clear().type('12')
          .get('[formcontrolname="stopTime1"] > fieldset > .ngb-tp > .ngb-tp-minute > .ngb-tp-input').clear().type('30')

        cy.get(':nth-child(1) > sc-week-picker.ng-untouched > :nth-child(1)').click()
          .get(':nth-child(1) > sc-week-picker.ng-untouched > :nth-child(2)').click()
          .get(':nth-child(1) > sc-week-picker.ng-untouched > :nth-child(3)').click()
          .get(':nth-child(1) > sc-week-picker.ng-untouched > :nth-child(4)').click()
          .get(':nth-child(1) > sc-week-picker.ng-untouched > :nth-child(5)').click()          
          .get(':nth-child(1) > sc-week-picker.ng-untouched > :nth-child(6)').click()          
          .get(':nth-child(1) > sc-week-picker.ng-untouched > :nth-child(7)').click()       
          
        cy.get('[formcontrolname="startTime2"] > fieldset > .ngb-tp > .ngb-tp-hour > .ngb-tp-input').clear().type('10')
          .get('[formcontrolname="startTime2"] > fieldset > .ngb-tp > .ngb-tp-minute > .ngb-tp-input').clear().type('30')
          .get('[formcontrolname="stopTime2"] > fieldset > .ngb-tp > .ngb-tp-hour > .ngb-tp-input').clear().type('14')
          .get('[formcontrolname="stopTime2"] > fieldset > .ngb-tp > .ngb-tp-minute > .ngb-tp-input').clear().type('40')

        cy.get(':nth-child(2) > sc-week-picker.ng-untouched > :nth-child(2)').click()
          .get(':nth-child(2) > sc-week-picker.ng-untouched > :nth-child(4)').click()
          .get(':nth-child(2) > sc-week-picker.ng-untouched > :nth-child(6)').click() 
        
        cy.get('[formcontrolname="startTime3"] > fieldset > .ngb-tp > .ngb-tp-hour > .ngb-tp-input').clear().type('09')
          .get('[formcontrolname="startTime3"] > fieldset > .ngb-tp > .ngb-tp-minute > .ngb-tp-input').clear().type('30')
          .get('[formcontrolname="stopTime3"] > fieldset > .ngb-tp > .ngb-tp-hour > .ngb-tp-input').clear().type('12')
          .get('[formcontrolname="stopTime3"] > fieldset > .ngb-tp > .ngb-tp-minute > .ngb-tp-input').clear().type('30')

        cy.get(':nth-child(3) > sc-week-picker.ng-untouched > :nth-child(3)').click()
          .get(':nth-child(3) > sc-week-picker.ng-untouched > :nth-child(5)').click()

        //Edit Scent Level
        cy.get(':nth-child(7) > .col-10 > .row > :nth-child(1) > .ng5-slider > .ng5-slider-full-bar')
          .invoke('val', 40 + '%')
          .trigger('change', {force: true})

        cy.get(':nth-child(7) > .col-10 > .row > :nth-child(1) > .ng5-slider > .ng5-slider-model-value').should('have.value', '40%')
          // NEEDS WORK TO COMPLETE 

        //Edit Scent Time
                  

    })

    it("checks default states have been reset and logs out user", () => {

    })

    
})