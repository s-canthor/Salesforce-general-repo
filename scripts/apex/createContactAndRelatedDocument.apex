// Create a savepoint to make sure all records are committed only if the process is fully complete
Savepoint sp = Database.setSavepoint();

// Create Contact and a pdf file attached to them
String accName ='Edge Communications';
Integer numOfContactToCreate = 9500;
Id contactRecordExample = '00309000008ceNAAAY'; //Sean Forbes

List<Account> accList = [SELECT Id, Name FROM Account WHERE Name =:accName];
Account acct = accList[0];
List<Contact> contacList = new List<Contact>();

//Create 100 contacts
for(Integer i=0; i<numOfContactToCreate; i++){
    Contact c = new Contact();
    c.FirstName = 'Contact of '+ acct.Name;
    c.LastName = 'Number '+i;
    c.email = 'number'+i+'@example.com';
    c.AccountId = acct.id;
    contacList.add(c);
}

if(contacList.size() >0){
    try{
        insert contacList;
        System.debug('Contact successfully inserted ');
    }catch(Exception e){
        System.debug('Error: ' + e.getStackTraceString()+' - '+ e.getMessage());
        Database.rollback(sp);
    }
}

//Create Content document to attach to the Contacts
Id contDocId ='0690900000PixOeAAJ';
ContentVersion existingCv = [SELECT VersionData, Title, FileExtension 
                             FROM ContentVersion 
                             WHERE IsLatest = true AND ContentDocumentId =: contDocId];

List<Contact> contListToLinkDoc = [SELECT Id FROM Contact WHERE LastName LIKE 'Number%'];

List<ContentVersion> cverList = new List<ContentVersion>();
List<ContentDocumentLink> cdlinkList = new List<ContentDocumentLink>();
Set<Id> cvIdSet = new Set<Id>();

if(contListToLinkDoc.size() == numOfContactToCreate){
    //For each element in contListToLinkDoc, we need to create a new ContentVersion
    for(Contact cont : contListToLinkDoc){
        ContentVersion newCv = new ContentVersion();
        newCv.versionData = existingCv.VersionData;
        newCv.title = 'testContract';
        newCv.pathOnClient ='testContract.pdf';
        cverList.add(newCv);
    }
    try{
        insert cverList;
        System.debug('cverList successfully inserted ');
    }catch(Exception e){
        System.debug('Error: ' + e.getStackTraceString()+' - '+ e.getMessage());
        Database.rollback(sp);
    }
    
    for(ContentVersion cv : cverList){
        cvIdSet.add(cv.Id);
    }
    
    List<ContentVersion> contentDocumentList = [SELECT ContentDocumentId FROM ContentVersion WHERE Id IN :cvIdSet];
    
    if(contListToLinkDoc.size() == contentDocumentList.size()){
        System.debug('PERFECT, SAME SIZE');
        
        for(Integer i=0;i<contListToLinkDoc.size();i++){
            ContentDocumentLink cdl = 
                new ContentDocumentLink(
                    ContentDocumentId=contentDocumentList[i].ContentDocumentId,
                    LinkedEntityId=contListToLinkDoc[i].Id
                );
            cdlinkList.add(cdl);
            
        }
        try{
            insert cdlinkList;
            System.debug('ContentDocumentLink successfully inserted ');
            
        }catch(Exception e){
            System.debug('Error: ' + e.getStackTraceString()+' - '+ e.getMessage());
            Database.rollback(sp);
        }
    }else{
        System.debug('Error: contListToLinkDoc and contentDocumentList DONT HAVE SAME SIZE: ' + contListToLinkDoc.size()+' - '+ contentDocumentList.size());
        Database.rollback(sp);
    }
}else{
    System.debug('Error: contListToLinkDoc.size() DOES NOT MATCH numOfContactToCreate: ' + contListToLinkDoc.size()+' - '+ numOfContactToCreate);
    Database.rollback(sp);
}
