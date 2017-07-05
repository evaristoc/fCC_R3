import { Component, Input , OnInit} from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  selectedSubjects = {};
  @Input('subj') subjects:string;
  @Input('cat') categories:string;
  constructor() {

    
  }

  ngOnInit() {
  }

}
