import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//import {Category} from '../models/Category';
declare var elasticlunr: any;

@Injectable()
export class ElasticlunrService {
  //elObj: any;
  bla : any;
  elObj : any;
  constructor() {
    this.elObj = new elasticlunr(function() {
                this.addField('suburls');
                this.setRef('suburlsid');
                this.saveDocument(true);
            });
  }
  
  
  getDocuments(par: string, i: number) {
    if (par !== null) {
      this.elObj.addDoc({
         'suburls': par.replace(/\W|\d/ig, ' '),
        //'suburls' : 'adfgart;logn',
         'suburlsid': i
       })
     }
 };

 getRanking(filterer:string) {
     //let filterer ;
     let that = this;
     console.log("THIS IS filterer inside service getRanking", filterer)
     console.log("I am elObj ", this.elObj);
     //console.log(this.elObj.search);
     console.log("THIS IS THE SEARCH OF elObj in service getRanking", this.elObj.search("react", { "fields": { "suburls": { "boost": 1 } } }));
     //console.log("THIS IS THE SEARCH OF elObj", this.elObj.search("JavaScript")); 
     console.log("getRanking is Empty but ", this.elObj.documentStore, ' shows...')
     if (this.elObj.search("react", { "fields": { "suburls": { "boost": 1 } } }) == []){
         console.log("getRanking is Empty but ", this.elObj, ' shows...')
     }
 }

 deleteDocuments(platform : any, bla : number) {
    if ("params" in Object.keys(platform)){
      console.log(platform["params"])
      //for (let inddoc = 0; inddoc < this.platform.params.length; inddoc++){
      //  this.elObj.removeDoc(inddoc)
      //}
    }else{
      for (let inddoc = 0; inddoc < bla; inddoc++){
         this.elObj.removeDoc(inddoc)
      }    
    }
 }

}
