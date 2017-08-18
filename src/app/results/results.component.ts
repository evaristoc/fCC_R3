import { Component, Input , OnInit, OnChanges, ChangeDetectionStrategy, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { SearchFormComponent } from '../search-form/search-form.component';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebasedbService } from '../firebaseserv/firebasedb.service';
//import { Subject } from '../models/Subject'

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
  @Input('result') results: Array<any>;
  title= "You chose";
  //public sevsubjects: Array<any>;

 @ViewChild('myform') mycheckbox:NgForm;

  constructor(public db : FirebasedbService) {
    this.platforms = this.db.platforms;
   
  }

  ngOnInit() {
//"---", "blog|media|news|articl|content|post|journal", "community|support|people|forum", "(text )?editor|interpreter|repl", "shop|commerce", "learn|tutorial|course|training| tips|example", "api|package|framework|librar|stack|licens|addon|app", "cloud|platform|service", "searchtools", "on?(-|\s)?demand|business|compan(y|ies)|enterprise", "manual|guide|docs", "design|galler|template|theme"
    //this.sevsubjects = [
    //  {name:"blog|media|news|articl|content|post|journal", isActive: true},
    //  {name:"learn|tutorial|course|training| tips|example", isActive: true}
    //]
    this.setFilters(this.results);
    this.setResults(this.results)
    //this.outputResult(this.filters);
    //console.log(this.mycheckbox.form.setValue({'api|package|framework|librar|stack|licens|addon|app':true},{onlySelf: true}))
    //setValue('api|package|framework|librar|stack|licens|addon|app', true))
    //.setValue(this.'---', {onlySelf: true})
    //.setValue(this.isActive, {onlySelf: true});
  }
  
  setFilters(results) {
    
    //results[1].forEach((result)=> {this.filters[result] = true});
    //console.log("THIS IS results in setFilters ", results[1]);
    //console.log(typeof this.filters)
    results[1].forEach((result)=> this.filters.push({name:result, isActive:true}));
    console.log("in setFilter: values of filters", this.filters);
  } 
  
setResults(results){
    this.selectedPlatforms = [];
    this.platforms.forEach((x) => {
  x.forEach((a) => {
    Object.keys(a).forEach((x) => {
      var value = a[x]; 
      if (value.category) {
     // console.log("key", a.$key, x);
      }
      //console.log("FILTERER in outputResult", results, results.map((cat)=>{console.log(cat); if(cat.isActive === true){return cat.name}},[]))
      if(value.category){
        //var relevance = this.calculateRelevance(typeof a.subjects != 'undefined' ? a.subjects[] : undefined);
        //var prevalence = this.calculatePrevalence(value.prevalence); 
        //var ranking = this.calculateRanking(relevance, prevalence)
        //only show relevant
        var relevance = 1;
        var prevalence = 1;
        var ranking = 1;
        if (relevance > 0 && typeof a.subjects != 'undefined') {
          this.selectedPlatforms.push([value.title, value.category, relevance, prevalence, ranking, a.$key, value.category]);
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

  outputResult(results) {
    this.selectedPlatforms = [];
    this.platforms.forEach((x) => {
  x.forEach((a) => {
    Object.keys(a).forEach((x) => {
      var value = a[x]; 
      if (value.category) {
     // console.log("key", a.$key, x);
      }
      //console.log("FILTERER in outputResult", results, results.map((cat)=>{console.log(cat); if(cat.isActive === true){return cat.name}},[]))
      if(value.category in results.map((cat)=>{if(cat.isActive === true){return cat.name}},[])){
        //var relevance = this.calculateRelevance(typeof a.subjects != 'undefined' ? a.subjects[] : undefined);
        //var prevalence = this.calculatePrevalence(value.prevalence); 
        //var ranking = this.calculateRanking(relevance, prevalence)
        //only show relevant
        var relevance = 1;
        var prevalence = 1;
        var ranking = 1;
        if (relevance > 0 && typeof a.subjects != 'undefined') {
          this.start = 0;
          this.selectedPlatforms.push([value.title, value.category, relevance, prevalence, ranking, a.$key, value.category]);
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

// toggleCat(event, cat) {
//   console.log(event.target, cat)
//   event.target.classList.toggle("btn-success");
//   event.target.classList.toggle("btn-danger");
  
//   if (event.target.classList.contains("btn-danger")) {
//     this.filters[cat]= false
//   } else {
//     this.filters[cat] = true;
//   }
  
// }

calculateRelevance(subjects) {
  // return relevance
  return typeof subjects != 'undefined' ? 
          Object.keys(subjects).map((d) => {return subjects[d]['count']})[0]:0
}

calculatePrevalence(prevalence){
  // return prevalence (popularity)
  return prevalence.reduce((a,b) => {return a+b}, 0)/11;
}

calculateRanking(relevance, prevalence) {
  return relevance * prevalence
}

////private logCheckbox(element: HTMLInputElement): void {
//private logCheckbox(idx: string): void {
//    console.log(document.getElementById(idx).value)
//    this.log += `Checkbox ${document.getElementById(idx).value} was ${document.getElementById(idx).checked ? '' : 'un'}checked\n`
//
//    //this.log += `Checkbox ${element.value} was ${element.checked ? '' : 'un'}checked\n`
//}

//  //private logCheckbox(element: HTMLInputElement): void {
//  logCheckbox(event : any, cat: string): void {
//    console.log("THIS IS event ", event)
//  console.log(cat, document.getElementById(cat).attributes, document.getElementById(cat)['checked'])
//  if (document.getElementById(cat)['checked'] != false){
//    this.filters[cat] = true
//  }else{
//    this.filters[cat] = false
//  }
//  }

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
//onSubmit(form:HTMLFormElement){
//onSubmit(form:ngForm){
//  console.log(form)
//}

onSubmit(){
  console.log(this.mycheckbox)
}


convertToArray(obj:any){
  obj = JSON.parse(obj);
  let tempobj = [];
  //console.log("IN convertToArray", Object.keys(obj).filter((k)=>{if(obj[k]){return k}}));
  tempobj = Object.keys(obj).filter((k)=>{if(obj[k]){return k;}})
  return tempobj;
  //Object.keys(obj).map(function(k) {return obj[k]});
}

 ngOnChanges(changes: SimpleChanges) {
   console.log("RESULTS CURRENT VALUE IN ngOnChanges ", changes, changes.results.currentValue);
//   //console.log(this.sevsubjects)
//   //console.log(changes, changes.sevsubjects);

   if (changes.results.currentValue != changes.results.previousValue){
// //    //https://stackoverflow.com/questions/39840457/how-to-store-token-in-local-or-session-storage-in-angular-2
// //    //https://codepen.io/chrisenytc/pen/gyGcx
     localStorage.setItem('selectedsubject', changes.results.currentValue);
     //this.outputResult(changes.results.currentValue);
    this.outputResult(this.filters);
//     //this.setFilters(this.results);
// //    //console.log("changes at ngOnChanges", typeof changes.results, changes.results[Object.keys(changes.results)[0]][0])
   }
     }
    

}
