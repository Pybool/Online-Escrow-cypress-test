import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';


Given('I visit the website', () => {

  cy.viewport(1500, 1000)
    cy.visit('http://localhost:4200')

    })


Then('I should be taken to the Homepage', () => {

    cy.url().should ('eq', 'http://localhost:4200/')

    })

Given('I am on the homepage', () => {

    cy.location().should((loc) => {
      
      expect(loc.host).to.eq('localhost:4200')
      expect(loc.hostname).to.eq('localhost')
      expect(loc.href).to.eq('http://localhost:4200/')
      expect(loc.port).to.eq('4200')
      expect(loc.protocol).to.eq('http:')

      })

})

Then('I should see Secure & easy way to buy & sell Cryptocurrency among Peers', () => {

    cy.xpath('/html/body/div[3]/app-root/app-home/div/section/div/div[1]/div[2]/div/div/div/div/h2').invoke('text').then((txt) => {

      expect(txt).to.equal('Secure & easy way to buy & sell Cryptocurrency among Peers')
    })

})

And('I should also see Online Crypto Exchange Escrow you can trust', () => {

    cy.xpath('/html/body/div[3]/app-root/app-home/div/section/div/div[2]/div[2]/div/div/div/div/h2').invoke('text').then((txt) => {

      expect(txt).to.equal('Online Crypto Exchange Escrow you can trust')
    })

})

And('finally see Invest & double your desire bitcoin', () => {

    cy.xpath('/html/body/div[3]/app-root/app-home/div/section/div/div[3]/div[2]/div/div/div/div/h2').invoke('text').then((txt) => {

      expect(txt).to.equal('Invest & double your desire bitcoin')
    })

})


//move file1.htm from 'test/' to 'test/dir_1/'
