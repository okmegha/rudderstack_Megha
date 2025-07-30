Feature: Sample Web Application Test
  As a user
  I want to test basic web functionality
  So that I can ensure the application works correctly

  @smoke
  Scenario: Open Google homepage and verify title
    Given I open the Google homepage
    When I check the page title
    Then the title should contain "Google"

  @search
  Scenario: Perform a basic search
    Given I open the Google homepage
    When I search for "WebdriverIO"
    Then I should see search results in the URL