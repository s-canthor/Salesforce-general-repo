// Trigger for listening to Order_Event events.
trigger OrderEventTrigger on Order_Event__e (after insert) {
    // List to hold all cases to be created.
    List<Task> tasks = new List<Task>();
    // Get queue Id for case owner
    //Group queue = [SELECT Id FROM Group WHERE Name='Regional Dispatch' AND Type='Queue'];
    // Iterate through each notification.
    for (Order_Event__e event : Trigger.New) {
        if (event.Has_Shipped__c == true) {
            // Create Task to dispatch new team.
            Task tk = new Task();
            tk.Priority = 'Medium';
            tk.Subject = 'Follow up on shipped order ' + event.Order_Number__c;
            tk.OwnerId = event.CreatedById;
            tasks.add(tk);
        }
   }
    // Insert all cases corresponding to events received.
    insert tasks;
}