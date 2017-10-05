import {Component, Input} from '@angular/core';

//https://github.com/ng-bootstrap/ng-bootstrap/issues/861
//https://github.com/ng-bootstrap/ng-bootstrap/issues/1397
//http://plnkr.co/edit/dqArOmxQYslmbxsPpWFM?p=preview
//https://codepen.io/jenniferperrin/pen/XmLvjO

@Component({
  selector: 'ngbd-carousel-basic',
  templateUrl: './carousel.component.html',
  styles:[
    `img {
  display: block;
  width: 100%;
  height: 80px;

}
`
],

})
export class NgbdCarouselBasic {
  @Input() selectedlinks:Array<any>;
  constructor(){
    this.selectedlinks
  }
}
