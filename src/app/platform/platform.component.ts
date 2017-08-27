import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebasedbService } from '../firebaseserv/firebasedb.service';
import { ElasticlunrService } from '../elasticlunrserv/elasticlunr.service';
//import { NgxElasticlunrModule } from 'ngx-elasticlunr';
import { Subscription } from 'rxjs';
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
  private subscription: Subscription;
  private items: FirebaseListObservable<any[]>;
  public platformdet: any;
  public key:string;
  public lg:number;
  public docs: any;
  public elObj: any;
  private filterer : string;
  private fireb_subjects$: FirebaseListObservable<any>
  public Elquery:any;

  constructor(private route: ActivatedRoute, private router: Router,public db : FirebasedbService, public elunr : ElasticlunrService ) {

    this.elObj = new elasticlunr(function() {
                 this.addField('suburls');
                 this.addField('docurl');
                 this.setRef('suburlsid');
                 this.saveDocument(true);
             });

    this.fireb_subjects$ = this.db.getSubjects();
    //fireb_subjects$.subscribe((subjs) => {console.log(subjs); return this.subjectOptions = subjs[0].map((subjs, i) => {return {subject:subjs[1], id:i+1}},[])});  

}

  ngOnInit(){
    let qparam: string;
    this.route.queryParams.take(1).subscribe((qprm)=>{qparam = qprm["selsubject"]});
    //console.log(qparam)
    this.fireb_subjects$.subscribe((subjs) => {return this.Elquery = subjs[0].filter((subjs, i) => {return subjs[1] === qparam},[])[0][2]});
    this.route.params.take(1).subscribe((param) => {this.key = param["selection"]});
    //key = 'addons--mozilla--org'
    this.db.getItem(this.key).forEach((platdetails)=>{
        platdetails.forEach((platdetobj)=>{
            if(platdetobj.$key !== 'subjects'){
                console.log(platdetobj);
                this.platformdet = platdetobj;
                this.lg = platdetobj.params.length;
                for(let ixp = 0; ixp < this.lg; ixp++){
                    this.loadElList(platdetobj.params[ixp], ixp);
                }

            }
        })
    }); 
    //console.log(this.item) //this.item outside the function is read before and doesn't work!
  }

  public myMethodChangingQueryParams() {
  
    // Object.assign is used as apparently 
    // you cannot add properties to snapshot query params
    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
  
    // Do sth about the params
    queryParams['selsubject'] = 'myNewValue';
  
    this.router.navigate(['./platform',this.key], { queryParams: queryParams });
  
  }



   loadElList(par: string, i: number) {
     if (par !== null) {
       this.elObj.addDoc({
          'suburls': par.replace(/\W|\d/ig, ' '),
          'docurl' : par,
         //'suburls' : 'adfgart;logn',
          'suburlsid': i
        })
      }
    }

    showElList(filterer:string) {
      //let filterer ;
      console.log("THIS IS filterer inside showELlist", filterer)
      console.log(this.elObj);
      //console.log(this.elObj.search);
      console.log("THIS IS THE SEARCH OF elObj", this.elObj.search("react", { "fields": { "suburls": { "boost": 1 } } }));
      //console.log("THIS IS THE SEARCH OF elObj", this.elObj.search("JavaScript"));

    }


  deleteElList(){
     if ("params" in Object.keys(this.platformdet)){
       console.log(this.platformdet["params"])
       //for (let inddoc = 0; inddoc < this.platform.params.length; inddoc++){
       //  this.elObj.removeDoc(inddoc)
       //}
     }else{
       for (let inddoc = 0; inddoc < this.lg; inddoc++){
          this.elObj.removeDoc(inddoc)
       }    
     }
   }

  ngOnDestroy(){
    //this.plat.unsubscribe()
    //this.subscription.unsubscribe();
    this.deleteElList();
    //this.elunr.deleteDocuments(this.item, this.lg)
  }
}