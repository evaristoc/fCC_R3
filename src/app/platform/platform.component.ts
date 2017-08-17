import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
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
export class PlatformComponent implements OnInit, OnChanges, OnDestroy  {
  selectedplatform: string;
  private sub: any;
  public platforms : FirebaseListObservable<any>;
  allsubjects: Array<any>;
  platform: object;
  subjects: object;
  xxxx: any;
  subjOptions:Array<any>;
  subjectOptions: Array<any>;
  //subjOptions:Observable;
  //subjectOptions:Observer;
  filterer : string;
  elObj: any;
  newRank: any;
  oldRank: any;
   //suburls : string = 'suburls';
   //suburlsid : string = 'suburlsid';
  bla : any;
  constructor(private route: ActivatedRoute, public db : FirebasedbService, public elunr : ElasticlunrService ) {

  //console.log("THIS IS elasticlunr", new elasticlunr);
   //this.subjOptions = new Observable(observer => this.subjectOptions = observer);

   this.elObj = new elasticlunr(function() {
                this.addField('suburls');
                this.addField('docurl');
                this.setRef('suburlsid');
                this.saveDocument(true);
            });
    
    console.log("IN CONSTRUCTOR ", localStorage.getItem('rankList').split(','));
    //console.log("THIS IS elasticlunr installed as third party JS library", this.elObj)
    
    this.platforms = this.db.platforms;

    //console.log("THIS IS TYPE OF getSubject ", Object.keys(db.getSubjects()))
    db.getSubjects().forEach((x)=>{
      this.allsubjects = x[0];
      this.subjOptions = [];
     this.allsubjects.forEach((subject, index) => {
        var subjectObj = {};
        let selectedsubject:string = localStorage.getItem('selectedsubject').split(',')[0];
        console.log("THIS IS selectedsubject", selectedsubject);
        if (subject[1] === selectedsubject){
        subjectObj['id'] = index+1;
        subjectObj['name'] = subject[1];
        subjectObj['filterer'] = subject[2].toString().replace(/,/g, " | ");
       this.subjOptions.push(subjectObj);
        }
      });
      this.loadSubject();
      
    });

  //console.log("THIS IS THE SELECTED SUBJECT",selectedsubject);
  this.route.params.subscribe(routedparams => {
      this.selectedplatform = routedparams['selection']; 
      this.platforms.forEach((platform) => {
          platform.forEach((platformdetails) => {
            Object.keys(platformdetails).forEach((pltdetkey) => {
              if (platformdetails.$key === this.selectedplatform) {

                if (platformdetails[pltdetkey].category) {
                  this.platform = platformdetails[pltdetkey];
                  this.bla = this.saveLength(platformdetails[pltdetkey].params.length)
                  //console.log('THIS IS platformdetails[pltdetkey]', platformdetails[pltdetkey]);
                  //if (pltdetkey && pltdetkey === 'params'){
                    platformdetails[pltdetkey].params.forEach((par, i) => {
                      //console.log('THIS IS THE params OF SELECTED PLATFORM', i, par.replace(/-|_|\/|:/ig,' '))
                      //console.log('THIS IS THE params OF SELECTED PLATFORM', i, par.replace(/\W|\d/ig,' '))
                      this.loadELlist(par, i);
                      this.elunr.getDocuments(par, i)

                    })
                  //}
                } 
              }
            })
          
        })
      })
    });

  let selectedsubject:any = localStorage.getItem('selectedsubject').split(',')[0];

    console.log("SELECTEDSUBJECTS in PLATFORM.comp", selectedsubject)
    this.sub = this.route.params.subscribe(routedparams => {
      this.selectedplatform = routedparams['selection']; 
      this.platforms.forEach((platform) => {
          platform.forEach((platformdetails) => {
            Object.keys(platformdetails).forEach((pltdetkey) => {
              if (platformdetails.$key === this.selectedplatform) {

                if (platformdetails[pltdetkey].category) {
                  this.platform = platformdetails[pltdetkey];
                  //this.xxxx = this.elObj;
                  console.log("THIS IS THE showELlist as service... ", this.elunr.getRanking("OTHER"));
                  //this.oldRank = this.elunr.getRanking("OTHER")
                  //if (localStorage.getItem('rankList').split(',')[0] === 'undefined'){
                  //  console.log("LOCAL STORAGE undefined");
                  //  localStorage.setItem('rankList', String(this.elunr.getRanking("ANOTHER")));
                  //}else{
                  //  console.log("LOCAL STORAGE ", localStorage.getItem('rankList').split(','))
                  //}
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
  //console.log("THIS IS THE showELlist here... ", this.showELlist("OTHER")) 
  //console.log("THIS IS THE showELlist as service... ", this.elunr.getRanking("OTHER"));

  }

  

  ngOnInit() {

  }

ngOnChanges(changes: SimpleChanges) {
  console.log("THIS IS AFTER CHANGES ", changes, changes.results.currentValue);
  //if (changes.results.currentValue != changes.results.previousValue){
  //  //https://stackoverflow.com/questions/39840457/how-to-store-token-in-local-or-session-storage-in-angular-2
  //  //https://codepen.io/chrisenytc/pen/gyGcx
  //  localStorage.setItem('selectedsubject', changes.results.currentValue);
  //  this.outputResult(changes.results.currentValue);
  //  this.setFilters(this.results);
  //  console.log("changes at ngOnChanges", typeof changes.results, changes.results[Object.keys(changes.results)[0]][0])
  //}
    }

  saveLength(v:number){
    var vv = v;
    return () => {return vv} 
  }
  
  loadELlist(par: string, i: number) {
    if (par !== null) {
      this.elObj.addDoc({
         'suburls': par.replace(/\W|\d/ig, ' '),
         'docurl' : par,
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
  
  deleteELlist(){
    if ("params" in Object.keys(this.platform)){
      console.log(this.platform["params"])
      //for (let inddoc = 0; inddoc < this.platform.params.length; inddoc++){
      //  this.elObj.removeDoc(inddoc)
      //}
    }else{
      for (let inddoc = 0; inddoc < this.bla; inddoc++){
         this.elObj.removeDoc(inddoc)
      }    
    }
  }

  ngOnDestroy() {
    console.log("this.platform in ngOnDestroy", Object.keys(this.platform))
    this.deleteELlist()
    this.elunr.deleteDocuments(this.platform, this.bla)
    //console.log("this.platform IN ngOnDestroy ", this.platform)
    this.sub.unsubscribe();

    
  }

}
