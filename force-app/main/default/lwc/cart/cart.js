import { LightningElement, api } from 'lwc';
import { bikes } from 'c/data';

export default class Cart extends LightningElement {
    // Ensure changes are reactive when product is updated
    product;

    //Item counter
    itemNumber=0;

    //Total amount
    totalPrice=0;

    //List of products in the cart
    productsCart=[];

    // Private var to track @api price
    _priceValue = undefined;

    // Use set and get to process the value every time it's
    // requested while switching between products
    set priceValue(value) {
        this._priceValue = value;
        this.product = bikes.find(bike => bike.fields.Id.value === value);
        if(this.product){
            this.itemNumber++;
            this.totalPrice = this.totalPrice + this.product.fields.MSRP__c.value;
            this.productsCart.push(this.product);
        }
    }
    
    // getter for priceValue
    @api get priceValue(){
        return this._priceValue;
    }

    reset() {
        this.itemNumber = 0;
        this.totalPrice = 0;
        this.productsCart=[];
    }

}