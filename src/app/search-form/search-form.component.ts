import { Component, OnInit, Input, trigger, transition, style, animate, state, OnDestroy } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebasedbService } from '../firebaseserv/firebasedb.service';
// from https://github.com/softsimon/angular-2-dropdown-multiselect
//import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts   } from 'angular-2-dropdown-multiselect';
//https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html
//https://blog.thoughtram.io/angular/2016/10/13/two-way-data-binding-in-angular-2.html
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
  public selectedSubject: Array<any>;
  private selPlatforms : FirebaseListObservable<any>;
  public selplats : Array<any> = [];
  public showSubjectSection = false;
  public subjectOptions: Array<any> = [{name:"NOTHING"}];
  OPTIONTEST : any;
  public catfilters:Array<any>;
  public catOptions: Array<any> = [];
  public subj:string='';
  subjectModel: any;


  constructor(public db: FirebasedbService) {


    const fireb_subjects$: FirebaseListObservable<any> = this.db.getSubjects();
    fireb_subjects$.subscribe((subjs) => {console.log(subjs); return this.subjectOptions = subjs[0].map((subjs, i) => {return {subject:subjs[1], id:i+1}},[])});
  
    const fireb_categories$: FirebaseListObservable<any> = this.db.getCategories();
    fireb_categories$.forEach((cats)=>{cats[0].forEach((c)=>{this.catOptions.push({category:c,isActive:true})})});
    
    this.selPlatforms = this.db.platforms;
  };
  

  ngOnInit() {
    console.log("subjectOptions in ngOnInit, searchform ", this.subjectOptions);
    console.log("categoryOptionslist in ngOnInit, searchform ", this.catOptions);
    console.log(this.selPlatforms)
    this.subjectModel = this.subjectOptions[0]
    this.selectedCat(this.catOptions);
    this.setResults(this.catOptions,this.outputResults)
  }

  toggleCat( category ) {
    let cat = this.catOptions.filter(
     (cats)=> {if (cats.category === category.category)
       {return cats}
     })[0]  
    if (cat.isActive === true){
      this.catOptions[this.catOptions.indexOf(cat)].isActive = false;
      return
    }else{
      this.catOptions[this.catOptions.indexOf(cat)].isActive = true;
      return
    }
  }


selectedCat(category){
  return this.catOptions.filter(
     (cats)=> {if (cats.category === category.category)
       {return cats.isActive}
     })[0]
}

setResults(filterset_result_dropdown, callback){
  //callback(filterset_result_dropdown);
  console.log("FILTERER in setResult", filterset_result_dropdown) //OUTPUT: FILTERER in setResult undefined and stop reading for SUBJECTS, but read for CATEGORIES
   this.selplats = [];
    this.selPlatforms.forEach((plat) => {
      plat.forEach((platdetails) => {
        Object.keys(platdetails).forEach((platdetailskey) => {
          var platdetailsvalues = platdetails[platdetailskey]; 
          if(platdetailsvalues.category){
            var relevance = 1;
            var prevalence = 1;
            var ranking = 1;
            if (relevance > 0 && typeof platdetails.subjects != 'undefined') {
              this.selplats.push([platdetailsvalues.origurl, platdetailsvalues.title, platdetailsvalues.category, relevance, prevalence, ranking, platdetails.$key, platdetailsvalues.category, true]);
              console.log("title", platdetailsvalues.category)
            }
          }
        })
      })
    this.selplats = this.selplats.sort((a,b)=> {
      if (a[4]<b[4]) {
        return 1
      } else if (a[4]>b[4]) {
        return -1
      } 
      return 0
    })
  })  
  callback(filterset_result_dropdown, this.selplats);
}

outputResults(filterset_result_dropdown, selplats){
  //callback(filterset_result_dropdown);
  console.log("FILTERER in outputResult", filterset_result_dropdown) //OUTPUT: FILTERER in setResult undefined and stop reading for SUBJECTS, but read for CATEGORIES
  for(let sp = 0; sp < selplats.length; sp++){
    var selplat = selplats[sp]
    var fil = filterset_result_dropdown.filter((cat)=>{
        if(cat.category===selplat[2]){
          return cat.isActive
        }
      })[0];
    selplats[sp] = selplat.slice(selplat.length-1)+[fil]  
  }
}


outputR(selOp, sel){
  //callback(filterset_result_dropdown);
  //console.log("FILTERER in outputResult", filterset_result_dropdown) //OUTPUT: FILTERER in setResult undefined and stop reading for SUBJECTS, but read for CATEGORIES
  return selOp.filter((cat)=>{
      if(cat.category===sel[2]){
        return cat.isActive
      }
    })[0];
}


  ngOnDestroy(){
    
  }

}
