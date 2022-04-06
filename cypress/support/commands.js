// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const compareSnapshotCommand = require('cypress-image-diff-js/dist/command')
compareSnapshotCommand()

Cypress.Commands.add('compareSnapshotCommand', () => {})

Cypress.Commands.add('login', (email, password) => {
    cy.request({
        method:'POST', 
        url:'http://localhost:3000/api/authentication/login',
        body: {
          email,
          password,
        }
      })
      .as('loginResponse')
      .then((response) => {
        Cypress.env('token', response.body.token); // either this or some global var but remember that this will only work in one test case
        Cypress.env('username', response.body.username);
        Cypress.env('user_id', response.body.user_id);
        return response.body;
      })
    //   .its('status')
    //   .should('eq', 200);
  })