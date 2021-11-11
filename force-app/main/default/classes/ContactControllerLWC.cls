public with sharing class ContactControllerLWC {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [
            SELECT Id, Name, Title, Phone, Email, Picture__c
            FROM Contact
            WITH SECURITY_ENFORCED
            LIMIT 50
        ];

   }
   /*
   @AuraEnabled(cacheable=true)
   public static List<Contact> queryContactByRevenue(Decimal annualRevenue) {
       return [
           SELECT Name
           FROM Contact
           WHERE AnnualRevenue >= :annualRevenue
       ];
       
  }
  */
}