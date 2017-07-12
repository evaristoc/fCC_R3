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
        console.log("PLATFORM : ", value.origurl,
        "\n", 
        "RELEVANCE (controlled) : ", typeof a.subjects != 'undefined' ? Object.keys(a.subjects[this.results[0][0]]).map((d) => {return a.subjects[this.results[0][0]][d]['count']})[0]:0,
        "\n",
        "POPULARITY (prevalence) : ", value.prevalence.reduce((a,b) => {return a+b}, 0)/11,
        "\n\n"); 
        this.selectedPlatforms.push([value.origurl, value.category])
      }
    })
  })
})

    
}

showPlatforms(){
  //console.log(this.platforms)
}

}
