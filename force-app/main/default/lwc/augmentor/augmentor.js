import { LightningElement } from 'lwc';

export default class Augmentor extends LightningElement {
    startCounter = 0;
    //valueToAdd = 0;
    inputValue = 1000;
    buttonLabel = `Add ${this.inputValue} To Counter`;

    handleStartChange(event) {
        this.startCounter = parseInt(event.target.value);
    }

    handleMaximizeCounter() {
        if(this.inputValue){
            //this.valueToAdd = this.inputValue;
            this.template.querySelector('c-numerator').maximizeCounter(this.inputValue);
        }else{
            this.template.querySelector('c-numerator').maximizeCounter(0);
        }
        
    }

    handleValueToChange(event) {
        this.inputValue = parseInt(event.target.value);
        if(this.inputValue){
            this.buttonLabel = `Add ${this.inputValue} To Counter`;
        }else{
            this.buttonLabel = `Add 0 To Counter`;
        }
    }
}