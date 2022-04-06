Feature: As a Tester
  To test the Home page

  Background: Visit the website
    Given I visit the website
    Then I should be taken to the Homepage

  @focus
  Scenario: Checking that Key Features are presented on the homepage

      Given I am on the homepage 
      Then I should see Secure & easy way to buy & sell Cryptocurrency among Peers
      And  I should also see Online Crypto Exchange Escrow you can trust 
      And finally see Invest & double your desire bitcoin
