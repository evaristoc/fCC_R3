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
  platforms: any;
  selectedPlatforms:Array<any>;
  show:boolean = true;
  public catfilters:Array<any>;
  public filteredResults: Array<any> = [];
  public start: number = 1;
  //public platforms : FirebaseListObservable<any>;
  @Input('selectedsubj') selectedsubj: string;
  title= "You chose";
  private categoryOptionslist: Array<any>;
  public categoryOptions: any;
  //public sevsubjects: Array<any>;

  constructor(public db : FirebasedbService) {
    //this.platforms = this.db.platforms;

     //const fireb_platforms$: FirebaseObjectObservable<any> = this.db.getPlatforms()
     //fireb_platforms$.subscribe((plats)=>{return this.platforms = plats})


    const fireb_categories$: FirebaseListObservable<any> = this.db.getCategories()
    fireb_categories$.subscribe((cats)=>{return this.categoryOptionslist = cats[0]})
    //flatted object
    this.categoryOptions = this.categoryOptions.map((cat)=>{return {name: cat, isShown:true}},[])
    console.log(this.categoryOptions)  
}
  
  ngOnInit() {
    
    //console.log(this.platforms)
    //this.catfilters = Object.keys(this.categoryOptions)
    //this.setResults()

  }

 
  setResults(){
    //callback(filterset_result_dropdown);
    //console.log("FILTERER in setResult", categories) //OUTPUT: FILTERER in setResult undefined and stop reading for SUBJECTS, but read for CATEGORIES
      //this.selectedPlatforms = [];
      let sortingplatforms:Array<any>;
      for (let plat in this.platforms){
        if(this.platforms[plat].subjects !== undefined){
          let platdetails = this.selectedPlatforms[plat]
            //console.log(Object.keys(platdetails))
        Object.keys(platdetails).forEach((platdetailskey) => {
          var platdetailsvalues = platdetails[platdetailskey]; 
          if(platdetailsvalues.category){
            var relevance = 1;
            var prevalence = 1;
            var ranking = 1;
            if (relevance > 0) {
              this.selectedPlatforms.push([platdetailsvalues.title, platdetailsvalues.category, relevance, prevalence, ranking, plat]);
              console.log("TITLE", plat)
            }
          }
        })
      }
    }
  }
}
