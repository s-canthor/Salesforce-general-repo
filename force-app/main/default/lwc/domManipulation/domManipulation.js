import { LightningElement } from 'lwc';

export default class DomManipulation extends LightningElement {
  bgColor = '';

  handleInputChange(evt) {
    this.bgColor = evt.target.value;
  }

  get divStyle() {
    return `width: 100px; height: 100px; background-color: #${this.bgColor};`
  }
}