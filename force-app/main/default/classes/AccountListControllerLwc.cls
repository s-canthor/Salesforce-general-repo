public with sharing class AccountListControllerLwc {
    @AuraEnabled(cacheable=true)
    public static List<Account> queryAccountsByEmployeeNumber(Integer numberOfEmployees) {
        return [
            SELECT Name
            FROM Account
            WHERE NumberOfEmployees >= :numberOfEmployees
            WITH SECURITY_ENFORCED
        ];

   }
   @AuraEnabled(cacheable=true)
   public static List<Account> queryAccountsByRevenue(Decimal annualRevenue) {
       return [
           SELECT Name
           FROM Account
           WHERE AnnualRevenue >= :annualRevenue
           WITH SECURITY_ENFORCED
       ];
       
  }
}