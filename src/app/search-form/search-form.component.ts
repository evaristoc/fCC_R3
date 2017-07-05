import { Component, OnInit } from '@angular/core';
//import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebasedbService } from '../firebaseserv/firebasedb.service';
// from https://github.com/softsimon/angular-2-dropdown-multiselect
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts   } from 'angular-2-dropdown-multiselect';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  
  categories : Array<any>;
  subjects : Array<any>;
  catOptions: Array<any>;
  //platforms : Array<any>;
  public platforms : FirebaseListObservable<any>;
  
  constructor(public db: FirebasedbService) {

    db.getCategories().forEach((x) => {
      console.log(x[0]); 
      this.categories = x[0];
      console.log(this.categories[0]);
      this.catOptions = [];
      this.categories.forEach((category, index) => {
        var categoryObj = {};
        categoryObj['id'] = index+1;
        categoryObj['name'] = category;
        this.catOptions.push(categoryObj);
      });
      this.afterLoading();
    });

    db.getSubjects().forEach((x)=>{console.log(x[0]); this.subjects = x[0]});
    console.log(this.subjects)

    //db.getPlatforms().forEach((x)=>{console.log(x)});
    //console.log(this.platforms)

    //db.getPlatforms();
    this.platforms = this.db.platforms;
    console.log(this.platforms)

    db.getTexts().forEach((x)=>{console.log(x)});
    //console.log(this.platforms)

  };
  
  
  optionsModel: number[];
 // Settings configuration
  categorySettings: IMultiSelectSettings = {
      checkedStyle: 'fontawesome',
      buttonClasses: 'btn btn-default btn-block',
      displayAllSelectedText: true,
      dynamicTitleMaxItems: 1,
  };
  
  // Text configuration
  categoryTexts: IMultiSelectTexts = {
      checkAll: 'Select all',
      uncheckAll: 'Unselect all',
      checked: 'selected',
      checkedPlural: 'categories selected',
      defaultTitle: 'Choose categories',
      allSelected: 'All selected',
  };
  
    // Labels / Parents
    
    categoryOptions: IMultiSelectOption[] = [];

  ngOnInit() {
  }
  onChange() {
    console.log(this.optionsModel);
  }
  
  afterLoading() {
    this.categoryOptions = this.catOptions;
  }

}
