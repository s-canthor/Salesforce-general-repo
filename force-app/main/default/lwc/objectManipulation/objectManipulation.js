import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';


/*
Object manipulation should be done via "object destructuring" (as in this example) 
or via "Object.assign()" instead of JSON.parse(JSON.stringify(data));
https://developer.salesforce.com/blogs/2020/10/step-up-your-lwc-skills-part-1
*/
export default class ObjectManipulation extends LightningElement {
    @api
    recordId;

    contact; 
  
  @wire(getRecord, { recordId: '$recordId',  fields: ['Contact.Name', 'Contact.Title'] }) 
  handleRecord({ err, data }) {
    if (data) {
      const { fields } = data;
      
      // 👍: Only copy what is needed.
      this.contact = {
        fields: {
          ...fields,
          Summary: {
            value: `${fields.Name.value} (${fields.Title.value})` 
          }
        }
      };
    }
  }
}