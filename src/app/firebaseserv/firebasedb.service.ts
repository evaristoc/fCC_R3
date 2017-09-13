import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//import {Category} from '../models/Category';

@Injectable()
export class FirebasedbService {
  categories: FirebaseListObservable<any[]>;
  subjects: FirebaseListObservable<any[]>;
  platforms: FirebaseListObservable<any>;
  texts: FirebaseListObservable<any[]>;
  userslist: FirebaseListObservable<any[]>;
  platform: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.platforms = this.db.list('/platformstable',{query:{limitToFirst:400}});//,{query:{limitToFirst:200}}
  }
  
  
  getCategories() {
     this.categories = this.db.list('/plt_categories');
     return this.categories;
 };

 getSubjects() {
     this.subjects = this.db.list('/fcc_subjects');
     return this.subjects;   
 }

 getUserurls() {
     this.userslist = this.db.list('/users');
     return this.userslist;   
 }


  getItem(id: string) {
    return this.db.list('/platformstable/'+id);
  }

 //getPlatforms() {
 //    var message;
 //    this.platforms.push(message); 
 //}

//  getItemsByCategory(cat:string){
//      console.log(cat);
//     let selplats = [];
//     this.platforms.forEach((plat) => {
//       plat.forEach((platdetails) => {
//         Object.keys(platdetails).forEach((platdetailskey) => {
//           var platdetailsvalues = platdetails[platdetailskey]; 
//           if(platdetailsvalues.category === cat){
//             var relevance = 1;
//             var prevalence = 1;
//             var ranking = 1;
//             if (typeof platdetails.subjects != 'undefined') {
//               selplats.push([platdetailsvalues.origurl, platdetailsvalues.title, platdetailsvalues.category, relevance, prevalence, ranking, platdetails.$key, platdetailsvalues.category]);
//             }
//           }
//         })
//       })
//     selplats = selplats.slice(10);
//     selplats = selplats.sort((a,b)=> {
//       if (a[4]<b[4]) {
//         return 1
//       } else if (a[4]>b[4]) {
//         return -1
//       } 
//       return 0
//     })
//     return selplats
//   })
//     //this.platforms.forEach((plat)=>{for(let ix; ix < plat.length; ix++){}})
//  }

  getTexts() {
     this.texts = this.db.list('/textstable');
     return this.texts;   
 }

}
