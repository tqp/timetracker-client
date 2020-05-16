import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelStationDetailComponent } from './fuel-station-detail.component';

describe('FuelStationDetailComponent', () => {
  let component: FuelStationDetailComponent;
  let fixture: ComponentFixture<FuelStationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelStationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelStationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
