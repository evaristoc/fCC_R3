import { Component, Input, OnInit, HostListener } from '@angular/core';
import { ModalplatformService } from '../modalserv/modalplatform.service';

// @Directive({
//   selector: '[appModalplatf]'
// })
// export class ModalplatfDirective {

//   constructor() { }

// }

import * as $ from 'jquery';

@Component({
    moduleId: module.id.toString(),
    selector: 'modal',
    template: `
    <style>
.modal-overlay {
  background-color: rgba(0, 0, 0, .4);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
}

.closed {
  .modal{
    top: -50%;
  }
  .modal-overlay{
    display: none;
  }
}

.modal {
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, .22), 0 17px 20px 0 rgba(0, 0, 0, .12);

  background-color: white;
  left: calc(50% - 300px);
  max-height: calc(100% - 10em);
  overflow-y: auto;
  position: fixed;
  top: 5em;
  width: 600px;
  z-index: 1100;
  transition: all .5s ease;

  .title {
    background-color: red;
    text-align: center;
    color: white;
    line-height: 40px;

    .right-align {
      position: absolute;
      right: 5px;
      &, i{
        line-height: 40px;
      }

      &:hover{
        cursor: pointer;
        transform: scale(1.1);
      }
    }
  }

  .body{
    padding: 1.2em;
  }
}
    </style>
      <div [ngClass]="{'closed': !isOpen}">
        <div class="modal-overlay" (click)="close(true)"></div>

        <div class="modal">
          <div class="title" *ngIf="modalTitle">
            <span class="title-text">{{ modalTitle }}</span>
            <span class="right-align" (click)="close(true)"><i class="material-icons md-24">clear</i></span>
          </div>

          <div class="body">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    `,
})

export class ModalComponent implements OnInit {
  @Input() modalId: string;
  @Input() modalTitle: string;
  @Input() blocking = false;
  isOpen = false;

  @HostListener('keyup') onMouseEnter(event) {
    this.keyup(event);
  }

  constructor(private modalService: ModalplatformService) {
  }

  ngOnInit() {
    this.modalService.registerModal(this);
  }

  close(checkBlocking = false): void {
    this.modalService.close(this.modalId, checkBlocking);
  }

  private keyup(event: KeyboardEvent): void {
    if (event.keyCode === 27) {
      this.modalService.close(this.modalId, true);
    }
  }
}