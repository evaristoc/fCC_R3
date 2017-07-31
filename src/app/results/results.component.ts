import { Component, Input , OnInit, OnChanges, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
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
  filters:object = {};
  public platforms : FirebaseListObservable<any>;
  @Input('result') results: Array<any>;
  title= "You chose";
  constructor(public db : FirebasedbService) {
    this.platforms = this.db.platforms;
    
  }

  ngOnInit() {
   
  }
  
  setFilters(results) {
    
    results[1].forEach((result)=> {this.filters[result] = true});
    console.log(this.filters)
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
      if(value.category){
        var relevance = this.calculateRelevance(typeof a.subjects != 'undefined' ? a.subjects[results[0][0]] : undefined);
        var prevalence = this.calculatePrevalence(value.prevalence); 
        var ranking = this.calculateRanking(relevance, prevalence)
        //only show relevant
        if (relevance > 0) {
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

toggleCat(event, cat) {
  console.log(event.target, cat)
  event.target.classList.toggle("btn-success");
  event.target.classList.toggle("btn-danger");
  
  if (event.target.classList.contains("btn-danger")) {
    this.filters[cat]= false
  } else {
    this.filters[cat] = true;
  }
  
}

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


ngOnChanges(changes: SimpleChanges) {
  console.log(changes, changes.results.currentValue);
  if (changes.results.currentValue != changes.results.previousValue){
    //https://stackoverflow.com/questions/39840457/how-to-store-token-in-local-or-session-storage-in-angular-2
    //https://codepen.io/chrisenytc/pen/gyGcx
    localStorage.setItem('selectedsubject', changes.results.currentValue);
    this.outputResult(changes.results.currentValue);
    this.setFilters(this.results);
    console.log("changes at ngOnChanges", typeof changes.results, changes.results[Object.keys(changes.results)[0]][0])
  }
    }

}
