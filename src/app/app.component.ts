import { Component } from '@angular/core';
//import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebasedbService } from './firebaseserv/firebasedb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  items : Array<any>;
  //items: Array<any>;
  categories: FirebaseObjectObservable<any>;

  constructor(db: FirebasedbService) {
    //console.log(db.getCategories())
    db.getCategories().forEach((x)=>{console.log(x[0]); this.items = x[0]});
    console.log(this.items)
    //this.items = [1,2,3,4]
    //var categories = db.object('/categories');
    //categories.forEach((x)=>{console.log(x)});
  //constructor(db: AngularFireDatabase) {
  //this.items = db.list('/items');
  //this.categories = db.object('/categories')
  //this.categories.forEach((x)=>{console.log(x)})
  }

}
