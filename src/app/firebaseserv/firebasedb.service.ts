import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
//import {Category} from '../models/Category';

@Injectable()
export class FirebasedbService {
  categories: FirebaseListObservable<any[]>;
  
  constructor(private db: AngularFireDatabase) {}
  
  
  getCategories() {
     this.categories = this.db.list('/categories');
     return this.categories;
 };
}
