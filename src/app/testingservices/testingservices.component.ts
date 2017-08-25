import { Component, OnInit, OnDestroy } from '@angular/core';

import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebasedbService } from '../firebaseserv/firebasedb.service';


@Component({
  selector: 'app-testingservices',
  templateUrl: './testingservices.component.html',
  styleUrls: ['./testingservices.component.css']
})
export class TestingservicesComponent implements OnInit {
  
  public catOptions: Array<any>;
  public subjectOptions: Array<any> = [];

  constructor(public db: FirebasedbService) {
    const fireb_categories$: FirebaseListObservable<any> = this.db.getCategories();
    fireb_categories$.subscribe((cats)=>{console.log("THIS ARE CATS in TEST ", cats); return this.catOptions = cats[0]})
    //this.firebaseplatforms$ = db.getCategories()
    const fireb_subjects$: FirebaseListObservable<any> = this.db.getSubjects();
    //fireb_subjects$.subscribe((subjs) => {console.log(subjs)}).unsubscribe();
    fireb_subjects$.subscribe((subjs) => {console.log("THIS ARE SUBJS in TEST ", subjs); return this.subjectOptions = subjs[0].map((subjs, i) => {return {name:subjs[1], id:i+1}},[])});
    //this.subjectOptions = this.subjectOptions.map((subjs, i) => {return {name:subjs[1], id:i+1}},[])

    //fireb_subjects$.subscribe((subjs) => {let subjects = subjs[0]; subjects.forEach((sb, i)=>{this.subjectOptions.push({name:sb[1], id: i+1})})});

    //const fireb_platforms$: FirebaseListObservable<any> = this.db.getPlatforms();
    //fireb_platforms$.subscribe((plats)=>{console.log("THIS ARE PLATS in TEST ", plats);})

  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
