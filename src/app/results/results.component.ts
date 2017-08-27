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
  //public platforms : FirebaseListObservable<any>;
  //@Input('selectedsubj') selectedsubj: string;
  title= "You chose";


  constructor(public db : FirebasedbService) {

}
  
  ngOnInit() {

  }

 
 

}

