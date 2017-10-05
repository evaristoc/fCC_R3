import {Component, Input} from '@angular/core';

//https://github.com/ng-bootstrap/ng-bootstrap/issues/861
//https://github.com/ng-bootstrap/ng-bootstrap/issues/1397
//http://plnkr.co/edit/dqArOmxQYslmbxsPpWFM?p=preview
//https://codepen.io/jenniferperrin/pen/XmLvjO

@Component({
  selector: 'ngbd-carousel-basic',
  templateUrl: './carousel.component.html'
})
export class NgbdCarouselBasic {
  @Input() similars:Array<any>;
  constructor(){
    this.similars
  }
}
