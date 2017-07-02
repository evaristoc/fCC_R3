import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

//getting a : Cannot find name 'FirebaseObjectObservable' ERROR
//One way is by directly calling the file (Eudonix example). Other is by typing the files as in:
//It is recommended to include it in path: https://github.com/angular/angularfire2/blob/master/docs/1-install-and-setup.md
//BUT for typing you should install typing:
//-- https://github.com/angular/angularfire2/issues/160
//Following the Eudonix route for now

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  items : FirebaseListObservable<any[]>;
  categories : FirebaseObjectObservable<any>;
  constructor(db: AngularFireDatabase) {
  this.items = db.list('/items');
  this.categories = db.object('/categories')
  this.categories.forEach((x)=>{console.log(x)})
  }
}
