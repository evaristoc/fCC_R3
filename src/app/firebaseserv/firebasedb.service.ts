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
    this.platforms = this.db.list('/platformstable');//,{query:{limitToFirst:200}}
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

  getTexts() {
     this.texts = this.db.list('/textstable');
     return this.texts;   
 }

}
