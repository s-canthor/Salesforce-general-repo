import { LightningElement, api } from "lwc";

/**
 * Display some date values according to settings
 */
export default class ScpLwcLifecycleThrowError extends LightningElement {
  constructor() {
    super(); 
    console.log("constructor() - my error cmp");
    throw new Error("Fubar");
  }
}