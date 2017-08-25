import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebasedbService } from '../firebaseserv/firebasedb.service';
import { ElasticlunrService } from '../elasticlunrserv/elasticlunr.service';
//import { NgxElasticlunrModule } from 'ngx-elasticlunr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

declare var elasticlunr: any;

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit, OnDestroy  {
  public platarr: Array<any> = []
  private plat:FirebaseListObservable<any>;
  private pl:Array<any> = [];
  f$;
c(f){ 
      return new Promise((res,rej)=>{
        //var o = f;
        //console.log("collector", o)
        if(this.pl instanceof Array && this.pl.length > 0){ 
            res(this.pl)
        }
    })
}
  constructor(private route: ActivatedRoute, public db : FirebasedbService, public elunr : ElasticlunrService ) {
      this.f$ = this.c(this.db.getPlatform(this.route.params,this.pl));
      
  }

  ngOnInit(){
      //console.log(this.f$);
      console.log("f$", this.f$.then((data)=>{console.log("data", data)}))
      //console.log("this.plat",this.plat);
  }

  rFbase(Obs){
      var Obs;
      return () => Obs;
  }

  ngOnDestroy(){
    //this.plat.unsubscribe()
  }
}