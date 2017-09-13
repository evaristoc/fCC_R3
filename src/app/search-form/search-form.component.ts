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
  public showSubjectSection = false;
  public subjectOptions: Array<any> = [{name:"NOTHING"}];
  OPTIONTEST : any;
  public subj:string='';
  subjectModel: any;

  private selPlatforms : FirebaseListObservable<any>;
  public selplats : Array<any> = [];
  public catfilters:Array<any>;
  public catOptions: Array<any> = [];

  constructor(public db: FirebasedbService) {


    const fireb_subjects$: FirebaseListObservable<any> = this.db.getSubjects();
    fireb_subjects$.subscribe((subjs) => {console.log(subjs); return this.subjectOptions = subjs[0].map((subjs, i) => {return {subject:subjs[1], id:i+1}},[])});
  
    const fireb_categories$: FirebaseListObservable<any> = this.db.getCategories();
    fireb_categories$.forEach((cats)=>{cats[0].forEach((c)=>{this.catOptions.push({category:c,isActive:true})})});
    
    this.selPlatforms = this.db.platforms;

  };
  

  ngOnInit() {
    console.log("subjectOptions in ngOnInit, searchform ", this.subjectOptions);
    this.subjectModel = this.subjectOptions[0]
    console.log("categoryOptionslist in ngOnInit, searchform ", this.catOptions);  
    this.selectedCat(this.catOptions);
    this.setResults(this.catOptions,console.log)
    console.log(this.selPlatforms)

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

//https://github.com/angular/angularfire2/issues/558
//https://stackoverflow.com/questions/39795634/angular-2-change-detection-and-changedetectionstrategy-onpush/39802466#39802466
setResults(filterset_result_dropdown, callback){
  //callback(filterset_result_dropdown);
  console.log("FILTERER in setResult", filterset_result_dropdown) //OUTPUT: FILTERER in setResult undefined and stop reading for SUBJECTS, but read for CATEGORIES
   this.selplats = [];
    this.selPlatforms.forEach((plat) => {
      plat.forEach((platdetails) => {
        let objdetails = {}
        Object.keys(platdetails).forEach((platdetailskey) => {
          var platdetailsvalues = platdetails[platdetailskey]; 
          if(platdetailsvalues.category){
            var relevance = 1;
            var prevalence = 1;
            var ranking = 1;
            //console.log(platdetailsvalues);
            if (relevance > 0 && typeof platdetails.subjects != 'undefined') {
              //platdetailsvalues.category = typeof platdetailsvalues.category === 'object'? platdetailsvalues.category[0]:platdetailsvalues.category;
              //this.selplats.push([platdetailsvalues.origurl, platdetailsvalues.title, platdetailsvalues.category_regex, relevance, prevalence, ranking, platdetails.$key, platdetailsvalues.category, platdetailsvalues.crawlstatus]);
              //this.selplats.push({origurl:platdetailsvalues.origurl, title:platdetailsvalues.title, cat:platdetailsvalues.category_regex, $key:platdetails.$key});
              //console.log("title", platdetailsvalues.category)
              objdetails['origurl'] = platdetailsvalues.origurl;
              if(platdetailsvalues.title){
              if((platdetailsvalues.title !== 'noinformationfound') && (platdetailsvalues.title !== '403 Forbidden') && (platdetailsvalues.title !== 'Login') && (!platdetailsvalues.title.match(/4|5/)) ){
              objdetails['title'] = platdetailsvalues.title;
              }else{
                objdetails['title'] = '';
              };
              };
              objdetails['cat'] = platdetailsvalues.category_regex;
              objdetails['c'] = platdetailsvalues.category;
              objdetails['$key'] = platdetails.$key;
              //console.log(platdetailsvalues['requency-recency'])
              if(platdetailsvalues['frequency-recency']){
                
              objdetails['rf'] = (platdetailsvalues['frequency-recency'].length) > 1? platdetailsvalues['frequency-recency'][1]:1;
              }else{
              objdetails['rf'] = 1;
              };  
          };
          }
          if(platdetailskey==='subjects'){
            //console.log(platdetails[platdetailskey])
          //   Object.keys(platdetails[platdetailskey]).map((shadowk)=>{
          //     Object.keys(platdetails[platdetailskey][shadowk]).forEach((cat)=>{
          //       objdetails['subjects'][cat] = platdetails[platdetailskey][shadowk][cat]['proportion']
          //   })
          // })
          Object.keys(platdetails[platdetailskey]).map((subj)=>{
           objdetails[subj] = platdetails[platdetailskey][subj][Object.keys(platdetails[platdetailskey][subj])[0]]['proportion']*platdetails[platdetailskey][subj][Object.keys(platdetails[platdetailskey][subj])[0]]['count']
        })
        }
      })
      this.selplats.push(objdetails);
      //console.log(objdetails['subjects']);
    })
  })  
  callback(filterset_result_dropdown, this.selplats);
}

sorterData(cat,listofobjs){
      listofobjs = listofobjs.sort((a,b)=> {
      if (a[4]<b[4]) {
        return 1
      } else if (a[4]>b[4]) {
        return -1
      } 
      return 0
    })
}


outputR(selOp, sel){
  //callback(filterset_result_dropdown);
  //console.log("FILTERER in outputResult", selOp, sel) //OUTPUT: FILTERER in setResult undefined and stop reading for SUBJECTS, but read for CATEGORIES
  // var d = selOp.filter((cat)=>{
  //     console.log(cat.category, sel);
  //     if(cat.category===sel[2]){
  //       return cat.isActive
  //     }
  //   })[0];
  
  //console.log(d);

   return selOp.filter((cat)=>{
       if(cat.category===sel.cat){
         //console.log(cat.category);
         return cat.isActive
       }
     })[0];
}

  ngOnDestroy(){
    
  }

}
