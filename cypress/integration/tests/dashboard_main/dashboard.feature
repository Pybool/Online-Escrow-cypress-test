Feature: As a Tester To test the dashboard page
  
  Background: Visit the website
    Given I visit the website
    Then I should be taken to the Homepage
    Then I go to the login page and login


  @focus
  Scenario: Testing the new public order button and validating the modal

    When I click New public order button
    Then A modal should pop up with Angular Escrow Publish Order as its header
    And The commodity drop down button, quantity and price input fields, and the publish order button should all be visible
    And The footer should contain Note that your Order Expires and is Purged from Orderpool after 24hrs

  @focus
  Scenario: Creating a New public order from the dashboard with incomplete data
    
    When I click on the New public order button the Publish order modal should pop up 
    And I enter values for quantity and price in the Appropriate fields and click publish order button
    Then I should see an error message at the top of the modal with message You seem to have an invalid Commodity
    When I click on the commodity dropdown menu
    Then I should see a list of commodities in the drop down
    When I select a random commodity, the selected commodity should be shown on the dropdown face
    Then I Enter the quantity in the appropiate field input
    When I click on publish order without entering a price in the appropiate field
    Then I should see an error message at the top of the Modal with message You seem to have an invalid Price
    When I clear the quantity field and enter a price and click publish
    Then I should see an error message at the top of the Modal with message You seem to have an invalid Quantity

    
  @publicorder 
  Scenario: Creating a New public order from the dashboard with complete data
    When I click New public order button
    When I click on the commodity dropdown menu
    When I select a random commodity, the selected commodity should be shown on the dropdown face
    And I Enter the quantity in the appropiate field input
    And I enter a price in the appropiate field and click publish
    Then A pop up message should appear at the top of the modal with message containing successfully published 
    When I click on the X button at the top right corner of the modal
    Then The modal should be closed and no longer visible
  
  @focus  
  Scenario: Verifying the previously created order was actually created

    When I click on Order Pool in the Navigation bar
    Then I should be taken to the Orderpool page 
    And I should see Angular Cryptocurrency Escrow Order Pool as the header
    And A table should be visible with search order pool, commodity field inputs and New public reservation button above the table 
    And The table should have headers SN ,Order ID, Commodity, Quantity, Price, Expires and Action
    

    Then I verify that the previously created order is the first order in the table by checking that Order ID in the table first row matches the order id from the previous pop up success message while creating the order
    And The commodity should also match the previously created one
    And the Quantity should match
    And The price should match
    And the Expires should contain 23:59:
    Given the current second is not less than 20
    Then I take a snapshot of the expiration current time
    And I wait for 5 seconds and take another snapshot
    Then To verify countdown ,the current snapshot seconds, should be within 4 to 6 seconds less than the previous snapshot seconds
    And the last table column should have a button with value Reserve Order
    Then I set a new user flag to login a seller user on next login, this feature is not part of the test
  
  @focus  
  Scenario: Simulating a seller account by logging in with different credentials to reserve an Order

    Given A seller user logs in
    And seller user goes to the Orderpool
    When The seller clicks on Reserve order button in the table for the previously created order
    Then A message should appear on the top of the Orderpool page with message containing successfully reserved
    Then The Reserve Order button should have value of processing
    When The seller clicks on the button again
    Then A message should appear at the top of the page with message You cant reserve an Already processing transaction
    When I go to the dashboard i should not see any pending transaction since this account wasn't the order publisher
    Then I reset new user flag to login a the buyer user on next login, this feature is not part of the test

  @focus  
  Scenario: Logging in as the order publisher or buyer to verify that the reserved order reflects in the dashboard table of pending orders

    When I go to the dashboard page
    Then The pending orders table should be visible
    And The pending orders table should have headers SN ,Order ID, Commodity, Quantity, Price, Expires and Action
    Then I should see my the previously reserved order in the table since this account was the reserved order publisher
    And A 30 minutes countdown should be already started , comparing snapshots to ensure countdown is working
    And The Pending order table rows should contain Pay Escrow, Generate token and Confirm buttons
    And Pay Escrow should be Enabled with Generate token and Confirm buttons disabled 