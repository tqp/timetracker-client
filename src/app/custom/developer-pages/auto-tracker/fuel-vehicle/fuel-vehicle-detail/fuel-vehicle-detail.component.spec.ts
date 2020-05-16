import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelVehicleDetailComponent } from './fuel-vehicle-detail.component';

describe('FuelVehicleDetailComponent', () => {
  let component: FuelVehicleDetailComponent;
  let fixture: ComponentFixture<FuelVehicleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelVehicleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelVehicleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
