import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { locators } from './locators.js'
import { Base } from '../../page_objects/Base.js'

const navbar = {
                home:'//*[@id="navbarToggler9"]/ul/li[1]/a',
                dashboard:'//*[@id="navbarToggler9"]/ul/li[2]/a',
                merchantdashboard:'//*[@id="navbarToggler9"]/ul/li[3]/a',
                orderpool:'.navbar-nav > :nth-child(4) > .nav-link',
                accountprofile:'//*[@id="navbarToggler9"]/ul/li[5]/a',
                loginpage:'//*[@id="navbarToggler9"]/ul/li[6]/a',
                register:'//*[@id="navbarToggler9"]/ul/li[7]/a',
                logout:'//*[@id="navbarToggler9"]/ul/li[8]/a',
                preferences:'//*[@id="navbarToggler9"]/ul/li[9]/a',
                settings:'//*[@id="navbarToggler9"]/ul/li[10]/a'
              }
const NewOrderElements = ['//*[@id="parent_div"]/div/div/form/div[1]/div/button',
                          '//*[@id="Quantity"]',
                          '//*[@id="Price"]',
                          '//*[@id="parent_div"]/div/div/form/input',
                          
                          ]
const Alert = 'alert>div.container>div.m-3'
const crypto_list = '//*[@id="parent_div"]/div/div/form/div[1]/div/div/div'

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}


Given('I visit the website', () => {

    cy.viewport(1500, 1000)
    cy.visit('http://localhost:4200')
    // window.sessionStorage.clear()
    cy.log("Base here ",Base)
    // cy.task('CypressStoreSetValue', { name: 'runCount', value: 0 })
    if(window.sessionStorage.getItem("count")){
      cy.log("I have been ran before")
  
    }
    else{
      window.sessionStorage.setItem("count",1)
      cy.log("I have not been ran before")
      cy.task('CypressStoreSetValue', { name: 'switchUser', value: 0 })
      // window.sessionStorage.removeItem("count")
    }

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

Then('I go to the login page and login', () => {

      cy.task('CypressStoreGetValue', 'switchUser').then((value) => { 
          cy.log('Checking whether to switch user ', value)
          cy.get(':nth-child(6) > .nav-link').click()

            if (value == 0){
                cy.get('.email > .form-control').type(locators.auth.username1)
            }

            else if (value == 1){ 
                window.sessionStorage.clear()
                cy.get('.email > .form-control').type(locators.auth.username2)
            }
            cy.get('.pass > .form-control').type(locators.auth.password)
            cy.get('.bin > .btn').click()
            
        })
      
});


// ***********************************************************************
// Scenario: Testing the new public order button and validating the modal
When ('I click New public order button', () =>{
      cy.wait(4000)
      cy.xpath('//*[@id="parent_div"]/div[3]/div/div[3]/h2/input').click()
})

Then ('A modal should pop up with Angular Escrow Publish Order as its header', () =>{

      cy.xpath('/html/body/ngb-modal-window/div/div').as('modal')
      cy.get('@modal').should('exist').and('be.visible')
      const element = '//*[@id="parent_div"]/div[1]/h2'
      Base.prototype.xpathGetTextFromElement(element).then((text)=>{
        cy.log(text)
        expect(text).to.include('Buyer\'s Dashboard')
      })

})


And ('The commodity drop down button, quantity and price input fields, and the publish order button should all be visible', () =>{

      Base.prototype.elementExistence(NewOrderElements).then(()=>{ })
      Base.prototype.elementVisibility(NewOrderElements)

})


And ('The footer should contain Note that your Order Expires and is Purged from Orderpool after 24hrs', () =>{
      const footer_text_element = '/html/body/ngb-modal-window/div/div/app-eko-modal/div[3]/p'
      cy.xpath(footer_text_element).invoke('text').then((txt)=>{
        expect(txt).to.eq(`Note that your Order Expires and is Purged from Orderpool after 24hrs`)
      });

})

// **************************************************************************
// Scenario: Creating a New public order from the dashboard with complete data
When ('I click on the New public order button the Publish order modal should pop up', () =>{

      cy.xpath('//*[@id="parent_div"]/div[3]/div/div[3]/h2/input').click()
      cy.xpath('/html/body/ngb-modal-window/div/div').as('modal')
      cy.get('@modal').should('exist').and('be.visible')
      const element = '//*[@id="parent_div"]/div[1]/h2'
      Base.prototype.xpathGetTextFromElement(element).then((text)=>{
        cy.log(text)
        expect(text).to.include('Buyer\'s Dashboard')
      })

})

And ('I enter values for quantity and price in the Appropriate fields and click publish order button', () =>{
      
      cy.xpath(NewOrderElements[1]).type(randomNumber(15,200))
      cy.xpath(NewOrderElements[2]).type(randomNumber(1700,50000))
      cy.xpath(NewOrderElements[3]).click()

})

Then ('I should see an error message at the top of the modal with message You seem to have an invalid Commodity', () =>{
      
      cy.get(Alert).invoke('text').then((text)=>{
        
        cy.log("===============> ",text)
        if (text.includes('×')){
            text = text.substring(1);
        }
        expect(text).to.eq(`You seem to have an invalid Commodity`)
      });
      cy.wait(1000)

})

When ('I click on the commodity dropdown menu', () =>{

      cy.xpath(NewOrderElements[0]).click()
})

Then ('I should see a list of commodities in the drop down', () =>{

      cy.xpath(crypto_list).children().its('length').should('equal',12)
});

When ('I select a random commodity, the selected commodity should be shown on the dropdown face', () =>{

      const drop_app_genericoin = '//*[@id="parent_div"]/div/div/form/div[1]/div/button/div/app-genericoin'
      cy.xpath(crypto_list).children().eq(randomNumber(0,11)).click().invoke('text').then((seltext)=>{

        cy.log("Genericoin ",seltext)
        cy.task('CypressStoreSetValue', { name: 'commodity', value: seltext })
        cy.xpath(drop_app_genericoin).invoke('text').then((droptext)=>{

          expect(droptext.trim()).to.include(seltext.trim())

        })
      
      })

})

Then ('I Enter the quantity in the appropiate field input', () =>{
      const quantity = randomNumber(15,200)
      cy.xpath(NewOrderElements[1]).clear()
      cy.xpath(NewOrderElements[1]).type(quantity)
      cy.task('CypressStoreSetValue', { name: 'quantity', value: quantity })
})

When ('I click on publish order without entering a price in the appropiate field', () =>{
  
      cy.xpath(NewOrderElements[2]).clear()
      cy.xpath(NewOrderElements[3]).click()
})

Then ('I should see an error message at the top of the Modal with message You seem to have an invalid Price', () =>{

      cy.get(Alert).invoke('text').then((text)=>{
            
        cy.log("===============> ",text)
        if (text.includes('×')){
            text = text.substring(1);
        }
        expect(text).to.eq(`You seem to have an invalid Price`)
      });
      cy.wait(1000)

})

When ('I clear the quantity field and enter a price and click publish', () =>{

      cy.xpath(NewOrderElements[1]).clear()
      cy.xpath(NewOrderElements[2]).type(randomNumber(1700,50000))
      cy.xpath(NewOrderElements[3]).click()
});

Then ('I should see an error message at the top of the Modal with message You seem to have an invalid Quantity', () =>{

      cy.get(Alert).invoke('text').then((text)=>{
                
        cy.log("===============> ",text)
        if (text.includes('×')){
            text = text.substring(1);
        }
        expect(text).to.eq(`You seem to have an invalid Quantity`)
      });

});

// Obscurity starts 

And ('I enter a price in the appropiate field and click publish', () =>{
      const price = randomNumber(1700,50000)
      cy.xpath(NewOrderElements[2]).type(price)
      cy.task('CypressStoreSetValue', { name: 'price', value: price })
      cy.xpath(NewOrderElements[3]).click()
});

Then ('A pop up message should appear at the top of the modal with message containing successfully published', () =>{

      cy.get(Alert).invoke('text').then((text)=>{
                
        cy.log("===============> ",text)
        if (text.includes('×')){
            text = text.substring(1);
        }
        expect(text).to.include(`successfully published`)
        // storing order id in custom store
        // Order OF-800948553 successfully published
        let srctext = text
        var re = /(.*Order\s+)(.*)(\s+successfully.*)/;
        var orderid = srctext.replace(re, "$2");
        cy.log("Got order ",orderid)
        cy.task('CypressStoreSetValue', { name: 'createdOrderId', value: orderid })

      });
      
      // cy.task('CypressStoreGetValue', 'createdOrderId').then((orderid) => { })

});

When ('I click on the X button at the top right corner of the modal', () =>{
  
      const close_modal = '//*[@id="header"]/a'
      cy.xpath(close_modal).click()
  
});

Then ('The modal should be closed and no longer visible', () =>{

      cy.xpath('/html/body/ngb-modal-window/div/div').should('not.exist')

});

//***********************************************************************
// Scenario: Verifying the previously created order was actually created

When ('I click on Order Pool in the Navigation bar', () =>{
  
      cy.get(navbar.orderpool).click()

});

Then ('I should be taken to the Orderpool page', () =>{
  
      cy.url().should('eq', 'http://localhost:4200/orderpool')
      
});

And ('I should see Angular Cryptocurrency Escrow Order Pool as the header', () =>{
  
      const orderpool_header = '//*[@id="parent_div"]/div/div/div/div/div[1]/div/div[1]/h2'
      cy.xpath(orderpool_header).should('contain',"Angular Cryptocurrency Escrow Order Pool")

});

And ('A table should be visible with search order pool, commodity field inputs and New public reservation button above the table', () =>{

      cy.xpath('//*[@id="orderpool"]').should('exist').and('be.visible')

});

And ('The table should have headers SN ,Order ID, Commodity, Quantity, Price, Expires and Action', () =>{

      const tableHeaders = ['S/N' ,'Order ID', 'Commodity', 'Quantity', 'Price', 'Expires', 'Action']
      for (let i=0; i <tableHeaders.length; i++){

         cy.xpath(`//*[@id="orderpool"]/thead/th[${i+1}]`).should('contain',tableHeaders[i])
      }
      
});

Then ('I verify that the previously created order is the first order in the table by checking that Order ID in the table first row matches the order id from the previous pop up success message while creating the order', () =>{
      const firstrow_orderid = ':nth-child(1) > :nth-child(2) > .no_dec_sm > .no_exp'
      cy.task('CypressStoreGetValue', 'createdOrderId').then((orderid) => { 
         console.log("From bank ",orderid)
         cy.get(firstrow_orderid).should('contain',orderid)

      })
      

});

And ('The commodity should also match the previously created one', () =>{
      const firstrow_commodity = ':nth-child(1) > :nth-child(3) > app-genericoin > div.crypto'
      cy.task('CypressStoreGetValue', 'commodity').then((commodity) => { 
        console.log("From bank ",commodity)
        cy.get(firstrow_commodity).should('contain',commodity)

    })

});

And ('the Quantity should match', () =>{
  
      const firstrow_quantity = 'tbody > :nth-child(1) > :nth-child(4)'
      cy.task('CypressStoreGetValue', 'quantity').then((quantity) => { 
        console.log("From bank ",quantity)
        cy.get(firstrow_quantity).should('contain',quantity)

    })

});

And ('The price should match', () =>{

      const firstrow_price = 'tbody > :nth-child(1) > :nth-child(5)'
      cy.task('CypressStoreGetValue', 'price').then((price) => { 
        console.log("From bank ",price)
        cy.get(firstrow_price).should('contain',price)

    })

});

And ('the Expires should contain 23:59:', () =>{
  
      const firstrow_expires = 'tbody > :nth-child(1) > :nth-child(6)'
      
      cy.get(firstrow_expires).should('contain','23:59:')

});

Given ('the current second is not less than 20', () =>{

      Base.prototype.selectorGetTextFromElement(':nth-child(1) > :nth-child(6) > .count-down > span').then((text)=>{

        let seconds = text.slice(-2);
        seconds = parseInt(seconds)
        if (seconds < 20){
            cy.wait(10000)
            expect(seconds).to.be.greaterThan(20)
        }

        else{
          expect(seconds).to.be.greaterThan(20)
        }
        
      })
  
});

Then ('I take a snapshot of the expiration current time', () =>{
  
      Base.prototype.selectorGetTextFromElement(':nth-child(1) > :nth-child(6) > .count-down > span').then((text)=>{
        
        cy.task('CypressStoreSetValue', { name: 'expiryTimeStamp1', value: text })
      })
      
});

And ('I wait for 5 seconds and take another snapshot', () =>{
      cy.wait(5000).then(()=>{

        Base.prototype.selectorGetTextFromElement(':nth-child(1) > :nth-child(6) > .count-down > span').then((text)=>{
            
          cy.task('CypressStoreSetValue', { name: 'expiryTimeStamp2', value: text })
        })

      })
});

Then ('To verify countdown ,the current snapshot seconds, should be within 4 to 6 seconds less than the previous snapshot seconds', () =>{

      cy.task('CypressStoreGetValue', 'expiryTimeStamp1').then((expiryTimeStamp1) => { 

        let seconds1 = expiryTimeStamp1.slice(-2);
        seconds1 = parseInt(seconds1)

        cy.task('CypressStoreGetValue', 'expiryTimeStamp2').then((expiryTimeStamp2) => { 

          let seconds2 = expiryTimeStamp2.slice(-2);
          seconds2 = parseInt(seconds2)
          expect(seconds1 - seconds2).to.be.oneOf([ 5, 6, 7 ]);
      })

    })
      
});

And ('the last table column should have a button with value Reserve Order', () =>{

    cy.get('td:nth-child(7) > input').eq(0).should('have.value','Reserve order')

});

Then ('I set a new user flag to login a seller user on next login, this feature is not part of the test', () =>{
  
    cy.task('CypressStoreSetValue', { name: 'switchUser', value: 1 })
});

// **************************************************************************************************************
// Scenario: Simulating a seller account by logging in with different credentials to reserve an Order

Given ('A seller user logs in', () =>{
      cy.log("Simulating a seller account")
  
});

And ('seller user goes to the Orderpool', () =>{
  
      cy.get(navbar.orderpool).click()
});

When ('The seller clicks on Reserve order button in the table for the previously created order', () =>{
  
      cy.get('td:nth-child(7) > input').eq(0).click()
      const seller = window.sessionStorage.getItem("USERNAME")
      cy.task('CypressStoreSetValue', { name: 'counterparty', value: seller })
});

Then ('A message should appear on the top of the Orderpool page with message containing successfully reserved', () =>{
  
      Base.prototype.selectorGetTextFromElement(Alert).then((text)=>{
                
            cy.log("===============> ",text)
            if (text.includes('×')){
                text = text.substring(1);
            }
            expect(text).to.contain(`successfully reserved`)
      });
          cy.wait(1000)
  });

Then ('The Reserve Order button should have value of processing', () =>{
  
      cy.get('td:nth-child(7) > input').eq(0).should('have.value','Processing')
      cy.get('td:nth-child(7) > input').eq(0).should('have.css','color','rgb(255, 255, 255)')
      cy.get('td:nth-child(7) > input').eq(0).should('have.css','background-color','rgb(0, 128, 0)')

});

When ('The seller clicks on the button again', () =>{
      
      cy.wait(5000).then(()=>{
          cy.get('td:nth-child(7) > input').eq(0).click()
      }) 
});

Then ('A message should appear at the top of the page with message You cant reserve an Already processing transaction', () =>{
  
      Base.prototype.selectorGetTextFromElement(Alert).then((text)=>{
                    
        cy.log("===============> ",text)
        if (text.includes('×')){
            text = text.substring(1);
        }
        cy.wait(5000)
        expect(text).to.eq(`You can't reserve an already processing transaction`)
 
      })
      cy.wait(1000)

});

When ('I go to the dashboard i should not see any pending transaction since this account wasn\'t the order publisher', () =>{
  
      cy.xpath(navbar.dashboard).click()
});

Then ('I reset new user flag to login a the buyer user on next login, this feature is not part of the test', () =>{
  
      cy.task('CypressStoreSetValue', { name: 'switchUser', value: 0 })
});



// ***************************************************************************************************************************
// Scenario: Logging in as the order publisher or buyer to verify that the reserved order reflects in the dashboard table of pending orders

When ('I go to the dashboard page', () =>{
  
      cy.xpath(navbar.dashboard).click()
});

Then ('The pending orders table should exist and be visible', () =>{
      
      const dashboard_tables = '//*[@id="procpool"]'
      Base.prototype.elementVisibility(dashboard_tables).then(()=>{
      Base.prototype.elementExistence(dashboard_tables)

      })
      
});


And ('The pending orders table should have headers SN ,Order ID, Commodity, Quantity, Price, Expires and Action', () =>{

      const tableHeaders = ['S/N' ,'Order ID', 'Counter Party', 'Commodity', 'Quantity', 'Price', 'Expires', 'Action']
      for (let i=0; i <tableHeaders.length; i++){

         cy.xpath(`//*[@id="procpool"]/thead/th[${i+1}]`).should('contain',tableHeaders[i])
      }
      
});


Then ('I should see my the previously reserved order in the table since this account was the reserved order publisher', () =>{
  
      const firstrow_orderid = ':nth-child(1) > :nth-child(2) > .no_dec_sm > .no_exp'
      cy.task('CypressStoreGetValue', 'createdOrderId').then((orderid) => { 
            console.log("From bank ",orderid)
            cy.get(firstrow_orderid).should('contain',orderid)

      })

      const firstrow_commodity = 'tbody > :nth-child(1) > :nth-child(3)'
      cy.task('CypressStoreGetValue', 'counterparty').then((counterparty) => { 
            console.log("From bank ",counterparty)
            cy.get(firstrow_counterparty).should('contain',counterparty)

      })
      
      const secondrow_commodity = ':nth-child(1) > :nth-child(4) > app-genericoin > div.crypto'
      cy.task('CypressStoreGetValue', 'commodity').then((commodity) => { 
            console.log("From bank ",commodity)
            cy.get(firstrow_commodity).should('contain',commodity)

      })
        
      const firstrow_quantity = 'tbody > :nth-child(1) > :nth-child(5)'
      cy.task('CypressStoreGetValue', 'quantity').then((quantity) => { 
            console.log("From bank ",quantity)
            cy.get(firstrow_quantity).should('contain',quantity)

      })
      
      const firstrow_price = 'tbody > :nth-child(1) > :nth-child(6)'
      cy.task('CypressStoreGetValue', 'price').then((price) => { 
            console.log("From bank ",price)
            cy.get(firstrow_price).should('contain',price)

      })
        
      const firstrow_expires = 'tbody > :nth-child(1) > :nth-child(7)'
      
});

And ('A 30 minutes countdown should be already started , comparing snapshots to ensure countdown is working', () =>{
  
      Base.prototype.selectorGetTextFromElement(':nth-child(1) > :nth-child(6) > .count-down > span').then((text)=>{

            let seconds = text.slice(-2);
            seconds = parseInt(seconds)
            if (seconds < 20){
                cy.wait(10000)
                expect(seconds).to.be.greaterThan(20)
            }
    
            else{
              expect(seconds).to.be.greaterThan(20)
            }
            
          })

      Base.prototype.selectorGetTextFromElement(':nth-child(1) > :nth-child(6) > .count-down > span').then((text)=>{
      
      cy.task('CypressStoreSetValue', { name: 'expiryTimeStamp1', value: text })
      })


      cy.wait(5000).then(()=>{

      Base.prototype.selectorGetTextFromElement(':nth-child(1) > :nth-child(6) > .count-down > span').then((text)=>{
            
            cy.task('CypressStoreSetValue', { name: 'expiryTimeStamp2', value: text })
      })

      })
    
      cy.task('CypressStoreGetValue', 'expiryTimeStamp1').then((expiryTimeStamp1) => { 

      let seconds1 = expiryTimeStamp1.slice(-2);
      seconds1 = parseInt(seconds1)

      cy.task('CypressStoreGetValue', 'expiryTimeStamp2').then((expiryTimeStamp2) => { 

            let seconds2 = expiryTimeStamp2.slice(-2);
            seconds2 = parseInt(seconds2)
            expect(seconds1 - seconds2).to.be.oneOf([ 5, 6, 7 ]);
      })

      })
});

And ('The Pending order table rows should contain Pay Escrow, Generate token and Confirm buttons', () =>{
      let actionbuttons = [
                        '//*/td[8]/input[1]',
                        '//*/td[8]/input[2]',
                        '//*/td[8]/input[3]'
                        ]
      for(let i = 0; i < actionbuttons.length; i++){

            cy.xpath(actionbuttons[i]).eq(0).should('exist').and('be.visible')
      }
      
});

And ('Pay Escrow should be Enabled with Generate token and Confirm buttons disabled', () =>{
  
      let actionbuttons = [
            '//*/td[8]/input[1]',
            '//*/td[8]/input[2]',
            '//*/td[8]/input[3]'
            ]
      for(let i = 0; i < actionbuttons.length; i++){
            if (i !=0){
                  cy.get(actionbuttons[i]).eq(0).should('have.attr','disabled')
            }
      }
});

//move file1.htm from 'test/' to 'test/dir_1/'
// it('should path the response', () => {
//   cy.intercept('GET', `https://api.github.com/users/timdeschryver`, (request) => {
//     request.reply((response) => {
//       response.body['login'] = 'fake-username';
//       return response;
//     });
//   });

//   cy.findByRole('heading', { name: /hello fake-username/i });
// });

// cy.xpath(navbar.orderpool).invoke('attr', 'href')
      // .then(href => {
      //   cy.log('Orderpool Url ',href)
      //   cy.url().should('eq', 'https://localhost:4200/orderpool')
       
      // });