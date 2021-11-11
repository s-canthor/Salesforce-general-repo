import { api, LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import TITLE_FIELD from '@salesforce/schema/User.Title';
const fields = [NAME_FIELD, TITLE_FIELD];
export default class Selector extends LightningElement {
    @api
    ginetto;

    selectedProductId;
    handleProductSelected(evt) {
        this.selectedProductId = evt.detail;
    }
    addedToCartProductId;
    handlePriceSelected(evt) {
        this.addedToCartProductId = evt.detail;
    }
    userId = Id;
    @wire(getRecord, { recordId: '$userId', fields })
    user;
    get name() {
        return getFieldValue(this.user.data, NAME_FIELD);
    }
    get title() {
        return getFieldValue(this.user.data, TITLE_FIELD);
    }
}