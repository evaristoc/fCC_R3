import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingservicesComponent } from './testingservices.component';

describe('TestingservicesComponent', () => {
  let component: TestingservicesComponent;
  let fixture: ComponentFixture<TestingservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
