public with sharing class platformEventExamples {

// Create an instance of the event and store it in the newsEvent variable
	Cloud_News__e newsEvent = new Cloud_News__e(
		Location__c='Mountain City',
		Urgent__c=true,
		News_Content__c='Lake Road is closed due to mudslides.');
// Call method to publish events
	Database.SaveResult sr = EventBus.publish(newsEvent);
// Inspect publishing result
	if (sr.isSuccess()) {
		System.debug('Successfully published event.');
	} else {
		for(Database.Error err : sr.getErrors()) {
			System.debug('Error returned: ' +
			             err.getStatusCode() +
			             ' - ' +
			             err.getMessage());
		}
	}

// List to hold event objects to be published.
	List<Cloud_News__e> newsEventList = new List<Cloud_News__e>();
// Create event objects.
	Cloud_News__e newsEvent1 = new Cloud_News__e(
		Location__c='Mountain City',
		Urgent__c=true,
		News_Content__c='Lake Road is closed due to mudslides.');
	Cloud_News__e newsEvent2 = new Cloud_News__e(
		Location__c='Mountain City',
		Urgent__c=false,
		News_Content__c='Small incident on Goat Lane causing traffic.');
// Add event objects to the list.
	newsEventList.add(newsEvent1);
	newsEventList.add(newsEvent2);
// Call method to publish events.
	List<Database.SaveResult> results = EventBus.publish(newsEventList);
// Inspect publishing result for each event
	for (Database.SaveResult sr : results) {
		if (sr.isSuccess()) {
			System.debug('Successfully published event.');
		} else {
			for(Database.Error err : sr.getErrors()) {
				System.debug('Error returned: ' +
				             err.getStatusCode() +
				             ' - ' +
				             err.getMessage());
			}
		}
	}
}
