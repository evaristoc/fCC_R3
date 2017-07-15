import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebasedbService } from '../firebaseserv/firebasedb.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit, OnDestroy  {
  selection: string;
  private sub: any;
  public platforms : FirebaseListObservable<any>;
  platform: object;
  
  constructor(private route: ActivatedRoute, public db : FirebasedbService) {
    this.platforms = this.db.platforms;
    
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.selection = params['selection']; 
      this.platforms.forEach((x) => {
          x.forEach((a) => {
            Object.keys(a).forEach((x) => {
              if (a.$key === this.selection && a[x].category) {
                this.platform = a[x];
                console.log(a[x]);
              }
            })
          
        })
      })
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
