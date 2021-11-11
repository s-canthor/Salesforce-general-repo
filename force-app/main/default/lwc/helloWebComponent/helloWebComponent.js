import { LightningElement } from 'lwc';

export default class HelloWebComponent extends LightningElement {
    greeting = 'Trailblazer';
    currentDate = new Date().toDateString();
    //currentDatetime = new Date().getTime().toString();
    
    handleGreetingChange(event) {
        this.greeting = event.target.value;
    }
    get capitalizedGreeting() {
        return `Hello ${this.greeting.toUpperCase()}!`;
    }

    /*
    //questo metodo causa problemi di prestazioni in quan il metodo verrebbe chiamato ogni qualvolta viene fatto un rerendering
    //della pagina e quindi ogni volta che viene digitato un pulsante nel lightning-input basic lwc
    get currentDatetime() {
        return new Date().getTime().toString();
    }*/
}