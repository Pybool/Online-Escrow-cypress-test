let returnedtext
class Base{

    constructor(){}
    
    xpathGetTextFromElement(args1){
        return new Promise((resolve,reject)=>{

            cy.xpath(args1).invoke('text').then((text) =>{
                cy.log("got text ",text)
                returnedtext = text
                resolve(returnedtext)
            })  
        })
        
    }

    selectorGetTextFromElement(args1){

        return new Promise((resolve,reject)=>{

            cy.get(args1).invoke('text').then((text) =>{
                cy.log("got text ",text)
                returnedtext = text
                resolve(returnedtext)
            })
        
        })
    }

    elementVisibility(elements){
        return new Promise((resolve,reject)=>{
            for(let element = 0; element < elements.length; element++){
                cy.xpath(elements[element]).should('be.visible')
            }
        })
    }

    elementExistence(elements){
        return new Promise((resolve,reject)=>{
            for(let element = 0; element < elements.length; element++){
                cy.xpath(elements[element]).should('exist')
            }
        })
    }

}

module.exports ={ Base }