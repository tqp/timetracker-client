import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTesterComponent } from './time-tester.component';

describe('TimeTesterComponent', () => {
  let component: TimeTesterComponent;
  let fixture: ComponentFixture<TimeTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
