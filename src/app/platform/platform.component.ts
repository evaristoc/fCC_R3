import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebasedbService } from '../firebaseserv/firebasedb.service';
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
  selectedplatform: string;
  private sub: any;
  public platforms : FirebaseListObservable<any>;
  allsubjects: Array<any>;
  platform: object;
  subjects: object;
  subjOptions:Array<any>;
  subjectOptions: Array<any>;
  //subjOptions:Observable;
  //subjectOptions:Observer;
  filterer : string;
  elObj: any;
   //suburls : string = 'suburls';
   //suburlsid : string = 'suburlsid';

  constructor(private route: ActivatedRoute, public db : FirebasedbService) {

  //console.log("THIS IS elasticlunr", new elasticlunr);
   //this.subjOptions = new Observable(observer => this.subjectOptions = observer);

   this.elObj = new elasticlunr(function() {
                this.addField('suburls');
                this.setRef('suburlsid');
                this.saveDocument(false);
            });
    
    //console.log("THIS IS elasticlunr installed as third party JS library", this.elObj)
    
    this.platforms = this.db.platforms;

    //console.log("THIS IS TYPE OF getSubject ", Object.keys(db.getSubjects()))
    db.getSubjects().forEach((x)=>{
      this.allsubjects = x[0];
      this.subjOptions = [];
     this.allsubjects.forEach((subject, index) => {
        var subjectObj = {};
        let selectedsubject:string = sessionStorage.getItem('selectedsubject').split(',')[0];
        console.log("THIS IS selectedsubject", selectedsubject);
        if (subject[1] === selectedsubject){
        subjectObj['id'] = index+1;
        subjectObj['name'] = subject[1];
        subjectObj['filterer'] = subject[2].toString().replace(",", " ");
       this.subjOptions.push(subjectObj);
        }
      });
      this.loadSubject();
      
    });

  }

  

  ngOnInit() {
  let selectedsubject:any = sessionStorage.getItem('selectedsubject');
  //console.log("THIS IS THE SELECTED SUBJECT",selectedsubject);
  this.route.params.subscribe(routedparams => {
      this.selectedplatform = routedparams['selection']; 
      this.platforms.forEach((platform) => {
          platform.forEach((platformdetails) => {
            Object.keys(platformdetails).forEach((pltdetkey) => {
              if (platformdetails.$key === this.selectedplatform) {

                if (platformdetails[pltdetkey].category) {
                  this.platform = platformdetails[pltdetkey];
                  //console.log('THIS IS platformdetails[pltdetkey]', platformdetails[pltdetkey]);
                  //if (pltdetkey && pltdetkey === 'params'){
                    platformdetails[pltdetkey].params.forEach((par, i) => {
                      //console.log('THIS IS THE params OF SELECTED PLATFORM', i, par.replace(/-|_|\/|:/ig,' '))
                      //console.log('THIS IS THE params OF SELECTED PLATFORM', i, par.replace(/\W|\d/ig,' '))
                      this.loadELlist(par, i)

                    })
                  //}
                } 
              }
            })
          
        })
      })
    });

    this.sub = this.route.params.subscribe(routedparams => {
      this.selectedplatform = routedparams['selection']; 
      this.platforms.forEach((platform) => {
          platform.forEach((platformdetails) => {
            Object.keys(platformdetails).forEach((pltdetkey) => {
              if (platformdetails.$key === this.selectedplatform) {

                if (platformdetails[pltdetkey].category) {
                  this.platform = platformdetails[pltdetkey];
                  //console.log(platformdetails[pltdetkey]);
                  //console.log(this.elObj)
                  //this.showELlist("AQUI")
                } 
              }
            })
          
        })
      })
    });

  //console.log(this.subjOptions)  
  console.log("THIS IS THE showELlist outside... ", this.showELlist("OTHER"));
  }

  loadELlist(par: string, i: number) {
    if (par !== null) {
      this.elObj.addDoc({
         'suburls': par.replace(/\W|\d/ig, ' '),
        //'suburls' : 'adfgart;logn',
         'suburlsid': i
       })
     }
   }

   showELlist(filterer:string) {
     //let filterer ;
     console.log("THIS IS filterer inside showELlist", filterer)
     console.log(this.elObj);
     //console.log(this.elObj.search);
     console.log("THIS IS THE SEARCH OF elObj", this.elObj.search("react", { "fields": { "suburls": { "boost": 1 } } }));
     //console.log("THIS IS THE SEARCH OF elObj", this.elObj.search("JavaScript"));

   }

  loadSubject() {
    this.subjectOptions = this.subjOptions;
    console.log("THIS IS subjectOptions", this.subjectOptions);
    if (this.subjectOptions){
    //this.showELlist(this.subjectOptions[0].filterer.replace(/,/ig," "))
    }
    //return this.subjOptions;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
