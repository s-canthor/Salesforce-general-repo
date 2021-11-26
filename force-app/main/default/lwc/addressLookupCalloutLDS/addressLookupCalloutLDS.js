import { LightningElement, track, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';   

//apex imports
import getApiKey from '@salesforce/apex/GetAddressIoConnectSettings.getApiKey';
import getPostCodeLength from '@salesforce/apex/GetAddressIoConnectSettings.getPostCodeLength';

//connector
//import getAddressIo from 'c/getAddressIo'; 

import getAddressConnector from 'c/getAddressConnector';

/**
 * ToDo:
 * - [DONE] API Key stored on server
 * - [DONE] handle specific callout failures
 * - [DONE] refactor connection to its own class/module
 * - add in error panel/better visual error handling
 * - veryify handling child event bubbling in parent
 * 
 * Nice To Have:
 * - Investigate post to REST service with api key in header
 */
export default class AddressLookupCalloutLDS extends LightningElement {

    // Salesforce recordId allows use in record home
    @api recordId;

    //tracked reactive private props
    result = [];
    error;
    stack; 
    selectedAddress = '';
    searchKey = ''; 

    //private props
    latitude; 
    longitude;
    hasRendered = false; 
    connection; 

    // fetch api key from org storage
    @wire(getApiKey) apikey;
    @wire(getPostCodeLength) postcodeLength;

    handleSearchKeyChange(event){
        this.searchKey = event.target.value;
    }

    renderedCallback() {
        if (this.hasRendered) { 
            return; 
        }
        this.hasRendered = true; 

        //this.connection = new getAddressConnector(this.apikey.data); 
    }

    handleFind(){

        this.connection = new getAddressConnector(this.apikey.data);

        this.error = undefined;
        this.stack = undefined;

        if (this.searchKey && this.searchKey !== ''){
            //strip out spaces from user input
            let postcode = this.searchKey.replace(/\s/, '');

            if(postcode.length < this.postcodeLength.data){
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Postcode Error',
                        message: `The postcode is too short, it should be at least ${this.postcodeLength.data} characters`,
                        variant: 'error'
                    })
                );
            }else{        
            //getAddressIo
            this.connection
            .findAddressesFromPostcode( /*this.apikey, */postcode)
            .then(respAddressesObj => {
                this.latitude = respAddressesObj.latitude; 
                this.longitude = respAddressesObj.longitude; 
                this.result = respAddressesObj.addresses.map( item => {
                        // item at index 3 can contain two comma separated values.
                        return {
                            "line1": item.formatted_address[0],
                            "line2": item.formatted_address[1],
                            "line3": item.formatted_address[2],
                            "city": item.formatted_address[3].replace(/,/g, ''),
                            "county": item.formatted_address[4],
                            "postcode": this.searchKey,
                        };
                });
        })
            .catch(error => {
                this.result = [];
                this.error = `${error}`; 
            });
            }

        }    

    }

    handleAddressChange(event){
        this.selectedAddress = event.detail;
    }

    handleSave(){

        if (this.selectedAddress){

            const addressArray = this.selectedAddress.value.split(',');
            const updateObject = {};

            if (addressArray.length === 6){

                updateObject.fields = {
                    Id: this.recordId,
                    BillingStreet: `${addressArray[0]} ${addressArray[1]} ${addressArray[2]}`.trim(),
                    BillingCity: addressArray[3],
                    BillingState: addressArray[4],
                    BillingPostalCode: addressArray[5],
                    BillingCountry: 'United Kingdom', 
                    BillingLatitude: this.latitude,
                    BillingLongitude: this.longitude
                };

            }

            updateRecord(updateObject)
                .then( result => {

                    this.error = undefined; 

                    window.console.log(`result with result.fields.BillingCity: ${result.fields.BillingCity}`);
                    window.console.log(`result with result.BillingCity: ${result.BillingCity}`);

                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Record Updated',
                            message: 'The record has been updated with a new address',
                            variant: 'success'
                        })
                    );

                })
                .catch( error => {
                    this.error = error; 
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Update Failed',
                            message: error.message,
                            variant: 'error'
                        })
                    );

                });
        } else {
            this.error = new Error('You must select an address to save');
        }
    }

    get hasRecordId(){
        return this.recordId ? true : false;
    }

    get saveable(){
        return !this.hasRecordId;
    }

    get hasResults(){
        return this.result.length > 0; 
    }

    errorCallback(error, stack){
        this.error = error; 
        this.stack = stack; 
    }

}