/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars


const cucumber = require('cypress-cucumber-preprocessor').default
const getCompareSnapshotsPlugin = require('cypress-image-diff-js/dist/plugin')
// cy.viewport(1024, 768)
const CypressStore = {}
module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
  getCompareSnapshotsPlugin(on, config)
  on('task', {
    CypressStoreSetValue({ name='switchUser', value=0 }) {
      console.log("===============================================================================================================",name, value)
      CypressStore[name] = value
      console.log(CypressStore)
      return true
    },
  })
  on('task', {
    CypressStoreGetValue(name='switchUser') {
      return CypressStore[name]
    },
  })

  on('task', {
    movepic(){
      console.log('Bunnie')
      var mv = require('mv');
      mv('C:/Users/hp/Documents/Workspace/cypress_end2end_automation/cypress-visual-screenshots/comparison/All Integration Specs-Login-page-with-threshold.png', 'C:/Users/hp/Documents/Workspace/cypress_end2end_automation/pics folder/All Integration Specs-Login-page-with-threshold.png', function(err) {

        // done. it tried fs.rename first, and then falls back to
        // piping the source file to the dest file and then unlinking
        // the source file.
        console.log('Done');
        
      });
      mv('C:/Users/hp/Documents/Workspace/cypress_end2end_automation/cypress-visual-screenshots/baseline/All Integration Specs-Login-page-with-threshold.png', 'C:/Users/hp/Documents/Workspace/cypress_end2end_automation/pics folder/All Integration Specs-Login-page-with-threshold1.png', function(err) {
        // done. it tried fs.rename first, and then falls back to
        // piping the source file to the dest file and then unlinking
        // the source file.
        console.log('Done2');
        
      });
      return null
    },
    


  })
  
}

