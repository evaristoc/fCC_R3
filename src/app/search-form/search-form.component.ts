import { Component, OnInit, Input, trigger, transition, style, animate, state } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebasedbService } from '../firebaseserv/firebasedb.service';
// from https://github.com/softsimon/angular-2-dropdown-multiselect
//import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts   } from 'angular-2-dropdown-multiselect';

//OJO: check the use of Enums https://www.gurustop.net/blog/2016/05/24/how-to-use-typescript-enum-with-angular2/

@Component({
  selector: 'app-search-form',
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
        ':enter', [
          style({transform: 'translateX(100%)', 'opacity': 0}),
          animate('500ms', style({transform: 'translateX(0)', 'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('500ms', style({transform: 'translateX(100%)', 'opacity': 0}))
        ]
      )]
    )
  ],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  
  categories : Array<any>;
  subjects : Array<any>;
  catOptions: Array<any>;
  categoryOptions: Array<any>;
  subjOptions: Array<any>;
  selectedSubjects: Array<any> = [];
  selectedCategories: Array<any> = [];
  searchResults: Array<any>;
  //platforms : Array<any>;
  public platforms : FirebaseListObservable<any>;
  isActive = false;
  showResultSection = false;
  subjectOptions: Array<any> = [];

  constructor(public db: FirebasedbService) {
    db.getCategories().forEach((cats) => {
      console.log(cats[0]); 
      this.categories = cats[0];
      console.log(this.categories[0]);
      this.catOptions = [];
      this.categories.forEach((category, index) => {
        this.catOptions.push(category);
      });
    });
    
    db.getSubjects().forEach((subjs)=>{
      this.subjects = subjs[0];
      this.subjOptions = [];
      this.subjects.forEach((subject, index) => {
        var subjectObj = {};
        subjectObj['id'] = index+1;
        subjectObj['name'] = subject[1];
        this.subjOptions.push(subjectObj);
      });
      this.loadSubject();
      
    });

    //db.getPlatforms().forEach((x)=>{console.log(x)});
    //console.log(this.platforms)

    //db.getPlatforms();
    this.platforms = this.db.platforms;
    this.platforms.forEach((plat) => {
      plat.forEach((platdetails) => {
        //console.log(arrItem);
      })
    })
    
    console.log(this.platforms);

    db.getTexts().forEach((txts)=>{
      //console.log(x)
    });
    //console.log(this.platforms)

  };
  
  
 
  
  subjectModels: any[] = [
    { backgroundColor: 'black', fontColor: 'white', display: 'Dark' },
    { backgroundColor: 'white', fontColor: 'black', display: 'Light' },
    { backgroundColor: 'grey', fontColor: 'white', display: 'Sleek' }
  ];
  subjectModel: any;
    // // Settings configuration
  // subjectSettings: IMultiSelectSettings = {
  //     checkedStyle: 'fontawesome',
  //     buttonClasses: 'btn btn-default btn-block',
  //     displayAllSelectedText: false,
  //     dynamicTitleMaxItems: 2,
  //     showCheckAll: false,
  //     showUncheckAll: false,
  //     selectionLimit: 1,
  //     autoUnselect: true,
  //     closeOnSelect: true
  // };
  
  // // Text configuration
  // subjectTexts: IMultiSelectTexts = {
  //     checkAll: 'Select all',
  //     uncheckAll: 'Unselect all',
  //     checked: 'selected',
  //     checkedPlural: 'subjects selected',
  //     defaultTitle: 'Please select',
  //     allSelected: 'All selected',
  // };
  
  // // Labels / Parents


  ngOnInit() {
    this.subjectModel = this.subjectModels[0]

  }

  
  onChangeSubject() {
    this.selectedSubjects =[];
    this.subjectModel.forEach((subjModel) => {
      var subj = this.subjectOptions.filter((subj) => {
        return subj.id === subjModel;
      });
      this.selectedSubjects.push(subj[0].name);
      this.getUrls();
      
    })
    this.getUrls();
    
    this.isActive = (this.selectedSubjects.length > 0) ? true : false;
  }
  loadSubject() {
    this.subjectOptions = this.subjOptions;
  }
  
  
  getUrls() {
    console.log("get URLs in search-form.component");
    this.searchResults = [];
    this.searchResults.push(this.selectedSubjects);
    this.searchResults.push(this.catOptions);
    this.showResultSection = true;
    var el = document.getElementById("resultDiv");
    var top = el.offsetTop;
    window.scrollTo(0,top);
  }

}
