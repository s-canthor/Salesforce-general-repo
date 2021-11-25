public with sharing class GetAddressIoConnectSettings {

    @AuraEnabled(cacheable=true)
    public static String getApiKey(){

        Get_Address_IO__c apiKeySetting = Get_Address_IO__c.getInstance('api-key');
        return String.valueOf(apiKeySetting.apiKey__c);
      
    }

    @AuraEnabled(cacheable=true)
    public static Integer getPostCodeLength(){

        Get_Address_IO__c postcodeSetting = Get_Address_IO__c.getInstance('api-key');
        return Integer.valueOf(postcodeSetting.postcodeLength__c);
      
    }

}