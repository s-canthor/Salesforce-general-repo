import { LightningElement } from "lwc";

export default class ScpLwcLifecycleApp extends LightningElement {

    inputs = ["textOne", "textTwo", "textFour", "textFive", "textSix"];
    onInputChange(event) {
        this[event.target.name] = event.detail.value;
        console.log(`Value for textOne: ${this.textOne}`);
        console.log(`Value for textTwo: ${this.textTwo}`);
    }
    
    showTomorrow = true;
    logChildComponentAccess = true;
    logPublicProperties = true;
    throwError = false;

    constructor() {
        super();
        console.log("c-app: constructor()");
        this.canAccessChildComponents();
    }

    connectedCallback() {
        //change the CSS style dynamically
        const css = document.body.style;
        css.setProperty("--background-color", "green");

        console.log("c-app: connectedCallback()");
        this.canAccessChildComponents();
    }

    renderedCallback() {
        console.log("c-app: renderedCallback()");
        this.canAccessChildComponents();
    }

    errorCallback(error, stack) {
        console.error("c-app: errorCallback() " + error);
        this.canAccessChildComponents();
    }

    toggleTomorrow() {
        this.showTomorrow = !this.showTomorrow;
    }

    toggleChildComponentAccessLog() {
        this.logChildComponentAccess = !this.logChildComponentAccess;
    }

    toggleLogPublicProperties() {
        this.logPublicProperties = !this.logPublicProperties;
    }

    toggleThrowError() {
        this.throwError = !this.throwError;
    }

    canAccessChildComponents() {
        if (!this.logChildComponentAccess) {
            return;
        }
        console.log("> c-app: Attempting to access c-date-viewer");
        let dateViewerElement = this.template.querySelector('c-scp-lwc-lifecycle-date-viewer');
        if (dateViewerElement) {
            console.log("> c-app: Can access first instance of c-date-viewer")
        } else {
            console.warn("> c-app: Cannot access first instance of c-date-viewer");
        }
    }
}
