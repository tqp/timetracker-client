import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelActivityTwoComponent } from './fuel-activity-two.component';

describe('FuelActivityTwoComponent', () => {
  let component: FuelActivityTwoComponent;
  let fixture: ComponentFixture<FuelActivityTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelActivityTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelActivityTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
