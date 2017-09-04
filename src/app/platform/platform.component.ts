import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebasedbService } from '../firebaseserv/firebasedb.service';
import { ElasticlunrService } from '../elasticlunrserv/elasticlunr.service';
//import { NgxElasticlunrModule } from 'ngx-elasticlunr';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

declare var elasticlunr: any;

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit, Input, OnDestroy  {
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
  public selsubject:string;
  public qParam: string;
  @Input() Elquery:any;
  private getItByCat: any;
  public itemsByCategory:Array<any>=['Nothing to report'];
  private selPlatforms : FirebaseListObservable<any>;
  public subjectOptions: Array<any> = [{name:"NOTHING"}];
  public subj:string='';
  closeResult: string;
//  something
//   private getPromise ( h ){
//      return new Promise( ( res, rej )=>{
//        if( h ){
//          res( h )
//         }
//       })
//     }

// bb(f, h){
//   this.something = f(h)
// }

public testData:Array<any>=[
  {platform:'www.example.com',category:'thiscategory',description:'sum dolor sit amet, consectetur adipiscing elit, sed'},
]

  constructor(private route: ActivatedRoute, 
              private router: Router,
              public db : FirebasedbService,
              public elunr : ElasticlunrService,
              public modalService: NgbModal ) {

    this.elObj = new elasticlunr(function() {
                 this.addField('suburls');
                 this.addField('docurl');
                 this.setRef('suburlsid');
                 this.saveDocument(true);
             });

    this.fireb_subjects$ = this.db.getSubjects();
    //fireb_subjects$.subscribe((subjs) => {console.log(subjs); return this.subjectOptions = subjs[0].map((subjs, i) => {return {subject:subjs[1], id:i+1}},[])});  

    //this.getItByCat = this.db.getItemsByCategory;

    this.selPlatforms = this.db.platforms;
    //console.log("selPlatforms", this.selPlatforms)

  const fireb_subjects$: FirebaseListObservable<any> = this.db.getSubjects();
    fireb_subjects$.subscribe((subjs) => {console.log(subjs); return this.subjectOptions = subjs[0].map((subjs, i) => {return {subject:subjs[1], query:subjs[2].toString().replace(/,/g, " | "),id:i+1}},[])});
  

}

//https://stackoverflow.com/questions/34761224/angular2-child-property-change-not-firing-update-on-bound-property
  ngOnInit(){
    let qparam: string;
    this.route.queryParams.take(1).subscribe((qprm)=>{qparam = qprm["selsubject"]});
    //console.log(qparam)
    //console.log("subjectOptions", this.subjectOptions)
    this.selsubject = qparam;
    this.fireb_subjects$.subscribe((subjs) => {return this.Elquery = subjs[0].filter((subjs, i) => {return subjs[1] === qparam},[])[0][2].toString().replace(/,/g," | " )}).unsubscribe();
    
    this.route.params.take(1).subscribe((param) => {this.key = param["selection"]});
    //key = 'addons--mozilla--org'
    this.db.getItem(this.key).forEach((platdetails)=>{
        platdetails.forEach((platdetobj)=>{
            if(platdetobj.$key !== 'subjects'){
                console.log(platdetobj);
                this.platformdet = platdetobj;
                //this.itemsByCategory = this.gIBCClosure(platdetobj.category, this.selPlatforms);
                //console.log("finding nemo",this.getItemsByCategory(platdetobj.category, this.selPlatforms))
                //this.db.platforms.forEach((x)=>{x.forEach((xs,i)=>{console.log(this.itemsByCategory.push(i)); this.itemsByCategory.push(i); this.bb(this.getPromise,this.itemsByCategory.push(i))})})
                this.lg = platdetobj.params.length;
                for(let ixp = 0; ixp < this.lg; ixp++){
                    this.loadElList(platdetobj.params[ixp], ixp);
                }

            }
        })
    }); 
    //console.log(this.item) //this.item outside the function is read before and doesn't work!
//this.getItemsByCategory("api|package|framework|librar|stack|licens|addon|app", this.db.platforms.forEach((x)=>{console.log(x)}))  
}

  public myMethodChangingQueryParams(subj) {
    console.log("subject in myMethodChangingQueryParams",subj)
    // Object.assign is used as apparently 
    // you cannot add properties to snapshot query params
    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
  
    // Do sth about the params
    queryParams['selsubject'] = subj;
  
    this.router.navigate(['./platform',this.key], { queryParams: queryParams });
  
  //let qparam: string;
  //this.route.queryParams.take(1).subscribe((qprm)=>{qparam = qprm["selsubject"]});
  this.selsubject = subj;
  this.fireb_subjects$.subscribe((subjs) => {return this.Elquery = subjs[0].filter((subjs, i) => {return subjs[1] === this.selsubject},[])[0][2].toString().replace(/,/g," | " )}).unsubscribe();

  }


public elQuery(sq){
  return sq.toString().replace(/,/g," | " )
}

public elSearch(sq){

}

   loadElList(par: string, i: number) {
     console.log(this.elObj.documentStore.docs);
     if (par !== null) {
       this.elObj.addDoc({
          'suburls': par.replace(/\W|\d/ig, ' '),
          'docurl' : par,
         //'suburls' : 'adfgart;logn',
          'suburlsid': i
        })
      }
    }

    toArray(obj){
      return Object.keys(obj).map(x => {return obj[x]});
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


 getItemsByCategory(cat:string, selPlatforms){
    console.log(cat, selPlatforms);
    let selplats = [];
    selPlatforms.forEach((plat) => {
      plat.forEach((platdetails) => {
        Object.keys(platdetails).forEach((platdetailskey) => {
          var platdetailsvalues = platdetails[platdetailskey]; 
          if(platdetailsvalues.category === cat){
            var relevance = 1;
            var prevalence = 1;
            var ranking = 1;
            if (typeof platdetails.subjects != 'undefined') {
              selplats.push([platdetailsvalues.origurl, platdetailsvalues.title, platdetailsvalues.category, relevance, prevalence, ranking, platdetails.$key, platdetailsvalues.category]);
            }
          }
        })
      })
    selplats = selplats.slice(10);
    selplats = selplats.sort((a,b)=> {
      if (a[4]<b[4]) {
        return 1
      } else if (a[4]>b[4]) {
        return -1
      } 
      return 0
    })
    return selplats
  })
 }

gIBCClosure(a, b){
  return this.getItemsByCategory(a, b)
}


	public images = IMAGES;

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  ngOnDestroy(){
    //this.plat.unsubscribe()
    //this.subscription.unsubscribe();
    this.deleteElList();
    //this.elunr.deleteDocuments(this.item, this.lg)
  }
}

//IMAGES array implementing Image interface
var IMAGES = [
	{ platform:'www.example.com',category:'thiscategory',description:'dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore' },
  {platform:'www.anotherexample.com',category:'thiscategory',description:'od tempor incididunt ut labore'},
  {platform:'www.otherexample.com',category:'thiscategory',description:'natus error sit voluptatem accusantium doloremque laudantium'},
  {platform:'www.andthenmore.com',category:'thiscategory',description:'quaerat voluptatem'},
  {platform:'www.andfinallythis.com',category:'thiscategory',description:'cillum dolore eu fugiat nulla pariatur'},	
];
