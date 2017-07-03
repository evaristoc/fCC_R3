import { Component, OnInit } from '@angular/core';
//import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebasedbService } from './firebaseserv/firebasedb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  categories : Array<any>;
  subjects : Array<any>;
  //platforms : Array<any>;
  public platforms : FirebaseListObservable<any>;


  constructor(public db: FirebasedbService) {

    db.getCategories().forEach((x)=>{console.log(x[0]); this.categories = x[0]});
    console.log(this.categories)

    db.getSubjects().forEach((x)=>{console.log(x[0]); this.subjects = x[0]});
    console.log(this.subjects)

    //db.getPlatforms().forEach((x)=>{console.log(x)});
    //console.log(this.platforms)

    //db.getPlatforms();
    this.platforms = this.db.platforms;
    console.log(this.platforms)

    db.getTexts().forEach((x)=>{console.log(x)});
    //console.log(this.platforms)

  }

  ngOnInit(){}

}
