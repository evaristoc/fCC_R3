import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
//import {Category} from '../models/Category';

@Injectable()
export class FirebasedbService {
  categories: FirebaseListObservable<any[]>;
  subjects: FirebaseListObservable<any[]>;
  platforms: FirebaseListObservable<any[]>;
  texts: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) {}
  
  
  getCategories() {
     this.categories = this.db.list('/categories');
     return this.categories;
 };

 getSubjects() {
     this.subjects = this.db.list('/cv');
     return this.subjects;   
 }

 getPlatforms() {
     this.platforms = this.db.list('/platformstable');
     return this.platforms;   
 }

  getTexts() {
     this.texts = this.db.list('/textstable');
     return this.texts;   
 }

}
