import { LightningElement, track } from 'lwc';
import { fetchData } from 'c/ldsUtils'; 

export default class GroupingRelatedState extends LightningElement {
  dataState = {
    isLoading: false,
    data: undefined,
    error: undefined
  };
  
  load() {
    this.dataState = {
      isLoading: true,
    };
    
    fetchData().then((data) => {
      this.dataState = {
        isLoading: false,
        data,
      };
    }).catch(error => {
      this.dataState = {
        isLoading: false,
        error,
      };
    });
  }
}