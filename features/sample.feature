Feature: Rudderstack End-to-End Event Flow

  Scenario: Validate event delivery from HTTP source to Webhook destination
    Given I log in to the Rudderstack dashboard
    When I navigate to the Connections page
    And I store the Data Plane URL
    And I store the Write Key of the HTTP source
    And I send a sample event using browser script
    And I click on the webhook destination
    And I open the events tab
    Then I read and log the delivered and failed event counts