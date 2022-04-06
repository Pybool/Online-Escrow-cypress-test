import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { locators } from './locators.js'


Given('I visit the website', () => {

    cy.viewport(1500, 1000)
    cy.visit('http://localhost:4200')
    window.sessionStorage.clear()

    })

Then('I should be taken to the Homepage', () => {


    cy.location().should((loc) => {
        
        expect(loc.host).to.eq('localhost:4200')
        expect(loc.hostname).to.eq('localhost')
        expect(loc.href).to.eq('http://localhost:4200/')
        expect(loc.port).to.eq('4200')
        expect(loc.protocol).to.eq('http:')

    })

    cy.xpath('/html/body/div[3]/app-root/app-home/div/section/div/div[1]/div[2]/div/div/div/div/h2').invoke('text').then((txt) => {

      expect(txt).to.equal('Secure & easy way to buy & sell Cryptocurrency among Peers')
    })
    .then(()=>{

        cy.xpath('/html/body/div[3]/app-root/app-home/div/section/div/div[3]/div[2]/div/div/div/div/h2').invoke('text').then((txt) => {

          expect(txt).to.equal('Invest & double your desire bitcoin')
        })
    })
    .then(()=>{

        cy.xpath('/html/body/div[3]/app-root/app-home/div/section/div/div[2]/div[2]/div/div/div/div/h2').invoke('text').then((txt) => {

          expect(txt).to.equal('Online Crypto Exchange Escrow you can trust')
        })

    })
    
});

When('I click on dashboard in the Navbar', () => {

      cy.xpath('//*[@id="navbarToggler9"]/ul/li[2]/a').click()
  
});


Then('I should be redirected to the login page', () => {

    cy.location().should((loc) => {
          
      expect(loc.host).to.eq('localhost:4200')
      // cy.wait(2000)
      expect(loc.hostname).to.eq('localhost')
      expect(loc.href).to.eq('http://localhost:4200/Login')
      expect(loc.port).to.eq('4200')
      expect(loc.protocol).to.eq('http:')
      
    });

    cy.get('h2.text-center').invoke('text').then((txt)=>{

      expect(txt).to.eq('Angular Cryptocurrency Escrow login page')
    });

});


When('I click on Merchant dashboard in the Navbar', () => {

      cy.xpath('//*[@id="navbarToggler9"]/ul/li[3]/a').click()

});


When('I click on Orderpool in the Navbar', () => {

      cy.xpath('//*[@id="navbarToggler9"]/ul/li[4]/a').click()

});

When('I click on Orderpool in the Navbar', () => {

      cy.xpath('//*[@id="navbarToggler9"]/ul/li[5]/a').click()

});

When('I click on Account profile in the Navbar', () => {

      cy.xpath('//*[@id="navbarToggler9"]/ul/li[6]/a').click()

});

Then('I navigate to the login page', () => {

  cy.xpath('//*[@id="navbarToggler9"]/ul/li[6]/a').click()

});


When('I type the correct username and password in the provided inputs', () => {

    cy.get('.email > .form-control').type(locators.auth.username1)
    cy.get('.pass > .form-control').type(locators.auth.password)
    cy.get('.bin > .btn').click()

});

Then('I should be redirected to the dashboard', () => {

    cy.wait(6000);
    cy.login(locators.auth.username1, locators.auth.password).then((response)=>{
        
        cy.log("User details from backend ",response, response.token, response.user_id, response.username)
        cy.location().should((loc) => {
            
          expect(loc.host).to.eq('localhost:4200')
          // cy.wait(2000)
          expect(loc.hostname).to.eq('localhost')
          expect(loc.href).to.eq('http://localhost:4200/Dashboard')
          expect(loc.port).to.eq('4200')
          expect(loc.protocol).to.eq('http:')
          
        });
    
        cy.get('.text-left').invoke('text').then((txt)=>{
    
          expect(txt).to.eq(`${response.username} Buyer's Dashboard`)
        });

    })
    
    
    

});





//move file1.htm from 'test/' to 'test/dir_1/'
// it('should path the response', () => {
//   cy.intercept('GET', `https://ekowebsite/api/v1/timdeschryver`, (request) => {
//     request.reply((response) => {
//       response.body['login'] = 'fake-username';
//       return response;
//     });
//   });

//   cy.findByRole('heading', { name: /hello fake-username/i });
// });