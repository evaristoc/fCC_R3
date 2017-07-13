import { Component, Input , OnInit} from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form.component';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebasedbService } from '../firebaseserv/firebasedb.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  selectedSubjects = {};
  selectedPlatforms = []
  public platforms : FirebaseListObservable<any>;
  @Input('result') results: Array<any>;
  title= "You chose";
  constructor(public db : FirebasedbService) {

    this.platforms = this.db.platforms;

  }

  ngOnInit() {
    if (this.results){
      //console.log(this.results);
    }
this.platforms.forEach((x) => {
  x.forEach((a) => {
    Object.keys(a).forEach((x) => {
      var value = a[x]; 
      
      if(value.category == this.results[1]){
        var relevance = this.calculateRelevance(typeof a.subjects != 'undefined' ? a.subjects[this.results[0][0]] : undefined);
        var prevalence = this.calculatePrevalence(value.prevalence); 
        console.log("PLATFORM : ", value.origurl,
        "\n", 
        "RELEVANCE (controlled) : ", 
        this.calculateRelevance(typeof a.subjects != 'undefined' ? a.subjects[this.results[0][0]] : undefined),
        "\n",
        "POPULARITY (prevalence) : ", this.calculatePrevalence(value.prevalence),
        "\n\n",
        ); 
        this.selectedPlatforms.push([value.origurl, value.category, relevance, prevalence])
      }
    })
  })
})

    
}

calculateRelevance(subjects) {
  // return relevance
  return typeof subjects != 'undefined' ? 
          Object.keys(subjects).map((d) => {return subjects[d]['count']})[0]:0
}

calculatePrevalence(prevalence){
  return prevalence.reduce((a,b) => {return a+b}, 0)/11;
}

showPlatforms(){
  //console.log(this.platforms)
}

}
