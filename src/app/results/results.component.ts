import { Component, Input , OnInit, OnChanges, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { SearchFormComponent } from '../search-form/search-form.component';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebasedbService } from '../firebaseserv/firebasedb.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  selectedSubjects = {};
  selectedPlatforms: Array<any> = [];
  show:boolean = true;
  public filters:Array<any> = [];
  public start: number = 1;
  public platforms : FirebaseListObservable<any>;
  @Input('result_dropdown') result_dropdown: Array<any>;
  title= "You chose";
  //public sevsubjects: Array<any>;

  constructor(public db : FirebasedbService) {
    this.platforms = this.db.platforms;
   
  }

  ngOnInit() {
//"---", "blog|media|news|articl|content|post|journal", "community|support|people|forum", "(text )?editor|interpreter|repl", "shop|commerce", "learn|tutorial|course|training| tips|example", "api|package|framework|librar|stack|licens|addon|app", "cloud|platform|service", "searchtools", "on?(-|\s)?demand|business|compan(y|ies)|enterprise", "manual|guide|docs", "design|galler|template|theme"
    //this.sevsubjects = [
    //  {name:"blog|media|news|articl|content|post|journal", isActive: true},
    //  {name:"learn|tutorial|course|training| tips|example", isActive: true}
    //]
    
    
    this.setResults(this.setFilters(this.result_dropdown), this.outputResult);
  }
  
  setFilters(result_dropdown) {
    //console.log("THIS IS results in setFilters ", results[1]);
    //console.log(typeof this.filters)
    result_dropdown[1].forEach((cat)=> this.filters.push({name:cat, isActive:true}));
    console.log("in setFilter: values of filters", this.filters);
  } 
  
setResults(filterset_result_dropdown, callback){
  //callback(filterset_result_dropdown);
  console.log("FILTERER in setResult", filterset_result_dropdown) //OUTPUT: FILTERER in setResult undefined and stop reading for SUBJECTS, but read for CATEGORIES
    this.selectedPlatforms = [];
    this.platforms.forEach((plat) => {
  plat.forEach((platdetails) => {
    Object.keys(platdetails).forEach((platdetailskey) => {
      var platdetailsvalues = platdetails[platdetailskey]; 
      if (platdetailsvalues.category) {
     // console.log("key", a.$key, x);
      }
      //console.log("FILTERER in outputResult", results, results.map((cat)=>{console.log(cat); if(cat.isActive === true){return cat.name}},[]))
      if(platdetailsvalues.category){
        var relevance = 1;
        var prevalence = 1;
        var ranking = 1;
        if (relevance > 0 && typeof platdetails.subjects != 'undefined') {
          this.selectedPlatforms.push([platdetailsvalues.title, platdetailsvalues.category, relevance, prevalence, ranking, platdetails.$key, platdetailsvalues.category]);
          //console.log("title", value.title)
        }
      }
    })
  })
  this.selectedPlatforms = this.selectedPlatforms.sort((a,b)=> {
    if (a[4]<b[4]) {
      return 1
    } else if (a[4]>b[4]) {
      return -1
    } 
    return 0
  })
})  
callback(filterset_result_dropdown);
}

  outputResult(filterset_result_dropdown) {
    this.selectedPlatforms = [];
    console.log("INSIDE outputResult")
    this.platforms.forEach((plat) => {
  plat.forEach((platdetails) => {
    Object.keys(platdetails).forEach((platdetailskey) => {
      var platdetailsvalues = platdetails[platdetailskey];
      console.log("FILTERER in outputResult", filterset_result_dropdown, filterset_result_dropdown.filter((cat)=>{if(cat.isActive === true){return cat.name}},[]), filterset_result_dropdown.map((cat)=>{if(cat.isActive === true){return cat.name}},[]).indexOf(platdetailsvalues.category) != -1?true:false)
      if(filterset_result_dropdown.map((cat)=>{if(cat.isActive === true){return cat.name}},[]).indexOf(platdetailsvalues.category) != -1){
        var relevance = 1;
        var prevalence = 1;
        var ranking = 1;
        if (relevance > 0 && typeof platdetails.subjects != 'undefined') {
          this.start = 0;
          this.selectedPlatforms.push([platdetailsvalues.title, platdetailsvalues.category, relevance, prevalence, ranking, platdetails.$key, platdetailsvalues.category]);
          //console.log("title", value.title)
        }
      }
    })
  })
  this.selectedPlatforms = this.selectedPlatforms.sort((a,b)=> {
    if (a[4]<b[4]) {
      return 1
    } else if (a[4]>b[4]) {
      return -1
    } 
    return 0
  })
})
  }


   logCheckbox(event : any, cat: string): void {
     //console.log("THIS IS event ", event)
   //console.log(cat, document.getElementById(cat).attributes, document.getElementById(cat)['checked'])
   this.start = 0;
   if (document.getElementById(cat)['checked'] === true){
     //console.log(this.filters)
     this.filters.forEach(ssubs => {if(ssubs.name === cat){console.log("CAT DETECTED AS true"); ssubs.isActive = true}})
     //this.filters[cat] = true
   }else{
     //console.log(this.filters)
     this.filters.forEach(ssubs => {if(ssubs.name === cat){console.log("CAT DETECTED AS false"); ssubs.isActive = false}})
     //console.log(this.sevsubjects)
     //this.filters[cat] = false
   }

   }


//onSubmit(){
//  console.log(this.mycheckbox)
//}


convertToArray(obj:any){
  obj = JSON.parse(obj);
  let tempobj = [];
  //console.log("IN convertToArray", Object.keys(obj).filter((k)=>{if(obj[k]){return k}}));
  tempobj = Object.keys(obj).filter((k)=>{if(obj[k]){return k;}})
  return tempobj;
}




//  ngOnChanges(changes: SimpleChanges) {
//    console.log("RESULTS CURRENT VALUE IN ngOnChanges ", changes, changes.result_dropdown.currentValue);
// //   //console.log(this.sevsubjects)
// //   //console.log(changes, changes.sevsubjects);

//    if (changes.result_dropdown.currentValue != changes.result_dropdown.previousValue){
// // //    //https://stackoverflow.com/questions/39840457/how-to-store-token-in-local-or-session-storage-in-angular-2
// // //    //https://codepen.io/chrisenytc/pen/gyGcx
//      localStorage.setItem('selectedsubject', changes.result_dropdown.currentValue);
//     this.outputResult(this.filters);
// // //    //console.log("changes at ngOnChanges", typeof changes.results, changes.results[Object.keys(changes.results)[0]][0])
//    }
//      }
    

}
