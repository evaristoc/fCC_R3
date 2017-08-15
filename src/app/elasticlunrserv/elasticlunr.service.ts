import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//import {Category} from '../models/Category';
declare var elasticlunr: any;

@Injectable()
export class ElasticlunrService {
  elObj: any;
  bla : any;

  constructor() {
    this.elObj = new elasticlunr(function() {
                this.addField('suburls');
                this.setRef('suburlsid');
                this.saveDocument(false);
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
     console.log("THIS IS filterer inside service getRanking", filterer)
     console.log(this.elObj);
     //console.log(this.elObj.search);
     console.log("THIS IS THE SEARCH OF elObj in service getRanking", this.elObj.search("react", { "fields": { "suburls": { "boost": 1 } } }));
     //console.log("THIS IS THE SEARCH OF elObj", this.elObj.search("JavaScript")); 
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
