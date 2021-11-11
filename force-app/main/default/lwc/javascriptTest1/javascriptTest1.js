//JavascriptTest1.js
import { NavigationMixin } from 'lightning/navigation';
import { LightningElement } from 'lwc';
export default class JavascriptTest1 extends NavigationMixin(LightningElement){
    myValue='testo di prova';

    show = true;
    handleClick(){
        this.show = !this.show;
    }
    saluti= null;
    
    uppercaseItemName;
    get itemName() {
        return this.uppercaseItemName;
    }
    set itemName(value) {
        this.uppercaseItemName = value.toUpperCase();
    }
    itemName='Bello';
    numberOfEmployees = null;
    handleChange(event) {
        this.saluti = event.detail.value;
    }
    handleButtonClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'list'
            }
        });
    }

    handleChange(evt) {
        const typedValue = evt.target.value;
        console.log('typedValue= '+typedValue);
        const trimmedValue = typedValue.trim().toUpperCase(); // trims the value entered by the user
        console.log('trimmedValue= '+trimmedValue);
        if (typedValue !== trimmedValue) {
            evt.target.value = trimmedValue;
        }
        this.myValue = trimmedValue; // updates the internal state
        console.log('this.myValue= '+this.myValue);
    }
}