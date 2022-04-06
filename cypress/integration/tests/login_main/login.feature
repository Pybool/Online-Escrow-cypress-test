Feature: As a Tester
  To test the login page

  Background: Visit the website
    Given I visit the website
    Then I should be taken to the Homepage


  @focus
  Scenario: Trying to access protected pages without logging in
    
    When I click on dashboard in the Navbar
    Then I should be redirected to the login page
    When I click on Merchant dashboard in the Navbar
    Then I should be redirected to the login page
    When I click on Orderpool in the Navbar
    Then I should be redirected to the login page
    When I click on Account profile in the Navbar
    Then I should be redirected to the login page


  @focus
  Scenario: Testing user can login with username and password
    
    Then I navigate to the login page
    When I type the correct username and password in the provided inputs
    Then I should be redirected to the dashboard

  # @focus  
  # Scenario: Testing wrong username and password on login page

  #     Then I navigate to the login page
  #     When I type in an Incorrect username or password in the provided inputs
  #     Then I should see a toast message indicating wrong username or password 