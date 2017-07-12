import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainbodyComponent } from './mainbody.component';

describe('MainbodyComponent', () => {
  let component: MainbodyComponent;
  let fixture: ComponentFixture<MainbodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainbodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
